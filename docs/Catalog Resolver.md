 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). It clarifies how to deal with external DTD declarations when parsing XML data. 

 
# Overview

XML documents often rely on Document Type Definitions (DTDs). While parsing a document with BaseX, entities can be resolved with respect to that particular DTD. By default, the DTD is only used for entity resolution. 


XHTML, for example, defines its doctype via the following line: 


    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 


Fetching `xhtml1-strict.dtd` obviously involves network traffic. When dealing with single files, this may seem tolerable, but importing large collections benefits from caching these resources. Depending on the remote server, you will experience significant speed improvements when caching DTDs locally. 


## XML Entity and URI Resolvers 

BaseX comes with a default URI resolver that is usable out of the box. 


To enable entity resolving you have to provide a valid XML Catalog file, so that the parser knows where to look for mirrored DTDs. 


A simple working example for XHTML might look like this: 


    <?xml version="1.0"?>
    <catalog prefer="system" xmlns="urn:oasis:names:tc:entity:xmlns:xml:catalog">
       <rewriteSystem systemIdStartString="http://www.w3.org/TR/xhtml1/DTD/" rewritePrefix="file:///path/to/dtds/" />
    </catalog>


This rewrites all systemIds starting with: _http://www.w3.org/TR/xhtml1/DTD/_ to _file:///path/to/dtds/_. 


The XHTML DTD `xhtml1-strict.dtd` and all its linked resources will now be loaded from the specified path. 


### GUI Mode

When running BaseX in GUI mode, simply provide the path to your XML Catalog file in the _Parsing_ Tab of the Database Creation Dialog. 


### Console & Server Mode

To enable Entity Resolving in Console Mode, specify the following [options](Options.md): 

 * `SET CATFILE [path]`

Now entity resolving is active for the current session. All subsequent `ADD` commands will use the catalog file to resolve entities. 


The **paths** to your catalog file and the actual DTDs are either absolute or relative to the _current working directory_. When using BaseX in Client-Server-Mode, this is relative to the _server's_ working directory. 


### Please Note

Entity resolving only works if the [internal XML parser](Parsers.md#XML_Parsers) is switched off (which is the default case). If you use the internal parser, you can manually specify whether you want to parse DTDs and entities or not. 


## Using other Resolvers 

There might be some cases when you do not want to use the built-in resolver that Java provides by default (via `com.sun.org.apache.xml.internal.resolver.*`). 


BaseX offers support for the Apache-maintained [XML Commons Resolver](http://xml.apache.org/commons), available for download [here](http://xerces.apache.org/mirrors.cgi). 


To use it add **resolver.jar** to the classpath when [starting BaseX](Startup.md): 


    java -cp basex.jar:resolver.jar org.basex.BaseXServer


## More Information 
 * [Wikipedia on Document Type Definitions](http://en.wikipedia.org/wiki/Document_Type_Definition)
 * [Apache XML Commons Article on Entity Resolving](http://xml.apache.org/commons/components/resolver/resolver-article.html)
 * [XML Entity and URI Resolvers](http://java.sun.com/webservices/docs/1.6/jaxb/catalog.html) , Sun 
 * [XML Catalogs. OASIS Standard, Version 1.1. 07-October-2005.](http://www.oasis-open.org/committees/download.php/14810/xml-catalogs.pdf)
