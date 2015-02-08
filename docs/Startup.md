
# Startup
 


 
This article is part of the [Getting Started](Getting Started.md) Guide. It tells you how to get BaseX running. 

 
## Getting Started

First of all, [download](http://basex.org/download) BaseX from our homepage. The following distributions are available: 

 * the **Core Package** is a JAR file, which contains the database code, the query processor and the GUI frontend. 
 * the **ZIP Archive** and the **Windows Installer** contain libraries for web applications and advanced features, [Starts Scripts](/index.php?title=Starts_Scripts&action=edit&redlink=1), and some additional optional files. 
 * the **WAR Application** can be embedded in existing Java web servers. 

Some additional Linux distributions are available from the download page, which contain only the core package and, optionally, scripts for starting BaseX. 


BaseX can be run and used in various ways: 

 * as standalone application, using the [Graphical User Interface](Graphical User Interface.md) or the [Command-Line Interface](Standalone Mode.md), 
 * as [client/server](Database Server.md) application, or 
 * as [Web Application](Web Application.md), called from a web server. 

### Requirements

BaseX is platform independent and runs on any system that provides an implementation of [Java 1.6](http://www.java.com) (JRE). It has been tested on Windows (2000, XP, Vista, 7), Max OS X (10.x), Linux(SuSE xxx, Debian, Ubuntu) and OpenBSD (4.x). 


### Concurrent Operations

If you plan to perform concurrent read and write operations on a single database, the client/server architecture is the right choice. You may safely open the same database in different JVMs (Java virtual machines) for read-only access, and you won’t encounter any problems when reading from or writing to different databases, but your update operations will be rejected if the database to be written to is currently opened by another virtual machine. 


### BaseX GUI

The [GUI](http://docs.basex.org/wiki/Graphical User Interface) is the visual interface to the features of BaseX. It can be used to create new databases, perform queries or interactively explore your XML data. 


The GUI can be started as follows (get more information on all [Startup Options](Command-Line Options.md#Command-Line_OptionsBaseX_GUI)): 

 * Double click on the `BaseX.jar` file. 
 * Run one of the `basexgui` or `basexgui.bat` scripts. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseXGUI`
 * On _Windows_: Double click on the **BaseX GUI** icon. 
 * For [Maven](Maven.md) users: type in `mvn exec:java` in the main directory of the `basex` project. 

Note that the GUI does _not_ interact with the client/server architecture. 


### BaseX Standalone

The [Standalone Mode](Standalone Mode.md) can be used to execute XQuery expressions or run database commands on command line. It can also be used both for scripting and batch processing your XML data. 


The standalone version can be started as follows (get more information on all [Startup Options](Command-Line Options.md#Command-Line_OptionsBaseX_Standalone)): 

 * Run one of the `basex` or `basex.bat` scripts. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseX`
 * On _Windows_: Double click on the **BaseX** icon. 

Note that the standalone mode does _not_ interact with the client/server architecture. 


### BaseX Server

The [Database Server](Database Server.md) comes into play if BaseX is to be used by more than one user (client). It handles concurrent [read and write transactions](Transaction Management.md), provides [user management](User Management.md) and [logs all user interactions](Logging.md). 


By default, the server listens to the port `1984`. There are several ways of starting and stopping the server (get more information on all [Startup Options](Command-Line Options.md#Command-Line_OptionsBaseX_Server)): 

 * Run one of the `basexserver` or `basexserver.bat` scripts. Add the `stop` keyword to gracefully shut down the server. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseXServer`. Again, the `stop` keyword will ensure a graceful shutdown. 
 * On _Windows_: Double click on the **BaseX Server** icon, which will also start the [HTTP Server](Startup.md#StartupBaseX_HTTP_Server), or the **BaseX Server (stop)** icon. 

Pressing `Ctrl+c` will close all connections and databases and shut down the server process. 


### BaseX Client

The [BaseX Client](Database Server.md) interface can be used to send commands and queries to the server instance on command line. 


It can be started as follows (get more information on all [Startup Options](Command-Line Options.md#Command-Line_OptionsBaseX_Client)): 

 * Run one of the `basexclient` or `basexclient.bat` scripts. 
 * Execute the following command: `java -cp BaseX.jar org.basex.BaseXClient`
 * On _Windows_: Double click on the **BaseX Client** icon. 

The default `admin` user can be used to connect to the server: 

 * **Username:**`admin`
 * **Password:**`admin`

The password should be changed with the `PASSWORD` command after the first login. 


Please check out the article on the [Database Server](Database Server.md) for more details. 


### BaseX HTTP Server

The HTTP Server gives access to the [REST](REST.md), [RESTXQ](RESTXQ.md) and [WebDAV](WebDAV.md) Services of BaseX. By default, it starts an instance of the [Jetty Web Server](http://jetty.codehaus.org/jetty/), which by default listens to the port `8984`, and the BaseX Server, which listens to `1984`. 


To run the HTTP Server, you need to [download](http://basex.org/products/download/) one of the full distributions of BaseX (exe, zip, war), as the JAR version does not include any additionally required libraries. It can then be started as follows (get more information on all [Startup Options](Command-Line Options.md#Command-Line_OptionsBaseX_HTTP_Server)): 

 * Run one of the `basexhttp` or `basexhttp.bat` scripts. Call the script with the `stop` keyword to gracefully shut down the server. 
 * On _Windows_: Double click on the **BaseX Server** or **BaseX Server (stop)** icon. 
 * You can also deploy BaseX as a [Web Application](Web Application.md)
 * For Maven users: type in `mvn jetty:run` in the `basex-api` directory, and press `Ctrl+c` to shut down the process (see [Web Application: Maven](Web Application.md#Web_ApplicationMaven) for more details). 

After that, you can open your browser and navigate to the start page [http://localhost:8984](http://localhost:8984). 

 
## Changelog
UNKNOWN * Updated: BaseXJAXRX has been replaced with BaseXHTTP 
