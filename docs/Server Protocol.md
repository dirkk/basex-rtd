 


 
This page presents the classes and functions of the [BaseX Clients](Clients.md), and the underlying protocol, which is utilized for communicating with the database server. A detailed example demonstrates how a concrete byte exchange can look like. 

 
# Workflow
 * All clients are based on the client/server architecture. Hence, a BaseX database server must be started first. 
 * Each client provides a session class or script with methods to connect to and communicate with the database server. A socket connection will be established by the constructor, which expects a host, port, user name and password as arguments. 
 * The `execute()` method is called to launch a database command. It returns the result or throws an exception with the received error message. 
 * The `query()` method creates a query instance. Variables and the context item can be bound to that instance, and the result can either be requested via `execute()`, or in an iterative manner with the `more()` and `next()` functions. If an error occurs, an exception will be thrown. 
 * The `create()`, `add()`, `replace()` and `store()` method pass on input streams to the corresponding database commands. 
 * To speed up execution, an output stream can be specified by some clients; this way, all results will be directed to that output stream. 
 * Most clients are accompanied by some example files, which demonstrate how database commands can be executed or how queries can be evaluated. 

## Transfer Protocol

All [Clients](Clients.md) use the following client/server protocol to communicate with the server. The description of the protocol is helpful if you want to implement your own client. 


### Conventions
 * `\x` : single byte. 
 * `{...}` : utf8 strings or raw data, suffixed with a `\0` byte. To avoid confusion with this end-of-string byte, all `\0` and `\FF` bytes that occur in raw data will be prefixed with `\FF`. 

### Authentication

Updated with Version 8.0: As unsalted md5 hashes can easily be uncovered using rainbow tables, a light-weight variant of digest authentication is now used for client/server communication: 

1. Client connects to server socket 
2. Server sends a **realm** and **nonce**, separated by a colon: `{realm:nonce}`
3. Client sends the **user name** and a hash value. The hash is composed of the md5 hash of 
4. Server replies with `\0` (success) or `\1` (error) 

#### Legacy: cram-md5
1. Client connects to server socket 
2. Server sends a **nonce** (timestamp): `{nonce}`
3. Client sends the **user name** and a hash value. The hash is composed of the md5 hash of 
4. Server replies with `\0` (success) or `\1` (error) 

Clients can easily be implemented to both support `digest` and `cram-md5` authentication: If the first server response contains no colon, `cram-md5` should be chosen. 


### Command Protocol

The following byte sequences are sent and received from the client (please note that a specific client may not support all of the presented commands): 


** Command ** | ** Client Request ** | ** Server Response ** | ** Description **
------------- | -------------------- | --------------------- | -----------------
 COMMAND  | `{command}` | `{result} {info} \0` |  Executes a database command. 
 QUERY  | `\0 {query}` | `{id} \0` |  Creates a new query instance and returns its id. 
 CREATE  | `\8 {name} {input}` | `{info} \0` |  Creates a new database with the specified input (may be empty). 
 ADD  | `\9 {name} {path} {input}` | `{info} \0` |  Adds a new resource to the opened database. 
 WATCH  | `\10 {name}` | `{info} \0` |  Registers the client for the specified event. 
 UNWATCH  | `\11 {name}` | `{info} \0` |  Unregisters the client. 
 REPLACE  | `\12 {path} {input}` | `{info} \0` |  Replaces a resource with the specified input. 
 STORE  | `\13 {path} {input}` | `{info} \0` |  Stores a binary resource in the opened database. 
 ↯ error  |  | `{`_partial result_`} {error} \1` |  Error feedback. 

### Query Command Protocol

Queries are referenced via an `id`, which has been returned by the `QUERY` command (see above). 


