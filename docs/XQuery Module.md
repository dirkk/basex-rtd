
# XQuery Module
 


 
This [XQuery Module](Module Library.md) contains functions for evaluating XQuery strings and modules at runtime. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/xquery` namespace, which is statically bound to the `xquery` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### xquery:eval

xquery:eval($query as xs:string) as item()*
xquery:eval($query as xs:string, $bindings as map(*)) as item()*
xquery:eval($query as xs:string, $bindings as map(*), $options as item()) as item()

:   Evaluates the supplied `$query` string as XQuery expression and returns the resulting items.The evaluated query has its own query context. If a returned node is stored in a database, a main-memory copy will be returned as result, because the referenced database is closed after query execution and will not be accessible anymore.Variables and context items can be declared via `$bindings`. The specified keys must be QNames or strings:  * If a key is a QName, it will be directly adopted as variable name.     * It a key is a string, it may be prefixed with a dollar sign. Namespace can be specified using the [Clark Notation](http://www.jclark.com/xml/xmlns.htm). 
    * If the specified string is empty, the value will be bound to the context item. 
    The `$options` parameter contains evaluation options, which can either be specified The following options are available: 


    **Errors**


    `BXXQ0001`: the query contains [updating expressions](XQuery Update.md#Updating_Expressions).`BXXQ0003`: insufficient permissions for evaluating the query.`BXXQ0004`: query execution exceeded timeout or memory constraints.`FOTY0013`: the expression yields function items.Any other error that may occur while evaluating the query. 

    **Examples**


    * `xquery:eval("1+3")`  returns `4`. 
    * You can bind the context and e.g. operate on a certain database only: 
    xquery:eval("//country", map { '': db:open('factbook') })
    * The following expressions use strings as keys. All of them return 'XML': 
    xquery:eval(".", map { '': 'XML' }),
    xquery:eval("declare variable $xml external; $xml", map { 'xml': 'XML' }),
    xquery:eval(
    "declare namespace pref='URI';
    declare variable $pref:xml external;
    $pref:xml",
    map { '{URI}xml': 'XML' }
    )
    * The following expressions use QNames as keys. All of them return 'XML': 
    declare namespace pref = 'URI';
    xquery:eval("declare variable $xml external; $xml", map { xs:QName('xml'): 'XML' }),
    let $query
    := "declare namespace pref='URI';
    declare variable $pref:xml external;
    $pref:xml"
    let $vars
    := map { xs:QName('pref:xml'): 'XML' }
    return xquery:eval($query, $vars)


### xquery:update

Added with Version 8.0:


xquery:update($query as xs:string) as item()*
xquery:update($query as xs:string, $bindings as map(*)) as item()*
xquery:update($query as xs:string, $bindings as map(*), $options as item()) as item()

:   Evaluates `$query` as updating XQuery expression at runtime.All updates will be added to the [Pending Update List](XQuery Update.md#Pending_Update_List) of the main query and performed after the evaluation of the main query. 

    **Errors**


    `BXXQ0002`: the query contains no [updating expressions](XQuery Update.md#Updating_Expressions).`BXXQ0003`: insufficient permissions for evaluating the query.`BXXQ0004`: query execution exceeded timeout or memory constraints.`FOTY0013`: the expression yields function items.Any other error that may occur while evaluating the query. 


### xquery:parse

xquery:parse($query as xs:string) as item()*
xquery:parse($query as xs:string, $options as item()) as item()

:   Parses the specified `$query` string as XQuery module and returns information on the resulting query plan (please note that the naming of the expressions in the query plan may change over time). The `$options` parameters can be specified in two ways:  * as children of an `<xquery:options/>` element:     <xquery:options>
    <xquery:compile value="true"/>
    </xquery:options>
    * as map, which contains all key/value pairs: 
    map { "compile": true() }
    The following options are available: 


    **Errors**


    Any error that may occur while parsing the query. 

    **Examples**


    * `xquery:parse("1 + 3")`  returns: 
    <MainModule updating="false">
    <QueryPlan compiled="false">
    <Arith op="+">
    <Int value="1" type="xs:integer"/>
    <Int value="3" type="xs:integer"/>
    </Arith>
    </QueryPlan>
    </MainModule>


### xquery:invoke

xquery:invoke($uri as xs:string) as item()*
xquery:invoke($uri as xs:string, $bindings as map(*)) as item()*
xquery:invoke($uri as xs:string, $bindings as map(*), $options as item()) as item()*

:   Opens `$uri` as file, evaluates it as XQuery expression at runtime, and returns the resulting items. Database nodes in the result will be copied and returned instead.The semantics of the `$bindings` and `$options` parameters is the same as for [xquery:eval](XQuery Module.md#xquery-eval). 

    **Errors**


    `BXXQ0001`: the expression contains [updating expressions](XQuery Update.md#Updating_Expressions).`BXXQ0003`: insufficient permissions for evaluating the query.`BXXQ0004`: query execution exceeded timeout.`FOTY0013`: the expression yields function items.Any other error that may occur while evaluating the query. 


### xquery:type

xquery:type($expr as item()*) as item()*

:   Similar to `fn:trace($expr, $msg)`, but instead of a user-defined message, it emits the compile-time type and estimated result size of its argument. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXXQ0001` | The specified query contains [updating expressions](XQuery Update.md#Updating_Expressions). 
`BXXQ0002` | The specified query contains no [updating expressions](XQuery Update.md#Updating_Expressions). 
`BXXQ0003` | Insufficient permissions for evaluating the query. 
`BXXQ0004` | Query execution exceeded timeout. 
 
## Changelog
** Version 8.0 **

 * Added: [xquery:update](XQuery Module.md#xquery-update), [xquery:parse](XQuery Module.md#xquery-parse)
 * Deleted: [xquery:evaluate](.md) (opened databases will now be closed by main query) 
** Version 7.8.2 **

 * Added: `$options` argument 
** Version 7.8 **

 * Added: [xquery:evaluate](.md)
 * Updated: used variables must be explicitly declared in the query string. 

This module was introduced with Version 7.3. Functions have been adopted from the obsolete Utility Module. 

