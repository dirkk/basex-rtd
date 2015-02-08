
# Database Module
 


 
This [XQuery Module](Module Library.md) contains functions for processing databases from within XQuery. Existing databases can be opened and listed, its contents can be directly accessed, documents can be added to and removed, etc. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/db` namespace, which is statically bound to the `db` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 


### Database Nodes

Database nodes are XML nodes which are either stored in a persistent database or part of a so-called _database fragment_. All XML fragments can be converted to database fragments by e. g. applying the [transform](XQuery Update.md#transform) expression on an XML fragment: 


    copy $c := element hello { 'world' } modify () return $c

 
## General Functions

### db:system

`db:system() as element(system)`

Returns information on the database system, such as the database path and current database settings. The output is similar to the [INFO](Commands.md#INFO) command. 


### db:info

`db:info($db as xs:string) as element(database)`

Returns meta information on the database `$db`. The output is similar to the [INFO DB](Commands.md#INFO_DB) command. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 

### db:list

`db:list() as xs:string*`
`db:list($db as xs:string) as xs:string*`
`db:list($db as xs:string, $path as xs:string) as xs:string*`

Returns a string sequence with the names of all databases:  * If a database `$db` is specified, all documents and raw files of the specified database are returned. 
 * The list of resources can be further restricted by the `$path` argument. 


**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:list("docs")`  returns the names of all documents from the database named `docs`. 


### db:list-details

`db:list-details() as element(database)*`
`db:list-details($db as xs:string) as element(resource)*`
`db:list-details($db as xs:string, $path as xs:string) as element(resource)*`

 * If no argument is specified, a sequence of elements is returned. A single element contains the name of a database, the number of stored resources, the date of modification, and the database path. 
 * If `$db` is specified, a sequence of elements is returned, comprising information on all resources of the addressed database. An element contains the name of the resource, the content type, the modified date, and the raw flag. 
 * Returned databases resources can be further restricted by the `$path` argument. 


**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:list-details("docs")`  returns the names plus additional data of all documents from the database named `docs`. 


### db:backups

`db:backups() as element(backup)*`
`db:backups($db as xs:string) as element(backup)*`

Returns an element sequence containing all available database backups.If a database `$db` is specified, the sequence will be restricted to the backups matching this database. 

**Examples**

 * `db:backups("factbook")`  returns all backups that have been made from the `factbook` database. 


### db:event

`db:event($name as xs:string, $query as item()) as empty-sequence()`

Executes a `$query` and sends the resulting value to all clients watching the [Event](Events.md) with the specified `$name`. The query may also perform updates; no event will be sent to the client that fired the event. 

**Errors**

`BXDB0010`: the specified event is unknown.`SEPM0016`: serialization errors occurred while sending the value. 
 
## Read Operations

### db:open

`db:open($db as xs:string) as document-node()*`
`db:open($db as xs:string, $path as xs:string) as document-node()*`

Opens the database `$db` and returns all document nodes.The document nodes to be returned can be filtered with the `$path` argument. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:open("docs")`  returns all documents from the database named `docs`. 
 * `db:open("db"`  returns all documents from the database named `db` located in thepath `one`. 
 * `for $i in 1 to 3 return db:open("db" || $i)//item`  returns all item elements from the databases `db1`, `db2` and `db3`. 


### db:open-pre

`db:open-pre($db as xs:string, $pre as xs:integer) as node()`

