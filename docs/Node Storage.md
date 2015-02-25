 


 
This article describes the [Storage Layout](Storage Layout.md) of the main database table. 

 
# Node Table

BaseX stores all XML nodes in a flat table. The node table of a database can be displayed via the [INFO STORAGE](Commands.md#infostorage) command: 


    $ basex -c"create db db <xml>HiThere</xml>" -c"info storage"
    PRE  DIS  SIZ  ATS  ID  NS  KIND  CONTENT
    -----------------------------------------
      0    1    3    1   0   0  DOC   db.xml
      1    1    2    1   1   0  ELEM  xml
      2    1    1    1   2   0  TEXT  HiThere


## PRE Value

The _pre_ value of a node represents the order in which the XML nodes are visited by a SAX parser. It is actually not stored in the database; instead, it is implicitly given by the table position. As a result, it will change whenever a node with a smaller _pre_ values is added to or deleted from a database. 


## ID Value

Each database node has a persistent _id_ value, which remains valid after update operations, and which is referenced by the [value indexes](Indexes.md#valueindexes). As long as no updates are performed on a database, the _pre_ and _id_ values are identical. The values will remain to be identical if new nodes are exclusively added to the end of the database. If nodes are deleted or inserted somewhere else, the values will diverge, as shown in the next example: 


    $ basex -c"create db db <xml>HiThere</xml>" -q"insert node <b/> before /xml" -c"info storage"
    PRE  DIS  SIZ  ATS  ID  NS  KIND  CONTENT
    -----------------------------------------
      0    1    4    1   0   0  DOC   db.xml
      1    1    1    1   3   0  ELEM  b
      2    2    2    1   1   0  ELEM  xml
      3    1    1    1   2   0  TEXT  HiThere


The [db:node-pre](Database Module.md#dbnode-pre) and [db:node-id](Database Module.md#dbnode-id) functions can be called to retrieve the _pre_ and _id_ values of a node, and [db:open-pre](Database Module.md#dbopen-pre) and [db:open-id](Database Module.md#dbopen-id) can be used to go back and retrieve the original node. By default, _id_ lookups are expensive. If the [UPDINDEX](Options.md#updindex) option is turned on, an additional index will be maintained to speed up the process. 


## Block Storage

BaseX logically splits the `tbl.basex` file into blocks with length 4096 bytes, i.e. each block can have max 256 records each with length 16 bytes. The records within a block are sorted by their pre value (which, therefore, can be implicitly determined and need not be saved). 


For each block BaseX stores in a separate file (`tbli.basex`) the smallest pre value within that block (and since the records are sorted, that will be the pre value of the first record stored in the block). These will be referred as fpre from now on. The physical address of each block is stored in `tbli.basex`, too. 


Since these two maps will not grow excessively large, but are accessed resp. changed on each read resp. write operation, they are kept in main memory and flushed to disk on closing the database. 


A newly created database with 256 + 10 records will occupy the first two blocks with physical addresses 0 and 4096. The corresponding fpre's will be 0 and 256. 


If a record with pre = 12 is to be inserted, it needs to be stored in the first block, which is, however, full. In this case, a new block with physical address 8192 will be allocated, the records with pre values from 12 to 255 will be copied to the new block, the new record will be stored in the old block at pre = 12, and the two maps will look like this: 


    fpre's = 0, 13, 257
    addr's = 0, 8192, 4096


Basically, the old records remain in the first block, but they will not be read, since the fpre's array says that only 13 records are stored in the first block. This causes redundant storage of the records with old pres from 13 to 255. 


Additionally to these two maps (fpre's and addr's), BaseX maintains a bit map (which is also stored in `tbli.basex`) which reflects which physical blocks are free and which not, so that when a new block is needed, an already free one will be reused. 

