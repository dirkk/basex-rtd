
# Java Examples
 


 
This page is part of the [Developer Section](Developing.md). The following Java code snippets demonstrate how easy it is to run database commands, create collections, perform queries, etc. by integrating the BaseX code. Most examples are taken from our [basex-examples](https://github.com/BaseXdb/basex-examples/tree/master/src/main/java/org/basex/examples) repository, in which you will find some more use cases. 

 
## Local Examples

The following code snippets work in _embedded_ mode; they do not rely on an additional server instance: 

 * [RunCommands.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/RunCommands.java) creates and drops database and index instances, prints a list of all existing databases. 
 * [RunQueries.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/RunQueries.java) shows three variants of running queries. 
 * [BindContext.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/BindContext.java) demonstrates how a value can be bound as context item. 
 * [BindVariables.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/BindVariables.java) demonstrates how a value can be bound to a variable. 
 * [CreateCollection.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/CreateCollection.java) creates and manages a collection. 
 * [QueryCollection.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/QueryCollection.java) creates, runs queries against it and drops a collection. 
 * [WikiExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/local/WikiExample.java) creates a database from an url (wiki instance), runs a query against it and drops the database. 

### Server Examples

The examples below take advantage of the client/server architecture: 

 * [ServerCommands.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/server/ServerCommands.java) launches server-side commands using a client session. 
 * [ServerAndLocal.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/server/ServerAndLocal.java) processes server results locally. 
 * [ServerConcurrency.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/server/ServerConcurrency.java) runs concurrent queries. 
 * [ServerQueries.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/server/ServerQueries.java) shows how iterative queries can be performed. 
 * [ServerEventsGUI.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/server/ServerEventsGUI.java) is a little GUI example for demonstrating database events. 
 * [UserExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/server/UserExample.java) manages database users. 

### XQuery Module Examples

BaseX provides [Java Bindings](Java Bindings.md) for accessing external Java code via XQuery functions. The following examples show how this feature can be utilized: 

 * [FruitsExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/module/FruitsExample.java) demonstrates how Java classes can be imported as XQuery modules. 
 * [FruitsModule.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/module/FruitsModule.java) is a simple demo module called by `FruitsExample`. 
 * [ModuleDemo.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/module/ModuleDemo.java) is a simple XQuery demo module that demonstrates how XQuery items can be processed from Java. It is derived from the `QueryModule` class. 
 * [QueryModule.java](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/query/QueryModule.java) is located in the BaseX core. Java query modules can extend this class to get access to the current query context and enrich functions with properties (). 

  
### XQJ API
 The implementation of the [BaseX XQJ API](http://xqj.net/basex/) (closed-source) has been written by Charles Foster. It uses the client/server architecture. The basex-examples repository contains [various examples](https://github.com/BaseXdb/basex-examples/tree/master/src/main/java/org/basex/examples/xqj) on how to use XQJ. 


### [Client API](Clients.md)
 * [BaseXClient.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/BaseXClient.java) provides an implementation of the [Server Protocol](Server Protocol.md). 
 * [Example.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/Example.java) demonstrates how commands can be executed on a server. 
 * [QueryExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/QueryExample.java) shows how queries can be executed in an iterative manner. 
 * [QueryBindExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/QueryBindExample.java) shows how external variables can be bound to XQuery expressions. 
 * [CreateExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/CreateExample.java) shows how new databases can be created. 
 * [AddExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/AddExample.java) shows how documents can be added to databases, and how existing documents can be replaced. 
 * [EventExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/EventExample.java) demonstrates how to trigger and receive database events. 
 * [BinaryExample.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/api/BinaryExample.java) shows how binary resource can be added to and retrieved from the database. 

### [REST API](REST.md)
 * [RESTGet.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/rest/RESTGet.java) presents the HTTP GET method. 
 * [RESTPost.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/rest/RESTPost.java) presents the HTTP POST method. 
 * [RESTPut.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/rest/RESTPut.java) presents the HTTP PUT method. 
 * [RESTAll.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/rest/RESTAll.java) runs all examples at one go. 

### XML:DB API (deprecated)

Note that the XML:DB API does not talk to the server and can thus only be used in embedded mode. 

 * [XMLDBCreate.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/xmldb/XMLDBCreate.java) creates a collection using XML:DB. 
 * [XMLDBQuery.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/xmldb/XMLDBQuery.java) runs a query using XML:DB. 
 * [XMLDBInsert.java](https://github.com/BaseXdb/basex/blob/master/basex-examples/src/main/java/org/basex/examples/xmldb/XMLDBInsert.java) inserts a document into a database using XML:DB. 
