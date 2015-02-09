
# Conversion Module
 


 
This [XQuery Module](Module Library.md) contains functions to convert data between different formats. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/convert` namespace, which is statically bound to the `convert` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Strings

### convert:binary-to-string

`convert:binary-to-string($bytes as xs:anyAtomicType) as xs:string`
`convert:binary-to-string($bytes as xs:anyAtomicType, $encoding as xs:string) as xs:string`

Converts the specifed binary data (xs:base64Binary, xs:hexBinary) to a string.The UTF-8 default encoding can be overwritten with the optional `$encoding` argument. 

**Errors**

`BXCO0001`: The input is an invalid XML string, or the wrong encoding has been specified. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off.`BXCO0002`: The specified encoding is invalid or not supported. 
**Examples**

 * `convert:binary-to-string(xs:hexBinary('48656c6c6f576f726c64'))`  returns the string `HelloWorld`. 


### convert:string-to-base64

`convert:string-to-base64($input as xs:string) as xs:base64Binary`
`convert:string-to-base64($input as xs:string, $encoding as xs:string) as xs:base64Binary`

Converts the specified string to a `xs:base64Binary` item. If the default encoding is chosen, conversion will be cheap, as both `xs:string` and `xs:base64Binary` items are internally represented as byte arrays.The UTF-8 default encoding can be overwritten with the optional `$encoding` argument. 

**Errors**

`BXCO0001`: The input cannot be represented in the specified encoding.`BXCO0002`: The specified encoding is invalid or not supported. 
**Examples**

 * `convert:string-to-base64('HelloWorld')`  returns the xs:base64binary item `SGVsbG9Xb3JsZA==`. 


### convert:string-to-hex

`convert:string-to-hex($input as xs:string) as xs:hexBinary`
`convert:string-to-hex($input as xs:string, $encoding as xs:string) as xs:hexBinary`

Converts the specified string to a `xs:hexBinary` item. If the default encoding is chosen, conversion will be cheap, as both `xs:string` and `xs:hexBinary` items are internally represented as byte arrays.The UTF-8 default encoding can be overwritten with the optional `$encoding` argument. 

**Errors**

`BXCO0001`: The input cannot be represented in the specified encoding.`BXCO0002`: The specified encoding is invalid or not supported. 
**Examples**

 * `convert:string-to-hex('HelloWorld')`  returns the Base64 item `48656C6C6F576F726C64`. 

 
## Binary Data

### convert:bytes-to-base64

`convert:bytes-to-base64($input as xs:byte*) as xs:base64Binary`

Converts the specified byte sequence to a `xs:base64Binary` item. Conversion is cheap, as `xs:base64Binary` items are internally represented as byte arrays. 

**Errors**

`BXCO0001`: The input cannot be represented in the specified encoding.`BXCO0002`: The specified encoding is invalid or not supported. 
**Examples**

 * `convert:string-to-base64('HelloWorld')`  returns the xs:base64binary item `SGVsbG9Xb3JsZA==`. 


### convert:bytes-to-hex

`convert:bytes-to-hex($input as xs:byte*) as xs:hexBinary`

Converts the specified byte sequence to a `xs:hexBinary` item. Conversion is cheap, as `xs:hexBinary` items are internally represented as byte arrays. 


### convert:binary-to-bytes

`convert:binary-to-bytes($bin as xs:anyAtomicType) as xs:byte*`

Returns the specified binary data (xs:base64Binary, xs:hexBinary) as a sequence of bytes. 

**Examples**

 * `convert:binary-to-bytes(xs:base64Binary('QmFzZVggaXMgY29vbA=='))`  returns the sequence `(66, 97, 115, 101, 88, 32, 105, 115, 32, 99, 111, 111, 108)`. 
 * `convert:binary-to-bytes(xs:hexBinary("4261736558"))`  returns the sequence `(66 97 115 101 88)`. 

 
## Numbers

### convert:integer-to-base

`convert:integer-to-base($num as xs:integer, $base as xs:integer) as xs:string`

Converts `$num` to base `$base`, interpreting it as a 64-bit unsigned integer.The first `$base` elements of the sequence `'0',..,'9','a',..,'z'` are used as digits.Valid bases are `2, .., 36`. 

**Examples**

 * `convert:integer-to-base(-1, 16)`  returns the hexadecimal string `'ffffffffffffffff'`. 
 * `convert:integer-to-base(22, 5)`  returns `'42'`. 


### convert:integer-from-base

`convert:integer-from-base($str as xs:string, $base as xs:integer) as xs:integer`

Decodes an `xs:integer` from `$str`, assuming that it's encoded in base `$base`. The first `$base` elements of the sequence `'0',..,'9','a',..,'z'` are allowed as digits, case doesn't matter. Valid bases are 2 - 36. If `$str` contains more than 64 bits of information, the result is truncated arbitarily. 

**Examples**

 * `convert:integer-from-base('ffffffffffffffff', 16)`  returns `-1`. 
 * `convert:integer-from-base('CAFEBABE', 16)`  returns `3405691582`. 
 * `convert:integer-from-base('42', 5)`  returns `22`. 
 * `convert:integer-from-base(convert:integer-to-base(123, 7), 7)`  returns `123`. 

 
## Dates and Durations

### convert:integer-to-dateTime

`convert:integer-to-dateTime($ms as xs:integer) as xs:dateTime`

Converts the specified number of milliseconds since 1 Jan 1970 to an item of type xs:dateTime. 

**Examples**

 * `convert:integer-to-dateTime(0)`  returns `1970-01-01T00:00:00Z`. 
 * `convert:integer-to-dateTime(1234567890123)`  returns `2009-02-13T23:31:30.123Z`. 


### convert:dateTime-to-integer

`convert:dateTime-to-integer($dateTime as xs:dateTime) as xs:integer`

Converts the specified item of type xs:dateTime to the number of milliseconds since 1 Jan 1970. 

**Examples**

 * `convert:dateTime-to-integer(xs:dateTime('1970-01-01T00:00:00Z'))`  returns `0`. 


### convert:integer-to-dayTime

`convert:integer-to-dayTime($ms as xs:integer) as xs:dayTimeDuration`

Converts the specified number of milliseconds to an item of type xs:dayTimeDuration. 

**Examples**

 * `convert:integer-to-dayTime(1234)`  returns `PT1.234S`. 


### convert:dayTime-to-integer

`convert:dayTime-to-integer($dayTime as xs:dayTimeDuration) as xs:integer`

Converts the specified item of type xs:dayTimeDuration to milliseconds represented by an integer. 

**Examples**

 * `convert:dayTime-to-integer(xs:dayTimeDuration('PT1S'))`  returns `1000`. 

 
## Errors

**Code ** |  Description 
--------- | -------------
`BXCO0001` | The input is an invalid XML string, or the wrong encoding has been specified. 
`BXCO0002` | The specified encoding is invalid or not supported. 
 
## Changelog
** Version 7.5 **

 * Added: `convert:integer-to-dateTime`, `convert:dateTime-to-integer`, `convert:integer-to-dayTime`, `convert:dayTime-to-integer`

The module was introduced with Version 7.3. Some of the functions have been adopted from the obsolete Utility Module. 

