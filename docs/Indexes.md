
# Indexes
 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md) and introduces the available index structures, which are utilized by the query optimizer to rewrite expressions and speed up query evaluation. 

 
Nearly all examples in this article are based on the [factbook.xml](http://files.basex.org/xml/factbook.xml) document. To see how a query is rewritten, please turn on the [Info View](http://docs.basex.org/wiki/Graphical User InterfaceVisualizations) in the GUI or use the [-V flag](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) on command line. 

 
## Structural Indexes

Structural indexes will always be present and cannot be dropped by the user: 


### Name Index

The name index contains all element and attribute names of a database, and the fixed-size index ids are stored in the main database table. If a database is updated, new names are automatically added. Furthermore, the index is enriched with statistical information, such as the distinct (categorical) or minimum and maximum values of its elements and attributes. The maximum number of categories to store per name can be changed via [MAXCATS](Options.md#MAXCATS). The statistics are discarded after database updates and can be recreated with the [OPTIMIZE](Commands.md#OPTIMIZE) command. 


The name index is e.g. applied to pre-evaluate location steps that will never yield results: 


    (: will be rewritten to an empty sequence :)
    /non-existing-name


The contents of the name indexes can be directly accessed with the XQuery functions [index:element-names](Index Module.md#index-element-names) and [index:attribute-names](Index Module.md#index-attribute-names). 


### Path Index

The path index (also called _path summary_) stores all distinct paths of the documents in the database. It contains the same statistical information as the name index. The statistics are discarded after database updates and can be recreated with the [OPTIMIZE](Commands.md#OPTIMIZE) command. 


The path index is applied to rewrite descendant steps to multiple child steps. Child steps can be evaluated faster, as less nodes have to be accessed: 


    doc('factbook.xml')//province,
    (: ...will be rewritten to... :)
    doc('factbook.xml')/mondial/country/province


The paths statistics are e.g. used to pre-evaluate the `count` function: 


    (: will be rewritten and pre-evaluated by the path index :)
    count( doc('factbook')//country )


The contents of the path index can be directly accessed with the XQuery function [index:facets](Index Module.md#index-facets). 


### Resource Index

The resource index contains references to the `pre` values of all XML document nodes. It speeds up the access to specific documents in a database, and it will be automatically updated when updates are performed. 


The following query will be sped up by the resource index: 


    db:open('DatabaseWithLotsOfDocuments')

 
## Value Indexes

Value indexes can be optionally created and dropped by the user. The text and attribute index will be created by default. 


### Text Index

#### Exact Queries

This index speeds up string-based equality tests on text nodes. The [UPDINDEX](Options.md#UPDINDEX) option can be activated to keep this index up-to-date. 


The following queries will all be rewritten for index access: 


    (: 1st example :)
    //*[text() = 'Germany'],
    (: 2nd example :)
    doc('factbook.xml')//name[. = 'Germany'],
    (: 3rd st example :)
    for $c in db:open('factbook')//country
    where $c//city/name = 'Hanoi'
    return $c/name


Matching text nodes can be directly requested from the index with the XQuery function [db:text](Database Module.md#db-text). The index contents can be accessed via [index:texts](Index Module.md#index-texts). 


#### Range Queries

The text index also supports range queries based on string comparisons: 


    (: 1st example :)
    db:open('Library')//Medium[Year >= '2005' and Year <= '2007'],
    (: 2nd example :)
    let $min := '2011-04-16T00:00:00'
    let $max := '2011-04-19T23:59:59' 
    return db:open('news')//entry[date-time > $min and date-time < $max]


Text nodes can be directly accessed from the index via the XQuery function [db:text-range](Database Module.md#db-text-range). 


Please note that the current index structures do not support queries for numbers and dates. 


### Attribute Index

Similar to the text index, this index speeds up string-based equality and range tests on attribute values. The [UPDINDEX](Options.md#UPDINDEX) option can be activated to keep this index up-to-date. 


The following queries will all be rewritten for index access: 


    (: 1st example :)
    //country[@car_code = 'J'],
    (: 2nd example :)
    //province[@* = 'Hokkaido']//name,
    (: 3rd example :)
    //sea[@depth > '2100' and @depth < '4000']


Matching text nodes can be directly requested from the index with the XQuery functions [db:attribute](Database Module.md#db-attribute) and [db:attribute-range](Database Module.md#db-attribute-range). The index contents can be accessed with [index:attributes](Index Module.md#index-attributes). 


### Full-Text Index

The [Full-Text](Full-Text.md) index speeds up queries using the `contains text` expression. Internally, two index structures are provided: the default index sorts all keys alphabetically by their character length. It is particularly fast if fuzzy searches are performed. The second index is a compressed trie structure, which needs slightly more memory, but is specialized on wildcard searches. Both index structures will be merged in a future version of BaseX. 


The following queries are examples for expressions that will be optimized for index access (provided that the relevant index exists in a particular database): 


If the full-text index exists, the following queries will all be rewritten for index access: 


    (: 1st example :)
    //country/name[text() contains text 'and'],
    (: 2nd example :)
    //religions[. contains text { 'Catholic', 'Roman' }
        using case insensitive distance at most 2 words]


Matching text nodes can be directly requested from the index via the XQuery function [ft:search](Full-Text Module.md#ft-search). The index contents can be accessed with [ft:tokens](Full-Text Module.md#ft-tokens). 


### Index Construction

If main memory runs out while creating a value index, the currently generated index structures will be partially written to disk and eventually merged. If the used memory heuristics fails for some reason (i.e., because multiple index operations run at the same time), fixed index split sizes may be chosen via the [INDEXSPLITSIZE](Options.md#INDEXSPLITSIZE) and [FTINDEXSPLITSIZE](Options.md#FTINDEXSPLITSIZE) options. 


If [DEBUG](Options.md#DEBUG) is set to true, and if a new database is created from command-line, the number of index operations will be output to standard output; this might help you to choose proper split size. The following example shows how the output can look like for a document with 111 MB and 128 MB of available main memory: 


    > basex -d -c"set ftindex; create db 111mb 111mb.xml"
    Creating Database...
    .... 8132.44 ms (17824 KB)
    Indexing Text...
    .. 979920 operations, 2913.78 ms (44 MB)
    Indexing Attribute Values...
    .. 381870 operations, 630.61 ms (21257 KB)
    Indexing Full-Text...
    ..|| 3 splits, 12089347 operations, 16420.47 ms (36 MB)


The info string `3 splits` indicates that three partial full-text index structures were written to disk, and the string `12089347 operations` tells that the index construction consisted of appr. 12 mio index operations. If we set [FTINDEXSPLITSIZE](Options.md#FTINDEXSPLITSIZE) to the fixed value `4000000` (12 mio divided by three), or a smaller value, we should be able to build the index and circumvent the memory heuristics. 

 
## Updates

By default, index structures are discarded after an update operation. As a result, queries will be executed more slowly. There are different alternatives to cope with this: 


After the execution of update operations, the [OPTIMIZE](Commands.md#OPTIMIZE) command or the [db:optimize](Database Module.md#db-optimize) function can be called to rebuild the index structures. This way, multiple update operations will be performed faster, as the database meta data is only updated and regenerated when requested by the database users. 


With the [UPDINDEX](Options.md#UPDINDEX) option, text and attributes index structures will incrementally be updated. This option must be turned on before creating a new database or running an optimization on it. Please note that incremental updates are not available for the fulltext index and database statistics. 


Since Version 8.0, the [AUTOOPTIMIZE](Options.md#AUTOOPTIMIZE) option is available, which recreates all outdated index structures and statistics after a database update. This option should only be activated for medium-sized databases. 

 
## Changelog
UNKNOWN * Added: AUTOOPTIMIZE option 
UNKNOWN * Added: string-based range queries 
