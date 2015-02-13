 


 
This [XQuery Module](Module Library.md) contains functions for performing admin-centric operations such as managing database users and log data. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/admin` namespace, which is statically bound to the `admin` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## admin:sessions

admin:sessions() as element(session)*

:   Returns an element sequence with all currently opened sessions, including the user name, address (IP:port) and an optionally opened database.The output of this function and the [SHOW SESSIONS](Commands.md#SHOW_SESSIONS) command is similar. 

    **Examples**


    * `admin:sessions()`  may e.g. return `<session user="admin" address="127.0.0.1:6286" database="factbook"/>`


## admin:logs

admin:logs() as element(file)*
admin:logs($date as xs:string) as element(entry)*
admin:logs($date as xs:string, $merge as xs:boolean) as element(entry)*

:   Returns [Logging](Logging.md) data compiled by the database or HTTP server:  * If no argument is specified, a list of all log files will be returned, including the file size and date. 

    **Examples**


    * `admin:logs()`  may return `<file size="834367"/>2013-01-23</file>` if a single log file exists. 
    * `admin:logs()
    ! admin:logs(.)`  lists the contents of all log files. 


## admin:write-log

Introduced with Version 8.0: 


admin:write-log($text as xs:string) as empty-sequence()

:   Writes a string to the database logs, along with current user data (timestamp, user name). If the function is called in a web application or a database client, the IP will be logged. Otherwise, the string `STANDALONE` will be logged. 

 
# Changelog
** Version 8.0 **

 * Added: [admin:write-log](Admin Module.md#admin-write-log)
 * Deleted: admin:users (renamed to [user:list-details](User Module.md#user-list-details)) 
** Version 7.8.2 **

 * Updated: [admin:users](.md): md5-encoded password added to output. 
 * Updated: [admin:logs](Admin Module.md#admin-logs): represent name of log files as string value; `$merge` argument added. 

The Module was introduced with Version 7.5. 

