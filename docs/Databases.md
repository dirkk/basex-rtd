
# Databases
 


 
This page is part of the [Getting Started](Getting Started.md) Section. 

 
In BaseX, a _database_ is a pretty light-weight concept and can be compared to a _collection_. It contains an arbitrary number of **resources**, addressed by their unique database path. Resources can either be **XML documents** or **raw files** (binaries). Some information on [binary data](Binary Data.md) can be found on an extra page. 

 
## Create Databases

New databases can be created via commands, in the GUI, or with any of our [APIs](Developing.md). If some input is specified along with the create operation, it will be added to the database in a bulk operation: 

 * [Console](Startup.md#StartupBaseX_Standalone) : `CREATE DB db /path/to/resources` will add initial documents to a database 
 * [GUI](Startup.md#StartupBaseX_GUI) : Go to _Database_ → _New_, press _Browse_ to choose an initial file or directory, and press _OK_

Database must follow the [valid names constraints](Commands.md#Valid_Names). Various [parsers](Parsers.md) can be chosen to influence the database creation, or to convert different formats to XML. 


**Note:** A main-memory only database can be created using the the `SET MAINMEM true` command before calling `CREATE DB` ([see below](Databases.md#In_Memory_Database) for more). 

 
## Access Resources

Stored resources and external documents can be accessed in different ways: 


### XML Documents

Various XQuery functions exist to access XML documents in databases: 


**Function ** | **Example ** | **Description **
------------- | ------------ | ----------------
`db:open` | `db:open("db", "path/to/docs")` | Returns all documents that are found in the database `db` at the (optional) path `path/to/docs`. 
`fn:collection` | `collection("db/path/to/docs")` | Returns all documents at the location `path/to/docs` in the database `db`.If no path is specified after the database, all documents in the database will be returned.If no argument is specified, all documents of the database will be returned that has been opened in the global context. 
`fn:doc` | `doc("db/path/to/doc.xml")` | Returns the document at the location `path/to/docs` in the database `db`.An error is raised if the specified yields zero or more than one document. 

You can access multiple databases in a single query: 


    for $i in 1 to 100
    return db:open('books' || $i)//book/title


If the [DEFAULTDB](Options.md#DEFAULTDB) option is turned on, the path argument of the `fn:doc` or `fn:collection` function will first be resolved against the globally opened database. 


Two more functions are available for retrieving information on database nodes: 


**Function ** | **Example ** | **Description **
------------- | ------------ | ----------------
`db:name` | `db:name($node)` | Returns the name of the database in which the specified `$node` is stored. 
`db:path` | `db:path($node)` | Returns the path of the database document in which the specified `$node` is stored. 

The `fn:document-uri` and `fn:base-uri` functions return URIs that can also be reused as arguments for the `fn:doc` and `fn:collection` functions. As a result, the following example query always returns `true`: 


    every $c in collection('anyDB')
    satisfies doc-available(document-uri($c))


If the argument of `fn:doc` or `fn:collection` does not start with a valid database name, or if the addressed database does not exist, the string is interpreted as URI reference, and the documents found at this location will be returned. Examples: 

 * `doc("http://web.de")` : retrieves the addressed URI and returns it as a main-memory document node. 
 * `doc("myfile.xml")` : retrieves the given file from the file system and returns it as a main-memory document node. Note that updates to main-memory nodes are not automatically written back to disk unless the `WRITEBACK` option is set. 
 * `collection("/path/to/docs")` : returns a main-memory collection with all XML documents found at the addressed file path. 

### Raw Files
 * XQuery: `db:retrieve("dbname", "path/to/docs")` returns raw files in their Base64 representation. By choosing `"method=raw"` as [Serialization Option](Serialization.md), the data is returned in its original byte representation: 

    declare option output:method "raw";
    db:retrieve('multimedia', 'sample.avi')

 * Commands: `RETRIEVE` returns raw files without modifications. 

### HTTP Services
 * With [REST](REST.md) and [WebDAV](WebDAV.md), all database resources can be requested in a uniform way, no matter if they are well-formed XML documents or binary files. 
 
## Update Resources

Once you have created a database, additional commands exist to modify its contents: 

 * XML documents can be added with the `ADD` command. 
 * Raw files are added with `STORE`. 
 * Existing resources can be replaced with the `REPLACE` command. 
 * Resources can be deleted via `DELETE`. 

The [AUTOFLUSH](Options.md#AUTOFLUSH) option can be turned off before _bulk operations_ (i.e. before a large number of new resources is added to the database). 


The [ADDCACHE](Options.md#ADDCACHE) option will first cache the input before adding it to the database. This is helpful when the input documents to be added are expected to eat up too much main memory. 


The following commands create an empty database, add two resources, explicitly flush data structures to disk, and finally delete all inserted data: 


    CREATE DB example
    SET AUTOFLUSH false
    ADD example.xml
    SET ADDCACHE true
    ADD /path/to/xml/documents
    STORE TO images/ 123.jpg
    FLUSH
    DELETE /


You may as well use the BaseX-specific [XQuery Database Functions](Database Module.md) to create, add, replace, and delete XML documents: 


    let $root
    := "/path/to/xml/documents/"
    for $file in file:list($root)
    return db:add("database", $root || $file)


Last but not least, XML documents can also be added via the GUI and the _Database_ menu. 

 
## Export Data

All resources stored in a database can be _exported_, i.e., written back to disk. This can be done in several ways: 

 * Commands: `EXPORT` writes all resources to the specified target directory 
 * GUI: Go to _Database_ → _Export_, choose the target directory and press _OK_
 * WebDAV: Locate the database directory (or a sub-directory of it) and copy all contents to another location 
 
## In Memory Database
 * In the standalone context, a main-memory database can be created (using `CREATE DB`), which can then be accessed by subsequent commands. 
 * If a BaseX server instance is started, and if a database is created in its context (using `CREATE DB`), other BaseX client instances can access (and update) this database (using OPEN, db:open, etc.) as long as no other database is opened/created by the server. 

**Note:** main-memory database instances are also created by the invocation of `doc(...)` or `collection(...)`, if the argument is not a database (no matter which value is set for MAINMEM). In other words: the same internal representation is used for main-memory databases and documents/collections generated via XQuery. 

 
## Changelog
** Version 7.2.1 **

 * Updated: `fn:document-uri` and `fn:base-uri` now return strings that can be reused with `fn:doc` or `fn:collection` to reopen the original document. 
