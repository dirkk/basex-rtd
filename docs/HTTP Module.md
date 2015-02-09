
# HTTP Module
 


 
This [XQuery Module](Module Library.md) contains a single function to send HTTP requests and handle HTTP responses. The function `send-request` is based on the [EXPath HTTP Client Module](http://expath.org/spec/http-client). It gives full control over the available request and response parameters. For simple GET requests, the [Fetch Module](Fetch Module.md) may be sufficient. 

 
## Conventions

All functions in this module are assigned to the `http://expath.org/ns/http-client` namespace, which is statically bound to the `http` prefix. All errors are assigned to the `http://expath.org/ns/error` namespace, which is statically bound to the `exerr` prefix. 

 
## Functions

### http:send-request

http:send-request($request as element(http:request)?, $href as xs:string?, $bodies as item()*) as item()+
http:send-request($request as element(http:request)) as item()+
http:send-request($request as element(http:request)?, $href as xs:string?) as item()+

:   Sends an HTTP request and interprets the corresponding response. `$request` contains the parameters of the HTTP request such as HTTP method and headers. In addition to this it can also contain the URI to which the request will be sent and the body of the HTTP method. If the URI is not given with the parameter `$href`, its value in `$request` is used instead. The structure of `http:request` element follows the [EXPath](http://expath.org/spec/http-client) specification. 

    **Errors**


    `HC0001`: an HTTP error occurred.`HC0002`: error parsing the entity content as XML or HTML.`HC0003`: with a multipart response, the override-media-type must be either a multipart media type or application/octet-stream.`HC0004`: the src attribute on the body element is mutually exclusive with all other attribute (except the media-type).`HC0005`: the request element is not valid.`HC0006`: a timeout occurred waiting for the response. 


### Examples

#### Status Only

Simple GET request. As the attribute `status-only` is set to true, only the response element is returned. 


**Query:**


    http:send-request(<http:request method='get' status-only='true'/>, 'http://basex.org')


**Result:**


    <http:response status="200" message="OK">
      <http:header name="Date" value="Mon, 14 Mar 2011 20:55:53 GMT"/>
      <http:header name="Content-Length" value="12671"/>
      <http:header name="Expires" value="Mon, 14 Mar 2011 20:57:23 GMT"/>
      <http:header name="Set-Cookie" value="fe_typo_user=d10c9552f9a784d1a73f8b6ebdf5ce63; path=/"/>
      <http:header name="Connection" value="close"/>
      <http:header name="Content-Type" value="text/html; charset=utf-8"/>
      <http:header name="Server" value="Apache/2.2.16"/>
      <http:header name="X-Powered-By" value="PHP/5.3.5"/>
      <http:header name="Cache-Control" value="max-age=90"/>
      <http:body media-type="text/html; charset=utf-8"/>
    </http:response>


#### Google Homepage

Retrieve Google search home page. [TagSoup](http://home.ccil.org/~cowan/XML/tagsoup/) must be contained in the class path in order to parse html. 


**Query:**


    http:send-request(<http:request method='get' href='http://www.google.com'/>)


**Result:**


    <http:response status="200" message="OK">
      <http:header name="Date" value="Mon, 14 Mar 2011 22:03:25 GMT"/>
      <http:header name="Transfer-Encoding" value="chunked"/>
      <http:header name="Expires" value="-1"/>
      <http:header name="X-XSS-Protection" value="1; mode=block"/>
      <http:header name="Set-Cookie" value="...; expires=Tue, 13-Sep-2011 22:03:25 GMT; path=/; domain=.google.ch; HttpOnly"/>
      <http:header name="Content-Type" value="text/html; charset=ISO-8859-1"/>
      <http:header name="Server" value="gws"/>
      <http:header name="Cache-Control" value="private, max-age=0"/>
      <http:body media-type="text/html; charset=ISO-8859-1"/>
    </http:response>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1"/>
        <title>Google</title>
        <script>window.google={kEI:"rZB-
        ... 
        </script>
        </center>
      </body>
    </html>


The response content type can also be overwritten in order to retrieve HTML pages and other textual data as plain string (using `text/plain`) or in its binary representation (using `application/octet-stream`). With the `http:header` element, a custom user agent can be set. See the following example: 


**Query:**


    let $binary
    :=  http:send-request(
      <http:request method='get'
         override-media-type='application/octet-stream'       
         href='http://www.google.com'>
        <http:header name="User-Agent" value="Opera"/>
      </http:request>
    )[2]
    return try {
      html:parse($binary)
    } catch * {
      'Conversion to XML failed: ' || $err:description
    }


#### SVG Data

Content-type ending with +xml, e.g. image/svg+xml. 


**Query:**


    http:send-request(<http:request method='get'/>, 'http://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_VS_SVG.svg')


**Result:**


    <http:response status="200" message="OK">
      <http:header name="ETag" value="W/"11b6d-4ba15ed4""/>
      <http:header name="Age" value="9260"/>
      <http:header name="Date" value="Mon, 14 Mar 2011 19:17:10 GMT"/>
      <http:header name="Content-Length" value="72557"/>
      <http:header name="Last-Modified" value="Wed, 17 Mar 2010 22:59:32 GMT"/>
      <http:header name="Content-Type" value="image/svg+xml"/>
      <http:header name="X-Cache-Lookup" value="MISS from knsq22.knams.wikimedia.org:80"/>
      <http:header name="Connection" value="keep-alive"/>
      <http:header name="Server" value="Sun-Java-System-Web-Server/7.0"/>
      <http:header name="X-Cache" value="MISS from knsq22.knams.wikimedia.org"/>
      <http:body media-type="image/svg+xml"/>
    </http:response>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1063" height="638">
      <defs>
        <linearGradient id="lg0">
          <stop stop-color="#3333ff" offset="0"/>
          <stop stop-color="#3f3fff" stop-opacity="0" offset="1"/>
        </linearGradient>
        ...
    </svg>


#### POST Request

POST request to the BaseX REST Service, specifying a username and password. 


**Query:**


    let $request
    :=
      <http:request href='http://localhost:8984/rest'
        method='post' username='admin' password='admin' send-authorization='true'>
        <http:body media-type='application/xml'>
        <query xmlns="http://basex.org/rest">
          <text><![CDATA[
            <html>{
              for $i in 1 to 3
              return <div>Section {$i }</div>
            }</html>
          ]]></text>
        </query>
        </http:body>
      </http:request>
    return http:send-request($request)


**Result:**


    <http:response xmlns:http="http://expath.org/ns/http-client" status="200" message="OK">
      <http:header name="Content-Length" value="135"/>
      <http:header name="Content-Type" value="application/xml"/>
      <http:header name="Server" value="Jetty(6.1.26)"/>
      <http:body media-type="application/xml"/>
    </http:response>
    <html>
      <div>Section 1</div>
      <div>Section 2</div>
      <div>Section 3</div>
    </html>

 
## Errors

**Code ** | Description 
--------- | ------------
`HC0001` | An HTTP error occurred. 
`HC0002` | Error parsing the entity content as XML or HTML. 
`HC0003` | With a multipart response, the override-media-type must be either a multipart media type or application/octet-stream. 
`HC0004` | The src attribute on the body element is mutually exclusive with all other attribute (except the media-type). 
`HC0005` | The request element is not valid. 
`HC0006` | A timeout occurred waiting for the response. 
 
## Changelog
** Version 7.6 **

 * Updated: [http:send-request](HTTP Module.md#http-send-request): `HC0002`: is raised if the input cannot be parsed, or converted to the final data type. 
 * Updated: errors are using `text/plain` as media-type. 
