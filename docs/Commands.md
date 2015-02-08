
# Commands
 


 
This article is part of the [Getting Started](Getting Started.md) Section. It lists all database commands supported by BaseX. Commands can e.g. be executed from the [Command Line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone), [Scripts](Commands.md#Command_Scripts), the [Clients](Clients.md), [REST](REST.md), the input field in the [GUI](http://docs.basex.org/wiki/Graphical User Interface) and other ways. If the GUI is used, all commands that are triggered by the GUI itself will show up in the [Info View](http://docs.basex.org/wiki/Graphical User InterfaceVisualizations). The [Permission](User Management.md) fields indicate which rights are required by a user to perform a command in the client/server architecture. 

 
## Basics

### Command Scripts

Database commands in both the string and XML syntax can be placed in a text file and stored on disk. The default extension for BaseX command scripts is `.bxs`. If the path to a command script is passed on to BaseX, it will automatically be recognized and evaluated as such. 


### String Syntax

Multiple commands can be written in a single line and separated by semicolons, or stored as command script. Lines starting with `#` are interpreted as comments and are skipped. The following script creates a database, adds two documents to it and performs a query: 


    CREATE DB test
    ADD input.xml
    ADD TO embedded.xml <root>embedded</root>
    # run query
    XQUERY count(//text())


### XML Syntax

The string syntax is limited when XML snippets need to be embedded in a command, or when complex queries are to be specified. 


This is why database commands can also be specified in XML. Multiple commands can be enclosed by a `<commands/>` root element: 


    <commands>
      <create-db name='test'/>
      <add>input.xml</add>
      <add path='embedded.xml'><root>embedded</root></add>
      <xquery>count(//text())</xquery>
    </commands>


### Glob Syntax

Some commands support the glob syntax to address more than one database or user. Question marks and asterisks can be used to match one or more characters, and commas can be used to separate multiple patterns. Some examples: 

 * `AB?`  addresses all names with the characters `AB` and one more character. 
 * `*AB`  addresses all names ending with the characters `AB`. 
 * `X*,Y*,Z*`  addresses all names starting with the characters `X`, `Y`, or `Z`. 

### Valid Names

Database, user and event names follow the same naming constraints: Names are restricted to ASCII characters. They must at least have one character, and they may contain letters, numbers and any of the special characters `!#$%&'()+-=@[]^_`{}~`. The following characters are reserved for other features: 

 * `,?*` : [glob syntax](Commands.md#Glob_Syntax)
 * `;` : Separator for multiple database commands on the [command line](Command-Line Options.md)
 * `\/` : Directory path separators 
 * `.` : hidden folders (e.g. the [.logs directory](Logging.md)) 
 * `:*?\"<>|}` : invalid filename characters on Windows 

### Aliases

In all commands, the `DB` keyword can be replaced by `DATABASE`. 

 
## Database Operations

### CREATE DB

**Syntax** | `CREATE DB [name] ([input])`
---------- | ----------------------------
**XML Syntax**     | `<create-db name='...'>([input])</create-db>`
**Permission** | _CREATE_
**Summary** | Creates the database `name` with an optional `input` and opens it. An existing database will be overwritten.The input may either be a reference to a single XML document, a directory, a remote URL, or a string containing XML:  * `name`  must be a [valid database name](Commands.md#Valid_Names)
 * several additional [Create Options](Options.md#Create_Options) can be set to influence the creation process. 

**Errors** | The command fails if a database with the specified name is currently used by another process, if one of the documents to be added is not well-formed or if it cannot be parsed for some other reason. 
**Examples** |  * `CREATE DB input` creates an empty database `input`. 
 * `CREATE DB xmark http://files.basex.org/xml/xmark.xml` creates the database `xmark`, containing a single initial document called `xmark.xml`. 
 * `CREATE DATABASE coll /path/to/input` creates the database `coll` with all documents found in the `input` directory. 
 * `SET INTPARSE false; CREATE DB input input.xml` creates a database `input` with `input.xml` as initial document, which will be parsed with Java's [default XML parser](Parsers.md#XML_Parsers). 
 * `<create-db name='simple'><hello>Universe</hello></create-db>` creates a database named `simple` with an initial document `<hello>Universe</hello>`. 


### OPEN

Updated with Version 8.0: path argument added. 


**Syntax** | `OPEN [name] ([path])`
---------- | ----------------------
**XML Syntax**     | `<open name='...' (path='...')/>`
**Permission** | _READ_
**Summary** | Opens the database specified by `name`. The documents to be opened can be specified by the [path] argument. 
**Errors** | The command fails if the specified database does not exist, is currently being updated by another process or cannot be opened for some other reason. 

### CHECK

**Syntax** | `CHECK [input]`
---------- | ---------------
**XML Syntax**     | `<check input='...'/>`
**Permission** | _READ/CREATE_
**Summary** | This convenience command combines [OPEN](Commands.md#OPEN) and [CREATE DB](Commands.md#CREATE_DB): if a database with the name `input` exists, it is opened. Otherwise, a new database is created; if the specified input points to an existing resource, it is stored as initial content. 
**Errors** | The command fails if the addressed database could neither be opened nor created. 

### CLOSE

**Syntax** | `CLOSE `
---------- | --------
**XML Syntax**     | `<close/>`
**Permission** | _READ_
**Summary** | Closes the currently opened database. 
**Errors** | The command fails if the database files could not be closed for some reason. 

### EXPORT

**Syntax** | `EXPORT [path]`
---------- | ---------------
**XML Syntax**     | `<export path='...'/>`
**Permission** | _CREATE_
**Summary** | Exports all documents in the database to the specified file `path`, using the serializer options specified by the `EXPORTER` option. 
**Errors** | The command fails if no database is opened, if the target path points to a file or is invalid, if the serialization parameters are invalid, or if the documents cannot be serialized for some other reason. 

### CREATE INDEX

**Syntax** | `CREATE INDEX [TEXT|ATTRIBUTE|FULLTEXT]`
---------- | ----------------------------------------
**XML Syntax**     | `<create-index type='text|attribute|fulltext'/>`
**Permission** | _WRITE_
**Summary** | Creates the specified database [index](Indexes.md). 
**Errors** | The command fails if no database is opened, if the specified index is unknown, or if indexing fails for some other reason. 

### DROP INDEX

**Syntax** | `DROP INDEX [TEXT|ATTRIBUTE|FULLTEXT]`
---------- | --------------------------------------
**XML Syntax**     | `<drop-index type='text|attribute|fulltext'/>`
**Permission** | _WRITE_
**Summary** | Drops the specified database [index](Indexes.md). 
**Errors** | The command fails if no database is opened, if the specified index is unknown, or if it could not be deleted for some other reason. 
 
## Administration

### ALTER DB

**Syntax** | `ALTER DB [name] [newname]`
---------- | ---------------------------
**XML Syntax**     | `<alter-db name='...' newname='...'/>`
**Permission** | _CREATE_
**Summary** | Renames the database specified by `name` to `newname`. `newname` must be a [valid database name](Commands.md#Valid_Names). 
**Errors** | The command fails if the target database already exists, if the source database does not exist or is currently locked, or if it could not be renamed for some other reason. 
**Examples** |  * `ALTER DB db tempdb` renames the database `db` into `tempdb`. 


### DROP DB

**Syntax** | `DROP DB [name]`
---------- | ----------------
**XML Syntax**     | `<drop-db name='...'/>`
**Permission** | _CREATE_
**Summary** | Drops the database with the specified `name`. The [Glob Syntax](Commands.md#Glob_Syntax) can be used to address more than one database. 
**Errors** | The command fails if the specified database does not exist or is currently locked, or if the database could not be deleted for some other reason. 

### CREATE BACKUP

**Syntax** | `CREATE BACKUP [name]`
---------- | ----------------------
**XML Syntax**     | `<create-backup name='...'/>`
**Permission** | _CREATE_
**Summary** | Creates a zipped backup of the database specified by `name`. The backup file will be suffixed with the current timestamp and stored in the database directory. The [Glob Syntax](Commands.md#Glob_Syntax) can be used to address more than one database. 
**Errors** | The command fails if the specified database does not exist, or if it could not be zipped for some other reason. 
**Examples** |  * `BACKUP db` creates a zip archive of the database `db` (e.g. `db-2011-04-01-12-27-28.zip`) in the [database directory](Configuration.md#Database_Directory). 


### RESTORE

**Syntax** | `RESTORE [name]`
---------- | ----------------
**XML Syntax**     | `<restore name='...'/>`
**Permission** | _CREATE_
**Summary** | Restores a database with the specified `name`. The name may include the timestamp of the backup file. 
**Errors** | The command fails if the specified backup does not exist, if the database to be restored is currently locked, or if it could not be restored for some other reason. 

### INSPECT

**Syntax** | `INSPECT`
---------- | ---------
**XML Syntax**     | `<inspect/>`
**Permission** | _READ_
**Summary** | Performs some integrity checks on the opened database and returns a brief summary. 

### DROP BACKUP

**Syntax** | `DROP BACKUP [name]`
---------- | --------------------
**XML Syntax**     | `<drop-backup name='...'/>`
**Permission** | _CREATE_
**Summary** | Drops all backups of the database with the specified `name`. The [Glob Syntax](Commands.md#Glob_Syntax) can be used to address more than one database. 
**Examples** |  * `DROP BACKUP abc*` deletes the backups of all databases starting with the characters `abc`. 


### SHOW BACKUPS

**Syntax** | `SHOW BACKUPS`
---------- | --------------
**XML Syntax**     | `<show-backups/>`
**Permission** | _CREATE_
**Summary** | Shows all database backups. 

### COPY

**Syntax** | `COPY [name] [newname]`
---------- | -----------------------
**XML Syntax**     | `<copy name='...' newname='...'/>`
**Permission** | _CREATE_
**Summary** | Creates a copy of the database specified by `name`. `newname` must be a [valid database name](Commands.md#Valid_Names). 
**Errors** | The command fails if the target database already exists, or if the source database does not exist. 

### INFO DB

**Syntax** | `INFO DB`
---------- | ---------
**XML Syntax**     | `<info-db/>`
**Permission** | _READ_
**Summary** | Shows information on the currently opened database. 
**Errors** | The command fails if no database is opened. 

### INFO INDEX

**Syntax** | `INFO INDEX ([TAG|ATTNAME|PATH|TEXT|ATTRIBUTE|FULLTEXT])`
---------- | ---------------------------------------------------------
**XML Syntax**     | `<info-index type='tag|attname|path|text|attribute|fulltext'/>`
**Permission** | _READ_
**Summary** | Shows information on the existing [index](Indexes.md) structures. The output can be optionally limited to the specified index. 
**Errors** | The command fails if no database is opened, or if the specified index is unknown. 

### INFO STORAGE

**Syntax** | `INFO STORAGE [start end] | [query]`
---------- | ------------------------------------
**XML Syntax**     | `<info-storage>([query])</info-storage>`
**Permission** | _READ_
**Summary** | Shows the internal main table of the currently opened database. An integer range or a query may be specified as argument. 
**Errors** | The command fails if no database is opened, or if one of the specified arguments is invalid. 
 
## Querying 

### LIST

**Syntax** | `LIST ([name] ([path]))`
---------- | ------------------------
**XML Syntax**     | `<list (name='...' (path='...'))/>`
**Permission** | _NONE_
**Summary** | Lists all available databases. If `name` is specified, the resources of a database are listed. The output can be further restricted to the resources matching the specified `path`. 
**Errors** | The command fails if the optional database cannot be opened, or if the existing databases cannot be listed for some other reason. 

### XQUERY

**Syntax** | `XQUERY [query]`
---------- | ----------------
**XML Syntax**     | `<xquery>[query]</xquery>`
**Permission** | _depends on query_
**Summary** | Runs the specified `query` and prints the result. 
**Errors** | The command fails if the specified query is invalid. 
**Examples** |  * `XQUERY 1 to 10` returns the sequence `(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)`. 
 * `SET RUNS 10; XQUERY 1 to 10` runs the query 10 times, returns the result and prints the average execution time. 
 * `SET XMLPLAN true; XQUERY 1 to 10` returns the result and prints the query plan as XML. 


### RETRIEVE

**Syntax** | `RETRIEVE [path]`
---------- | -----------------
**XML Syntax**     | `<retrieve path='...'/>`
**Permission** | _READ_
**Summary** | Retrieves a raw file from the opened database at the specified `path`. 
**Errors** | The command fails if no database is opened, if the source path is invalid or if the data cannot not be retrieved for some other reason. 

### FIND

**Syntax** | `FIND [query]`
---------- | --------------
**XML Syntax**     | `<find>[query]</find>`
**Permission** | _READ_
**Summary** | Builds and runs a query for the specified `query` terms. Keywords can be enclosed in quotes to look for phrases. The following modifiers can be used to further limit search:  `=` looks for exact text nodes`~` looks for approximate hits`@=` looks for exact attribute values`@` looks for attributes 
**Errors** | The command fails if no database is opened. 

### TEST

Introduced with Version 7.9:


**Syntax** | `TEST [path]`
---------- | -------------
**XML Syntax**     | `<test path='...'/>`
**Permission** | _ADMIN_
**Summary** | Runs all [XQUnit tests](Unit Module.md) in the specified `path`. The path can point to a single file or a directory.Unit testing can also be triggered via `-t` on [command line](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone). 
**Errors** | The command fails if at least one test fails. 
**Examples** |  * `TEST project/tests` runs all tests in the directory `project/tests`. 


### REPO INSTALL

**Syntax** | `REPO INSTALL [path]`
---------- | ---------------------
**XML Syntax**     | `<repo-install path='...'/>`
**Permission** | _CREATE_
**Summary** |  Installs the package with path `path`. 
**Errors** |  The command fails in the following cases:  * The package to be installed is not a xar file. 
 * The package to be installed does not exist or is already installed. 
 * The package descriptor is with invalid syntax. 
 * The package to be installed depends on a package which is not installed. 
 * The package is not supported by the current version of BaseX. 
 * A component of the package is already installed as part of another package. 


### REPO LIST

**Syntax** | `REPO LIST`
---------- | -----------
**XML Syntax**     | `<repo-list/>`
**Permission** | _READ_
**Summary** |  Lists all installed packages. 

### REPO DELETE

**Syntax** | `REPO DELETE [name]`
---------- | --------------------
**XML Syntax**     | `<repo-delete name='...'/>`
**Permission** | _CREATE_
**Summary** |  Deletes the package with name `name`, optionally followed by a version. 
**Errors** |  The command fails if the package to be deleted participates in a dependency. 
 
## Updates

### ADD

**Syntax** | `ADD (TO [path]) [input]`
---------- | -------------------------
**XML Syntax**     | `<add (path='...')>[input]</add>`
**Permission** | _WRITE_
**Summary** | Adds a file, directory or XML string specified by `input` to the currently opened database at the specified `path`:  * `input`  may either be a single XML document, a directory, a remote URL or a plain XML string. 
 * A document with the same path may occur than once in a database. If this is unwanted, [REPLACE](Commands.md#REPLACE) can be used. 
 * If a file is too large to be added in one go, its data structures will be cached to disk first. Caching can be enforced by turning the [ADDCACHE](Options.md#ADDCACHE) option on. 

**Errors** | The command fails if no database is opened, if one of the documents to be added is not well-formed, or if it could not be parsed for some other reason. 
**Examples** |  * `ADD input.xml` adds the file `input.xml` to the database. 
 * `ADD TO temp/one.xml input.xml` adds `input.xml` to the database and moves it to `temp/one.xml`. 
 * `ADD TO target/ xmldir` adds all files from the `xmldir` directory to the database in the `target` path. 


### DELETE

**Syntax** | `DELETE [path]`
---------- | ---------------
**XML Syntax**     | `<delete path='...'/>`
**Permission** | _WRITE_
**Summary** | Deletes all documents from the currently opened database that start with the specified `path`. 
**Errors** | The command fails if no database is opened. 

### RENAME

**Syntax** | `RENAME [path] [newpath]`
---------- | -------------------------
**XML Syntax**     | `<rename path='...' newpath='...'/>`
**Permission** | _WRITE_
**Summary** | Renames all document paths in the currently opened database that start with the specified `path`. The command may be used to either rename single documents or directories. 
**Errors** | The command fails if no database is opened, or if the target path is empty. 
**Examples** |  * `RENAME one.xml two.xml` renames the document `one.xml` to `two.xml`. 
 * `RENAME / TOP` moves all documents to a `TOP` root directory. 


### REPLACE

**Syntax** | `REPLACE [path] [input]`
---------- | ------------------------
**XML Syntax**     | `<replace path='...'>[input]</replace>`
**Permission** | _WRITE_
**Summary** | Replaces a document in the currently opened database, addressed by `path`, with the file or XML string specified by `input`, or adds a new document if the resource does not exist yet. 
**Errors** | The command fails if no database is opened, if the specified path points to a database directory, or if the input is not found. 
**Examples** |  * `REPLACE one.xml input.xml` replaces the document `one.xml` with the contents of the file `input.xml`. 
 * `REPLACE top.xml <xml/>` replaces the document `top.xml` with the document `<xml/>`. 


### STORE

**Syntax** | `STORE (TO [path]) [input]`
---------- | ---------------------------
**XML Syntax**     | `<store (path='...')>[input]</store>`
**Permission** | _WRITE_
**Summary** | Stores a raw file in the opened database to the specified `path`. `input` may either be a file reference, a remote URL, or a plain string. If the path denotes a directory, it needs to be suffixed with a slash (`/`). 
**Errors** | The command fails if no database is opened, if the specified resource is not found, if the target path is invalid or if the data cannot not be written for some other reason. 

### OPTIMIZE

**Syntax** | `OPTIMIZE (ALL)`
---------- | ----------------
**XML Syntax**     | `<optimize/>``<optimize-all/>`
**Permission** | _WRITE_
**Summary** | Optimizes the index structures, meta data and statistics of the currently opened database. If the `ALL` flag is specified, the internal database structures are completely rebuilt; this often leads to a reduction of the total database size. 
**Errors** | The command fails if no database is opened, or if the currently opened database is a main-memory instance. 

### FLUSH

**Syntax** | `FLUSH`
---------- | -------
**XML Syntax**     | `<flush/>`
**Permission** | _WRITE_
**Summary** | Explicitly flushes the buffers of the currently opened database to disk. This command is applied if [AUTOFLUSH](Options.md#AUTOFLUSH) has been set to `false`. 
**Errors** | The command fails if no database is opened. 
 
## Server Administration

### SHOW SESSIONS

**Syntax** | `SHOW SESSIONS`
---------- | ---------------
**XML Syntax**     | `<show-sessions/>`
**Permission** | _ADMIN_
**Summary** | Shows all sessions that are connected to the current server instance. 

### SHOW USERS

**Syntax** | `SHOW USERS (ON [database])`
---------- | ----------------------------
**XML Syntax**     | `<show-users (database='...')/>`
**Permission** | _ADMIN_
**Summary** | Shows all users that are registered in the database. If a `database` is specified, all user will be shown for which a pattern was specified that matches the database name. 
**Errors** | The command fails if the optional database could not be opened. 

### KILL

**Syntax** | `KILL [target]`
---------- | ---------------
**XML Syntax**     | `<kill target='...'/>`
**Permission** | _ADMIN_
**Summary** | Kills sessions of a user or an IP:port combination, specified by `target`. The [Glob Syntax](Commands.md#Glob_Syntax) can be used to address more than one user. 
**Errors** | The command fails if a user tried to kill his/her own session. 

### CREATE EVENT

**Syntax** | `CREATE EVENT [NAME]`
---------- | ---------------------
**XML Syntax**     | `<create-event name='...'/>`
**Permission** | _ADMIN_
**Summary** | Creates the specified [event](Events.md). 
**Errors** | The command fails if event already exists. 

### SHOW EVENTS

**Syntax** | `SHOW EVENTS`
---------- | -------------
**XML Syntax**     | `<show-events/>`
**Permission** | _ADMIN_
**Summary** | Shows all [events](Events.md) that have been registered in the database. 

### DROP EVENT

**Syntax** | `DROP EVENT [NAME]`
---------- | -------------------
**XML Syntax**     | `<drop-event name='...'/>`
**Permission** | _ADMIN_
**Summary** | Drops the specified [event](Events.md). 
**Errors** | The command fails if the event doesn't exist. 
 
## User Management

Updated with Version 8.0: all passwords are now specified in plain text (see [User Management](User Management.md) for more information). Database arguments have been replaced with glob patterns. 


### CREATE USER

**Syntax** | `CREATE USER [name] ([password])`
---------- | ---------------------------------
**XML Syntax**     | `<create-user name='...'>([password])</create-user>`
**Permission** | _ADMIN_
**Summary** | Creates a user with the specified `name` and `password`. If no password is specified, it is requested via the chosen frontend (GUI or bash). 
**Errors** | The command fails if the specified user already exists. 

### ALTER USER

Updated with Version 8.0: this command will now change the user name. 


**Syntax** | `ALTER USER [name] ([newname])`
---------- | -------------------------------
**XML Syntax**     | `<alter-user name='...' newname='...'/>`
**Permission** | _ADMIN_
**Summary** | Renames the user with the specified `name` to `newname`. 
**Errors** | The command fails if the specified user does not exist, or if the new user already exists. 

### ALTER PASSWORD

Renamed with Version 8.0 (before: ALTER USER). 


**Syntax** | `ALTER PASSWORD [name] ([password])`
---------- | ------------------------------------
**XML Syntax**     | `<alter-password name='...'>([password])</alter-password>`
**Permission** | _ADMIN_
**Summary** | Alters the `password` of the user with the specified `name`. If no password is specified, it is requested via the chosen frontend (GUI or bash). 
**Errors** | The command fails if the specified user does not exist. 

### DROP USER

Updated with Version 8.0: the database argument was changed to a glob pattern argument. 


**Syntax** | `DROP USER [name] (ON [pattern])`: 
---------- | -----------------------------------
**XML Syntax**     | `<drop-user name='...' (pattern='...')/>`
**Permission** | _ADMIN_
**Summary** | Drops the user with the specified `name`. The [Glob Syntax](Commands.md#Glob_Syntax) can be used to address more than one database or user. If a glob `pattern` is specified, only the pattern will be removed. 
**Errors** | The command fails if `admin` is specified as user name, or if the specified user does not exist or is currently logged in. 

### GRANT

Updated with Version 8.0: the database argument was changed to a glob pattern argument. 


**Syntax** | `GRANT [NONE|READ|WRITE|CREATE|ADMIN] (ON [pattern]) TO [user]`
---------- | ---------------------------------------------------------------
**XML Syntax**     | `<grant name='...' permission='none|read|write|create|admin' (pattern='...')/>`
**Permission** | _ADMIN_
**Summary** | Grants the specified [permission](User Management.md) to the specified `user`. The [Glob Syntax](Commands.md#Glob_Syntax) can be used to address more than one user. If a glob `pattern` is specified, the permission will be applied to all databases that match this pattern. 
**Errors** | The command fails if `admin` is specified as user name or if the specified user does not exist. 
**Examples** |  * `GRANT READ TO JoeWinson` grants `READ` permission to the user `JoeWinson`. 
 * `GRANT WRITE ON Wiki TO editor*` grants `WRITE` permissions on the `Wiki` database to all users starting with the characters `editor*`. 


### PASSWORD

**Syntax** | `PASSWORD ([password])`
---------- | -----------------------
**XML Syntax**     | `<password>([password])</password>`
**Permission** | _NONE_
**Summary** | Changes the `password` of the current user. If no password is specified, it is requested via the chosen frontend (GUI or bash). 
 
## General Commands

### RUN

**Syntax** | `RUN [file]`
---------- | ------------
**XML Syntax**     | `<run file='...'/>`
**Permission** | _depends on input_
**Summary** | Evaluates the contents of `file` as XQuery expression. If the file ends with the suffix `.bxs`, the file content will be evaluated as [command script](Commands.md#Basics). This command can be used to run several commands in a single transaction. 
**Errors** | The command fails if the specified file does not exist, or if the retrieved input is invalid. It will be canceled as soon as one of the executed commands fails. 
**Examples** |  * `RUN query.xq` will evaluated the specified file as XQuery expression 
 * `RUN commands.bxs` will evaluated the specified file as command script 


### EXECUTE

**Syntax** | `EXECUTE [input]`
---------- | -----------------
**XML Syntax**     | `<execute>[input]</execute>`
**Permission** | _depends on input_
**Summary** | Evaluates the specified `input` as [command script](Commands.md#Basics). This command can be used to run several commands in a single transaction. 
**Errors** | The command fails if the syntax of the specified input is invalid. It will be canceled as soon as one of the executed commands fails. 
**Examples** |  * `EXECUTE "create db db1; create db db2"`
 * `EXECUTE "<commands><create-db name='db1'/><create-db name='db2'/></commands>"` both commands will create two databases `db1` and `db2` in a single transaction. 


### GET

**Syntax** | `GET [option]`
---------- | --------------
**XML Syntax**     | `<get option='...'/>`
**Permission** | _NONE_
**Summary** | Returns the current value of the [Option](Options.md) specified via `option`. Global options can only be requested by users with ADMIN permissions. 
**Errors** | The command fails if the specified option is unknown. 

### SET

**Syntax** | `SET [option] ([value])`
---------- | ------------------------
**XML Syntax**     | `<set option='...'>([value])</set>`
**Permission** | _NONE_
**Summary** | Sets the [Option](Options.md) specified by `option` to a new `value`. Only local options can be modified. If no value is specified, and if the value is boolean, it will be inverted. 
**Errors** | The command fails if the specified option is unknown or if the specified value is invalid. 

### INFO

**Syntax** | `INFO`
---------- | ------
**XML Syntax**     | `<info/>`
**Permission** | _READ_
**Summary** | Shows global information. 

### HELP

**Syntax** | `HELP ([command])`
---------- | ------------------
**XML Syntax**     | `<help>([command])</help>`
**Permission** | _NONE_
**Summary** | If `command` is specified, information on the specific command is printed; otherwise, all commands are listed. 
**Errors** | The command fails if the specified command is unknown. 

### EXIT

**Syntax** | `EXIT `
---------- | -------
**XML Syntax**     | `<exit/>`
**Permission** | _NONE_
**Summary** | Exits the console mode. 

### QUIT

Introduced with Version 8.0: 


**Syntax** | `QUIT `
---------- | -------
**XML Syntax**     | `<quit/>`
**Permission** | _NONE_
**Summary** | Exits the console mode (alias of [EXIT](Commands.md#EXIT)). 
 
## Changelog
UNKNOWN * Updated: commands for [User Management](Commands.md#CommandsUser_Management)
 * Updated: `OPEN`: path argument added 
 * Removed: `CS` command 
 * Added: `QUIT`
UNKNOWN * Added: `TEST` runs XQUnit tests. 
UNKNOWN * Updated: syntax of [valid names](Commands.md#Valid_Names). 
UNKNOWN * Added: `EXECUTE` executes a command script. 
 * Added: `INSPECT` performs integrity checks. 
 * Added: automatic detection of [Command Scripts](Commands.md#Basics). 
 * Removed: `SHOW DATABASES`; information is also returned by `SHOW SESSIONS`. 
 * Removed: `OPEN`: path argument. 
UNKNOWN * Added: [XML Syntax](Commands.md#XML_Syntax) added. 
 * Updated: `CHECK` can now be used to create empty databases. 
 * Updated: Names and paths in `OPEN` and `LIST` are now specified as separate arguments. 
UNKNOWN * Updated: permissions for `GET` and `SET` changed from `READ` to `NONE`. 
UNKNOWN * Updated: `CREATE INDEX`, `DROP INDEX` (`PATH` argument removed. Path summary is always available now and updated with [OPTIMIZE](Commands.md#OPTIMIZE)). 
 * Updated: permissions for `REPO DELETE`, `REPO INSTALL` and `REPO LIST`. 
UNKNOWN * Updated: `KILL` (killing sessions by specifying IP:port) 
UNKNOWN * Added: `FLUSH`, `RETRIEVE`, `STORE`. 
 * Updated: `ADD`: simplified arguments. 
