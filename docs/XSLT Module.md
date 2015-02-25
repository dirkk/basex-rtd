 


 
This [XQuery Module](Module Library.md) contains functions and variables to perform XSLT transformations. By default, this module uses Java’s XSLT 1.0 Xalan implementation to transform documents. XSLT 2.0 is used instead if Version 9.x of the [Saxon XSLT Processor](http://www.saxonica.com/) (`saxon9he.jar`, `saxon9pe.jar`, `saxon9ee.jar`) is found in the classpath. A custom transformer can be specified by overwriting the system property `javax.xml.transform.TransformerFactory`, as shown in the following Java example: 

 
    System.setProperty("javax.xml.transform.TransformerFactory", "org.custom.xslt.TransformerFactoryImpl");
    Context ctx = new Context();
    String result = new XQuery("xslt:transform('...', '...')").execute(ctx);
    ...
    ctx.close();

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/xslt` namespace, which is statically bound to the `xslt` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## xslt:processor

xslt:processor() as xs:string

:   Returns the name of the applied XSLT processor, or the path to a custom implementation (currently: "Java", "Saxon EE", "Saxon PE", or "Saxon HE"). 


## xslt:version

xslt:version() as xs:string

:   Returns the supported XSLT version (currently: "1.0" or "2.0"). "Unknown" is returned if a custom implementation was chosen. 


## xslt:transform

xslt:transform($input as item(), $stylesheet as item()) as node()
xslt:transform($input as item(), $stylesheet as item(), $params as item()) as node()

:   Transforms the document specified by `$input`, using the XSLT template specified by `$stylesheet`, and returns the result as node. `$input` and `$stylesheet` can be specified as  * `xs:string` , containing the path to the document, 


## xslt:transform-text

xslt:transform-text($input as item(), $stylesheet as item()) as xs:string
xslt:transform-text($input as item(), $stylesheet as item(), $params as item()) as xs:string

:   Transforms the document specified by `$input`, using the XSLT template specified by `$stylesheet`, and returns the result as string. The parameters are the same as described for [xslt:transform](XSLT Module.md#xslttransform). 


## Examples

**Example 1: Basic XSL transformation with dummy document and without parameters**


**Query:**


    xslt:transform-text(<dummy/>, 'basic.xslt')


**basic.xslt**


    <xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
      <xsl:template match="/">123</xsl:template>
    </xsl:stylesheet>


**Result:**


    123


**Example 2: XSLT transformation of an input document**


**Query:**


    (: Outputs the result as html.
    :)
    declare option output:method 'html';
    (: Turn whitespace chopping off.
    :)
    declare option db:chop 'no';
    let $in
    :=
      <books>
        <book>
          <title>XSLT Programmer’s Reference</title> 
          <author>Michael H. Kay</author> 
        </book>
        <book>
          <title>XSLT</title> 
          <author>Doug Tidwell</author> 
          <author>Simon St. Laurent</author>
          <author>Robert Romano</author>
        </book>
      </books>
    let $style
    :=
      <xsl:stylesheet version='2.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
      <xsl:output method='xml'/>
        <xsl:template match="/">
    <html>
      <body>
        <div>
          <xsl:for-each select='books/book'>
          • <b><xsl:apply-templates select='title'/></b>: <xsl:value-of select='author'/><br/>
          </xsl:for-each>
        </div>
      </body>
    </html>
        </xsl:template>
      </xsl:stylesheet>
    return xslt:transform($in, $style)


**Result:**


    <html>
      <body>
        <div>
          • <b>XSLT Programmer’s Reference</b>: Michael H. Kay<br>
          • <b>XSLT</b>: Doug Tidwell<br>
        </div>
      </body>
    </html>


**Example 3: Assigning a variable to an XSLT stylesheet**


**Query:**


    let $in
    := <dummy/>
    let $style
    := doc('variable.xsl')
    return (
      xslt:transform($in, $style, <xslt:parameters><xslt:v>1</xslt:v></xslt:parameters>),
      xslt:transform($in, $style, map { "v": 1 })
    )


**variable.xslt**


    <xsl:stylesheet version='1.0'
        xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
      <xsl:param name='v'/>
        <xsl:template match='/'>
          <v><xsl:value-of select='$v'/></v>
        </xsl:template>
    </xsl:stylesheet>


**Result:**


    <v>1</v>
    <v>1</v>

 
# Errors

**Code ** | Description 
--------- | ------------
`BXSL0001` |  An error occurred during the transformation process. 
 
# Changelog
** Version 7.6 **

 * Added: [xslt:transform-text](XSLT Module.md#xslttransform-text)
 * Updated: [xslt:transform](XSLT Module.md#xslttransform) returned error code 
** Version 7.3 **

 * Updated: $xslt:processor → [xslt:processor](XSLT Module.md#xsltprocessor), $xslt:version → [xslt:version](XSLT Module.md#xsltversion)
