
# Fetch Module
 


 
This [XQuery Module](Module Library.md) provides simple functions to fetch the content of resources identified by URIs. Resources can be stored locally or remotely and e.g. use the `file://` or `http://` scheme. If more control over HTTP requests is required, the [HTTP Module](HTTP Module.md) can be used. With the [HTML Module](HTML Module.md), retrieved HTML documents can be converted to XML. 

 
The module has initially been inspired by [Zorba’s Fetch Module](http://www.zorba.io/documentation/2.9/modules/www.zorba-xquery.com_modules_fetch.html). 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/fetch` namespace, which is statically bound to the `fetch` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### fetch:binary

`fetch:binary($uri as xs:string) as xs:base64Binary`

Fetches the resource referred to by the given URI and returns it as [streamable](Streaming Module.md)`xs:base64Binary`. 

**Errors**

`BXFE0001`: the URI could not be resolved, or the resource could not be retrieved. 
**Examples**

 * `fetch:binary("http://images.trulia.com/blogimg/c/5/f/4/679932_1298401950553_o.jpg")`  returns the addressed image. 
 * `stream:materialize(fetch:binary("http://en.wikipedia.org"))`  returns a materialized representation of the streamable result. 


### fetch:text

`fetch:text($uri as xs:string) as xs:string`
`fetch:text($uri as xs:string, $encoding as xs:string) as xs:string`

Fetches the resource referred to by the given URI and returns it as [streamable](Streaming Module.md)`xs:string`. 

**Errors**

`BXFE0001`: the URI could not be resolved, or the resource could not be retrieved. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off.`BXFE0002`: the specified encoding is not supported, or unknown. 
**Examples**

 * `fetch:text("http://en.wikipedia.org")`  returns a string representation of the English Wikipedia main HTML page. 
 * `stream:materialize(fetch:text("http://en.wikipedia.org"))`  returns a materialized representation of the streamable result. 


### fetch:xml

Added with Version 8.0: 


`fetch:xml($uri as xs:string) as document-node()`
`fetch:xml($uri as xs:string, $options as item()) as document-node()`

Fetches the resource referred to by the given `$uri` and returns it as an XML document.The `$options` argument can be used to change the parsing behavior. Allowed options are all [parsing](Options.md#OptionsParsing) and [XML parsing](Options.md#XML_Parsing) options in lower case. Options can be specified either...  * as children of an `<options/>` element, e.g. 

    <options>
      <chop value='false'/>
    </options>

 * or as map, which contains all key/value pairs: 

    map { "chop": false() }



**Errors**

`BXFE0001`: the URI could not be resolved, or the resource could not be retrieved. 
**Examples**

 * `fetch:xml("http://en.wikipedia.org")`  returns an XML representation of the English Wikipedia main HTML page. 


### fetch:content-type

`fetch:content-type($uri as xs:string) as xs:string`

Returns the content-type (also called mime-type) of the resource specified by `$uri`:  * If a remote resource is addressed, the request header will be evaluated. 
 * If the addressed resource is locally stored, the content-type will be guessed based on the file extension. 


**Errors**

`BXFE0001`: the URI could not be resolved, or the resource could not be retrieved. 
**Examples**

 * `fetch:content-type("http://docs.basex.org/skins/vector/images/wiki.png")`  returns `image/png`. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXFE0001` | The URI could not be resolved, or the resource could not be retrieved. 
`BXFE0002` | The specified encoding is not supported, or unknown. 
 
## Changelog
** Version 8.0 **

 * Added: [fetch:xml](Fetch Module.md#fetch-xml)

The module was introduced with Version 7.6. 