Opens the database `$db` and returns the node with the specified `$pre` value.The [PRE value](Node Storage.md#PRE_Value) provides very fast access to an existing database node, but it will change whenever a node with a smaller _pre_ values is added to or deleted from a database. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0009`: the specified pre value does not exist in the database. 
**Examples**

 * `db:open-pre("docs", 0)`  returns the first database node from the database named `docs`. 


### db:open-id

`db:open-id($db as xs:string, $id as xs:integer) as node()`

Opens the database `$db` and returns the node with the specified `$id` value.Each database node has a _persistent_[ID value](Node Storage.md#ID_Value). Access to the node id can be sped up by turning on the [UPDINDEX](Options.md#UPDINDEX) option. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0009`: the specified id value does not exist in the database. 

### db:node-pre

`db:node-pre($nodes as node()*) as xs:integer*`

Returns the _pre_ values of the nodes supplied by `$nodes`, which must all be [database nodes](Database Module.md#Database_Nodes).The [PRE value](Node Storage.md#PRE_Value) provides very fast access to an existing database node, but it will change whenever a node with a smaller _pre_ values is added to or deleted from a database. 

**Errors**

`BXDB0001`: `$nodes` contains a node which is not stored in a database. 
**Examples**

 * `db:node-pre(doc("input"))`  returns `0` if the database `input` contains a single document. 


### db:node-id

`db:node-id($nodes as node()*) as xs:integer*`

Returns the _id_ values of the nodes supplied by `$nodes`, which must all be [database nodes](Database Module.md#Database_Nodes).Each database node has a _persistent_[ID value](Node Storage.md#ID_Value). Access to the node id can be sped up by turning on the [UPDINDEX](Options.md#UPDINDEX) option. 

**Errors**

`BXDB0001`: `$nodes` contains a node which is not stored in a database. 

### db:retrieve

`db:retrieve($db as xs:string, $path as xs:string) as xs:base64Binary`

Returns a [binary resource](Binary Data.md) addressed by the database `$db` and `$path` as [streamable](Streaming Module.md)`xs:base64Binary`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0003`: the database is not _persistent_ (stored on disk).`FODC0002`: the addressed resource cannot be retrieved.`FODC0007`: the specified path is invalid. 
**Examples**

 * `declare option output:method 'raw';db:retrieve("DB", "music/01.mp3")`  returns the specified audio file as raw data. 
 * `stream:materialize(db:retrieve("DB", "music/01.mp3"))`  returns a materialized representation of the streamable result. 


### db:export

`db:export($db as xs:string, $path as xs:string) as empty-sequence()`
`db:export($db as xs:string, $path as xs:string, $params as item()) as empty-sequence()`

Exports the specified database `$db` to the specified file `$path`. Existing files will be overwritten. The `$params` argument contains serialization parameters (see [Serialization](Serialization.md) for more details), which can either be specified  * as children of an `<output:serialization-parameters/>` element, as defined for the [fn:serialize()](http://www.w3.org/TR/xpath-functions-30/#func-serialize) function; e.g.: 

    <output:serialization-parameters>
      <output:method value='xml'/>
      <output:cdata-section-elements value="div"/>
      ...
    </output:serialization-parameters>

 * as map, which contains all key/value pairs: 

    map { "method": "xml", "cdata-section-elements": "div", ... }



**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 Export all files as text: 
    db:export("DB", "/home/john/xml/texts", map { 'method': 'text' })

 The following query can be used to export parts of the database: 
 
## Contents

### db:text

`db:text($db as xs:string, $string as item()) as text()*`

Returns all text nodes of the database `$db` that have `$string` as their string value. If available, the value index is used to speed up evaluation. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:text("DB", "QUERY")/..`  returns the parents of all text nodes of the database `DB` that match the string `QUERY`. 


### db:text-range

`db:text-range($db as xs:string, $min as xs:string, $max as xs:string) as text()*`

Returns all text nodes of the database `$db` that are located in between the `$min` and `$max` strings. If available, the value index is used to speed up evaluation. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:text-range("DB", "2000", "2001")`  returns all text nodes of the database `DB` that are found in between `2000` and `2001`. 


### db:attribute

`db:attribute($db as xs:string, $string as item()) as attribute()*`
`db:attribute($db as xs:string, $string as item(), $attname as xs:string) as attribute()*`

Returns all attribute nodes of the database `$db` that have `$string` as string value. If available, the value index is used to speed up evaluation.If `$attname` is specified, the resulting attribute nodes are filtered by their attribute name. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:attribute("DB", "QUERY", "id")/..`  returns the parents of all `id` attribute nodes of the database `DB` that have `QUERY` as string value. 


### db:attribute-range

`db:attribute-range($db as xs:string, $min as xs:string, $max as xs:string) as attribute()*`
`db:attribute-range($db as xs:string, $min as xs:string, $max as xs:string, $attname as xs:string) as attribute()*`

Returns all attributes of the database `$db`, the string values of which are larger than or equal to `$min` and smaller than or equal to `$max`. If available, the value index is used to speed up evaluation. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:attribute-range("DB", "id456", "id473", 'id')`  returns all `@id` attributes of the database `DB` that have a string value in between `id456` and `id473`. 

 
## Updates

**Important note:** All functions in this section are _updating functions_: they will not be immediately executed, but queued on the [Pending Update List](XQuery Update.md#Pending_Update_List), which will be processed after the actual query has been evaluated. This means that the order in which the functions are specified in the query does usually not reflect the order in which the code will be evaluated. 


### db:create

Updated with Version 7.9: Support for parsing and XML parsing options added. 


`db:create($db as xs:string) as empty-sequence()`
`db:create($db as xs:string, $inputs as item()*) as empty-sequence()`
`db:create($db as xs:string, $inputs as item()*, $paths as xs:string*) as empty-sequence()`
`db:create($db as xs:string, $inputs as item()*, $paths as xs:string*, $options as item()) as empty-sequence()`

Creates a new database with name `$db` and adds initial documents specified via `$inputs` to the specified `$paths`. An existing database will be overwritten.`$inputs` may be strings or nodes different than attributes. If the `$input` source is not a file or a folder, the `$paths` argument is mandatory.Please note that `db:create` will be placed last on the [Pending Update List](XQuery Update.md#Pending_Update_List). As a consequence, a newly created database cannot be addressed in the same query.The `$options` argument can be used to change the indexing behavior. Allowed options are all [parsing](Options.md#OptionsParsing), [XML parsing](Options.md#XML_Parsing), [indexing](Options.md#Indexing) and [full-text](Options.md#OptionsFull-Text) options in lower case. Options can be specified either...  * as children of an `<options/>` element, e.g. 

    <options>
      <textindex value='true'/>
      <maxcats value='128'/>
    </options>

 * or as map, which contains all key/value pairs: 

    map { "textindex": true(), "maxcats": 128 }



**Errors**

`FODC0002`: `$inputs` points to an unknown resource.`FOUP0001`: `$inputs` is neither string nor a document node.`BXDB0007`: `$db` is opened by another process.`BXDB0011`: `$db` is not a [valid database name](Commands.md#Valid_Names).`BXDB0012`: two `db:create` statements with the same database name were specified.`BXDB0013`: the number of specified inputs and paths differs. 
**Examples**

 * `db:create("DB")`  creates the empty database `DB`. 
 * `db:create("DB", "/home/dir/doc.xml")`  creates the database `DB` and adds the document `/home/dir/doc.xml` as initial content. 
 * `db:create("DB", <a/>, "doc.xml")`  creates the database `DB` and adds the document with content `<a/>` under the name `doc.xml`. 
 * `db:create("DB", "/home/dir/", "docs/dir")`  creates the database `DB` and adds the documents in `/home/dir` to the database under the path `docs/dir`. 
 * `db:create("DB", file:list('.'), map { 'ftindex': true() })`  adds all files of the current working directory to a new database and creates a full-text index. 


### db:drop

`db:drop($db as xs:string) as empty-sequence()`

Drops the database `$db` and all connected resources. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0007`: `$db` is opened by another process. 
**Examples**

 * `db:drop("DB")`  drops the database `DB`. 


### db:add

Updated with Version 7.9: Support for parsing and XML parsing options added. 


`db:add($db as xs:string, $input as item()) as empty-sequence()`
`db:add($db as xs:string, $input as item(), $path as xs:string) as empty-sequence()`
`db:add($db as xs:string, $input as item(), $path as xs:string, $options as item()) as empty-sequence()`

Adds documents specified by `$input` to the database `$db` and the specified `$path`. A document with the same path may occur more than once in a database. If this is unwanted, [db:replace](Database Module.md#db-replace) can be used.`$input` may be a string or a node different than attribute. If the `$input` source is not a file or a folder, `$path` must be specified.The `$options` argument can be used to control parsing. The syntax is identical to the [db:create](Database Module.md#db-create) function. Allowed options are all [parsing](Options.md#OptionsParsing) and [XML parsing](Options.md#XML_Parsing) options. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`FODC0002`: `$input` points to an unknown resource.`FOUP0001`: `$input` is neither string nor a document node. 
**Examples**

 * `db:add("DB", "/home/dir/doc.xml")`  adds the file `/home/dir/doc.xml` to the database `DB`. 
 * `db:add("DB", <a/>, "doc.xml")`  adds a document node to the database `DB` under the name `doc.xml`. 
 * `db:add("DB", "/home/dir", "docs/dir")`  adds all documents in `/home/dir` to the database `DB` under the path `docs/dir`. 


### db:delete

`db:delete($db as xs:string, $path as xs:string) as empty-sequence()`

Deletes document(s), specified by `$path`, from the database `$db`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:delete("DB", "docs/dir/doc.xml")`  deletes the document `docs/dir/doc.xml` in the database `DB`. 
 * `db:delete("DB", "docs/dir")`  deletes all documents with paths beginning with `docs/dir` in the database `DB`. 


### db:copy

`db:copy($db as xs:string, $newname as xs:string) as empty-sequence()`

Creates a copy of the database specified by `$db` to `$newname`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0011`: Invalid database name.`BXDB0016`: Name of source and target database is equal. 

### db:alter

`db:alter($db as xs:string, $newname as xs:string) as empty-sequence()`

Renames the database specified by `$db` to `$newname`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0011`: Invalid database name.`BXDB0016`: Name of source and target database is equal. 

### db:create-backup

`db:create-backup($db as xs:string) as empty-sequence()`

Creates a backup of the database `$db`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0011`: Invalid database name. 
**Examples**

 * `db:create-backup("DB")`  creates a backup of the database `DB`. 


### db:drop-backup

`db:drop-backup($name as xs:string) as empty-sequence()`

Drops all backups of the database with the specified `$name`. If the given `$name` points to a specific backup file, only this specific backup file is deleted. 

**Errors**

`BXDB0002`: No backup file found.`BXDB0011`: Invalid database name. 
**Examples**

 * `db:drop-backup("DB")`  drops all backups of the database `DB`. 
 * `db:drop-backup("DB-2014-03-13-17-36-44")`  drops the specific backup file `DB-2014-03-13-17-36-44.zip` of the database `DB`. 


### db:restore

`db:restore($name as xs:string) as empty-sequence()`

Restores the database with the specified `$name`. The `$name` may include the timestamp of the backup file. 

**Errors**

`BXDB0011`: Invalid database name.`BXDB0015`: No backup found. 
**Examples**

 * `db:restore("DB")`  restores the database `DB`. 
 * `db:restore("DB-2014-03-13-18-05-45")`  restores the database `DB` from the backup file with the given timestamp. 


### db:optimize

Updated with Version 7.9: Allow [UPDINDEX](Options.md#UPDINDEX) if `$all` is `true`. 


`db:optimize($db as xs:string) as empty-sequence()`
`db:optimize($db as xs:string, $all as xs:boolean) as empty-sequence()`
`db:optimize($db as xs:string, $all as xs:boolean, $options as item()) as empty-sequence()`

Optimizes the meta data and indexes of the database `$db`.If `$all` is `true`, the complete database will be rebuilt.The `$options` argument can be used to control indexing. The syntax is identical to the [db:create](Database Module.md#db-create) function: Allowed options are all [indexing](Options.md#Indexing) and [full-text](Options.md#OptionsFull-Text) options. [UPDINDEX](Options.md#UPDINDEX) is only allowed if `$all` is `true`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`FOUP0002`: an error occurred while optimizing the database. 
**Examples**

 * `db:optimize("DB")`  optimizes the database structures of the database `DB`. 
 * `db:optimize("DB", true(), map { 'ftindex': true() })`  optimizes all database structures of the database `DB` and creates a full-text index. 


### db:rename

`db:rename($db as xs:string, $path as xs:string, $newpath as xs:string) as empty-sequence()`

Renames document(s), specified by `$path` to `$newpath` in the database `$db`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0008`: new document names would be empty. 
**Examples**

 * `db:rename("DB", "docs/dir/doc.xml", "docs/dir/newdoc.xml")`  renames the document `docs/dir/doc.xml` to `docs/dir/newdoc.xml` in the database `DB`. 
 * `db:rename("DB", "docs/dir", "docs/newdir")`  renames all documents with paths beginning with `docs/dir` to paths beginning with `docs/newdir` in the database `DB`. 


### db:replace

`db:replace($db as xs:string, $path as xs:string, $input as item()) as empty-sequence()`
`db:replace($db as xs:string, $path as xs:string, $input as item(), $options as item()) as empty-sequence()`

Replaces a document, specified by `$path`, in the database `$db` with the content of `$input`, or adds it as a new document.The `$options` argument can be used to control parsing. The syntax is identical to the [db:create](Database Module.md#db-create) function: Allowed options are all [parsing](Options.md#OptionsParsing) and [XML parsing](Options.md#XML_Parsing) options. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0014`: `$path` points to a directory.`FODC0002`: `$input` is a string representing a path, which cannot be read.`FOUP0001`: `$input` is neither a string nor a document node. 
**Examples**

 * `db:replace("DB", "docs/dir/doc.xml", "/home/dir/doc.xml")`  replaces the content of the document `docs/dir/doc.xml` in the database `DB` with the content of the file `/home/dir/doc.xml`. 
 * `db:replace("DB", "docs/dir/doc.xml", "<a/>")`  replaces the content of the document `docs/dir/doc.xml` in the database `DB` with `<a/>`. 
 * `db:replace("DB", "docs/dir/doc.xml", document { <a/> })`  replaces the content of the document `docs/dir/doc.xml` in the database `DB` with the specified document node. 

 The following query can be used to import files from a directory to a database: 

### db:store

`db:store($db as xs:string, $path as xs:string, $input as item()) as empty-sequence()`

Stores a binary resource specified by `$input` in the database `$db` and the location specified by `$path`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0003`: the database is not _persistent_ (stored on disk).`FODC0007`: the specified path is invalid.`FOUP0002`: the resource cannot be stored at the specified location. 
**Examples**

 * `db:store("DB", "video/sample.mov", file:read-binary('video.mov'))`  stores the addressed video file at the specified location. 


### db:output

`db:output($result as item()*) as empty-sequence()`

This function can be used to both perform updates and return results in a single query. The argument of the function will be evaluated, and the resulting items will be cached and returned after the updates on the _pending update list_ have been processed. As nodes may be updated, they will be copied before being cached.The function can only be used together with [updating expressions](XQuery Update.md#Updating_Expressions); if the function is called within a transform expression, its results will be discarded. 

**Examples**

 * `db:output("Prices have been deleted."), delete node //price`  deletes all `price` elements in a database and returns an info message. 


### db:flush

`db:flush($db as xs:string) as empty-sequence()`

Explicitly flushes the buffers of the database `$db`. This command is only useful if [AUTOFLUSH](Options.md#AUTOFLUSH) has been set to `false`. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
 
## Helper Functions

### db:name

`db:name($node as node()) as xs:string`

Returns the name of the database in which the specified [database node](Database Module.md#Database_Nodes)`$node` is stored. 

**Errors**

`BXDB0001`: `$nodes` contains a node which is not stored in a database. 

### db:path

`db:path($node as node()) as xs:string`

Returns the path of the database document in which the specified [database node](Database Module.md#Database_Nodes)`$node` is stored. 

**Errors**

`BXDB0001`: `$nodes` contains a node which is not stored in a database. 

### db:exists

`db:exists($db as xs:string) as xs:boolean`
`db:exists($db as xs:string, $path as xs:string) as xs:boolean`

Checks if the database `$db` or the resource specified by `$path` exists. `false` is returned if a database directory has been addressed. 

**Examples**

 * `db:exists("DB")`  returns `true` if the database `DB` exists. 
 * `db:exists("DB", "resource")`  returns `true` if `resource` is an XML document or a raw file. 


### db:is-raw

`db:is-raw($db as xs:string, $path as xs:string) as xs:boolean`

Checks if the specified resource in the database `$db` and the path `$path` exists, and if it is a [binary resource](Binary Data.md). 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:is-raw("DB", "music/01.mp3")`  returns `true`. 


### db:is-xml

`db:is-xml($db as xs:string, $path as xs:string) as xs:boolean`

Checks if the specified resource in the database `$db` and the path `$path` exists, and if it is an XML document. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened. 
**Examples**

 * `db:is-xml("DB", "dir/doc.xml")`  returns `true`. 


### db:content-type

`db:content-type($db as xs:string, $path as xs:string) as xs:string`

Retrieves the content type of a resource in the database `$db` and the path `$path`.The file extension is used to recognize the content-type of a resource stored in the database. Content-type `application/xml` will be returned for any XML document stored in the database, regardless of its file name extension. 

**Errors**

`BXDB0002`: The addressed database does not exist or could not be opened.`FODC0002`: the addressed resource is not found or cannot be retrieved. 
**Examples**

 * `db:content-type("DB", "docs/doc01.pdf")`  returns `application/pdf`. 
 * `db:content-type("DB", "docs/doc01.xml")`  returns `application/xml`. 
 * `db:content-type("DB", "docs/doc01")`  returns `application/xml`, if `db:is-xml("DB", "docs/doc01")` returns `true`. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXDB0001` | The referenced XML node is no [database node](Database Module.md#Database_Nodes), i.e. it is neither stored in a database nor represented as database fragment. 
`BXDB0002` | The addressed database does not exist or could not be opened. 
`BXDB0003` | The addressed database is not _persistent_ (stored on disk). 
`BXDB0004` | The database lacks an index structure required by the called function. 
`BXDB0005` | A query is expected to exclusively return [database nodes](Database Module.md#Database_Nodes) of a single database. 
`BXDB0006` | A database path addressed with `doc()` contains more than one document. 
`BXDB0007` | A database cannot be updated because it is opened by another process. 
`BXDB0008` | Database paths cannot be renamed to empty strings. 
`BXDB0009` | The addressed database id or pre value is out of range. 
`BXDB0010` | The specified event is unknown. 
`BXDB0011` | The name of the specified database is invalid. 
`BXDB0012` | A database can only be created once. 
`BXDB0013` | The number of specified inputs and paths differs. 
`BXDB0014` | Path points to a directory. 
 
## Changelog
UNKNOWN * Updated: parsing options added to [db:create](Database Module.md#db-create), [db:add](Database Module.md#db-add) and [db:replace](Database Module.md#db-replace). 
 * Updated: allow [UPDINDEX](Options.md#UPDINDEX) if `$all` is `true`. 
UNKNOWN * Added: [db:alter](Database Module.md#db-alter), [db:copy](Database Module.md#db-copy), [db:create-backup](Database Module.md#db-create-backup), [db:drop-backup](Database Module.md#db-drop-backup), [db:restore](Database Module.md#db-restore)
UNKNOWN * Removed: db:fulltext (use [ft:search](Full-Text Module.md#ft-search) instead) 
UNKNOWN * Added: [db:export](Database Module.md#db-export), [db:name](Database Module.md#db-name), [db:path](Database Module.md#db-path)
 * Updated: `$options` argument added to [db:create](Database Module.md#db-create) and [db:optimize](Database Module.md#db-optimize). 
 * Updated: the functions no longer accept [Database Nodes](Database Module.md#Database_Nodes) as reference. Instead, the name of a database must now be specified. 
UNKNOWN * Updated: [db:create](Database Module.md#db-create): allow more than one input and path. 
UNKNOWN * Updated: [db:add](Database Module.md#db-add): input nodes will be automatically converted to document nodes 
 * Added: [db:backups](Database Module.md#db-backups)
 * Added: [db:create](Database Module.md#db-create)
 * Added: [db:drop](Database Module.md#db-drop)
UNKNOWN * Added: [db:flush](Database Module.md#db-flush)
UNKNOWN * Added: [db:text-range](Database Module.md#db-text-range), [db:attribute-range](Database Module.md#db-attribute-range), [db:output](Database Module.md#db-output)
UNKNOWN * Added: [db:list-details](Database Module.md#db-list-details), [db:content-type](Database Module.md#db-content-type)
 * Updated: [db:info](Database Module.md#db-info), [db:system](Database Module.md#db-system), [db:retrieve](Database Module.md#db-retrieve)
UNKNOWN * Added: [db:retrieve](Database Module.md#db-retrieve), [db:store](Database Module.md#db-store), [db:exists](Database Module.md#db-exists), [db:is-raw](Database Module.md#db-is-raw), [db:is-xml](Database Module.md#db-is-xml)
 * Updated: [db:list](Database Module.md#db-list), [db:open](Database Module.md#db-open), [db:add](Database Module.md#db-add)
