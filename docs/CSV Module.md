
# CSV Module
 


 
This [XQuery Module](Module Library.md) contains a single function to parse CSV input. [CSV](http://en.wikipedia.org/wiki/Comma-separated_values) (comma-separated values) is a popular representation for tabular data, exported e. g. from Excel. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/csv` namespace, which is statically bound to the `csv` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 


### Conversion

#### XML: Direct, Attributes

CSV is converted to XML as follows: 

 * The resulting XML document has a `<csv>` root element. 
 * Rows are represented via `<record>` elements. 
 * Fields are represented via `<entry>` elements. The value of a field is represented as text node. 
 * If the `header` option is set to `true`, the first text line is parsed as table header, and the `<entry>` elements are replaced with the field names: 
 * If `format` is set to `attributes`, field names will be stored in name attributes. 

#### Map

If `format` is set to `map`, the CSV data will be converted to an XQuery map: 

 * All records are enumerated with positive integers. 
 * By default, all entries of a records are represented in a sequence. 
 * If the `header` option is set to `true`, a map is created, which contains all field names and its values. 

**A little advice**: in the Database Creation dialog of the GUI, if you select CSV Parsing and switch to the _Parsing_ tab, you can see the effects of some of the conversion options. 


### Options

The following options are available: 


** Option ** | ** Description ** | ** Allowed ** | ** Default **
------------ | ----------------- | ------------- | -------------
`separator` |  Defines the character which separates the entries of a record in a single line.  | `comma`, `semicolon`, `colon`, `tab`, `space` or a _single character_ | `comma`
`header` |  Indicates if the first line of the parsed or serialized CSV data is a table header.  | `yes`, `no` | `no`
`format` |  Specifies the format of the XML data. The format is only relevant if the `header` option is activated:  * With `direct` conversion, field names are represented as element names 
 * With `attributes` conversion, field names are stored in `name` attributes 
 * With `map` conversion, the input is converted to an XQuery map 
 | `direct`, `attributes`, `map` | `direct`
`lax` |  Specifies if a lax approach is used to convert QNames to JSON names.  | `yes`, `no` | `yes`
`quotes` |  Specifies if quotes should be parsed in the input and generated in the output.  | `yes`, `no` | `yes`
`backslashes` |  Specifies if characters are escaped by backslashes. Otherwise, a double quote is encoded by a second consecutive quote (Version 8.0)  | `yes`, `no` | `no`

The CSV function signatures provide an `$options` argument. Options can either be specified 

 * as children of an `<csv:options/>` element; e.g.: 

    <csv:options>
      <csv:separator value=';'/>
      ...
    </csv:options>

 * or as map, which contains all key/value pairs: 

    map { 'separator': ';', ... }

 
## Functions

### csv:parse

`csv:parse($input as xs:string) as document-node(element(csv))`
`csv:parse($input as xs:string, $options as item()) as item()`

Converts the CSV data specified by `$input` to an XML document or a map. The `$options` argument can be used to control the way the input is converted. 

**Errors**

`BXCS0001`: the input cannot be parsed. 

### csv:serialize

`csv:serialize($input as node()) as xs:string`
`csv:serialize($input as node(), $options as item()) as xs:string`

Serializes the node specified by `$input` as CSV data, and returns the result as `xs:string`. Items can also be serialized as JSON if the [Serialization Parameter](Serialization.md)`method` is set to `csv`.The `$options` argument can be used to control the way the input is serialized. 

**Errors**

`BXCS0002`: the input cannot be serialized. 
 
## Examples

**Example 1:** Converts CSV data to XML, interpreting the first row as table header: 


**Input**`addressbook.csv`: 


    Name,First Name,Address,City
    Huber,Sepp,Hauptstraße 13,93547 Hintertupfing


**Query:**


    let $text := file:read-text('addressbook.csv')
    return csv:parse($text, { 'header': true() })


**Result:**


    <csv>
      <record>
        <Name>Huber</Name>
        <First_Name>Sepp</First_Name>
        <Address>Hauptstraße 13</Address>
        <City>93547 Hintertupfing</City>
      </record>
    </csv>


**Example 2:** Converts some CSV data to XML and back, and checks if the input and output are equal. The expected result is `true`: 


**Query:**


    let $text := file:read-text('some-data.csv')
    let $options := { 'lax': 'no' }
    let $xml := csv:parse($text, $options)
    let $csv := csv:serialize($xml, $options)
    return $text eq $csv


**Example 3:** Converts CSV data to an XQuery map item and serializes its contents: 


**Query:**


    let $text := "Name;City" || out:nl() || "John;Newton" || out:nl() || "Jack;Oldtown"
    let $options :=
      <csv:options>
        <csv:separator value=';'/>
        <csv:format value='map'/>
        <csv:header value='yes'/>
      </csv:options>
    let $map := csv:parse($text, $options)
    return map:serialize($map)


**Result:**


    {
      1: {
        "City": "Newton",
        "Name": "John"
      },
      2: {
        "City": "Oldtown",
        "Name": "Jack"
      }
    }

 
## Errors

**Code ** | Description 
--------- | ------------
`BXCS0001` |  The input cannot be parsed. 
`BXCS0002` |  The node cannot be serialized. 
 
## Changelog
UNKNOWN * Added: `backslashes` option 
UNKNOWN * Updated: [csv:parse](CSV Module.md#csv-parse) now returns a document node instead of an element, or an XQuery map if `format` is set to `map`. 
 * Added: `format` and `lax` options 

The module was introduced with Version 7.7.2. 

