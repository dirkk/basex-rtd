 


 
This page is part of the [XQuery Portal](XQuery.md). Serialization parameters define how XQuery items and XML nodes are textually output, i.e., _serialized_. (For input, see [Parsers](Parsers.md).) They have been formalized in the [W3C XQuery Serialization 3.0](http://www.w3.org/TR/xslt-xquery-serialization-30) document. In BaseX, they can be specified by… 

  * including them in the [prolog of the XQuery expression](XQuery 3.0.md#XQuery_3.0Serialization), 
 * specifying them in the XQuery functions [file:write()](File Module.md#file-write) or [fn:serialize()](XQuery 3.0.md#XQuery_3.0Functions). The serialization parameters are specified as 
 * using the `-s` flag of the BaseX [command-line](Command-Line Options.md#BaseX_Standalone) clients, 
 * setting the [SERIALIZER](Options.md#SERIALIZER) option before running a query, 
 * setting the [EXPORTER](Options.md#EXPORTER) option before exporting a database, or 
 * setting them as [REST](REST.md#RESTParameters) query parameters. 
 
# Parameters

The following table gives a brief summary of all serialization parameters recognized by BaseX. For details, please refer to official specification. 


** Parameter ** | ** Description ** | ** Allowed ** | ** Default **
--------------- | ----------------- | ------------- | -------------
`method` |  Specifies the serialization method:  * `xml` , `xhtml`, `html`, `text` and `adaptive` are adopted from the official specification. 
 * `json`  is specific to BaseX and can be used to output XML nodes as JSON objects (see the [JSON Module](JSON Module.md) for more details). 
 * `csv`  is BaseX-specific and can be used to output XML nodes as CSV data (see the [CSV Module](CSV Module.md) for more details). 
 * `raw`  is BaseX-specific, too: Binary data types are output in their _raw_ form, i.e., without modifications. For all other types, the items’ string values are returned. No indentation takes place, and and no characters are encoded via entities. 
 | `adaptive`, `xml`, `xhtml`, `html`, `text`, `json`, `csv`, `raw` | `adaptive` (Since Version 8.0) 
`version` |  Specifies the version of the serialization method.  | `xml/xhtml`: `1.0`, `1.1``html`: `4.0`, `4.01`, `5.0` | `1.0`
`html-version` |  Specifies the version of the HTML serialization method.  | `4.0`, `4.01`, `5.0` | `4.0`
`item-separator` |  Determines a string to be used as item separator. If a separator is specified, the default separation of atomic values with single whitespaces will be skipped.  | _arbitrary strings_, `\n`, `\r\n`, `\r` | _empty_
`encoding` |  Encoding to be used for outputting the data.  | _[all encodings supported by Java](http://docs.oracle.com/javase/7/docs/technotes/guides/intl/encoding.doc.html)_ | `UTF-8`
`indent` |  Adjusts whitespaces to make the output better readable.  | `yes`, `no` | `yes`
`cdata-section-elements` |  List of elements to be output as CDATA, separated by whitespaces.Example: `<text><![CDATA[ <> ]]></text>` |  | 
`omit-xml-declaration` |  Omits the XML declaration, which is serialized before the actual query resultExample: `<?xml version="1.0" encoding="UTF-8"?>` | `yes`, `no` | `yes`
`standalone` |  Prints or omits the "standalone" attribute in the XML declaration.  | `yes`, `no`, `omit` | `omit`
`doctype-system` |  Introduces the output with a document type declaration and the given system identifier.Example: `<!DOCTYPE x SYSTEM "entities.dtd">` |  | 
`doctype-public` |  If `doctype-system` is specified, adds a public identifier.Example: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd">` |  | 
`undeclare-prefixes` |  Undeclares prefixes in XML 1.1.  | `yes`, `no` | `no`
`normalization-form` |  Specifies a normalization form. BaseX supports Form C (`NFC`).  | `NFC`, `none` | `NFC`
`media-type` |  Specifies the media type.  |  | `application/xml`
`parameter-document` |  Parses the value as XML document with additional serialization parameters (see the [Serialization Specification](http://www.w3.org/TR/xslt-xquery-serialization-31/#serparams-in-xdm-instance) for more details). Since Version 8.0 |  | 
`use-character-maps` |  Defines character mappings. May only occur in documents parsed with `parameter-document`. Since Version 8.0 |  | 
`byte-order-mark` |  Prints a byte-order-mark before starting serialization.  | `yes`, `no` | `no`
`escape-uri-attributes` |  Escapes URI information in certain HTML attributesExample: `<a href="%C3%A4%C3%B6%C3%BC">äöü<a>` | `yes`, `no` | `no`
`include-content-type` |  Includes a `meta` content-type element if the result is output as HTMLExample: `<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head>` | `yes`, `no` | `no`

BaseX provides some additional serialization parameters: 


** Parameter ** | ** Description ** | ** Allowed ** | ** Default **
--------------- | ----------------- | ------------- | -------------
`csv` |  Defines the way how data is serialized as CSV.  |  see [CSV Module](CSV Module.md) | 
`json` |  Defines the way how data is serialized as JSON.  |  see [JSON Module](JSON Module.md) | 
`tabulator` |  Uses tab characters (`\t`) instead of spaces for indenting elements.  | `yes`, `no` | `no`
`indents` |  Specifies the number of characters to be indented.  | _positive number_ | `2`
`newline` |  Specifies the type of newline to be used as end-of-line marker.  | `\n`, `\r\n`, `\r` | _system dependent_
`limit` |  Stops serialization after the specified number of bytes has been serialized. If a negative number is specified, everything will be output.  | _positive number_ | `-1`

The `csv` and `json` parameters are supplied with a list of options. Option names and values are combined with `=`, several options are separated by `,`: 


**Query**: 


    (: The output namespace declaration is optional, because it is statically declared in BaseX)
    :)
    declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
    declare option output:method "csv";
    declare option output:csv "header=yes, separator=semicolon";
    <csv>
      <record>
        <Name>John</Name>
        <City>Newton</City>
      </record>
      <record>
        <Name>Jack</Name>
        <City>Oldtown</City>
      </record>
    </csv>


**Result**: 


    Name;City
    John;Newton
    Jack;Oldtown

 
# Changelog
** Version 8.0 **

 * Added: Support for `use-character-maps` and `parameter-document`
 * Added: Serialization method `adaptive`
 * Updated: `adaptive` is new default method (before: `xml`) 
 * Removed: `format`, `wrap-prefix`, `wrap-uri`
** Version 7.8.2 **

 * Added: `limit`: Stops serialization after the specified number of bytes has been serialized 
** Version 7.8 **

 * Added: `csv` and `json` serialization parameters 
 * Removed: `separator` option (use `item-separator` instead) 
** Version 7.7.2 **

 * Added: `csv` serialization method 
 * Added: temporary serialization methods `csv-header`, `csv-separator`, `json-unescape`, `json-spec`, `json-format`
** Version 7.5 **

 * Added: official `item-separator` and `html-version` parameter 
 * Updated: `method=html5` removed; serializers updated with the [latest version of the specification](http://www.w3.org/TR/2013/WD-xslt-xquery-serialization-30-20130108/), using `method=html` and `version=5.0`. 
** Version 7.2 **

 * Added: `separator` parameter 
** Version 7.1 **

 * Added: `newline` parameter 
** Version 7.0 **

 * Added: Serialization parameters added to [REST API](REST.md); JSON/JsonML/raw methods 
