
# Storage Layout
 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). It presents some low-level details on how data is stored in the database files. 

 
## Data Types

The following data types are used for specifying the storage layout: 


** Type ** | ** Description ** | ** Example (native → hex integers) **
---------- | ----------------- | -------------------------------------
`Num` |  Compressed integer (1-5 bytes), specified in [Num.java](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/util/Num.java) | `15` → `0F`; `511` → `41 FF`
`Token` |  Length (`Num`) and bytes of UTF8 byte representation  | `Hello` → `05 48 65 6c 6c 6f`
`Double` |  Number, stored as token  | `123` → `03 31 32 33`
`Boolean` |  Boolean (1 byte, `00` or `01`)  | `true` → `01`
`Nums`, `Tokens`, `Doubles` |  Arrays of values, introduced with the number of entries  | `1,2` → `02 01 31 01 32`
`TokenSet` |  Key array (`Tokens`), next/bucket/size arrays (3x `Nums`)  | 
 
## Database Files

The following tables illustrate the layout of the BaseX database files. All files are suffixed with `.basex`. 


### Meta Data, Name/Path/Doc Indexes: `inf`

** Description ** | ** Format ** | ** Method **
----------------- | ------------ | ------------
**1. Meta Data** |  1. Key/value pairs, in no particular order (`Token`/`Token`):  • Examples: `FNAME`, `TIME`, `SIZE`, ...  • `PERM` → Number of users (`Num`), and name/password/permission values for each user (`Token`/`Token`/`Num`)2. Empty key as finalizer  | [DiskData()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/data/DiskData.java)[MetaData()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/data/MetaData.java)[Users()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/core/Users.java)
**2. Main memory indexes** |  1. Key/value pairs, in no particular order (`Token`/`Token`):  • `TAGS` → Tag Index  • `ATTS` → Attribute Name Index  • `PATH` → Path Index  • `NS` → Namespaces  • `DOCS` → Document Index2. Empty key as finalizer  | [DiskData()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/data/DiskData.java)
**2 a) Name Index**Tag/attribute names  |  1. Token set, storing all names (`TokenSet`)2. One StatsKey instance per entry:2.1. Content kind (`Num`):2.1.1. Number: min/max (`Doubles`)2.1.2. Category: number of entries (`Num`), entries (`Tokens`)2.2. Number of entries (`Num`)2.3. Leaf flag (`Boolean`)2.4. Maximum text length (`Double`; legacy, could be `Num`)  | [Names()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/index/Names.java)[TokenSet.read()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/util/hash/TokenSet.java)[StatsKey()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/index/StatsKey.java)
**2 b) Path Index** |  1. Flag for path definition (`Boolean`, always `true`; legacy)2. PathNode:2.1. Name reference (`Num`)2.2. Node kind (`Num`)2.3. Number of occurrences (`Num`)2.4. Number of children (`Num`)2.5. `Double`; legacy, can be reused or discarded2.6. Recursive generation of child nodes (→ 2)  | [PathSummary()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/index/path/PathSummary.java)[PathNode()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/index/path/PathNode.java)
**2 c) Namespaces** |  1. Token set, storing prefixes (`TokenSet`)2. Token set, storing URIs (`TokenSet`)3. NSNode:3.1. pre value (`Num`)3.2. References to prefix/URI pairs (`Nums`)3.3. Number of children (`Num`)3.4. Recursive generation of child nodes (→ 3)  | [Namespaces()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/data/Namespaces.java)[NSNode()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/data/NSNode.java)
**2 d) Document Index** |  Array of integers, representing the distances between all document pre values (`Nums`)  | [DocIndex()](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/index/DocIndex.java)

### Node Table: `tbl`, `tbli`
 * `tbl` : Main database table, stored in blocks. 
 * `tbli` : Database directory, organizing the database blocks. 

Some more information on the [node storage](Node Storage.md) is available. 


### Texts: `txt`, `atv`
 * `txt` : Heap file for text values (document names, string values of texts, comments and processing instructions) 
 * `atv` : Heap file for attribute values. 

### Value Indexes: `txtl`, `txtr`, `atvl`, `atvr`

**Text Index:**

 * `txtl` : Heap file with ID lists. 
 * `txtr` : Index file with references to ID lists. 

The **Attribute Index** is contained in the files `atvl` and `atvr`; it uses the same layout. 


For a more detailed discussion and examples of these file formats please see [Index File Structure](Index File Structure.md). 


### Full-Text Fuzzy Index: `ftxx`, `ftxy`, `ftxz`

...may soon be reimplemented. 

