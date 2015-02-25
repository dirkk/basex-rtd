 


 
This [XQuery Module](Module Library.md) contains functions to parse and serialize JSON documents. [JSON (JavaScript Object Notation)](http://www.json.org/) is a popular data exchange format for applications written in JavaScript. As there are notable differences between JSON and XML, no mapping exists that guarantees a lossless, bidirectional conversion between JSON and XML. For this reason, we offer various mappings, all of which are suited to different use cases. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/json` namespace, which is statically bound to the `json` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 


## Conversion Formats

### Direct

The `direct` conversion format allows a lossless conversion from JSON to XML and back. The transformation is based on the following rules: 

 * The resulting document has a `<json>` root node. 
 * Object pairs are represented via elements. The name of a pair is rewritten to an element name: 
 * Array entries are also represented via elements. `_` is used as element name. 
 * Object and array values are stored in text nodes. 
 * The types of values are represented via `type` attributes: 

### Attributes

The `attributes` format is lossless, too. The transformation based on the following rules: 

 * The resulting document has a `<json>` root node. 
 * Object pairs are represented via `<pair>` elements. The name of a pair is stored in a `name` attribute. 
 * Array entries are represented via `<item>` elements. 
 * Object and array values are stored in text nodes. 
 * The types of values are represented via `type` attributes: 

### Map

The `map` format is lossless, too. It converts a JSON document to an XQuery map. The conversion rules for are specified in the [XSLT 3.0 specification](http://www.w3.org/TR/xslt-30/#func-parse-json). 


### JsonML

The `jsonml` format is designed to convert XML to JSON and back, using the JsonML dialect. JsonML allows the transformation of arbitrary XML documents, but namespaces, comments and processing instructions will be discarded in the transformation process. More details are found in the official [JsonML documentation](http://jsonml.org/XML). 


**A little advice**: in the Database Creation dialog of the GUI, if you select JSON Parsing and switch to the _Parsing_ tab, you can see the effects of some of the conversion options. 


## Options

The following options are available (the _Direction_ column indicates if an option applies to parsing, serialization, or both operations): 


** Option ** | ** Description ** | ** Allowed ** | ** Default ** | ** Direction **
------------ | ----------------- | ------------- | ------------- | ---------------
`format` |  Specifies the format for converting JSON data.  | `direct`, `attributes`, `jsonml`, `map` | `direct` | _parse_, _serialize_
`liberal` | Introduced with BaseX 8.0: Determines if minor bugs in the input will be ignored. This option replaces the `spec` option.  | `yes`, `no` | `no` | _parse_
`merge` |  This option is considered when `direct` or `attributes` conversion is used:  * If a name has the same type throughout the document, the `type` attribute will be omitted. Instead, the name will be listed in additional, type-specific attributes in the root node 
 * The attributes are named by their type in plural (_numbers_, _booleans_, _nulls_, _objects_ and _arrays_), and the attribute value contains all names with that type, separated by whitespaces. 
 | `yes`, `no` | `no` | _parse_, _serialize_
`strings` |  Indicates if `type` attributes will be added for strings.  | `yes`, `no` | `yes` | _parse_, _serialize_
`lax` |  Specifies if a lax approach is used to convert QNames to JSON names.  | `yes`, `no` | `no` | _parse_, _serialize_
`unescape` |  Indicates if escaped characters are expanded (for example, `\n` becomes a single `x0A` character, while `\u20AC` becomes the character `€`).  | `yes`, `no` | `yes` | _parse_
`escape` |  Indicates if characters are escaped whenever the JSON syntax requires it. This option can be set to `no` if strings are already in escaped form and no further escaping is permitted.  | `yes`, `no` | `yes` | _serialize_
`indent` |  Indicates if whitespace should be added to the output with the aim of improving human legibility. If the parameter is set as in the query prolog, it overrides the `indent`[serialization parameter](Serialization.md).  | `yes`, `no` | `yes` | _serialize_
`spec` | Removed with BaseX 8.0: Determines the specification that is used for parsing JSON data:  * `RFC4627`  allows no deviations from the grammar 
 * `ECMA-262`  allows single values as input 
 * `liberal`  allows single values and accepts keys without quotes, trailing commas and non-escaped control characters. 
 | `RFC4627`, `ECMA-262`, `liberal` | `RFC4627` | _parse_, _serialize_

The JSON function signatures provide an `$options` argument. Options can either be specified 

 * as children of an `<json:options/>` element; e.g.: 

    <json:options>
      <json:format value='direct'/>
      ...
    </json:options>

 * or as map, which contains all key/value pairs: 

    map { 'format': 'direct', ... }

 
# Functions

## json:parse

json:parse($input as xs:string) as element(json)
json:parse($input as xs:string, $options as item()) as item()

:   Converts the JSON document specified by `$input` to an XML document or a map. If the input can be successfully parsed, it can be serialized back to the original JSON representation. The `$options` argument can be used to control the way the input is converted. 

    **Errors**


    `BXJS0001`: the specified input cannot be parsed as JSON document. 


## json:serialize

Updated with BaseX 8.0: Aligned with the `json` output method of the official specification. 


json:serialize($input as node()) as xs:string
json:serialize($input as node(), $options as item()) as xs:string

:   Serializes the node specified by `$input` as JSON, and returns the result as `xs:string` instance. The node is expected to conform to the output created by the [json:parse()](JSON Module.md#jsonparse) function. All other items will be serialized as specified for the [json output method](XQuery 3.1.md#jsonserialization) of the official specification.Items can also be serialized as JSON if the [Serialization Parameter](Serialization.md)`method` is set to `json`.The `$options` argument can be used to control the way the input is serialized. 

    **Errors**


    `BXJS0002`: the specified node cannot be serialized as JSON document. 

 
# Examples

## BaseX Format

**Example 1: Adds all JSON documents in a directory to a database**


**Query:**


    let $database
    := "database"
    for $name in file:list('.', false(), '*.json')
    let $file
    := file:read-text($name)
    let $json
    := json:parse($file)
    return db:add($database, $json, $name) 


**Example 2: Converts a simple JSON string to XML and back**


**Query:**


    json:parse('{}')


**Result:**


    <json type="object"/>


**Query:**


    (: serialize result as plain text
    :)
    declare option output:method 'text';
    json:serialize(<json type="object"/>)


**Result:**


    { }


**Example 3: Converts a JSON string with simple objects and arrays**


**Query:**


    json:parse('{
      "title": "Talk On Travel Pool",
      "link": "http://www.flickr.com/groups/talkontravel/pool/",
      "description": "Travel and vacation photos from around the world.",
      "modified": "2009-02-02T11:10:27Z",
      "generator": "http://www.flickr.com/"
    }')


**Result:**


    <json type="object">
      <title>Talk On Travel Pool</title>
      <link>http://www.flickr.com/groups/talkontravel/pool/</link>
      <description>Travel and vacation photos from around the world.</description>
      <modified>2009-02-02T11:10:27Z</modified>
      <generator>http://www.flickr.com/</generator>
    </json>


**Example 4: Converts a JSON string with different data types**


**Query:**


    let $options
    := map { 'merge': true() }
    return json:parse('{
      "first_name": "John",
      "last_name": "Smith",
      "age": 25,
      "address": {
        "street": "21 2nd Street",
        "city": "New York",
        "code": 10021
      },
      "phone": [
        {
          "type": "home",
          "number": "212 555-1234"
        },
        {
          "type": "mobile",
          "number": 1327724623
        }
      ]
    }', $options)


**Result:**


    <json numbers="age code" arrays="phone" objects="json address value">
      <first__name>John</first__name>
      <last__name>Smith</last__name>
      <age>25</age>
      <address>
        <street>21 2nd Street</street>
        <city>New York</city>
        <code>10021</code>
      </address>
      <phone>
        <_>
          <type>home</type>
          <number>212 555-1234</number>
        </_>
        <_>
          <type>mobile</type>
          <number type="number">1327724623</number>
        </_>
      </phone>
    </json>


## JsonML Format

**Example 1: Converts all XML documents in a database to JsonML and writes them to disk**


**Query:**


    for $doc in collection('json')
    let $name
    := document-uri($doc)
    let $json
    := json:serialize($doc)
    return file:write($name, $json)


**Example 2: Converts a simple XML fragment to the JsonML format**


**Query:**


    json:serialize(<xml/>, map { 'format': 'jsonml' })


**Result:**


    ["xml"]


**Example 3: Converts an XML document with elements and text**


**Query:**


    json:serialize(doc('flickr.xml'), map { 'format': 'jsonml' })


**flickr.xml:**


    <flickr>
      <title>Talk On Travel Pool</title>
      <link>http://www.flickr.com/groups/talkontravel/pool/</link>
      <description>Travel and vacation photos from around the world.</description>
      <modified>2009-02-02T11:10:27Z</modified>
      <generator>http://www.flickr.com/</generator>
    </flickr>


**Result:**


    ["flickr",
      ["title",
        "Talk On Travel Pool"],
      ["link",
        "http://www.flickr.com/groups/talkontravel/pool/"],
      ["description",
        "Travel and vacation photos from around the world."],
      ["modified",
        "2009-02-02T11:10:27Z"],
      ["generator",
        "http://www.flickr.com/"]]


**Example 4: Converts a document with nested elements and attributes**


**Query:**


    json:serialize(doc('input.xml'), map { 'format': 'jsonml' })


**input.xml:**


    <address id='1'>
      <!-- comments will be discarded -->
      <last_name>Smith</last_name>
      <age>25</age>
      <address xmlns='will be dropped as well'>
        <street>21 2nd Street</street>
        <city>New York</city>
        <code>10021</code>
      </address>
      <phone type='home'>212 555-1234</phone>
    </address>


**Result:**


    ["address", {"id":"1"},
      ["last_name",
        "Smith"],
      ["age",
        "25"],
      ["address",
        ["street",
          "21 2nd Street"],
        ["city",
          "New York"],
        ["code",
          "10021"]],
      ["phone", {"type":"home"},
        "212 555-1234"]]

 
# Errors

**Code ** | Description 
--------- | ------------
`BXJS0001` | The specified input cannot be parsed as JSON document. 
`BXJS0002` | The specified node cannot be serialized as JSON document. 
 
# Changelog
** Version 8.0 **

 * Updated: Serialization aligned with the `json` output method of the official specification 
 * Added: `liberal` option 
 * Removed: `spec` option 
** Version 7.8 **

 * Removed: `json:parse-ml`, `json:serialize-ml`
 * Updated: `json:parse` now returns a document node instead of an element, or an XQuery map if `format` is set to `map`. 
** Version 7.7.2 **

 * Updated: `$options` argument added to [json:parse](JSON Module.md#jsonparse) and [json:serialize](JSON Module.md#jsonserialize)
 * Updated: [json:parse-ml](.md) and [json:serialize-ml](.md) are now _deprecated_

The module was introduced with Version 7.0. 

