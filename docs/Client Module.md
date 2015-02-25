 


 
This [XQuery Module](Module Library.md) contains functions to access remote BaseX server instances from XQuery. With this module, you can on the one hand execute database commands and on the other hand evaluate queries, the results of which are returned as XDM sequences. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/client` namespace, which is statically bound to the `client` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## client:connect

client:connect($host as xs:string, $port as xs:integer, $user as xs:string, $password as xs:string) as xs:anyURI

:   This function establishes a connection to a remote BaseX server, creates a new client session, and returns a session id. The parameter `$host` is the name of the database server, `$port` specifies the server port, and `$user` and `$password` represent the login data. 

    **Errors**


    `BXCL0001`: an error occurs while creating the session (possible reasons: server not available, access denied). 


## client:execute

client:execute($id as xs:anyURI, $command as xs:string) as xs:string

:   This function executes a [command](Commands.md) and returns the result as string. The parameter `$id` contains the session id returned by [client:connect](Client Module.md#clientconnect). The `$command` argument represents a single command, which will be executed by the server. 

    **Errors**


    `BXCL0003`: an I/O error occurs while transferring data from or to the server.`BXCL0004`: an error occurs while executing a command. 

    **Examples**


    The following query creates a new database `TEST` on a remote BaseX server: 
    client:connect('basex.server.org', 8080, 'admin', 'admin')
    !
    client:execute(., 'create database TEST')


## client:info

client:info($id as xs:anyURI) as xs:string

:   This function returns an information string, created by a previous call of [client:execute](Client Module.md#clientexecute). `$id` specifies the session id. 


## client:query

Updated with Version 8.0: Bound values may now contain no or more than one item. 


client:query($id as xs:anyURI, $query as xs:string) as item()*
client:query($id as xs:anyURI, $query as xs:string, $bindings as map(*)) as item()*

:   Evaluates a query and returns the result as sequence. The parameter `$id` contains the session id returned by [client:connect](Client Module.md#clientconnect), and `$query` represents the query string, which will be evaluated by the server.Variables and the context item can be declared via `$bindings`. The specified keys must be QNames or strings:  * If a key is a QName, it will be directly adopted as variable name. 

    **Errors**


    `BXCL0003`: an I/O error occurs while transferring data from or to the server.`BXCL0005`: an error occurs while evaluating a query, and if the original error cannot be extracted from the returned error string.`BXCL0006`: a value to be bound is no single item. 

    **Examples**


    The following query sends a query on a local server instance, binds the integer `123` to the variable `$n` and returns `246`: 
    let $c
    := client:connect('localhost', 1984, 'admin', 'admin')
    return client:query($c, "declare variable $n external; $n * 2", map { 'n': 123 })
    The following query performs a query on a first server, the results of which are passed on to a second server: 


## client:close

client:close($id as xs:anyURI) as empty-sequence()

:   This function closes a client session. `$id` specifies the session id.At the end of query execution, open sessions will be automatically closed. 

    **Errors**


    `BXCL0003`: an I/O error occurs while transferring data from or to the server. 

 
# Errors

**Code ** | Description 
--------- | ------------
`BXCL0001` |  An error occurred while creating a new session (possible reasons: server not available, access denied). 
`BXCL0002` |  The specified session is unknown, or has already been closed. 
`BXCL0003` |  An I/O error occurred while transferring data from or to the server. 
`BXCL0004` |  An error occurred while executing a command. 
`BXCL0005` |  An error occurred while evaluating a query. Will only be raised if the XQuery error cannot be extracted from the returned error string. 
`BXCL0006` |  A value to be bound is no single item. 
 
# Changelog
** Version 8.0 **

 * Updated: Bound values may now contain no or more than one item in [client:query](Client Module.md#clientquery). 
** Version 7.5 **

 * Added: [client:info](Client Module.md#clientinfo)

The module was introduced with Version 7.3. 

