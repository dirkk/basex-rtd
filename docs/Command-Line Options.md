 


 
This article is part of the [Getting Started](Getting Started.md) Guide. It gives more details on the command-line options of all BaseX [Startup](Startup.md) modes. 

 
Options can be specified multiple times. All options are evaluated in the given order (in earlier versions, the sequential evaluation was limited to the specified inputs, query files, queries and commands, while all other options were initially set). The standard input can be parsed by specifying a single dash (`-`) as argument. 

 
# BaseX Standalone
** Launch the console mode**


    $ basex
    BaseX [Standalone]
    Try "help" to get more information.
    > _


Available command-line flags can be listed with `-h`: 


    $ basex -h
    BaseX [Standalone]
    Usage: basex [-bcdiLoqrRsuvVwxXz] [input]
      [input]     Execute input file or expression
      -b<pars>    Bind external query variables
      -c<input>   Execute commands from file or string
      -d          Activate debugging mode
      -i<input>   Open initial file or database
      -L          Append newlines to query results
      -o<output>  Write output to file
      -q<expr>    Execute XQuery expression
      -r<num>     Set number of query executions
      -R          Turn query execution on/off
      -s<pars>    Set serialization parameter(s)
      -t[path]    Run tests in file or directory
      -u          Write updates back to original files
      -v/V        Show (all) process info
      -w          Preserve whitespaces from input files
      -x          Show query execution plan
      -X          Show query plan before/after compilation
      -z          Skip output of results


