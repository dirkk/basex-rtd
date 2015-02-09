
# RESTXQ
 


 
This page presents one of the [Web Application](Web Application.md) services. It describes how to use the RESTXQ API of BaseX. 

 
RESTXQ, introduced by [Adam Retter](http://www.adamretter.org.uk/), is an API that facilitates the use of XQuery as a server-side processing language for the Web. RESTXQ has been inspired by Java’s [JAX-RS API](http://en.wikipedia.org/wiki/Java_API_for_RESTful_Web_Services): it defines a pre-defined set of XQuery 3.0 annotations for mapping HTTP requests to XQuery functions, which in turn generate and return HTTP responses. 

 
Please note that BaseX provides various extensions to the official draft of the specification: 

  * Multipart types are supported, including `multipart/form-data`
 * A `%rest:error` annotation can be used to catch XQuery errors 
 * Servlet errors can be redirected to other RESTXQ pages 
 * A [RESTXQ Module](RESTXQ Module.md) provides some helper functions 
 * Parameters are implicitly cast to the type of the function argument 
 
The following features are available since Version 8.0: 

  * Regular expresssions in the [Path Annotation](RESTXQ.md#Paths)
 * Evaluation of quality factors that are supplied in the [Accept header](RESTXQ.md#Content_Negotiation)
 * BaseX is now shipped with a Database Administration Interface (DBA). It will automatically be launched when requesting the RESTXQ root page. 
 
## Introduction

The RESTXQ service is accessible via `http://localhost:8984/`. 


All RESTXQ [annotations](XQuery 3.0.md#XQuery_3.0Annotations) are assigned to the `http://exquery.org/ns/restxq` namespace, which is statically bound to the `rest` prefix. A _Resource Function_ is an XQuery function that has been marked up with RESTXQ annotations. When an HTTP request comes in, a resource function will be invoked that matches the constraints indicated by its annotations. 


Whenever a RESTXQ URL is requested, the [RESTXQPATH](Options.md#RESTXQPATH) module directory and its sub-directories will be parsed for functions with RESTXQ annotations in library modules (detected by the extension `.xqm`) and main modules (detected by `.xq`). In main expressions, the main module will never be evaluated. All modules will be cached and parsed again when their timestamp changes. 


A first RESTXQ function is shown below: 


    module namespace page = 'http://basex.org/examples/web-page';
    declare %rest:path("hello/{$who}") %rest:GET function page:hello($who) {
      <response>
        <title>Hello { $who }!</title>
      </response>
    };


If the URI [http://localhost:8984/hello/World](http://localhost:8984/hello/World) is accessed, the result will be: 


    <response>
      <title>Hello World!</title>
    </response>


The next function demonstrates a POST request: 


    declare
      %rest:path("/form")
      %rest:POST
      %rest:form-param("message","{$message}", "(no message)")
      %rest:header-param("User-Agent", "{$agent}")
      function page:hello-postman(
        $message as xs:string,
        $agent   as xs:string*)
        as element(response)
    {
      <response type='form'>
        <message>{ $message }</message>
        <user-agent>{ $agent }</user-agent>
      </response>
    };


If you post something (e.g. using curl or the embedded form at [http://localhost:8984/](http://localhost:8984/))... 


    curl -i -X POST --data "message='CONTENT'" http://localhost:8984/form


...you will receive something similar to the following result: 


    HTTP/1.1 200 OK
    Content-Type: application/xml; charset=UTF-8
    Content-Length: 107
    Server: Jetty(8.1.11.v20130520)


    <response type="form">
      <message>'CONTENT'</message>
      <user-agent>curl/7.31.0</user-agent>
    </response>

 
## Requests

This section shows how annotations are used to handle and process HTTP requests. 


### Constraints

Constraints restrict the HTTP requests that a resource function may process. 


#### Paths

A resource function must have a single _Path Annotation_ with a single string as argument. The function will be called if a URL matches the path segments and templates of the argument. _Path templates_ contain variables in curly brackets, and map the corresponding segments of the request path to the arguments of the resource function. The first slash in the path is optional; 


The following example contains a path annotation with three segments and two templates. One of the function arguments is further specified with a data type, which means that the value for `$variable` will be cast to an `xs:integer` before being bound: 


    declare %rest:path("/a/path/{$with}/some/{$variable}")
      function page:test($with, $variable as xs:integer) { ... };


Since Version 8.0, variables can be extended by regular expressions: 


    (: Matches all paths with "app" as first, a number as second, and "order" as third segment :)
    declare %rest:path("app/{$code=[0-9]+}/order")
      function page:order($full-path) { ... };
    (: Matches all other all paths starting with "app/" :)
    declare %rest:path("app/{$path=.+}")
      function page:others($path) { ... };


#### Content Negotiation

Two following annotations can be used to restrict functions to specific content types: 

 * **HTTP Content Types** : a function will only be invoked if the HTTP `Content-Type` header of the request matches one of the given mime types. Example: 

    %rest:consumes("application/xml", "text/xml")

 * **HTTP Accept** : a function will only be invoked if the HTTP `Accept` header of the request matches one of the defined mime types. Example: 

    %rest:produces("application/atom+xml")


By default, both mime types are `*/*`. 


Since Version 8.0, quality factors supplied by a client will also be considered in the path selection process. If a client supplies the following accept header… 


    */*;q=0.5,text/html;q=1.0


…and if two RESTXQ functions exist with the same `path` annotation and the `produces` annotations `*/*` and `text/html`, respectively, the function with the second annotation will be called, because the quality factor for `text/html` documents is higher than the one for arbitrary other mime types. 


Note that this annotation will _not_ affect the content-type of the HTTP response. Instead, you will need to add a `%output:media-type` annotation. 


#### HTTP Methods

##### Fixed Methods

The HTTP method annotations are equivalent to all [HTTP request methods](http://en.wikipedia.org/wiki/HTTP#Request_methods) except for TRACE and CONNECT. Zero or more methods may be used on a function; if none is specified, the function will be invoked for each method. 


The following function will be called if GET or POST is used as request method: 


    declare %rest:GET %rest:POST %rest:path("/post")
      function page:post() { "This was a GET or POST request" };


The POST and PUT annotations may optionally take a string literal in order to map the HTTP request body to a [function argument](RESTXQ.md#RESTXQParameters). Once again, the target variable must be embraced by curly brackets: 


    declare %rest:PUT("{$body}") %rest:path("/put")
      function page:put($body) { "Request body: " || $body };


##### Custom Methods

Since Version 7.9, custom HTTP methods can be specified with the `%rest:method` annotation: 


    declare %rest:method("RETRIEVE")
      function page:retrieve() { "RETRIEVE was specified as request method." };


#### Content Types

If a content-type is specified in the request, the content is converted to the following XQuery type: 


** Content-Type ** | ** XQuery type **
------------------ | -----------------
`application/json`, `application/jsonml+json` | `document-node()` (conversion is described in the [JSON Module](JSON Module.md)) 
`text/html` | `document-node()` (conversion is described in the [HTML Module](HTML Module.md)) 
`text/comma-separated-values` | `document-node()`
`text/xml`, `application/xml` | `document-node()`
`text/*` | `xs:string`
_others_ | `xs:base64Binary`
`multipart/*` |  sequence (see next paragraph) 

##### Multipart Types

The single parts of a multipart message are represented as a sequence, and each part is converted to an XQuery item as described in the last paragraph. 


A function that is capable of handling multipart types is identical to other RESTXQ functions: 


    declare
      %rest:path("/multipart")
      %rest:POST("{$data}")
      %rest:consumes("multipart/mixed") (: optional :)
      function page:multipart($data as item()*)
    {
      "Number of items: " || count($data)
    };


Please note that support for multipart types is still experimental, and it may change in a future version BaseX. Your feedback is welcome. 


### Parameters

The following annotations can be used to bind request values to function arguments. Values will implicitly be cast to the type of the argument. 


#### Query Parameters

The value of the _first parameter_, if found in the [query component](Request Module.md#Request_ModuleConventions), will be assigned to the variable specified as _second parameter_. If no value is specified in the HTTP request, all additional parameters will be bound to the variable (if no additional parameter is given, an empty sequence will be bound): 


    declare
      %rest:path("/params")
      %rest:query-param("id", "{$id}")
      %rest:query-param("add", "{$add}", 42, 43, 44)
      function page:params($id as xs:string?, $add as xs:integer+)
    {
      <result id="{ $id }" sum="{ sum($add) }"/>
    };


#### HTML Form Fields

Form parameters are specified the same way as [query parameters](RESTXQ.md#Query_Parameters). Their values are extracted from GET or POST requests. 


    %rest:form-param("parameter", "{$value}", "default")


##### File Uploads

Files can be uploaded to the server by using the content type `multipart/form-data` (the HTML5 `multiple` attribute enables the upload of multiple files): 


    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="files"  multiple="multiple"/>
      <input type="submit"/>
    </form>


The file contents are placed in a [map](Map Module.md), with the filename serving as key. The following example shows how uploaded files can be stored in a temporary directory: 


    declare
      %rest:POST
      %rest:path("/upload")
      %rest:form-param("files", "{$files}")
      function page:upload($files)
    {
      for $name    in map:keys($files)
      let $content := $files($name)
      let $path    := file:temp-dir() || $name
      return (
        file:write-binary($path, $content),
        <file name="{ $name }" size="{ file:size($path) }"/>
      )
    };


#### HTTP Headers

Header parameters are specified the same way as [query parameters](RESTXQ.md#Query_Parameters): 


    %rest:header-param("User-Agent", "{$user-agent}")
    %rest:header-param("Referer", "{$referer}", "none")


#### Cookies

Cookie parameters are specified the same way as [query parameters](RESTXQ.md#Query_Parameters): 


    %rest:cookie-param("username", "{$user}")
    %rest:cookie-param("authentication", "{$auth}", "no_auth")

 
## Responses

By default, a successful request is answered with the HTTP status code `200` (OK) and is followed by the given content. An erroneous request leads to an error code and an optional error message (e.g. `404` for “resource not found”). 


### Custom Responses

Custom responses can be built from within XQuery by returning an `rest:response` element, an `http:response` child node that matches the syntax of the [EXPath HTTP Client Module](http://expath.org/spec/http-client) specification, and more optional child nodes that will be serialized as usual. A function that reacts on an unknown resource may look as follows: 


    declare %rest:path("") function page:error404() {
      <rest:response>
        <http:response status="404" message="I was not found.">
          <http:header name="Content-Language" value="en"/>
          <http:header name="Content-Type" value="text/html; charset=utf-8"/>
        </http:response>
      </rest:response>
    };


### Forwards and Redirects

The two XML elements `rest:forward` and `rest:redirect` can be used in the context of [Web Applications](Web Application.md), precisely in the context of RESTXQ. These nodes allow e.g. multiple [XQuery Updates](XQuery Update.md) in a row by redirecting to the RESTXQ path of updating functions. Both wrap a URL to a RESTXQ path. The wrapped URL should be properly encoded via `fn:encode-for-uri()`. 


Note that, currently, these elements are not part of RESTXQ specification. 


#### rest:forward

Usage: wrap the location as follows 


    <rest:forward>{ $location }</rest:forward>


This results in a server-side forwarding, which as well reduces traffic among client and server. A forwarding of this kind will not change the URL seen from the client's perspective. 


As an example, returning 


    <rest:forward>/hello/universe</rest:forward>


would internally forward to [http://localhost:8984/hello/universe](http://localhost:8984/hello/universe)


#### rest:redirect

    <rest:redirect>{ $location }</rest:redirect>


…is basically an abbreviation for… 


    <rest:response>
      <http:response status="302" message="Temporary Redirect">
        <http:header name="location" value="{ $location }"/>
      </http:response>
    </rest:response>


The client decides whether to follow this redirection. Browsers usually will, tools like [curl](http://curl.haxx.se/) won’t unless `-L` is specified. 


### Output

Similar to the [REST](REST.md#Content_Type) interface, result serialization can be modified via [XQuery 3.0 serialization parameters](XQuery 3.0.md#XQuery_3.0Serialization); in RESTXQ, serialization parameters may be specified in the query prolog, via annotations, or within REST response element. Global parameters are overwritten by more local parameters. 


#### Query Prolog

In main modules, serialization parameters may be specified in the query prolog. These parameters will then apply to all functions in a module. In the following example, the content type of the response is overwritten with the `media-type` parameter: 


    declare option output:media-type 'text/plain';
    declare %rest:path("version1") function page:version1() {
      'Keep it simple, stupid'
    };


#### Annotations

The serialization can also be parameterized via annotations: 


    declare %output:media-type("text/plain") %rest:path("version2") function page:version2() {
      'Still somewhat simple.'
    };


#### Response Element

The following example demonstrates how serialization parameters can be dynamically set within a query: 


    declare %rest:path("version3") function page:version3() {
      <rest:response>
        <output:serialization-parameters>
          <output:media-type value='text/plain'/>
        </output:serialization-parameters>
      </rest:response>,
      'Not that simple anymore'
    };


The content type can also be overwritten by specifying an output `method`. The following method mappings are available: 

 * `xml`  → `application/xml`
 * `xhtml`  → `text/html`
 * `html`  → `text/html`
 * `text`  → `text/plain`
 * `json`  or `jsonml` → `application/json`
 * `raw`  → `application/octet-stream`

When using `raw`, binary data will be sent in its original byte representation, i. e., without further conversion. 


By default, `application/xml` is returned as content type. In the following example, XHTML headers will be generated, and `text/html` will be set as content type: 


    declare
      %rest:path("")
      %output:method("xhtml")
      %output:omit-xml-declaration("no")
      %output:doctype-public("-//W3C//DTD XHTML 1.0 Transitional//EN")  
      %output:doctype-system("http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd")
      function page:start()
    {
      <html xmlns="http://www.w3.org/1999/xhtml">
        <body>done</body>
      </html>
    };

 
## Error Handling

### XQuery Errors

Updated with Version 7.9:


XQuery runtime errors can be processed via _error annotations_. Error annotations have one or more arguments, which represent the error codes to be caught. The codes equal the names of the XQuery 3.0 [try/catch](XQuery 3.0.md#Try.2FCatch) construct: 


** Priority ** | ** Syntax ** | ** Example **
-------------- | ------------ | -------------
 1  | `prefix:name``Q{uri}name` | `err:FORG0001``Q{http://www.w3.org/2005/xqt-errors}FORG0001`
 2  | `prefix:*``Q{uri}*` | `err:*``Q{http://www.w3.org/2005/xqt-errors}*`
 3  | `*:name` | `*:FORG0001`
 4  | `*` | `*`

All error codes that are specified for a function must be of the same priority. The following rules apply when catching errors: 

 * Codes with a higher priority will be preferred. 
 * A global RESTXQ error will be raised if two functions with conflicting codes are found. 

Similar to try/catch, the pre-defined variables (`code`, `description`, `value`, `module`, `line-number`, `column-number`, `additional`) can be bound to variables via _error parameter annotations_, which are specified the same way as [query parameters](RESTXQ.md#Query_Parameters). 


Errors may occur unexpectedly. However, they can also be triggered by a query, as demonstrated by the following example: 


    declare
      %rest:path("/check/{$user}")
      function page:check($user)
    {
      if($user = ('jack', 'lisa'))
      then 'User exists'
      else fn:error(xs:QName('err:user'), $user)
    };
    declare 
      %rest:error("err:user")
      %rest:error-param("description", "{$user}")
      function page:user-error($user)
    {
      'User "' || $user || '" is unknown'
    };


### HTTP Errors

Errors that occur outside RESTXQ can be caught by adding `error-page` elements with an error code and a target location to the `web.xml` configuration file (find more details in the [Jetty Documentation](http://www.eclipse.org/jetty/documentation/current/custom-error-pages.html)): 


    <error-page>
      <error-code>404</error-code>
      <location>/error404</location>
    </error-page>


The target location may be another RESTXQ function. The [request:attribute](Request Module.md#request-attribute) function can be used to request details on the caught error: 


    declare %rest:path("/error404") function page:error404() {
      "URL: " || request:attribute("javax.servlet.error.request_uri") || ", " || 
      "Error message: " || request:attribute("javax.servlet.error.message")
    };

 
## Functions

The [Request Module](Request Module.md) contains functions for accessing data related to the current HTTP request. Two modules exist for setting and retrieving server-side session data of the current user ([Session Module](Session Module.md)) and all users known to the HTTP server ([Sessions Module](Sessions Module.md)). The [RESTXQ Module](RESTXQ Module.md) provides functions for requesting RESTXQ base URIs and generating a [WADL description](http://www.w3.org/Submission/wadl/) of all services. Please note that the namespaces of all of these modules must be explicitly specified via module imports in the query prolog. 


The following example returns the current host name: 


    import module namespace request = "http://exquery.org/ns/request";
    declare %rest:path("/host-name") function page:host() {
      'Remote host name: ' || request:remote-hostname()
    };

 
## References

RESTXQ has been proposed by [Adam Retter](http://www.adamretter.org.uk/). More information on all specifics can be found in the following two documents: 

 * [RESTful XQuery, Standardised XQuery 3.0 Annotations for REST](http://www.adamretter.org.uk/papers/restful-xquery_january-2012.pdf) . Paper, XMLPrague, 2012 
 * [RESTXQ](http://www.adamretter.org.uk/presentations/restxq_mugl_20120308.pdf) . Slides, MarkLogic User Group London, 2012 
 * [RESTXQ Specification](http://exquery.github.com/exquery/exquery-restxq-specification/restxq-1.0-specification.html) , Unofficial Draft 
 * [Web Application, RESTXQ Development](http://files.basex.org/xmlprague2013/slides/Develop-RESTXQ-WebApps-with-BaseX.pdf) . Web Application Development with RESTXQ Slides from XMLPrague 2013 
 
## Changelog
** Version 8.0 **

 * Added: DBA (Database Administration Interface, written with RESTXQ) 
 * Added: Support of regular expresssions in the [Path Annotation](RESTXQ.md#Paths)
 * Added: Evaluation of quality factors that are supplied in the [Accept header](RESTXQ.md#Content_Negotiation)
** Version 7.9 **

 * Updated: [XQuery Errors](RESTXQ.md#XQuery_Errors), extended error annotations 
 * Added: `%rest:method`
** Version 7.7 **

 * Added: [Error Handling](RESTXQ.md#Error_Handling), [File Uploads](RESTXQ.md#File_Uploads), [Multipart Types](RESTXQ.md#Multipart_Types)
 * Updated: RESTXQ function may now also be specified in main modules (suffix: `*.xq`). 
 * Updated: the RESTXQ prefix has been changed from `restxq` to `rest`. 
 * Updated: parameters are implicitly cast to the type of the function argument 
 * Updated: the RESTXQ root url has been changed to `http://localhost:8984/`
** Version 7.5 **

 * Added: new XML elements `<rest:redirect/>` and `<rest:forward/>`
