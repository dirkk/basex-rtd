 


 
This page is part of the [Getting Started](Getting Started.md) Section. BaseX offers a standalone console mode from which all [database commands](Commands.md) can be executed. The article on the [Database Server](Database Server.md) provides numerous examples for running commands in the console mode (note that the GUI does _not_ interact with the client/server architecture). 

 
# Startup

First of all, please launch a **standalone** version of BaseX: double click on the **BaseX** icon, or run the `basex` script. [Follow this link](.md) for more information (or check out the additional [command-line options](Command-Line Options.md#BaseX_Standalone)). 


## Working with the BaseX Console

After the BaseX Console has been started, the `HELP` command can be used to to list all [database commands](Commands.md). Multiple commands can be separated by semicolons. 


To evaluate commands without entering the console mode, you can use the `-c` option on the command line: 


    basex -Vc "CREATE DB input <example/>; XQUERY /"
    Database 'input' created in 124.95 ms.
    <example/>
    Query: /
    Compiling:
    Result: root()
    Parsing: 0.42 ms
    Compiling: 9.3 ms
    Evaluating: 0.35 ms
    Printing: 5.53 ms
    Total Time: 15.62 ms
    Hit(s): 1 Item
    Updated: 0 Items
    Printed: 10 Bytes
    Query executed in 15.62 ms.


All available command-line options can be found [here](Command-Line Options.md#BaseX_Standalone). 


## See also 

[GUI](http://docs.basex.org/wiki/Graphical User Interface), [Database Server](Database Server.md), [Getting Started](Getting Started.md)