The meaning of all flags is listed in the following table. If an equivalent database option exists (which can be specified via the [SET](Commands.md#SET) command), it is listed as well. For the examples to work escaping some characters might be necessary, depending on your Operating System. 


** Flag ** | ** Description ** | ** Option ** | ** Default ** | ** Examples **
---------- | ----------------- | ------------ | ------------- | --------------
`[input]` | Evaluates the specified input:  * The input string may point to an existing file. If the file suffix is `.bxs`, the file content will be evaluated as [Command Script](Commands.md#Basics); otherwise, it will be evaluated as XQuery expression. 
 * Otherwise, the input string itself is evaluated as XQuery expression. 
 |  |  | • `"doc('X')//head"`• `query.xq`• `commands.bxs`
`-b<pars>` |  Binds external variables to XQuery expressions. This flag may be specified multiple times. Variables names and their values are delimited by equality signs (`=`). The names may be optionally prefixed with dollar signs. If a variable uses a namespace different to the default namespace, it can be specified with the [Clark Notation](http://www.jclark.com/xml/xmlns.htm).  | `BINDINGS` |  | • `-b$v=example "declare variable $v external; $v"`• `-b{URL}ln=value"declare namespace ns='URL'; declare variable $ns:ln external; $ns:ln"`
`-c<input>` |  Executes [Commands](Commands.md):  * Several commands in the input can be separated by semicolons (`;`). 
 * If the specified input is a valid file reference or URL, its content will be executed instead. Empty lines and lines starting with the number sign `#` will be ignored. 
 |  |  | • `-c"list;info"`• `-ccommands.txt`• `-c"<info/>"`
`-d` |  Toggles the debugging mode. Debugging information is output to _standard error_.  | `DEBUG` | `false` | 
`-i<input>` |  Opens a database or XML document specified by the argument. The opened input may be further processed by an XQuery expression.  |  |  | `-iitems.xml "//item"`
`-L` |  Separates returned query items by newlines (instead of spaces) and appends a newline to the end of a result.  |  |  | 
`-o<file>` |  All command and query output is written to the specified file.  |  |  | `-o output.txt`
`-q<expr>` |  Executes the specified string as XQuery expression.  |  |  | `-q"doc('input')//head"`
`-r<num>` |  Specifies how often a specified query will be evaluated.  | `RUNS` | `1` | `-V -r10 "1"`
`-R` |  Specifies if a query will be executed or parsed only.  | `RUNQUERY` | `true` | `-V -R "1"`
`-s<pars>` |  Specifies parameters for serializing XQuery results; see [Serialization](Serialization.md) for more details. This flag may be specified multiple times. Key and values are separated by the equality sign (`=`).  | `SERIALIZER` |  | `-smethod=text`
`-t` |  Runs all [Unit tests](Unit Module.md) in the specified file or directory. Introduced with Version 7.9 |  |  |  -t project/tests 
`-u` |  Propagates updates on input files back to disk.  | `WRITEBACK` | `false` | 
`-v` |  Prints process and timing information to the _standard output_.  |  | `false` | 
`-V` |  Prints detailed query information to the _standard output_, including details on the compilation and profiling steps.  | `QUERYINFO` | `false` | 
`-w` |  Specifies if whitespaces in XML text nodes should be chopped (which is the default) or preserved.  | `CHOP` | `true` | 
`-x` |  This flags turn on the output of the query execution plan, formatted in [XML](Options.md#XMLPLAN).  | `XMLPLAN` | `false` | 
`-X` |  Generates the query plan before or after query compilation. `-x` needs to be activated to make the plan visible.  | `COMPPLAN` | `true` | 
`-z` |  Turns the serialization of XQuery results on/off. This flag is useful if the query is profiled or analyzed.  | `SERIALIZE` | `true` | 
 
# BaseX Server
** Launch the server **


    $ basexserver
    BaseX [Server]
    Server was started (port: 1984)


Available command-line flags can be listed with `-h`: 


    $ basexserver -h
    BaseX [Server]
    Usage: basexserver [-cdeinpSz] [stop]
      stop      Stop running server
      -c<cmds>  Execute initial database commands
      -d        Activate debugging mode
      -e<port>  Set event port
      -n<name>  Set host the server is bound to
      -p<port>  Set server port
      -S        Start as service
      -z        Suppress logging


The flags have the following meaning (equivalent database options are shown in the table as well). For the examples to work escaping some characters might be necessary, depending on your Operating System. 


** Flag ** | ** Description ** | ** Option ** | ** Default ** | ** Examples **
---------- | ----------------- | ------------ | ------------- | --------------
`stop` |  Stops an existing server instance and quits.  |  | 
`-c<cmd>` |  Launches database commands before the server itself is started. Several commands can be separated by semicolons (`;`).  |  |  | `-c"open database;info"`
`-d` |  Turns on the debugging mode. Debugging information is output to _standard error_.  | `DEBUG` | `false` | 
`-e<num>` |  Specifies the port on which the server will send events to clients.  | `EVENTPORT` | `1985` | `-e9998`
`-n<name>` |  Specifies the host the server will be bound to.  | `SERVERHOST` |  | `-p127.0.0.1`
`-p<num>` |  Specifies the port on which the server will be addressable.  | `SERVERPORT` | `1984` | `-p9999`
`-S` |  Starts the server as service (i.e., in the background).  |  | 
`-z` |  Does not generate any [log files](Logging.md).  | `LOG` | `true` | 

Multiple `-c` and `-i` flags can be specified. All other options will be set before any other operation takes place. The specified inputs, query files, queries and commands will be subsequently evaluated after that in the given order. The standard input can be parsed by specifying a single dash (`-`) as argument. 

 
# BaseX Client
** Launch the console mode communicating with the server **


The user name and password will be requested. The default user/password combination is **admin**/**admin**: 


    $ basexclient
    Username: admin
    Password: *****
    BaseX [Client]
    Try "help" to get more information.
    > _


Available command-line flags can be listed with `-h`: 


    $ basexclient -h
    BaseX [Client]
    Usage: basexclient [-bcdiLnopPqrRsUvVwxXz] [input]
      [input]     Execute input file or expression
      -b<pars>    Bind external query variables
      -c<input>   Execute commands from file or string
      -d          Activate debugging mode
      -i<input>   Open initial file or database
      -L          Append newlines to query results
      -n<name>    Set server (host) name
      -o<output>  Write output to file
      -p<port>    Set server port
      -P<pass>    Specify user password
      -q<expr>    Execute XQuery expression
      -r<num>     Set number of query executions
      -R          Turn query execution on/off
      -s<pars>    Set serialization parameter(s)
      -U<name>    Specify user name
      -v/V        Show (all) process info
      -w          Preserve whitespaces from input files
      -x          Show query execution plan
      -X          Show query plan before/after compilation
      -z          Skip output of results


The flags have the following meaning (equivalent database options are shown in the table as well). For the examples to work escaping some characters might be necessary, depending on your Operating System. 


** Flag ** | ** Description ** | ** Option ** | ** Default ** | ** Examples **
---------- | ----------------- | ------------ | ------------- | --------------
`[input]` | Evaluates the specified input:  * The input string may point to an existing file. If the file suffix is `.bxs`, the file content will be evaluated as [Command Script](Commands.md#Basics); otherwise, it will be evaluated as XQuery expression. 
 * Otherwise, the input string itself is evaluated as XQuery expression. 
 |  |  | • `"doc('X')//head"`• `query.xq`• `commands.bxs`
`-b<pars>` |  Binds external variables to XQuery expressions. This flag may be specified multiple times. Variables names and their values are delimited by equality signs (`=`). The names may be optionally prefixed with dollar signs. If a variable uses a namespace different to the default namespace, it can be specified with the [Clark Notation](http://www.jclark.com/xml/xmlns.htm) or [Expanded QName Notation](http://www.w3.org/TR/xquery-30/#id-basics).  | `BINDINGS` |  | • `-b$v=example "declare variable $v external; $v"`• `-b{URL}ln=value"declare namespace ns='URL'; declare variable $ns:ln external; $ns:ln"`
`-c<input>` |  Executes [Commands](Commands.md):  * Several commands in the input can be separated by semicolons (`;`). 
 * If the specified input is a valid file reference or URL, its content will be executed instead. Empty lines and lines starting with the number sign `#` will be ignored. 
 |  |  | • `-c"list;info"`• `-ccommands.txt`• `-c"<info/>"`
`-d` |  Toggles the debugging mode. Debugging information is output to _standard error_.  | `DEBUG` | `false` | 
`-i<input>` |  Opens a database or XML document specified by the argument. The opened input may be further processed by an XQuery expression.  |  |  | `-iitems.xml "//item"`
`-L` |  Separates returned query items by newlines (instead of spaces) and appends a newline to the end of a result.  |  | 
`-n<name>` |  Specifies the host name on which the server is running.  | `HOST` | `localhost` | `-nserver.basex.org`
`-o<file>` |  All command and query output is written to the specified file.  |  |  | 
`-p<num>` |  Specifies the port on which the server is running.  | `PORT` | `1984` | `-p9999`
`-P<pass>` |  Specifies the user password. If this flag is omitted, the password will be requested on command line. _Warning_: when the password is specified with this flag, it may get visible to others.  | `PASSWORD` |  | `-Uadmin -Padmin`
`-q<expr>` |  Executes the specified string as XQuery expression.  |  | `-q"doc('input')//head"`
`-r<num>` |  Specifies how often a specified query will be evaluated.  | `RUNS` | `1` | `-V -r10 "1"`
`-R` |  Specifies if a query will be executed or parsed only.  | `RUNQUERY` | `true` | `-V -R "1"`
`-s<pars>` |  Specifies parameters for serializing XQuery results; see [Serialization](Serialization.md) for more details. This flag may be specified multiple times. Key and values are separated by the equality sign (`=`).  | `SERIALIZER` |  | `-smethod=text`
`-U<name>` |  Specifies the user name. If this flag is omitted, the user name will be requested on command line.  | `USER` |  | `-Uadmin`
`-v` |  Prints process and timing information to the _standard output_.  |  | `false` | 
`-V` |  Prints detailed query information to the _standard output_, including details on the compilation and profiling steps.  | `QUERYINFO` | `false` | 
`-w` |  Specifies if whitespaces in XML text nodes should be chopped (which is the default) or preserved.  | `CHOP` | `chop` | 
`-x` |  This flags turn on the output of the query execution plan, formatted in [XML](Options.md#XMLPLAN).  | `XMLPLAN` | `false` | 
`-X` |  Generates the query plan before or after query compilation. `-x` needs to be activated to make the plan visible.  | `COMPPLAN` | `after` | 
`-z` |  Turns the serialization of XQuery results on/off. This flag is useful if the query is profiled or analyzed.  | `SERIALIZE` | `true` | 
 
# BaseX HTTP Server
** Launch the HTTP server**


    $ basexhttp
    BaseX [Server]
    Server was started (port: 1984)
    HTTP Server was started (port: 8984)


Available command-line flags can be listed with `-h`: 


    $ basexhttp -h
    BaseX [HTTP]
    Usage: basexhttp [-dehlnpPRUWz] [stop]
      stop      Stop running server
      -d        Activate debugging mode
      -e<port>  Set event port
      -h<port>  Set port of HTTP server
      -l        Start in local mode
      -n<name>  Set host name of database server
      -p<port>  Set port of database server
      -P<pass>  Specify user password
      -s<port>  Specify port to stop HTTP server
      -S        Start as service
      -U<name>  Specify user name
      -z        Suppress logging


The flags have the following meaning (equivalent database options are shown in the table as well). For the examples to work escaping some characters might be necessary, depending on your Operating System. 


** Flag ** | ** Description ** | ** Option ** | ** Default ** | ** Examples **
---------- | ----------------- | ------------ | ------------- | --------------
`stop` |  Stops a running HTTP server. By default, the database server will be stopped as well, unless `-l` has been specified.  | `pom.xml` |  | 
`-d` |  Turns on the debugging mode. Debugging information is output to _standard error_.  | `DEBUG` |  | 
`-e<num>` |  Specifies the port on which the server will send events to clients.  | `EVENTPORT` | `1985` | `-e9998`
`-h<num>` |  Specifies the port on which the HTTP server will be addressable.  | `jetty.xml` | `8984` | `-h9999`
`-l` |  Starts the server in _local mode_, and executes all commands in the embedded database context.  | `HTTPLOCAL` |  | 
`-n<name>` |  Specifies the host name on which the server is running.  | `HOST` | `localhost` | `-nserver.basex.org`
`-p<num>` |  Specifies the port on which the database server will be addressable.  | `SERVERPORT` | `1984` | `-p9998`
`-P<pass>` |  Specifies a user password, which will be used by the HTTP services to open a new session. If this flag is omitted, and if `-U` was specified, the password will be requested on command line. _Warning_: when the password is specified with this flag, it may get visible to others.  | `PASSWORD` |  | `-Uadmin -Padmin`
`-s<num>` |  Specifies the port that will be used to stop the HTTP server.  | `STOPPORT` or`pom.xml` | `8983` | 
`-S` |  Starts the server as service (i.e., in the background).  |  | 
`-U<name>` |  Specifies a user name, which will be used by the HTTP services for opening a new session.  | `USER` |  | `-Uadmin`
`-z` |  Does not generate any [log files](Logging.md).  | `LOG` | 
 
# BaseX GUI
** Launch the GUI**


    $ basexgui [file]


One or more XML and XQuery files can be passed on as parameters. If an XML file is specified, a database instance is created from this file, or an existing database is opened. XQuery files are opened in the XQuery editor. 

 
# Changelog
** Version 7.9 **

 * Added: Runs tests in file or directory with `-t`. 
 * Removed: interactive server mode. 
** Version 7.8 **

 * Added: Specify if a query will be executed or parsed only with `-R`. 
** Version 7.7 **

 * Added: Bind host to the [BaseX Server](Command-Line Options.md#Command-Line_OptionsBaseX_Server) with `-n`. 
** Version 7.5 **

 * Added: detection of [Command Scripts](Commands.md#Basics). 
 * Removed: HTTP server flags `-R`, `-W`, and `-X`. 
** Version 7.3**

 * Updated: all options are now evaluated in the given order. 
 * Updated: Create main-memory representations for specified sources with `-i`. 
 * Updated: Options `-C`/`-c` and `-q`/`[input]` merged. 
 * Updated: Option `-L` also separates serialized items with newlines (instead of spaces). 
** Version 7.2**

 * Added: RESTXQ Service 
** Version 7.1.1**

 * Added: Options `-C` and `-L` in standalone and client mode. 
** Version 7.1**

 * Updated: Multiple query files and `-c`/`-i`/`-q` flags can be specified. 
