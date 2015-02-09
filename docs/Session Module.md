
# Session Module
 


 
This [XQuery Module](Module Library.md) contains functions for accessing and modifying server-side session information. This module is mainly useful in the context of [Web Applications](Web Application.md). 

 
## Conventions
 * The `basex-api` package must be included in the classpath. This is always the case if you use one of the complete distributions (zip, exe, war) of BaseX. 
 * All functions are assigned to the `http://basex.org/modules/session` namespace. The module must be imported in the query prolog: 

    import module namespace session = "http://basex.org/modules/session";
    ...

 * In this documentation, the namespace is bound to the `session` prefix. 
 * Errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 
 * If any of the functions is called outside the servlet context, the error `BXSE0003`: is raised. 
 * As sessions are side-effecting operations, all functions are flagged as _non-deterministic_. This means that the functions will not be reordered by the compiler. 
 
## Functions

### session:id

`session:id() as xs:string`

Returns the session ID of a servlet request. 

**Examples**

Running the server-side XQuery file `id.xq` via `http://localhost:8984/id.xq`: 
    import module namespace session = "http://basex.org/modules/session";
    'Session ID: ' || session:id()



### session:created

`session:created() as xs:dateTime`

Returns the creation time of a session. 


### session:accessed

`session:accessed() as xs:dateTime`

Returns the last access time of a session. 


### session:names

`session:names() as xs:string*`

Returns the names of all variables bound to the current session. 

**Examples**

Running the server-side XQuery file `names.xq` via `http://localhost:8984/names.xq`: 
    import module namespace session = "http://basex.org/modules/session";
    session:names() ! element variable { . }



### session:get

`session:get($key as xs:string) as item()*`
`session:get($key as xs:string, $default as item()*) as item()*`

Returns the value of a variable bound to the current session. If the key is unknown, an empty sequence or the optionally specified default value is returned instead. 

**Errors**

`BXSE0002`: the value of a session variable could not be retrieved. 
**Examples**

Running the server-side XQuery file `get.xq` via `http://localhost:8984/get.xq?key=user`: 
    import module namespace session = "http://basex.org/modules/session";
    'Value of ' || $key || ': ' || session:get($key)



### session:set

Updated with Version 8.0: allow sequences as session values 


`session:set($key as xs:string, $value as item()*) as empty-sequence()`

Binds the specified key/value pair to a session. 

**Errors**

`BXSE0001`: a function item was specified as value of a session variable. 
**Examples**

Running the server-side XQuery file `set.xq` via `http://localhost:8984/set.xq?key=user&value=john`: 
    import module namespace session = "http://basex.org/modules/session";
    session:set($key, $value), 'Variable was set.'



### session:delete

`session:delete($key as xs:string) as empty-sequence()`

Deletes a session variable. 

**Examples**

Running the server-side XQuery file `delete.xq` via `http://localhost:8984/delete.xq?key=user`: 
    import module namespace session = "http://basex.org/modules/session";
    session:delete($key), 'Variable was deleted.'



### session:close

`session:close() as empty-sequence()`

Unregisters a session and all data associated with it. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXSE0001` | A function item was specified as value of a session attribute. 
`BXSE0002` | An error occurred while retrieving the value of a session attribute. 
`BXSE0003` | A function was called outside the servlet context. 
 
## Changelog
** Version 8.0 **

 * Updated: allow sequences as session values 

This module was introduced with Version 7.5. 