** Query Command ** | ** Client Request ** | ** Server Response ** | ** Description **
------------------- | -------------------- | --------------------- | -----------------
 CLOSE  | `\2 {id}` | `\0 \0` |  Closes and unregisters the query with the specified id. 
 BIND  | `\3 {id} {name} {value} {type}` | `\0 \0` |  Binds a value to a variable. The type will be ignored if the string is empty. 
 RESULTS  | `\4 {id}` | `\x {item} ... \x {item} \0` |  Returns all resulting items as strings, prefixed by a single byte (`\x`) that represents the [Type ID](http://docs.basex.org/wiki/Server_Protocol:_Types). This command is called by the `more()` function of a client implementation. 
 EXECUTE  | `\5 {id}` | `{result} \0` |  Executes the query and returns all results as a single string. 
 INFO  | `\6 {id}` | `{result} \0` |  Returns a string with query compilation and profiling info. 
 OPTIONS  | `\7 {id}` | `{result} \0` |  Returns a string with all query serialization parameters. 
 CONTEXT  | `\14 {id} {value} {type}` | `\0 \0` |  Binds a value to the context. The type will be ignored if the string is empty. 
 UPDATING  | `\30 {id}` | `{result} \0` |  Returns `true` if the query may perform updates; `false` otherwise. 
 FULL  | `\31 {id}` | `XDM {item} ... XDM {item} \0` |  Returns all resulting items as strings, prefixed by the [XDM Meta Data](http://docs.basex.org/wiki/Server_Protocol:_Types#XDM_Meta_Data). This command is e. g. used by the [XQJ API](Developing.md). 

As can be seen in the table, all results end with a single `\0` byte, which indicates that the process was successful. If an error occurs, an additional byte `\1` is sent, which is then followed by the `error` message string. 


#### Binding Sequences

Since Version 8.0, also sequences can be bound to variables and the context: 

 * `empty-sequence()`  must be supplied as type if an empty sequence is to be bound. 
 * Multiple items are supplied via the `{value}` argument and separated with `\1` bytes. 
 * Item types are specified by appending `\2` and the type in its string representation to an item. If no item type is specified, the general type is used. 

Some examples for the `{value}` argument: 

 * the two integers `123` and `789` are encoded as `123`, `\1`, `789` and `\0` (`xs:integer` may be specified via the `{type}` argument). 
 * the two items `xs:integer(123)` and `xs:string('ABC')` are encoded as `123`, `\2`, `xs:integer`, `\1`, `ABC`, `\2`, `xs:string` and `\0`. 

## Example

In the following example, a client registers a new session and executes the [INFO](Commands.md#INFO) database command. Next, it creates a new query instance for the XQuery expression `1, 2+'3'`. The query is then evaluated, and the server returns the result of the first subexpression `1` and an error for the second sub expression. Finally, the query instance and client session are closed. 

 * **Client**  connects to the database server socket 
 * **Server**  sends realm and timestamp "BaseX:1369578179679": `◄ 42 61 73 65 58 3A 31 33 36 39 35 37 38 31 37 39 36 37 39 00`
 * **Client**  sends user name "jack": `6A 61 63 6B 00 ►`
 * **Client**  sends hash: md5(md5("jack:BaseX:topsecret") + "1369578179679") = "ca664a31f8deda9b71ea3e79347f6666": `63 61 36 ... 00 ►`
 * **Server**  replies with success code: `◄ 00`
 * **Client**  sends the "INFO" command: `49 4E 46 4F 00 ►`
 * **Server**  responds with the result "General Information...": `◄ 47 65 6e 65 ... 00`
 * **Server**  additionally sends an (empty) info string: `◄ 00`
 * **Client**  creates a new query instance for the XQuery "1, 2+'3'": `00 31 2C 20 32 2B 27 33 27 00 ►`
 * **Server**  returns query id "1" and a success code: `◄ 31 00 00`
 * **Client**  requests the query results via the RESULTS protocol command and its query id: `04 31 00 ►`
 * **Server**  returns the first result ("1", type xs:integer): `◄ 52 31 00`
 * **Server**  sends a single "\0" byte instead of a new result, which indicates that no more results can be expected: `◄ 00`
 * **Server**  sends the error code "\1" and the error message ("Stopped at..."): `◄ 01 53 74 6f ... 00`
 * **Client**  closes the query instance: `02 31 00 ►`
 * **Server**  sends a response (which is equal to an empty info string) and success code: `◄ 00 00`
 * **Client**  closes the socket connection 

## Constructors and Functions

Most language bindings provide the following constructors and functions: 


### Session
 * Create and return session with host, port, user name and password:`Session(String host, int port, String name, String password)`
 * Execute a command and return the result:`String execute(String command)`
 * Return a query instance for the specified query:`Query query(String query)`
 * Create a database from an input stream:`void create(String name, InputStream input)`
 * Add a document to the current database from an input stream:`void add(String path, InputStream input)`
 * Replace a document with the specified input stream:`void replace(String path, InputStream input)`
 * Store raw data at the specified path:`void store(String path, InputStream input)`
 * Watch the specified event:`void watch(String name, Event notifier)`
 * Unwatch the specified event:`void unwatch(String name)`
 * Return process information:`String info()`
 * Close the session:`void close()`

  
### Query
 * Create query instance with session and query:`Query(Session session, String query)`
 * Bind an external variable:`void bind(String name, String value, String type)`The type can be an empty string. 
 * Bind the context item:`void context(String value, String type)`The type can be an empty string. 
 * Execute the query and return the result:`String execute()`
 * Iterator: check if a query returns more items:`boolean more()`
 * Iterator: return the next item:`String next()`
 * Return query information:`String info()`
 * Return serialization parameters:`String options()`
 * Return if the query may perform updates:`boolean updating()`
 * Close the query:`void close()`

### Changelog
** Version 8.0 **

 * Updated: cram-md5 replaced with digest authentication 
 * Updated: `BIND` command: support more than one item 
** Version 7.2 **

 * Added: Query Commands CONTEXT, UPDATING and FULL 
 * Added: Client function `context(String value, String type)`


