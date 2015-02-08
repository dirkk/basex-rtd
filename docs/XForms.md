
# XForms
 


 
This page is part of the [Developer Section](Developing.md) and belongs to the [Web Application](Web Application.md) stack. It describes how to use [XForms](https://en.wikipedia.org/wiki/XForms) with BaseX. 

 
XForms provides mechanisms to display and edit the contents of XML snippets in the browser without resorting to JavaScript. In combination with the [RESTXQ](RESTXQ.md) API and the database backend, this is an elegant way of building web applications that completely reside in the XML stack. 

 
## Internals

If an HTML document with XForms elements is requested, a web form is generated, which allows users to edit the contents of an XML file. The data model stays consistent during this process, i.e. the data types are always as described in the models. Actions can be configured as well: the model can e. g. be sent to a server and processed further, using the [REST](REST.md) or [RESTXQ](RESTXQ.md) APIs. 


### Run the example

Several [implementations](http://www.w3.org/community/xformsusers/wiki/XForms_Implementations) of the XForms Recommendation are available (some AJAX-based, some client-side). In this article, we will focus on the light-weight, LGPL-licensed [XSLTForms](http://www.agencexml.com/xsltforms) project from Alain Couthures. The following steps are required to get the XForms example running: 

 * download the [xsltforms.zip](http://files.basex.org/etc/xsltforms.zip) example file, which includes the demo page and XSLTForms, and extract its contents to your `webapp` directory 
 * start a BaseX HTTP server 
 * open a browser and visit the URL `http://localhost:8984/static/xforms-demo.xml`

This is the head section of the XForms demo: 


    <?xml-stylesheet href="xsltforms/xsltforms.xsl" type="text/xsl"?>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:xf="http://www.w3.org/2002/xforms">
      <!-- ... -->
    </html>


The processing instruction in the first line tells the browser where to find the XSLTForms implementation. The rules of the XML Stylesheet will then be applied to transform the XForms elements in the document to HTML. As the XForms code is interpreted, it can not be inspected in the browser, but you can press `F1` to enter the debug mode. 


Usually, the XForms Model is placed in the head section of the HTML document: 


      <xf:model>
        <xf:instance>
          <track xmlns="">
            <metadata>
              <title>Like A Rolling Stone</title>
              <artist>Bob Dylan</artist>
              <date>1965-06-21</date>
              <genre>Folk</genre>
            </metadata>
          </track>
        </xf:instance>
        <xf:bind id="_date" nodeset="//date" type="xs:date"/>
      </xf:model>


It contains an instance of the model and a binding. The model is some plain XML, and the `xf:bin` elements can be used to bind elements to a specific type. 


The data can be accessed with the `xf:output` element, and the XML nodes to be displayed are addressed via XPath 1.0 in the `ref` attribute. For example, the artist is addressed via: 


    <xf:output ref="//artist"/>


To modify the XML instance, `xf:input` elements are used. With the following code, 


    <xf:input ref="//date" incremental="true"/>


an input element is displayed that allows users to change the date. As `xs:date` was bound to dates in the data model, a date picker will be presented for choosing a valid date. 


### Further reading

For further reading, you are invited to 

 * check out the [XForms Wikibooks](https://en.wikibooks.org/wiki/XForms) page, 
 * look into the [XForms 2.0](http://www.w3.org/MarkUp/Forms/wiki/XForms_2.0) specification, or 
 * join the [xsltforms-support](https://lists.sourceforge.net/lists/listinfo/xsltforms-support) mailing list. 
