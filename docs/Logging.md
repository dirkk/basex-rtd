
# Logging
 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). It describes how client operations are logged by the server. The server logs can e.g. be used to get an overview of all processes executed on your server, trace any errors or compile performance statistics. 

 
The server logs are written in plain text. In your [Database Directory](Configuration.md#Database_Directory), you can find a folder named `.logs` in which all log files are stored with the according date. Note that, depending on your OS and configuration, files and folders beinning with a `.` may be hidden. 

 
Some more notes on the logging facility: 

  * HTTP requests are included in the log files. 
 * Logging can be turned on/off via the [LOG](Options.md#LOG) option. 
 * The maximum length of logging messages can be changed via [LOGMSGMAXLEN](Options.md#LOGMSGMAXLEN). 
 * The [Admin Module](Admin Module.md) provides access to the log files from XQuery. 
 
## Format
** Example 1**


    01:18:12.892   SERVER           admin   OK        Server was started (port: 1984)
    01:18:15.436   127.0.0.1:4722   jack    REQUEST   XQUERY for $i in 1 to 5 return random:double()
    01:18:15.446   127.0.0.1:4722   jack    OK        Query executed in 2.38 ms.                       2.72 ms
    01:18:15.447   127.0.0.1:4722   jack    REQUEST   EXIT
    01:18:15.447   127.0.0.1:4722   jack    OK                                                         0.39 ms


A server has been started and a user `jack` has connected to the server to perform a query and exit properly. 

** Example 2**


    01:23:33.251   127.0.0.1:4736   john   OK        QUERY[0] 'hi'   0.44 ms
    01:23:33.337   127.0.0.1:4736   john   OK        ITER[0]         1.14 ms
    01:23:33.338   127.0.0.1:4736   john   OK        INFO[0]         0.36 ms
    01:23:33.339   127.0.0.1:4736   john   OK        CLOSE[0]        0.21 ms
    01:23:33.359   127.0.0.1:4736   john   REQUEST   EXIT
    01:23:33.359   127.0.0.1:4736   john   OK                        0.14 ms


A user `john` has performed an iterative query, using one of the client APIs. 

** Example 3**


    01:31:51.888   127.0.0.1:4803   admin   REQUEST   [GET] http://localhost:8984/rest/factbook
    01:31:51.892   127.0.0.1:4803   admin   200                                                   4.43 ms


An admin user has accessed the `factbook` database via REST. 

