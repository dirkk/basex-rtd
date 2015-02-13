 


 
This page presents one of the [Web Application](Web Application.md) services. It describes how to use the REST API of BaseX. 

 
BaseX offers a RESTful API for accessing distributed XML resources. REST ([REpresentational State Transfer](http://en.wikipedia.org/wiki/Representational_State_Transfer)) facilitates a simple and fast access to databases through HTTP. The HTTP methods GET, PUT, DELETE, and POST can be used to interact with the database. 

 
# Usage

By default, REST services are available at `http://localhost:8984/rest/`. If no default credentials are specified in the URL or when starting the web application, they will be requested by the client ([see further](Web Application.md#Web_ApplicationUser_Management)). 


A web browser can be used to perform simple GET-based REST requests and display the response. Some alternatives for using REST are listed in the [Usage Examples](REST.md#Usage_Examples). 

 
# URL Architecture

The root URL lists all available databases. The following examples assume that you have created a database instance from the [factbook.xml](http://files.basex.org/xml/factbook.xml) document: 

** **


    <rest:databases resources="1" xmlns:rest="http://basex.org/rest">
      <rest:database resources="1" size="1813599">factbook</rest:database>
    </rest:databases>


The resources of a database can be listed by specifying the database, and potential sub directories, in the URL. In the given example, a single XML document is stored in the _factbook_ database: 

** **


    <rest:database name="factbook" resources="1" xmlns:rest="http://basex.org/rest">
      <rest:resource type="xml" content-type="application/xml" size="77192">factbook.xml</rest:resource>
    </rest:database>


The contents of a database can be retrieved by directly addressing the resource: 

** **


If a resource is not found, an HTTP response will be generated with `404` as status code. 


## Parameters

The following **parameters** can be applied to the operations: 

 * **Variables** :External variables can be _bound_ before a query is evaluated ([see below](REST.md#Assigning_Variables) for more). 
 * **Context** :The `context` parameter may be used to provide an initial XML context node. 
 * **Options** :Specified [Options](Options.md) are applied before the actual operation will be performed. 
 * **Serialization** :All [Serialization](Serialization.md) parameters known to BaseX can be specified as query parameters. Parameters that are specified within a query will be interpreted by the REST server before the output is generated. 
 * **Wrap** :The `wrap` parameter encloses all query results with XML elements, using the `http://basex.org/rest` namespace. 

While **Options** can be specified for all operations, the remaining parameters will only make sense for **Query** and **Run**. 

 
# Request Methods

## GET Requests

If the GET method is used, all query parameters are directly specified within the URL. Additionally, the following **operations** can be specified: 

 * `query` : Evaluate an XQuery expression. If a database or database path is specified in the URL, it is used as initial query context. 
 * `command` : Execute a single [database command](Commands.md). 
 * `run` : Evaluate an XQuery file or command script located on the server. The file path is resolved against the webapp directory (defined by `WEBPATH`). Before Version 7.9, only XQuery files could be evaluated. 
** Examples **

 * Lists all resources found in the **tmp** path of the _factbook_ database:`http://localhost:8984/rest/factbook/tmp`
 * Prints the city names from the _factbook_ database and encloses all results with a `<rest:result/>` elements:`http://localhost:8984/rest/factbook?query=//city/name&wrap=yes`
 * Serializes a document as JSONML:`http://localhost:8984/rest/factbook/factbook.xml?method=json&json=format=jsonml`
 * `US-ASCII`  is chosen as output encoding, and the query `eval.xq` is evaluated:`http://localhost:8984/rest?run=eval.xq&encoding=US-ASCII`
 * The next URL lists all database users that are known to BaseX:`http://localhost:8984/rest?command=show+users`

## POST Requests

The body of a POST request is interpreted as XML fragment, which specifies the operation to perform. The body must conform to a given [XML Schema](http://docs.basex.org/wiki/REST:_POST_Schema). 

** Examples **

 * The following query returns the first five city names of the **factbook** database: 

    <query xmlns="http://basex.org/rest">
      <text><![CDATA[ (//city/name)[position() <= 5] ]]></text>
    </query>

 * The second query returns the string lengths of all text nodes, which are found in the node that has been specified as initial context node: 

    <rest:query xmlns:rest="http://basex.org/rest">
      <rest:text>for $i in .//text() return string-length($i)</rest:text>
      <rest:context>
        <xml>
          <text>Hello</text>
          <text>World</text>
        </xml>
      </rest:context>
    </rest:query>

 * The following request returns the registered database users encoded in `ISO-8859-1`: 

    <command xmlns="http://basex.org/rest">
      <text>show users</text>
      <parameter name='encoding' value='ISO-8859-1'/>
    </command>

 * This example creates a new database from the specified input and retains all whitespaces: 

    <command xmlns="http://basex.org/rest">
      <text>create db test http://files.basex.org/xml/xmark.xml</text>
      <option name='chop' value='false'/>
    </command>

 * The last request runs a query `query.xq` located in the directory specified by `WEBPATH`: 

    <run xmlns="http://basex.org/rest">
      <text>query.xq</text>
    </run>


## PUT Requests

The PUT method is used to create new databases, or to add or update existing database resources: 

 * **Create Database** :A new database is created if the URL only specifies the name of a database. If the request body contains XML, a single document is created, adopting the name of the database. 
 * **Store Resource** :A resource is added to the database if the URL contains a database path. If the addressed resource already exists, it is replaced by the new input. 

There are two ways to store non-XML data in BaseX: 

 * **Store as raw** : If `application/octet-stream` is chosen as content-type, the input data is added as raw. 
 * **Convert to XML** : Incoming data is converted to XML if a parser is available for the specified content-type. The following content types are supported: 

If raw data is added and if no content type, or a wrong content, is specified, a `400` (BAD REQUEST) error will be raised. 

** Examples **

 * A new database with the name **XMark** is created. If XML input is sent in the HTTP body, the resulting database resource will be called **XMark.xml**:`http://localhost:8984/rest/XMark`
 * A new database is created, and no whitespaces will be removed from the passed on XML input:`http://localhost:8984/rest/XMark?chop=false`
 * The contents of the HTTP body will be taken as input for the document **one.xml**, which will be stored in the **XMark** database:`http://localhost:8984/rest/XMark/one.xml`

An HTTP response with status code `201` (CREATED) is sent back if the operation was successful. Otherwise, the server will reply with `404` (if a specified database was not found) or `400` (if the operation could not be completed). 


Have a look at the [usage examples](REST.md#Usage_Examples) for more detailed examples using Java and shell tools like cURL. 


## DELETE Requests

The DELETE method is used to delete databases or resources within a database. 

** Example **

 * The **factbook** database is deleted:`http://localhost:8984/rest/factbook`
 * All resources of the **XMark** database are deleted that reside in the **tmp** path:`http://localhost:8984/rest/XMark/tmp/`

The HTTP status code `404` is returned if no database is specified. `200` (OK) will be sent in all other cases. 

 
# Assigning Variables

## GET Requests

All query parameters that have not been processed before will be treated as variable assignments: 

** Example **

 * The following request assigns two variables to a server-side query file `mult.xq` placed in the HTTP directory:`http://localhost:8984/rest?run=mult.xq&$a=21&$b=2`

    (: XQuery file: mult.xq
    :)
    declare variable $a as xs:integer external;
    declare variable $b as xs:integer external;
    <mult>{ $a * $b }</mult>


The dollar sign can be omitted as long as the variable name does not equal a parameter keyword (e.g.: `method`). 


## POST Requests

If `query` or `run` is used as operation, external variables can be specified via the `<variable/>` element: 


    <query xmlns="http://basex.org/rest">
      <text><![CDATA[
        declare variable $x as xs:integer external;
        declare variable $y as xs:integer external;
        <mult>{ $a * $b }</mult>
      ]]></text>
      <variable name="a" value="21"/>
      <variable name="b" value="2"/>
    </query>

 
# Content Type

As the content type of a REST response cannot be dynamically determined in all cases, it can be manually adjusted by the user. The final content type of a REST response is chosen in several steps: 

1. By default, the content type of a response depends on the chosen operation: 
2. The default content type is overwritten if a [serialization method](Serialization.md) is specified, either as [query parameters](REST.md#RESTParameters) or within the XQuery expression. The following method/content-type mappings are available: 
3. The content type is overwritten in any case if a specific [media-type](Serialization.md) is chosen, again as query parameter or within the query. 

The following three example requests will all return `<a/>` as result and use `application/xml` as content-type: 

** **

 
# Usage Examples

## Java

### Authentication

Most programming languages offer libraries to communicate with HTTP servers. The following example demonstrates how easy it is to perform a DELETE request with Java. 


Basic access authentication can be activated in Java by adding an authorization header to the `HttpURLConnection` instance. The header contains the word `Basic`, which specifies the authentication method, followed by the Base64-encoded `USER:PASSWORD` pair. As Java does not include a default conversion library for Base64 data, the internal BaseX class `org.basex.util.Base64` can be used for that purpose: 


    import java.net.*;
    import org.basex.util.*;
    public final class RESTExample {
      public static void main(String[] args) throws Exception {
        // The java URL connection to the resource. 
        URL url = new URL("http://localhost:8984/rest/factbook"); 
        // Establish the connection to the URL. 
        HttpURLConnection conn = (HttpURLConnection) url.openConnection(); 
        // Set as DELETE request. 
        conn.setRequestMethod("DELETE"); 
        // User and password.
        String user = "bob";
        String pw ="alice";
        // Encode user name and password pair with a base64 implementation.
        String encoded = Base64.encode(user + ":" + pw);
        // Basic access authentication header to connection request.
        conn.setRequestProperty("Authorization", "Basic " + encoded);
        // Print the HTTP response code. 
        System.out.println("HTTP response: " + conn.getResponseCode()); 
        // Close connection. 
        conn.disconnect(); 
      }
    }


### Content-Types

The content-type of the input can easily be included, just add the following property to the connection (in this example we explicitly store the input file as raw): 


    // store input as raw
    conn.setRequestProperty("Content-Type", "application/octet-stream");


See the [PUT Requests](REST.md#PUT_Requests) section for a description of the possible content-types. 


Find Java examples for all methods here: [GET](https://github.com/BaseXdb/basex-examples/tree/master/src/main/java/org/basex/examples/rest/RESTGet.java), [POST](https://github.com/BaseXdb/basex-examples/tree/master/src/main/java/org/basex/examples/rest/RESTPost.java), [PUT](https://github.com/BaseXdb/basex-examples/tree/master/src/main/java/org/basex/examples/rest/RESTPut.java), [DELETE](https://github.com/BaseXdb/basex-examples/tree/master/src/main/java/org/basex/examples/rest/RESTDelete.java). 


## Command Line

Tools such as the Linux commands [Wget](http://www.gnu.org/s/wget/) or [cURL](http://curl.haxx.se/) exist to perform HTTP requests (try copy & paste): 

** GET **

 * `curl -i "http://localhost:8984/rest/factbook?query=//city/name"`
** POST **

 * `curl -i -X POST -H "Content-Type: application/xml" -d "<query xmlns='http://basex.org/rest'><text>//city/name</text></query>""http://localhost:8984/rest/factbook"`
 * `curl -i -X POST -H "Content-Type: application/xml" -T query.xml "http://localhost:8984/rest/factbook"`
** PUT **

 * `curl -i -X PUT -T "etc/xml/factbook.xml""http://localhost:8984/rest/factbook"`
 * `curl -i -X PUT -H "Content-Type: application/json" -T "plain.json""http://localhost:8984/rest/plain"`
** DELETE **

 * `curl -i -X DELETE "http://admin:admin@localhost:8984/rest/factbook"`
 
# Changelog
** Version 7.9 **

 * Updated: Also evaluate command scripts via the `run` operation. 
** Version 7.2 **

 * Removed: direct evaluation of adresses resources with `application/xquery` as content type 
** Version 7.1.1 **

 * Added: `options` parameter for specifying database options 
** Version 7.1 **

 * Added: PUT request: automatic conversion to XML if known content type is specified 
** Version 7.0 **

 * REST API introduced, replacing the old JAX-RX API 
