
# Transaction Management
 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). The BaseX client-server architecture offers ACID safe transactions, with multiple readers and writers. Here are some more informations about the transaction management. 

 
## Transaction

In a nutshell, a transaction is equal to a command or query. So each command or query sent to the server becomes a transaction. 


Incoming requests are parsed and checked for errors on the server. If the command or query is not correct, the request will not be executed, and the user will receive an error message. Otherwise the request becomes a transaction and gets into the transaction monitor. 


Note: An unexpected abort of the server during a transaction, caused by a hardware failure or power cut, may lead to an inconsistent database state if a transaction was active at the shutdown time. So we advise to use the [BACKUP](Commands.md#CREATE_BACKUP) command to backup your database regularly. If the worst case occurs, you can try the [INSPECT](Commands.md#INSPECT) command to check if your database has obvious inconsistencies, and [RESTORE](Commands.md#RESTORE) to restore a previous version of the database. 


### Update Transactions

Many update operations are triggered by [XQuery Update](http://docs.basex.org/wiki/XQuery Update) expressions. When executing an updating query, all update operations of the query are stored in a pending update list. They will be executed all at once, so the database is updated atomically. If any of the update sub-operations is erroneous, the overall transaction will be aborted. 

 
## Concurrency Control

BaseX provides locking on database level. Writing transactions do not necessarily block all other transactions any more. The number of parallel transactions can be limited by setting the [PARALLEL](Options.md#PARALLEL) option. 


### Transaction Monitor

The transaction monitor ensures that just one writing transaction or an arbitrary amount of reading transactions _per database_ are active at the same time. 


Deadlocks are prevented by using preclaiming two phase locking. Execution is starvation-free as lock acquisition is queued per database. Due to the specifics of XQuery Update, all updates are written at the end of the query. Locking is strict with the exception that databases for which BaseX recognizes it will not write to are downgraded to read locks. 


Locks are not synchronized between multiple BaseX instances. We generally recommend working with the client/server architecture if concurrent write operations are to be performed. 


### External Side Effects

Access to external resources (files on hard disk, HTTP requests, ...) is not controlled by BaseX' transaction monitor unless specified by the user. 


#### XQuery Locking Options

Custom locks can be acquired by setting the BaseX-specific XQuery options `query:read-lock` and `query:write-lock`. Multiple option declaration may occur in the prolog of a query, but multiple values can also be separated with commas in a single declaration. These locks are in another namespace than the database names: the lock value `factbook` will not lock a database named factbook. 


These option declarations will put read locks on _foo_, _bar_ and _batz_ and a write lock on _quix_: 


    declare option query:read-lock "foo,bar";
    declare option query:read-lock "batz";
    declare option query:write-lock "quix";


#### Java Modules

Locks can also be acquired on [Java functions](Java Bindings.md#Java_BindingsLocking) which are imported and invoked from an XQuery expression. It is advisable to explicitly lock Java code whenever it performs sensitive read and write operations. 


### Limitations

#### Commands

Database locking works with all commands unless no glob syntax is used, such as in the following command call: 

 * `DROP DB new*` : drop all databases starting with "new"

#### XQuery

As XQuery is a very powerful language, deciding which databases will be accessed by a query is non-trivial. Optimization is work in progress. The current identification of which databases to lock is limited to queries that access the currently opened database, XQuery functions that explicitly specify a database, and expressions that address no database at all. 


Some examples on database-locking enabled queries, all of these can be executed in parallel: 

 * `//item` , read-locking of the database opened by a client 
 * `doc('factbook')` , read-locking of "factbook"
 * `collection('db/path/to/docs')` , read-locking of "db"
 * `fn:sum(1 to 100)` , locking nothing at all 
 * `delete nodes doc('test')//*[string-length(local-name(.)) > 5]` , write-locking of "test"

Some examples on queries that are not supported by database-locking yet: 

 * `let $db := 'factbook' return doc($db)` , will read-lock: referencing database names isn’t supported yet 
 * `for $db in ('factbook') return doc($db)` , will read-lock globally 
 * `doc(doc('test')/reference/text())` , will read-lock globally 
 * `let $db := 'test' return insert nodes <test/> into doc($db)` , will write-lock globally 

A list of all locked databases is output if `QUERYINFO` is set to `true`. If you think that too much is locked, please give us a note on our [mailing list](http://basex.org/open-source/) with some example code. 


#### GUI

Database locking is currently disabled if the BaseX GUI is used. 


### Process Locking

In order to enable locking on global (process) level, the option `GLOBALLOCK` can be set to `true`. This can e.g. be done by editing your `.basex` file (see [Options](Options.md) for more details). If process locking is active, a process that performs write operations will queue all other operations. 

 
## File-System Locks

### Update Operations

During the term of a database update, a locking file `upd.basex` will reside in that database directory. If the update fails for some unexpected reason, or if the process is killed ungracefully, this file may not be deleted. In this case, the database cannot be opened anymore using the default commands, and the message "Database ... is being updated, or update was not completed" will be shown instead. If the locking file is manually removed, you may be able to reopen the database, but you should be aware that database may have got corrupt due to the interrupted update process, and you should revert to the most recent database backup. 


### Database Locks

To avoid database corruptions caused by write operations running in different JVMs, a shared lock is requested on the database table file (`tbl.basex`) whenever a database is opened. If an update operation is triggered, it will be rejected with the message "Database ... is opened by another process." if no exclusive lock can be acquired. 


As the standalone versions of BaseX (command-line, GUI) cannot be synchronized with other BaseX instances, we generally recommend working with the client/server architecture if concurrent write operations are to be performed. 

 
## Changelog
UNKNOWN * Added: Locks can also be acquired on [Java functions](Java Bindings.md#Java_BindingsLocking). 
UNKNOWN * Added: database locking introduced, replacing process locking. 
UNKNOWN * Updated: pin files replaced with shared/exclusive filesystem locking. 
UNKNOWN * Added: pin files to mark open databases. 
UNKNOWN * Added: update lock files. 
