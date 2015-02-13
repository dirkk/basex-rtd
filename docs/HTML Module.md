 


 
This [XQuery Module](Module Library.md) provides functions for converting HTML to XML. Conversion will only take place if [TagSoup](http://home.ccil.org/~cowan/XML/tagsoup/) is included in the classpath (see [HTML Parsing](Parsers.md#HTML_Parser) for more details). 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/html` namespace, which is statically bound to the `html` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## html:parser

html:parser() as xs:string

:   Returns the name of the applied HTML parser (currently: `TagSoup`). If an _empty string_ is returned, TagSoup was not found in the classpath, and the input will be treated as well-formed XML. 


## html:parse

html:parse($input as xs:anyAtomicType) as document-node()
html:parse($input as xs:anyAtomicType, $options as item()) as document-node()

:   Converts the HTML document specified by `$input` to XML, and returns a document node:  * The input may either be a string or a binary item (xs:hexBinary, xs:base64Binary). 

    **Errors**


    `BXHL0001`: the input cannot be converted to XML. 

 
# Examples

## Basic Example

The following query converts the specified string to an XML document node. 

** Query**


    html:parse("<html>")

** Result**


    <html xmlns="http://www.w3.org/1999/xhtml"/>


## Specifying Options

The next query creates an XML document without namespaces: 

** Query**


    html:parse("<a href='ok.html'/>", map { 'nons': true() })

** Result**


    <html>
      <body>
        <a shape="rect" href="ok.html"/>
      </body>
    </html>


## Parsing Binary Input

If the input encoding is unknown, the data to be processed can be passed on in its binary representation. The HTML parser will automatically try to detect the correct encoding: 

** Query**


    html:parse(fetch:binary("http://en.wikipedia.org"))

** Result**


    <html xmlns="http://www.w3.org/1999/xhtml" class="client-nojs" dir="ltr" lang="en">
      <head>
        <title>Wikipedia, the free encyclopedia</title>
        <meta charset="UTF-8"/>
        ...

 
# Errors

**Code ** | Description 
--------- | ------------
`BXHL0001` | The input cannot be converted to XML. 
 
# Changelog

The module was introduced with Version 7.6. 

