
# Request Module
 


 
This [XQuery Module](Module Library.md) contains functions for retrieving information on an HTTP request that has triggered the query. It is mainly useful in the context of [Web Applications](Web Application.md). 

 
The module is related to Adam Retter’s [EXQuery Request Module](http://exquery.github.com/expath-specs-playground/request-module-1.0-specification.html) draft. 

 
## Conventions
 * The `basex-api` package must be included in the classpath. This is always the case if you use one of the complete distributions (zip, exe, war) of BaseX. 
 * All functions are assigned to the `http://exquery.org/ns/request` namespace. The module must be imported in the query prolog: 

    import module namespace request = "http://exquery.org/ns/request";
    ...

 * In this documentation, the namespace is bound to the `request` prefix. 
 * The following example demonstrates what components a URI may consist of (the example is derived from [RFC 3986](http://tools.ietf.org/html/rfc3986)): 

      foo://example.com:8042/over/there?name=ferret
      \_/   \_________/ \__/\_________/ \_________/
       |         |       |       |          |
     scheme   hostname  port    path      query

 
## General Functions

### request:method

`request:method() as xs:string`

Returns the Method of the HTTP request. 


### request:attribute

`request:attribute($name as xs:string) as xs:string`

Returns the value of an attribute of the HTTP request. If the attribute does not exist, an empty sequence is returned. 

 
## URI Functions

### request:scheme

`request:scheme() as xs:string`

Returns the Scheme component of the URI of an HTTP request. 


### request:hostname

`request:hostname() as xs:string`

Returns the Hostname component of the URI of an HTTP request. 


### request:port

`request:port() as xs:integer`

Returns the Port component of the URI of an HTTP request, or a default port if it has not been explicitly specified in the URI. 


### request:path

`request:path() as xs:string`

Returns the Path component of the URI of an HTTP request. 


### request:query

`request:query() as xs:string?`

Returns the Query component of the URI of an HTTP request. If no query has been specified, an empty sequence is returned. 


### request:uri

`request:uri() as xs:anyURI`

Returns the complete URI of an HTTP request as it has been specified by the client. 


### request:context-path

`request:context-path() as xs:string`

Returns the context of the request. For servlets in the default (root) context, this method returns an empty string. 

 
## Connection Functions

### request:address

`request:address() as xs:string`

Returns the IP address of the server. 


### request:remote-hostname

`request:remote-hostname() as xs:string`

Returns the fully qualified hostname of the client that sent the request. 


### request:remote-address

`request:remote-address() as xs:string`

Returns the IP address of the client that sent the request. 


### request:remote-port

`request:remote-port() as xs:string`

Returns the TCP port of the client socket that triggered the request. 

 
## Parameter Functions

### request:parameter-names

Updated with Version 7.9: The returned values now also include form field parameters. 


`request:parameter-names() as xs:string*`

Returns the names of all query and form field parameters available from the HTTP request. With [RESTXQ](RESTXQ.md), this function can be used to access parameters that have not been statically bound by [%rest:query-param](RESTXQ.md#Query_Parameters). 


### request:parameter

Updated with Version 7.9: The returned values now also include form field parameters. 


`request:parameter($name as xs:string) as xs:string*`
`request:parameter($name as xs:string, $default as xs:string) as xs:string*`

Returns the value of the named query or form field parameter in an HTTP request. If the parameter does not exist, an empty sequence or the optionally specified default value is returned instead. If both query and form field parameters with the same name exist, the form field values will be attached to the query values. 

 
## Header Functions

### request:header-names

`request:header-names() as xs:string*`

Returns the names of all headers available from the HTTP request. If [RESTXQ](RESTXQ.md) is used, this function can be used to access headers that have not been statically bound by [%rest:header-param](RESTXQ.md#HTTP_Headers). 


### request:header

`request:header($name as xs:string) as xs:string?`
`request:header($name as xs:string, $default as xs:string) as xs:string`

Returns the value of the named header in an HTTP request. If the header does not exist, an empty sequence or the optionally specified default value is returned instead. 

 
## Cookie Functions

### request:cookie-names

`request:cookie-names() as xs:string*`

Returns the names of all cookies in the HTTP headers available from the HTTP request. If [RESTXQ](RESTXQ.md) is used, this function can be used to access cookies that have not been statically bound by [%rest:cookie-param](RESTXQ.md#Cookies). 


### request:cookie

`request:cookie($name as xs:string) as xs:string*`
`request:cookie($name as xs:string, $default as xs:string) as xs:string`

Returns the value of the named Cookie in an HTTP request. If there is no such cookie, an empty sequence or the optionally specified default value is returned instead. 

 
## Changelog
** Version 7.9 **

 * Updated: The returned values of [request:parameter-names](Request Module.md#request-parameter-names), [request:parameter](Request Module.md#request-parameter) now also include form field parameters. 
** Version 7.8 **

 * Added: [request:context-path](Request Module.md#request-context-path)
** Version 7.7 **

 * Added: [request:attribute](Request Module.md#request-attribute)

This module was introduced with Version 7.5. 

