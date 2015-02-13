 


 
This [XQuery Module](Module Library.md) contains helper functions for the [RESTXQ](RESTXQ.md) API, some of which are defined in the [RESTXQ Draft](http://exquery.github.io/exquery/exquery-restxq-specification/restxq-1.0-specification.html). 

 
# Conventions
 * The `basex-api` package must be included in the classpath. This is always the case if you use one of the complete distributions (zip, exe, war) of BaseX. 
 * All functions are assigned to the `http://exquery.org/ns/restxq` namespace. The module must be imported in the query prolog: 

    import module namespace rest = "http://exquery.org/ns/restxq";
    ...

 * In this documentation, the namespace is bound to the `rest` prefix, and the `http://wadl.dev.java.net/2009/02` namespace is bound to the `wadl` prefix. 
 * If any of the functions is called outside the servlet context, the error `BXSE0003`: is raised. 
 
# General Functions

## rest:base-uri

rest:base-uri() as xs:anyURI

:   This function returns the implementation defined base URI of the resource function. 


## rest:uri

rest:uri() as xs:anyURI

:   This function returns the complete URI that addresses the Resource Function. This is the result of [rest:base-uri](RESTXQ Module.md#rest-base-uri) appended with the path from the path annotation of the resource function. 


## rest:wadl

rest:wadl() as element(wadl:application)

:   This (unofficial) function returns a [WADL description](http://www.w3.org/Submission/wadl) of all available REST services. 

 
# Changelog

This module was introduced with Version 7.7. 

