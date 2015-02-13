 


 
This [XQuery Module](Module Library.md) contains functions to perform validations against [XML Schema](http://www.w3.org/XML/Schema) and [Document Type Declarations](http://en.wikipedia.org/wiki/Document_Type_Declaration). By default, this module uses Java’s standard validators. As an alternative, [Saxon XSLT Processor](http://www.saxonica.com/) is used if (`saxon9he.jar`, `saxon9pe.jar` or `saxon9ee.jar`) is added to the classpath. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/validate` namespace, which is statically bound to the `validate` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## validate:xsd

validate:xsd($input as item()) as empty-sequence()
validate:xsd($input as item(), $schema as item()) as empty-sequence()

:   Validates the document specified by `$input`. Both `$input` and `$schema` can be specified as:  * `xs:string` , containing the path to the resource, 

    **Errors**


    `BXVA0001`: the validation fails.`BXVA0002`: the validation process cannot be started. 

    **Examples**


    * `validate:xsd('doc.xml', 'doc.xsd')`  validates the document `doc.xml` against the specified schema `doc.xsd`. 
    * The following example demonstrates how a document can be validated against a schema without resorting to local or remote URIs: 
    let $doc
    := <simple:root xmlns:simple='http://basex.org/simple'/>
    let $schema
    :=
    <xs:schema xmlns:xs='http://www.w3.org/2001/XMLSchema' targetNamespace='http://basex.org/simple'>
    <xs:element name='root'/>
    </xs:schema>
    return validate:xsd($doc, $schema)


## validate:xsd-info

validate:xsd-info($input as item()) as xs:string*
validate:xsd-info($input as item(), $schema as item()) as xs:string*

:   Validates the document specified by `$input` and returns warning, errors and fatal errors in a string sequence. `$input` and `$schema` can be specified as:  * `xs:string` , containing the path to the resource, 

    **Errors**


    `BXVA0002`: the validation process cannot be started. 


## validate:dtd

validate:dtd($input as item()) as empty-sequence()
validate:dtd($input as item(), $dtd as xs:string) as empty-sequence()

:   Validates the document specified by `$input`. `$input` can be specified as:  * an `xs:string`, containing the path to the resource, 

    **Errors**


    `BXVA0001`: the validation fails.`BXVA0002`: the validation process cannot be started. 

    **Examples**


    * `validate:dtd('doc.xml', 'doc.dtd')`  validates the document `doc.xml` against the specified DTD file `doc.dtd`. 
    * The following example validates an invalid document against a DTD, which is specified as string: 
    try {
    let $doc
    := <invalid/>
    let $dtd
    := '<!ELEMENT root (#PCDATA)>'
    return validate:dtd($doc, $dtd)
    } catch BXVA0001 {
    'DTD Validation failed.'
    }


## validate:dtd-info

validate:dtd-info($input as item()) as xs:string*
validate:dtd-info($input as item(), $dtd as xs:string) as xs:string*

:   Validates the document specified by `$input` and returns warning, errors and fatal errors in a string sequence. `$input` can be specified as:  * `xs:string` , containing the path to the resource, 

    **Errors**


    `BXVA0002`: the validation process cannot be started. 

 
# Errors

**Code ** | Description 
--------- | ------------
`BXVA0001` | The document cannot be validated against the specified DTD or XML Schema. 
`BXVA0002` | The validation cannot be started. 
 
# Changelog
** Version 7.6 **

 * Added: [validate:xsd-info](Validation Module.md#validate-xsd-info), [validate:dtd-info](Validation Module.md#validate-dtd-info)

The module was introduced with Version 7.3. 

