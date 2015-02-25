 


 
This step by step tutorial is part of the [Getting Started](Getting Started.md) Guide. It shows you how to run BaseX in client-server mode from a terminal. You can copy and paste all commands to get them running on your machine. After you finished this tutorial, you will be familiar with the basic administration of BaseX. Visit the [commands section](Commands.md) for a complete list of database commands. 

 
# Startup

First, launch a **Server** and **Client** instance of BaseX: double click on the **BaseX Server/Client** icons, or run the `basexserver` and `basexclient` scripts. [Follow this link](.md) for more information (or check out the additional [command-line options](Command-Line Options.md#BaseX_Server)). 


## Create a database
 * To create a database you need an XML document, e.g. [factbook.xml](http://files.basex.org/xml/factbook.xml). 
 * Save this document to the directory you are working in. 
 * In the client terminal, type in: 

` > CREATE DB factbook factbook.xml `

** **


If everything works you see the following lines: 


    Database 'factbook' created in 950.83 ms.

** Where is the database stored? **


By default, databases are stored in the `BaseXData` directory, which is located in your home folder. Depending on your [Configuration](Configuration.md), the location of your home folder varies. For example, on a Mac it's `/Users/John`, if your name is John. If you have used the Windows Installer, the directory will be named `data`, and reside in the application directory. 


## Execute a query

The [XQUERY](Commands.md#XQUERY) command lets you run a query. 

 * For example, this query returns all country nodes in the currently opened database. 

` > XQUERY //country `

 * You can also run queries in files: 

` > RUN /Users/John/query.xq `


## Create a new database

Now we will create another database from the [xmark.xml](http://files.basex.org/xml/xmark.xml) document. 

 * Create the new database, named 'xmark'. 

` > CREATE DB xmark xmark.xml `

 * Set the new database xmark as the context: 

` > OPEN xmark `

 * Now you can easily execute queries on your new database: 

` > XQUERY //people/person/name `


## Switch the database
 * You can explicitly query the factbook database with the `doc(...)` funtion, no matter what the current context is. 

` > XQUERY doc("factbook")//country `

 * Otherwise, to set factbook as the current context, execute the following: 

` > OPEN factbook `

 * The following command lists all databases than can be opened by the currently logged in users: 

` > LIST`


## Close or delete a database
 * To [close](Commands.md) the current context database, please type: 

` > CLOSE`

 * Use the [DROP DB](Commands.md#DROP_DB) command to delete the xmark database: 

` > DROP DB xmark `


## Create a collection

**What is a collection?** With BaseX you can group documents into one logical collection. A collection is a database that contains two or more documents. Collections accept any type of XML documents, regardless of their structure. 


Let's add the xmark.xml document to the factbook database to create a collection. The name of the original factbook database remains. 

 * First make sure factbook is opened: 

` > OPEN factbook `

 * Now add the xmark.xml document: 

` > ADD xmark.xml `


## Delete a document
 * Deleting a document from a collection is easy: 

` > DELETE xmark.xml `


Make sure that the collection, which contains the **xmark.xml** document, is opened. 


## Delete a collection

Deleting a collection is the same as deleting a database. 

 * To delete the collection factbook, type: 

` > DROP DB factbook `


## Get server information

Several commands help to explore the state of a server. For a complete list, please visit the [Commands](Commands.md) Section. 

 * To see all databases on the server, type: 

` > LIST`

 * To see the general information of the opened database, type: 

` > INFO`

 * To list all sessions that are managed by the server instance, type: 

` > SHOW USERS`


## Backup and restore
 * To backup your database, type: 

` > CREATE BACKUP factbook `

 * To restore your database, type: 

` > RESTORE factbook `


**Where is the backup-file stored?**


The backup-file is stored in the database directory. The file is named `factbook-timestamp.zip` (`db_name-timestamp.zip`). To restore the database the file with the newest timestamp is taken. 


## See also 

[Standalone Mode](Standalone Mode.md), [GUI](http://docs.basex.org/wiki/Graphical User Interface), [Getting Started](Getting Started.md), [Advanced Usage](http://docs.basex.org/wiki/Advanced User's Guide)

