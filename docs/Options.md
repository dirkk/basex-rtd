 


 
This page is linked from the [Getting Started](Getting Started.md) Section. 

 
The options listed on this page influence the way how database [commands](Commands.md) are executed and XQuery expressions are evaluated. Options are divided into [global options](Options.md#Global_Options), which are valid for all BaseX instances, and **local options**, which are specific to a client or session. Values of options are either _strings_, _numbers_ or _booleans_. 

 
The `.basex`[configuration file](Configuration.md#Configuration_Files) is parsed by every new local BaseX instance. It contains all global options and, optionally, local options at the end of the file. 

 
Various ways exist to access and change options: 

  * The current value of an option can be requested with the [GET](Commands.md#GET) and changed with the [SET](Commands.md#SET) command. All values are _static_: they stay valid until they are changed once again by another operation. If an option is of type _boolean_, and if no value is specified, its existing value will be inverted. 
  * Initial values for options can also be specified via system properties, which can e.g. be passed on with the [-D flag](http://docs.oracle.com/javase/1.4.2/docs/tooldocs/windows/java.html#options) on command line, or using [System.setProperty()](http://docs.oracle.com/javase/6/docs/api/java/lang/System.html#setProperty(java.lang.String,%20java.lang.String)) before creating a BaseX instance. The specified keys needs to be prefixed with `org.basex.`. An example: 
 
    java -Dorg.basex.CHOP=false -cp basex.jar org.basex.BaseX -c"get chop"
    CHOP: false

  * Options can also be set in the prolog of an XQuery expression. In the option declaration, options need to be bound to the [Database Module](Database Module.md) namespace. All values will be reset after the evaluation of a query: 
 
    declare option db:chop 'false';
    ...

  * Options can also be applied locally by using pragmas: 
 
    (# db:chop false #) { parse-xml('<xml> hi </xml>') }

 
If options are implicitly changed by operations in the [GUI](http://docs.basex.org/wiki/Graphical User Interface), the underlying commands will be listed in the [Info View](http://docs.basex.org/wiki/Graphical User InterfaceVisualizations). 

 
# Global Options

Global options are constants. They can only be set in the configuration file or via system properties (see above). One exception is the [DEBUG](.md) option, which can also be changed at runtime by users with [admin permissions](User Management.md). 


## General

### DEBUG

**Signature** | `DEBUG [boolean]`
------------- | -----------------
**Default** | `false`
**Summary** | Sends internal debug info to STDERR. This option can be turned on to get additional information for development and debugging purposes. It can also be triggered on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-d`. 

### DBPATH

**Signature** | `DBPATH [path]`
------------- | ---------------
**Default** | `{home}/BaseXData` or `{home}/data`
**Summary** | Points to the directory in which all databases are located. 

### REPOPATH

**Signature** | `REPOPATH [path]`
------------- | -----------------
**Default** | `{home}/BaseXRepo`
**Summary** | Points to the [Repository](Repository.md), in which all XQuery modules are located. 

### LANG

**Signature** | `LANG [language]`
------------- | -----------------
**Default** | `English`
**Summary** | Specifies the interface language. Currently, seven languages are available: 'English', 'German', 'French', 'Dutch', 'Italian', 'Japanese', and 'Vietnamese'. 

### LANGKEY

**Signature** | `LANGKEY [boolean]`
------------- | -------------------
**Default** | `false`
**Summary** | Prefixes all texts with the internal language keys. This option is helpful if BaseX is translated into another language, and if you want to see where particular texts are displayed. 

### GLOBALLOCK

**Signature** | `GLOBALLOCK [boolean]`
------------- | ----------------------
**Default** | `false`
**Summary** | Controls if local (database) or global (process) locking will be used for managing read and write operations. The article on [Transaction Management](Transaction Management.md) provides more details on concurrency control. 

## Client/Server Architecture

### HOST

**Signature** | `HOST [host]`
------------- | -------------
**Default** | `localhost`
**Summary** | This host name is used by the client when connecting to a server. This option can also be changed when running the client on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Client) via `-n`. 

### PORT

**Signature** | `PORT [port]`
------------- | -------------
**Default** | `1984`
**Summary** | This port is used by the client when connecting to a server. This option can also be changed when running the client on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Client) via `-p`. 

### SERVERPORT

**Signature** | `SERVERPORT [port]`
------------- | -------------------
**Default** | `1984`
**Summary** | This is the port the database server will be listening to. This option can also be changed when running the server on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Server) via `-p`. 

### EVENTPORT

**Signature** | `EVENTPORT [port]`
------------- | ------------------
**Default** | `1985`
**Summary** | This port is used by the client to listen for [server events](Events.md). It will only be bound if a client attaches itself to a database event. This option can also be changed when running the server on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Server) via `-e`. 

### USER

**Signature** | `USER [name]`
------------- | -------------
**Default** | _empty_
**Summary** | Represents a user name, which is used for accessing the server or an HTTP service:  * The default value will be overwritten if a client specifies its own credentials. 
 * If the default value is empty, login will only be possible if the client specifies credentials. 
 * The option can also be changed on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Client) via `-U`. 


### PASSWORD

**Signature** | `PASSWORD [password]`
------------- | ---------------------
**Default** | _empty_
**Summary** | Represents a password, which is used for accessing the server or an HTTP service:  * The default value will be overwritten if a client specifies its own credentials. 
 * If the default value is empty, login will only be possible if the client specifies credentials. 
 * The option can also be changed on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Client) via `-P`. 
 * Please note that it is a security risk to specify your password in plain text. 


### AUTHMETHOD

Introduced with Version 8.0: 


**Signature** | `AUTHMETHOD [method]`
------------- | ---------------------
**Default** | _Basic_
**Summary** | Specifies the HTTP Authentication, which will be proposed by the [HTTP server](Web Application.md) if a client sends an unauthorized request. Allowed values are `Basic` and `Digest`. 

### SERVERHOST

**Signature** | `SERVERHOST [host|ip]`
------------- | ----------------------
**Default** | _empty_
**Summary** | This is the host name or ip address the server is bound to. If the option is set to an empty string (which is the default), the server will be open to all clients. 

### PROXYHOST

Updated with Version 8.0: empty string will be ignored. 


**Signature** | `PROXYHOST [host]`
------------- | ------------------
**Default** | _empty_
**Summary** | This is the host name of a proxy server. If the value is an empty string, it will be ignored. 

### PROXYPORT

Updated with Version 8.0: default set to 0; will be ignored. 


**Signature** | `PROXYPORT [port]`
------------- | ------------------
**Default** | `0`
**Summary** | This is the port number of a proxy server. If the value is set to `0`, it will be ignored. 

### NONPROXYHOSTS

Updated with Version 8.0: empty string will be ignored. 


**Signature** | `NONPROXYHOSTS [hosts]`
------------- | -----------------------
**Default** | _empty_
**Summary** | This is a list of hosts that should be directly accessed. If the value is an empty string, it will be ignored. 

### TIMEOUT

**Signature** | `TIMEOUT [seconds]`
------------- | -------------------
**Default** | `30`
**Summary** | Specifies the maximum time a read-only transaction may take. If an operation takes longer than the specified timeout, it will be aborted. Write operations will not be affected by this timeout, as this would corrupt the integrity of the database. The timeout is deactivated if the timeout is set to `0`. It is ignored for `ADMIN` operations. 

### KEEPALIVE

**Signature** | `KEEPALIVE [seconds]`
------------- | ---------------------
**Default** | `600`
**Summary** | Specifies the maximum time a client will be remembered by the server. If there has been no interaction with a client for a longer time than specified by this timeout, it will be disconnected. Running operations will not be affected by this option. The keepalive check is deactivated if the value is set to `0`. 

### PARALLEL

**Signature** | `PARALLEL [number]`
------------- | -------------------
**Default** | `8`
**Summary** | Denotes the maximum allowed `number` of parallel [transactions](Transaction Management.md).Note that a higher number of parallel operations may increase disk activity and thus slow down queries. In some cases, a single transaction may even give you better results than any parallel activity. 

### LOG

**Signature** | `LOG [boolean]`
------------- | ---------------
**Default** | `true`
**Summary** | Turns [Logging](Logging.md) of server operations and HTTP requests on/off. This option can also be changed when running the server on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Server) via `-z`. 

### LOGMSGMAXLEN

**Signature** | `LOGMSGMAXLEN [length]`
------------- | -----------------------
**Default** | `1000`
**Summary** | Specifies the maximum length of a single [log message](Logging.md). 

## HTTP Options

If BaseX is run as [Web Application](Web Application.md), the HTTP options are either determined by the web server, or specified in the `webapp/WEB-INF` directory and the `jetty.xml` and `web.xml` configuration files. 


### WEBPATH

**Signature** | `WEBPATH [path]`
------------- | ----------------
**Default** | `{home}/BaseXWeb` or `{home}/webapp`
**Summary** | Points to the directory in which all the [Web Application](Web Application.md) contents are stored, including XQuery, Script, [RESTXQ](RESTXQ.md) and configuration files. 

### RESTXQPATH

**Signature** | `RESTXQPATH [path]`
------------- | -------------------
**Default** | _empty_
**Summary** | Points to the directory which contains the [RESTXQ](RESTXQ.md) modules of a web application. Relative paths will be resolved against the [WEBPATH](Options.md#WEBPATH) directory. 

### HTTPLOCAL

**Signature** | `HTTPLOCAL [boolean]`
------------- | ---------------------
**Default** | `false`
**Summary** | By default, a database server instance will be opened along with the web server. If the flag is set to `true`, all commands will be executed in an embedded database context.If BaseX is run as [Web Application](Web Application.md), and if the flag is `false`, the server will be started as soon as the first HTTP service is called. 

### STOPPORT

**Signature** | `STOPPORT [port]`
------------- | -----------------
**Default** | `8985`
**Summary** | This is the port on which the [HTTP Server](Startup.md#StartupBaseX_HTTP_Server) can be locally closed:  * The listener for stopping the web server will only be started if the specified value is greater than `0`. 
 * The option is ignored if BaseX is used as a [Web Application](Web Application.md) or started via [Maven](Web Application.md#Web_ApplicationMaven). 
 * This option can also be changed when running the HTTP server on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Server) via `-s`. 

 
# Create Options

## General

### MAINMEM

**Signature** | `MAINMEM [boolean]`
------------- | -------------------
**Default** | `false`
**Summary** | If this option is turned on, new databases will be exclusively created in main memory. Most queries will be evaluated faster in main memory mode, but all data is lost if BaseX is shut down. The value of this option will be assigned once to a new database, and cannot be changed after that. 

### ADDCACHE

**Signature** | `ADDCACHE [boolean]`
------------- | --------------------
**Default** | `false`
**Summary** | If this option is activated, data structures of documents will first be cached to disk before being added to the final database. This option is helpful when larger documents need to be added, and if the existing heuristics cannot estimate the input size (e.g. when adding directories or sending input streams). 

## Parsing

### CREATEFILTER

**Signature** | `CREATEFILTER [filter]`
------------- | -----------------------
**Default** | `*.xml`
**Summary** | File filter in the [Glob Syntax](Commands.md#Glob_Syntax), which is applied whenever new databases are created, or resources are added to a database. 

### ADDARCHIVES

**Signature** | `ADDARCHIVES [boolean]`
------------- | -----------------------
**Default** | `true`
**Summary** | If this option is set to `true`, files within archives (ZIP, GZIP, TAR, TGZ, DOCX, etc.) are parsed whenever new databases are created or resources are added to a database. 

### SKIPCORRUPT

**Signature** | `SKIPCORRUPT [boolean]`
------------- | -----------------------
**Default** | `false`
**Summary** | Skips corrupt (i.e., not well-formed) files while creating a database or adding new documents. If this option is activated, document updates are slowed down, as all files will be parsed twice. Next, main memory consumption will be higher as parsed files will be cached in main memory. 

### ADDRAW

**Signature** | `ADDRAW [boolean]`
------------- | ------------------
**Default** | `false`
**Summary** | If this option is activated, and if new resources are added to a database, all files that are not filtered by the [CREATEFILTER](Options.md#CREATEFILTER) option will be added as _raw_ files (i.e., in their binary representation). 

### PARSER

**Signature** | `PARSER [type]`
------------- | ---------------
**Default** | `XML`
**Summary** | Defines a [parser](Parsers.md) for importing new files to the database. Currently, 'XML', 'JSON', 'CSV', 'TEXT', 'HTML' are available as parsers. HTML will be parsed as normal XML files if [Tagsoup](http://home.ccil.org/~cowan/XML/tagsoup/) is not found in the classpath. 

### CSVPARSER

**Signature** | `CSVPARSER [options]`
------------- | ---------------------
**Default** | _empty_
**Summary** | Specifies the way how CSV data is to be parsed. The available options are listed in the [CSV Module](CSV Module.md#CSV_ModuleOptions). 

### JSONPARSER

**Signature** | `JSONPARSER [options]`
------------- | ----------------------
**Default** | _empty_
**Summary** | Specifies the way how JSON data is to be parsed. The available options are listed in the [JSON Module](JSON Module.md#JSON_ModuleOptions). 

### TEXTPARSER

**Signature** | `TEXTPARSER [options]`
------------- | ----------------------
**Default** | _empty_
**Summary** | Specifies the way how TEXT data is to be parsed. Available options are listed in the article on [Parsers](Parsers.md). 

## XML Parsing

### CHOP

**Signature** | `CHOP [boolean]`
------------- | ----------------
**Default** | `true`
**Summary** | Many XML documents include whitespaces that have been added to improve readability. The `CHOP` option controls the [white-space processing mode](http://www.w3.org/TR/REC-xml/#sec-white-space) of the XML parser:  * By default, this option is set to `true`. This way, leading and trailing whitespaces from text nodes will be chopped and all empty text nodes will be discarded. 
 * The flag should be turned off if a document contains [mixed content](Full-Text.md#Mixed_Content). 
 * The flag can also be turned off on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-w`. 
 * If the `xml:space="preserve"` attribute is attached to an element, chopping will be turned off for all descendant text nodes. In the following example document, the whitespaces in the text nodes of the `text` element will not be chopped: 

    <xml>
      <title>
        Demonstrating the CHOP flag
      </title>
      <text xml:space="preserve">To <b>be</b>, or not to <b>be</b>, that is the question.</text>
    </xml>



### STRIPNS

**Signature** | `STRIPNS [boolean]`
------------- | -------------------
**Default** | `false`
**Summary** | Strips all namespaces from an XML document and all elements while parsing. 

### INTPARSE

**Signature** | `INTPARSE [boolean]`
------------- | --------------------
**Default** | `false`
**Summary** | Uses the internal XML parser instead of the standard Java XML parser. The internal parser is faster, more fault tolerant and supports common HTML entities out-of-the-box, but it does not support all features needed for parsing DTDs. 

### DTD

**Signature** | `DTD [boolean]`
------------- | ---------------
**Default** | `false`
**Summary** | Parses referenced DTDs and resolves XML entities. By default, this option is switched to `false`, as many DTDs are located externally, which may completely block the process of creating new databases. The [CATFILE](Options.md#CATFILE) option can be changed to locally resolve DTDs. 

### XINCLUDE

Added with Version 8.0: 


**Signature** | `XINCLUDE [boolean]`
------------- | --------------------
**Default** | `true`
**Summary** | Resolves XInclude inclusion tags and merges referenced XML documents. By default, this option is switched to `true`. This option is only available if the standard Java XML Parser is used (see [INTPARSE](Options.md#INTPARSE)). 

### CATFILE

**Signature** | `CATFILE [path]`
------------- | ----------------
**Default** | _empty_
**Summary** | Specifies a catalog file to locally resolve DTDs; see the entry on [Catalog Resolvers](Catalog Resolver.md) for more details. 

## Indexing

The current index and full-text index options will be stored in a new database, and take effect if indexes are rebuilt via the [OPTIMIZE](Commands.md#OPTIMIZE). 


### TEXTINDEX

**Signature** | `TEXTINDEX [boolean]`
------------- | ---------------------
**Default** | `true`
**Summary** | Creates a text index whenever a new database is created. A text index speeds up queries with equality comparisons on text nodes; see [Indexes](Indexes.md) for more details. 

### ATTRINDEX

**Signature** | `ATTRINDEX [boolean]`
------------- | ---------------------
**Default** | `true`
**Summary** | Creates an attribute index whenever a new database is created. An attribute index speeds up queries with equality comparisons on attribute values; see [Indexes](Indexes.md) for more details. 

### FTINDEX

**Signature** | `FTINDEX [boolean]`
------------- | -------------------
**Default** | `false`
**Summary** | Creates a full-text index whenever a new database is created. A full-text index speeds up queries with full-text expressions; see [Indexes](Indexes.md) for more details. 

### MAXLEN

**Signature** | `MAXLEN [int]`
------------- | --------------
**Default** | `96`
**Summary** | Specifies the maximum length of strings that are to be indexed by the name, path, value, and full-text index structures. The value of this option will be assigned once to a new database, and cannot be changed after that. 

### MAXCATS

**Signature** | `MAXCATS [int]`
------------- | ---------------
**Default** | `100`
**Summary** | Specifies the maximum number of distinct values (categories) that will be stored together with the element/attribute names or unique paths in the [Name Index](http://docs.basex.org/wiki/IndexesName_Index) or [Path Index](http://docs.basex.org/wiki/IndexesPath_Index). The value of this option will be assigned once to a new database, and cannot be changed after that. 

### UPDINDEX

**Signature** | `UPDINDEX [boolean]`
------------- | --------------------
**Default** | `false`
**Summary** | If turned on, incremental indexing will be applied to new databases:  * With each update, the text and attributes indexes will be refreshed as well. 
 * The advantage is that the value index structures will always be up-to-date. 
 * However, updates will usually take longer (the article on [Index Structures](http://docs.basex.org/wiki/IndexesUpdates) provides more details). 
 * The value of this option will be assigned once to a new database. It can be reassigned by running [OPTIMIZE ALL](Commands.md#OPTIMIZE) or [db:optimize($db, true())](Database Module.md#db-optimize). 


### AUTOOPTIMIZE

Introduced with Version 8.0: 


**Signature** | `AUTOOPTIMIZE [boolean]`
------------- | ------------------------
**Default** | `false`
**Summary** | If turned on, auto optimization will be applied to new databases:  * With each update, outdated indexes and database statistics will be recreated. 
 * As a result, the index structures will always be up-to-date. 
 * However, updates can take much longer, so this option should only be activated for medium-sized databases. 
 * The value of this option will be assigned once to a new database. It can be reassigned by running [OPTIMIZE](Commands.md#OPTIMIZE) or [db:optimize](Database Module.md#db-optimize). 


### INDEXSPLITSIZE

**Signature** | `INDEXSPLITSIZE [num]`
------------- | ----------------------
**Default** | `0`
**Summary** | This option affects the [construction](Indexes.md#Index_Construction) of new text and attribute indexes. It specifies the number of index build operations that are performed before writing partial index data to disk. By default, if the value is set to 0, some dynamic split heuristics are applied. By setting the value to its maximum (2147483647), the index will never be split. 

### FTINDEXSPLITSIZE

**Signature** | `FTINDEXSPLITSIZE [num]`
------------- | ------------------------
**Default** | `0`
**Summary** | This option affects the [construction](Indexes.md#Index_Construction) of new full-text indexes. It specifies the number of index build operations that are performed before writing partial index data to disk. By default, if the value is set to 0, some dynamic split heuristics are applied. By setting the value to its maximum (2147483647), the index will never be split. 

## Full-Text

### STEMMING

**Signature** | `STEMMING [boolean]`
------------- | --------------------
**Default** | `false`
**Summary** | If `true`, all tokens will be stemmed during full-text indexing, using a language-specific stemmer implementation. By default, token will not be stemmed. 

### CASESENS

**Signature** | `CASESENS [boolean]`
------------- | --------------------
**Default** | `false`
**Summary** | If `true`, the case of tokens will be preserved during full-text indexing. By default, case will be ignored (all tokens will be indexed in lower case). 

### DIACRITICS

**Signature** | `DIACRITICS [boolean]`
------------- | ----------------------
**Default** | `false`
**Summary** | If set to `true`, diacritics will be preserved during full-text indexing. By default, diacritics will be removed. 

### LANGUAGE

**Signature** | `LANGUAGE [lang]`
------------- | -----------------
**Default** | `en`
**Summary** | The specified language will influence the way how an input text will be tokenized. This option is mainly important if tokens are to be stemmed, or if the tokenization of a language differs from Western languages. 

### STOPWORDS

**Signature** | `STOPWORDS [path]`
------------- | ------------------
**Default** | _empty_
**Summary** | A new full-text index will drop tokens that are listed in the specified stopword list. A stopword list may decrease the size of the full text index. A standard stopword list for English texts is provided in the directory `etc/stopwords.txt` in the official releases or available online at [http://files.basex.org/etc/stopwords.txt](http://files.basex.org/etc/stopwords.txt). 
 
# Query Options

## QUERYINFO

**Signature** | `QUERYINFO [boolean]`
------------- | ---------------------
**Default** | `false`
**Summary** | Prints more information on internal query rewritings, optimizations, and performance. By default, this info is shown in the [Info View](http://docs.basex.org/wiki/Graphical User InterfaceVisualizations) in the GUI. It can also be activated on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-V`. 

## XQUERY3

**Signature** | `XQUERY3`
------------- | ---------
**Default** | `true`
**Summary** | Enables all [XQuery 3.0](XQuery 3.0.md) features supported by BaseX. If this option is set to `false`, the XQuery parser will only accept expressions of the XQuery 1.0 specification. 

## MIXUPDATES

Added with Version 8.0:


**Signature** | `MIXUPDATES`
------------- | ------------
**Default** | `false`
**Summary** | Allows queries to both contain updating and non-updating expressions. All updating constraints will be turned off, and nodes to be returned will be copied before they are modified by an updating expression. – By default, this option is set to `false`, because the XQuery Update Facility does not allow to [return results](XQuery Update.md#Returning_Results). 

## BINDINGS

**Signature** | `BINDINGS [vars]`
------------- | -----------------
**Default** | _empty_
**Summary** | Contains external variables to be bound to a query:  * Variable names and values are separated by equality signs, and multiple variables are delimited by commas. 
 * Variables may optionally be introduced with a leading dollar sign. 
 * Commas that occur in the value itself are encoded by duplication. 
 * If a variable uses a namespace different to the default namespace, it can be specified with the [Clark Notation](http://www.jclark.com/xml/xmlns.htm) or [Expanded QName Notation](http://www.w3.org/TR/xquery-30/#id-basics). 
 * This option can also be used on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) with the flag `-b`. 

**Examples** | `$a=1,$b=2`   binds the values `1` and `2` to the variables $a and $b `a=1,,2`   binds the value `1,2` to the variable $a `{URI}a=x`   binds the value `x` to the variable $a with the namespace `URI`. 
    SET BINDINGS BIND-VAR="hello world!"
    XQUERY declare variable $BIND-VAR external; $BIND-VAR

   binds the value `hello world!` to the variable $BIND-VAR and shows how it can be used in a [ Command Script](Commands.md#Command_Scripts). 

## QUERYPATH

**Signature** | `QUERYPATH [path]`
------------- | ------------------
**Default** | _empty_
**Summary** | Contains the path (_base URI_) to the executed query (default: _empty_). This directory will be used to resolve relative paths to documents, query modules, and other resources addressed in a query. 

## INLINELIMIT

**Signature** | `INLINELIMIT`
------------- | -------------
**Default** | `100`
**Summary** | The XQuery compiler inlines functions to speed up query evaluation. Inlining will only take place if a function body is not too large (i.e., if it does not contain too many expressions). With this option, this maximum number of expressions can be specified.Function inlining can be turned off by setting the value to `0`. The limit can be locally overridden via the `%basex:inline` annotation. 

## TAILCALLS

**Signature** | `TAILCALLS`
------------- | -----------
**Default** | `256`
**Summary** | Specifies how many stack frames of [tail-calls](http://en.wikipedia.org/wiki/Tail_call) are allowed on the stack at any time. When this limit is reached, tail-call optimization takes place and some call frames are eliminated. The feature can be turned off by setting the value to `-1`. 

## DEFAULTDB

**Signature** | `DEFAULTDB`
------------- | -----------
**Default** | `false`
**Summary** | If this option is turned on, paths specified in the `fn:doc` and `fn:collections` functions will first be resolved against a database that has been opened in the global context outside the query (e.g. by the [OPEN](Commands.md#OPEN) command). If the path does not match any existing resources, it will be resolved as described in the article on [accessing database resources](Databases.md#Access_Resources). 

## CACHEQUERY

**Signature** | `CACHEQUERY [boolean]`
------------- | ----------------------
**Default** | `false`
**Summary** | Caches the query results before returning them to the client. This option may be set to `true` if the whole result is needed for further operations (such as is e.g. the case in the GUI of BaseX). 

## FORCECREATE

**Signature** | `FORCECREATE [boolean]`
------------- | -----------------------
**Default** | `false`
**Summary** | By activating this option, the XQuery `doc()` and `collection()` functions will create database instances for the addressed input files. 

## CHECKSTRINGS

**Signature** | `CHECKSTRINGS [boolean]`
------------- | ------------------------
**Default** | `true`
**Summary** | If this option is turned off, strings from external sources will be adopted as is, i. e., without being checked for valid XML characters:  * This option affects [Java Bindings](Java Bindings.md) and the string conversion and input functions [archive:create](Archive Module.md#archive-create), [archive:extract-text](Archive Module.md#archive-extract-text), [archive:update](Archive Module.md#archive-update), [convert:binary-to-string](Conversion Module.md#convert-binary-to-string), [fetch:text](Fetch Module.md#fetch-text), [file:read-text](File Module.md#file-read-text), and [zip:text-entry](ZIP Module.md#zip-text-entry). 
 * Please be aware that an inconsiderate use of this option may cause unexpected behavior when storing or outputting strings. 


## LSERROR

**Signature** | `LSERROR [error]`
------------- | -----------------
**Default** | `0`
**Summary** | This option specifies the maximum Levenshtein error for the BaseX-specific fuzzy match option. See the page on [Full-Texts](Full-Text.md#Fuzzy_Querying) for more information on fuzzy querying. 

## RUNQUERY

**Signature** | `RUNQUERY [boolean]`
------------- | --------------------
**Default** | `true`
**Summary** | Specifies if a query will be executed or parsed only. This option can also be changed on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-R`. 

## RUNS

**Signature** | `RUNS [num]`
------------- | ------------
**Default** | `1`
**Summary** | Specifies how often a query will be evaluated. The result is serialized only once, and the measured times are averages of all runs. This option can also be changed on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-r`. 
 
# Serialization Options

## SERIALIZE

**Signature** | `SERIALIZE [boolean]`
------------- | ---------------------
**Default** | `true`
**Summary** | Results of XQuery expressions will be serialized if this option is turned on. For debugging purposes and performance measurements, this option can be set to `false`. It can also be turned off on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-z`. 

## SERIALIZER

**Signature** | `SERIALIZER [params]`
------------- | ---------------------
**Default** | _empty_
**Summary** | Contains parameters for [serializing](Serialization.md) query results:  * Keys and values are separated by equality signs. 
 * Multiple parameters are delimited by commas. 
 * The option can also be used on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) with the flag `-s`. 

**Example** | `encoding=US-ASCII,omit-xml-declaration=no` : sets the encoding to `US-ASCII` and prints the XML declaration. 

## EXPORTER

**Signature** | `EXPORTER [params]`
------------- | -------------------
**Default** | _empty_
**Summary** | Contains parameters for exporting all resources of a database; see [Serialization](Serialization.md) for more details. Keys and values are separated by equality signs, multiple parameters are delimited by commas. 

## XMLPLAN

**Signature** | `XMLPLAN [boolean]`
------------- | -------------------
**Default** | `false`
**Summary** | Prints the execution plan of an XQuery expression in its XML representation. This option can also be activated on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-x`. 

## COMPPLAN

**Signature** | `COMPPLAN [boolean]`
------------- | --------------------
**Default** | `true`
**Summary** | Generates the query plan, which can be activated via [[#XMLPLAN|XMLPLAN], before or after query compilation. This option can also be activated on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-X`. 

## DOTPLAN

**Signature** | `DOTPLAN [boolean]`
------------- | -------------------
**Default** | `false`
**Summary** | Visualizes the execution plan of an XQuery expression with [dotty](http://www.graphviz.org) and saves its dot file in the query directory. 

## DOTCOMPACT

**Signature** | `DOTCOMPACT [boolean]`
------------- | ----------------------
**Default** | `false`
**Summary** | Chooses a compact dot representation. 
 
# Other Options

## AUTOFLUSH

**Signature** | `AUTOFLUSH [boolean]`
------------- | ---------------------
**Default** | `true`
**Summary** | Flushes database buffers to disk after each update. If this option is set to `false`, bulk operations (multiple single updates) will be evaluated faster. As a drawback, the chance of data loss increases if the database is not explicitly flushed via the [FLUSH](Commands.md#FLUSH) command. 

## WRITEBACK

**Signature** | `WRITEBACK [boolean]`
------------- | ---------------------
**Default** | `false`
**Summary** | Propagates updates on main-memory instances of files that have been retrieved via `fn:doc` or `fn:collection` back to disk. This option can also be activated on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone) via `-u`. Please note that, when turning this option on, your original files will not be backed up. 

## MAXSTAT

**Signature** | `MAXSTAT [num]`
------------- | ---------------
**Default** | `30`
**Summary** | Specifies the maximum number of index occurrences printed by the `INFO INDEX` command. 
 
# Changelog
** Version 8.0 **

 * Added: `MIXUPDATES`, `AUTOOPTIMIZE`, `AUTHMETHOD`, `XINCLUDE`
 * Updated: `PROXYPORT`: default set to 0; will be ignored. `PROXYHOST`, `NONPROXYHOSTS`: empty strings will be ignored. 
** Version 7.8.1 **

 * Updated: `ADDARCHIVES`: parsing of TAR and TGZ files. 
** Version 7.8 **

 * Added: `CSVPARSER`, `JSONPARSER`, `TEXTPARSER`, `HTMLPARSER`, `INLINELIMIT`, `TAILCALLS`, `DEFAULTDB`, `RUNQUERY`
 * Updated: `WRITEBACK` only applies to main-memory document instances. 
 * Updated: `DEBUG` option can be changed at runtime by users with admin permissions. 
 * Updated: default of `INTPARSE` is now `false`. 
 * Removed: `HTMLOPT` (replaced with `HTMLPARSER`), `PARSEROPT` (replaced with parser-specific options), `DOTDISPLAY`, `DOTTY`
** Version 7.7 **

 * Added: `ADDCACHE`, `CHECKSTRINGS`, `FTINDEXSPLITSIZE`, `INDEXSPLITSIZE`
** Version 7.6 **

 * Added: `GLOBALLOCK`
 * Added: store local options in configuration file after `# Local Options` comments. 
** Version 7.5 **

 * Added: options can now be set via system properties 
 * Added: a pragma expression can be used to locally change database options 
 * Added: `USER`, `PASSWORD`, `LOG`, `LOGMSGMAXLEN`, `WEBPATH`, `RESTXQPATH``HTTPLOCAL`, `CREATEONLY`, `STRIPNS`
 * Removed: `HTTPPATH`; `HTTPPORT`: `jetty.xml` configuration file is used instead 
 * Removed: global options cannot be changed anymore during the lifetime of a BaseX instance 
** Version 7.3 **

 * Updated: `KEEPALIVE`, `TIMEOUT`: default values changed 
 * Removed: `WILDCARDS`; new index supports both fuzzy and wildcard queries 
 * Removed: `SCORING`; new scoring model will focus on lengths of text nodes and match options 
** Version 7.2 **

 * Added: `PROXYHOST`, `PROXYPORT`, `NONPROXYHOSTS`, `HTMLOPT`
 * Updated: `TIMEOUT`: ignore timeout for admin users 
** Version 7.1 **

 * Added: `ADDRAW`, `MAXLEN`, `MAXCATS`, `UPDINDEX`
 * Updated: `BINDINGS`
** Version 7.0 **

 * Added: `SERVERHOST`, `KEEPALIVE`, `AUTOFLUSH`, `QUERYPATH`
