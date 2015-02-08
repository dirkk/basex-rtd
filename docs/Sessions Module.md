
# Sessions Module
 


 
This [XQuery Module](Module Library.md) can only be called from users with _Admin_ permissions. It contains functions for accessing and modifying all registered server-side sessions. This module is mainly useful in the context of [Web Applications](Web Application.md). 

 
## Conventions
 * The `basex-api` package must be included in the classpath. This is always the case if you use one of the complete distributions (zip, exe, war) of BaseX. 
 * All functions are assigned to the `http://basex.org/modules/sessions` namespace. The module must be imported in the query prolog: 

    import module namespace sessions = "http://basex.org/modules/sessions";
    ...

 * In this documentation, the namespace is bound to the `sessions` prefix. 
 * Errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 
 * If any of the functions is called outside the servlet context, the error `BXSE0003`: is raised. 
 * As sessions are side-effecting operations, all functions are flagged as _non-deterministic_. This means that the functions will not be reordered by the compiler. 
 
## Functions

### sessions:ids

`sessions:ids() as xs:string`

Returns the IDs of all registered sessions. 


### sessions:created

`sessions:created($id as xs:string) as xs:dateTime`

Returns the creation time of the session specified by `$id`. 


### sessions:accessed

`sessions:accessed($id as xs:string) as xs:dateTime`

Returns the last access time of the session specified by `$id`. 


### sessions:names

`sessions:names($id as xs:string) as xs:string*`

Returns the names of all variables bound to the session specified by `$id`. 


### sessions:get

`sessions:get($id as xs:string, $key as xs:string) as xs:string?`
`sessions:get($id as xs:string, $key as xs:string, $default as xs:string) as xs:string`

Returns the value of a variable bound to the session specified by `$id`. If the variable does not exist, an empty sequence or the optionally specified default value is returned instead. 

**Errors**

`BXSE0002`: the value of a session variable could not be retrieved. 

### sessions:set

`sessions:set($id as xs:string, $key as xs:string, $value as xs:string) as empty-sequence()`

Assigns a value to a variable bound to the session specified by `$id`. 

**Errors**

`BXSE0001`: a function item was specified as value of a session variable. 

### sessions:delete

`sessions:delete($id as xs:string, $key as xs:string) as empty-sequence()`

Deletes a variable bound to the session specified by `$id`. 


### sessions:close

`sessions:close($id as xs:string) as empty-sequence()`

Unregisters the session specified by `$id`. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXSE0001` | A function item was specified as value of a session attribute. 
`BXSE0002` | An error occurred while retrieving the value of a session attribute. 
`BXSE0003` | A function was called outside the servlet context. 
`BXSE0004` | The specified session was not found. 
 
## Changelog

This module was introduced with Version 7.5. 

