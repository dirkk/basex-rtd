 


 
This article is part of the [Getting Started](Getting Started.md) Guide. It tells you how to get BaseX running. 

 
# Getting Started

First of all, [download](http://basex.org/download) BaseX from our homepage. The following distributions are available: 

 * the **Core Package** is a JAR file, which contains the database code, the query processor and the GUI frontend. It runs completely without additional libraries. 
 * the **ZIP Archive** and the **Windows Installer** contain libraries for web applications and advanced features, [Starts Scripts](/index.php?title=Starts_Scripts&action=edit&redlink=1), and some additional optional files. 
 * the **WAR Application** can be embedded in existing Java web servers. 

Some additional distributions are available from the download page, most of which contain only the core package and, optionally, scripts for starting BaseX. 


BaseX is very light-weight. It can be run and used in various ways: 

 * as standalone application, using the [Standalone](Startup.md#standalone) mode or the [Graphical User Interface](Startup.md#graphicaluser-interface), 
 * as [Client/Server](Startup.md#client.2fserver) application, or 
 * as [Web Application](Startup.md#startupwebapplication), called from a web server. 

It can also be embedded as library in your own application. 


## Requirements

BaseX is platform-independent and runs on any system that provides an implementation of [Java](http://www.java.com) (JRE). With Version 8.0 of BaseX, we switched to Java 7, because it provides better file handling support, and because Oracle stopped public support for older versions. 


BaseX has been tested on several platforms, including Windows (2000, XP, Vista, 7), Max OS X (10.x), Linux (SuSE xxx, Debian, Ubuntu) and OpenBSD (4.x). 


## Concurrent Operations

If you plan to perform concurrent read and write operations on a single database, you should use the client/server architecutre or deploy it as web application. You may safely open the same database in different JVMs (Java virtual machines) for read-only access, and you won’t encounter any problems when reading from or writing to different databases, but your update operations will be rejected if the database to be written to is currently opened by another virtual machine. 


## Standalone

The [Standalone Mode](Standalone Mode.md) can be used to execute XQuery expressions or run database commands on command line. It can also be used both for scripting and batch processing your XML data. It can be started as follows (get more information on all [Startup Options](Command-Line Options.md#basexstandalone)): 

 * Run one of the `basex` or `basex.bat` scripts. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseX`
 * On _Windows_: Double click on the **BaseX** icon. 

It is important to remember that the standalone mode does _not_ interact with the [Client/Server](Startup.md#client.2fserver) architecture. 


## Graphical User Interface

The [GUI](http://docs.basex.org/wiki/Graphical User Interface) is the visual interface to the features of BaseX. It can be used to create new databases, perform queries or interactively explore your XML data. 


The GUI can be started as follows (get more information on all [Startup Options](Command-Line Options.md#basexgui)): 

 * Double click on the `BaseX.jar` file. 
 * Run one of the `basexgui` or `basexgui.bat` scripts. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseXGUI`
 * On _Windows_: Double click on the **BaseX GUI** icon. 
 * For [Maven](Maven.md) users: type in `mvn exec:java` in the main directory of the `basex` project. 

Note that the GUI does _not_ interact with the client/server architecture. 


## Client/Server

### Server

The [Database Server](Database Server.md) comes into play if BaseX is to be used by more than one user (client). It handles concurrent [read and write transactions](Transaction Management.md), provides [user management](User Management.md) and [logs all user interactions](Logging.md). 


By default, the server listens to the port `1984`. There are several ways of starting and stopping the server (get more information on all [Startup Options](Command-Line Options.md#basexserver)): 

 * Run one of the `basexserver` or `basexserver.bat` scripts. Add the `stop` keyword to gracefully shut down the server. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseXServer`. Again, the `stop` keyword will ensure a graceful shutdown. 
 * On _Windows_: Double click on the **BaseX Server** icon, which will also start the [HTTP Server](Command-Line Options.md#basexhttp-server), or the **BaseX Server (stop)** icon. 

Pressing `Ctrl+c` will close all connections and databases and shut down the server process. 


### Client

The [BaseX Client](Database Server.md) interface can be used to send commands and queries to the server instance on command line. 


It can be started as follows (get more information on all [Startup Options](Command-Line Options.md#basexclient)): 

 * Run one of the `basexclient` or `basexclient.bat` scripts. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseXClient`
 * On _Windows_: Double click on the **BaseX Client** icon. 

The default `admin` user can be used to connect to the server: 

 * **Username:**`admin`
 * **Password:**`admin`

The password should be changed with the `PASSWORD` command after the first login. 


We provide various [Clients](Clients.md) (language bindings), which allow you to communicate with BaseX from other programming lanaguges. 


## Web Application

With the HTTP Server, BaseX can be used as [Web Application](Web Application.md). By default, an instance of the [Jetty Web Server](http://jetty.codehaus.org/jetty/) is started, which listens to the port `8984`, and the BaseX Server, which listens to `1984`. 


To run the HTTP Server, you need to [download](http://basex.org/products/download/) one of the full distributions of BaseX (exe, zip, war), as the JAR version does not include any additionally required libraries. It can then be started as follows (get more information on all [Startup Options](Command-Line Options.md#basexhttp-server)): 

 * Run one of the `basexhttp` or `basexhttp.bat` scripts. Call the script with the `stop` keyword to gracefully shut down the server. 
 * On _Windows_: Double click on the **BaseX Server** or **BaseX Server (stop)** icon. 
 * You can also deploy BaseX as a [Web Application](Web Application.md)
 * For Maven users: type in `mvn jetty:run` in the `basex-api` directory, and press `Ctrl+c` to shut down the process (see [Web Application: Maven](Web Application.md#webapplicationmaven) for more details). 

After that, you can open your browser and navigate to the start page [http://localhost:8984](http://localhost:8984). 

 
# Changelog
** Version 8.0 **

 * Update: Switched to Java 7 
** Version 7.0 **

 * Updated: BaseXJAXRX has been replaced with BaseXHTTP 
