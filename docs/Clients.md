
# Clients
 


 
This page is part of the [Developer Section](Developing.md). It describes how to communicate with BaseX with other programming languages. 

 
Please note that with Version 8.0, we have switched from cram-md5 to digest authentication. If a language binding does not work anymore, it will need to be slightly updated. Please have a look at our [Server Protocol](Server Protocol.md) for more information on the exchanged bytes. Your contributions are welcome! 

 
You can use the following light-weight language bindings to connect to a running BaseX server instance, execute database commands, perform queries, or listen to events. 

 
Most clients provide two modes: 

  * [Standard Mode](Standard Mode.md) : connecting to a server, sending commands 
 * [Query Mode](Query Mode.md) : defining queries, binding variables, iterative evaluation 
 
Currently, we offer bindings for the following programming languages: 

 
**BaseX 7.x, BaseX 8.x and later** * [Java](https://github.com/BaseXdb/basex/tree/master/basex-examples/src/main/java/org/basex/examples/api) : The default implementation 
 * [C++](https://github.com/JohnLeM/BasexCPPAPI/) : contributed by Jean-Marc Mercier 
 * [node.js](https://github.com/apb2006/basex-node) : contributed by Andy Bunce 
 * [Perl](https://github.com/BaseXdb/basex/tree/master/basex-api/src/main/perl) , contributed by the BaseX Team 
 * [PHP](https://github.com/BaseXdb/basex/tree/master/basex-api/src/main/php) : updated by James Ball 
 * [Python 3.x, 2.7.3](https://github.com/BaseXdb/basex/tree/master/basex-api/src/main/python3) : contributed by Hiroaki Itoh 
 * [Python](https://github.com/lucalianas/pyBaseX) , using BaseX REST services: contributed by Luca Lianas 
 * [Ruby](https://github.com/BaseXdb/basex/tree/master/basex-api/src/main/ruby) , contributed by the BaseX Team 

 ...more to come (your contributions are welcome!)  | **BaseX 7.x** (outdated)  * [ActionScript](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/as) : contributed by Manfred Knobloch 
 * [C](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/c) , contributed by the BaseX Team 
 * [C#](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/c%23) , contributed by the BaseX Team 
 * [Golang](https://github.com/programaths/go-basex) : contributed by Christian Baune 
 * [Haskell](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/haskell) : contributed by Leo Wörteler 
 * [Lisp](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/lisp) : contributed by Andy Chambers 
 * [node.js](https://github.com/hanshuebner/simple-basex) : contributed by Hans Hübner (deviating from client API) 
 * [Python < 2.7](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/python) : improved by Arjen van Elteren 
 * [Qt](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/qt) : contributed by Hendrik Strobelt 
 * [Rebol](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/rebol) : contributed by Sabu Francis 
 * [Scala](https://github.com/delving/basex-scala-client) : contributed by Manuel Bernhardt 
 * [Scala](https://github.com/BaseXdb/basex/tree/7.9/basex-api/src/main/scala)  (simple implementation) 
 * [VB](https://github.com/BaseXdb/basex/tree/master/basex-api/src/main/vb) , contributed by the BaseX Team 

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
Many of the interfaces contain the following files: 

  * `BaseXClient`  contains the code for creating a session, sending and executing commands and receiving results. An inner `Query` class facilitates the binding of external variables and iterative query evaluation. 
 * `Example`  demonstrates how to send database commands. 
 * `QueryExample`  shows you how to evaluate queries in an iterative manner. 
 * `QueryBindExample`  shows you how to bind a variable to your query and evaluates the query in an iterative manner. 
 * `CreateExample`  shows how new databases can be created by using streams. 
 * `AddExample`  shows how documents can be added to a database by using streams. 
 * `EventExample`  demonstrates how to watch and unwatch [Events](Events.md). 
 
## Changelog
** Version 8.0 **

 * Updated: cram-md5 replaced with digest authentication 
