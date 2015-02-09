
# Binary Module
 


 
This [XQuery Module](Module Library.md) contains functions to process binary data, including extracting subparts, searching, basic binary operations and conversion between binary and structured forms. 

 
This module is based on the [EXPath Binary Module](http://expath.org/spec/binary). 

 
## Conventions

All functions and errors in this module are assigned to the `http://expath.org/ns/binary` namespace, which is statically bound to the `bin` prefix. 

 
## Constants and Conversions

### bin:hex

bin:hex($in as xs:string?) as xs:base64Binary?

:   Returns the binary form of the set of octets written as a sequence of (ASCII) hex digits ([0-9A-Fa-f]).`$in` will be effectively zero-padded from the left to generate an integral number of octets, i.e. an even number of hexadecimal digits. If `$in` is an empty string, then the result will be an `xs:base64Binary` with no embedded data. Byte order in the result follows (per-octet) character order in the string. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `non-numeric-character`: the input cannot be parsed as a hexadecimal number. 

    **Examples**


    `bin:hex('11223F4E')` yields `ESI/Tg==`.`xs:hexBinary(bin:hex('FF'))` yields `FF`. 


### bin:bin

bin:bin($in as xs:string?) as xs:base64Binary?

:   Returns the binary form of the set of octets written as a sequence of (8-wise) (ASCII) binary digits ([01]).`$in` will be effectively zero-padded from the left to generate an integral number of octets. If `$in` is an empty string, then the result will be an `xs:base64Binary` with no embedded data. Byte order in the result follows (per-octet) character order in the string. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `non-numeric-character`: the input cannot be parsed as a binary number. 

    **Examples**


    `bin:bin('1101000111010101')` yields `0dU=`.`xs:hexBinary(bin:bin('1000111010101'))` yields `11D5`. 


### bin:octal

bin:octal($in as xs:string?) as xs:base64Binary?

:   Returns the binary form of the set of octets written as a sequence of (ASCII) octal digits ([0-7]).`$in` will be effectively zero-padded from the left to generate an integral number of octets. If `$in` is an empty string, then the result will be an `xs:base64Binary` with no embedded data. Byte order in the result follows (per-octet) character order in the string. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `non-numeric-character`: the input cannot be parsed as an octal number. 

    **Examples**


    `xs:hexBinary(bin:octal('11223047'))` yields `252627`. 


### bin:to-octets

bin:to-octets($in as xs:base64Binary) as xs:integer*

:   Returns binary data as a sequence of octets.If `$in` is a zero length binary data then the empty sequence is returned. Octets are returned as integers from 0 to 255. 


### bin:from-octets

bin:from-octets($in as xs:integer*) as xs:base64Binary

:   Converts a sequence of octets into binary data.Octets are integers from 0 to 255. If the value of `$in` is the empty sequence, the function returns zero-sized binary data. 

    **Errors**


    `octet-out-of-range`: one of the octets lies outside the range 0 - 255. 

 
## Basic Operations

### bin:length

bin:length($in as xs:base64Binary) as xs:integer

:   Returns the size of binary data in octets. 


### bin:part

bin:part($in as xs:base64Binary?, $offset as xs:integer) as xs:base64Binary?
bin:part($in as xs:base64Binary?, $offset as xs:integer, $size as xs:integer) as xs:base64Binary?

:   Returns a section of binary data starting at the `$offset` octet.If `$size` is specified, the size of the returned binary data is `$size` octets. If `$size` is absent, all remaining data from `$offset` is returned. The `$offset` is zero based. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `negative-size`: the specified size is negative.`index-out-of-range`: the specified offset + size is out of range. 

    **Examples**


    Test whether binary data starts with binary content consistent with a PDF file:`bin:part($data, 0, 4) eq bin:hex("25504446")`. 


### bin:join

bin:join($in as xs:base64Binary*) as xs:base64Binary

:   Returns an `xs:base64Binary` created by concatenating the items in the sequence `$in`, in order. If the value of `$in` is the empty sequence, the function returns a binary item containing no data bytes. 


### bin:insert-before

bin:insert-before($in as xs:base64Binary?, $offset as xs:integer, $extra as xs:base64Binary?) as xs:base64Binary?

:   Returns binary data consisting sequentially of the data from `$in` up to and including the `$offset - 1` octet, followed by all the data from `$extra`, and then the remaining data from `$in`.The `$offset` is zero based. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `index-out-of-range`: the specified offset is out of range. 


### bin:pad-left

bin:pad-left($in as xs:base64Binary?, $size as xs:integer) as xs:base64Binary?
bin:pad-left($in as xs:base64Binary?, $size as xs:integer, $octet as xs:integer) as xs:base64Binary?

:   Returns an `xs:base64Binary` created by padding the input with `$size` octets in front of the input. If `$octet` is specified, the padding octets each have that value, otherwise they are zero.If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `negative-size`: the specified size is negative.`octet-out-of-range`: the specified octet lies outside the range 0-255. 


### bin:pad-right

bin:pad-right($in as xs:base64Binary?, $size as xs:integer) as xs:base64Binary?
bin:pad-right($in as xs:base64Binary?, $size as xs:integer, $octet as xs:integer) as xs:base64Binary?

:   Returns an `xs:base64Binary` created by padding the input with `$size` octets after the input. If `$octet` is specified, the padding octets each have that value, otherwise they are zero.If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `negative-size`: the specified size is negative.`octet-out-of-range`: the specified octet lies outside the range 0-255. 


### bin:find

bin:find($in as xs:base64Binary?, $offset as xs:integer, $search as xs:base64Binary) as xs:integer?

:   Returns the first location of the binary search sequence in the input, or if not found, the empty sequence.The `$offset` and the returned location are zero based. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `index-out-of-range`: the specified offset + size is out of range. 

 
## Text Decoding and Encoding

### bin:decode-string

bin:decode-string($in as xs:base64Binary?, $encoding as xs:string) as xs:string?
bin:decode-string($in as xs:base64Binary?, $encoding as xs:string, $offset as xs:integer) as xs:string?
bin:decode-string($in as xs:base64Binary?, $encoding as xs:string, $offset as xs:integer, $size as xs:integer) as xs:string?

:   Decodes binary data as a string in a given `$encoding`.If `$offset` and `$size` are provided, the `$size` octets from `$offset` are decoded. If `$offset` alone is provided, octets from `$offset` to the end are decoded.If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `negative-size`: the specified size is negative.`index-out-of-range`: the specified offset + size is out of range.`unknown-encoding`: the specified encoding is unknown.`conversion-error`: an error or malformed input occurred during decoding the string. 

    **Examples**


    Tests whether the binary data starts with binary content consistent with a PDF file:`bin:decode-string($data, 'UTF-8', 0, 4) eq '%PDF'`. 


### bin:encode-string

bin:encode-string($in as xs:string?, $encoding as xs:string) as xs:base64Binary?

:   Encodes a string into binary data using a given `$encoding`.If the value of `$in` is the empty sequence, the function returns an empty sequence. 

    **Errors**


    `unknown-encoding`: the specified encoding is unknown.`conversion-error`: an error or malformed input occurred during encoding the string. 

 
## Packing and Unpacking of Numeric Values

The functions have an optional parameter $octet-order whose string value controls the order: Least-significant-first order is indicated by any of the values `least-significant-first`, `little-endian`, or `LE`. Most-significant-first order is indicated by any of the values `most-significant-first`, `big-endian`, or `BE`. 


### bin:pack-double

bin:pack-double($in as xs:double) as xs:base64Binary
bin:pack-double($in as xs:double, $octet-order as xs:string) as xs:base64Binary

:   Returns the 8-octet binary representation of a double value.Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. 

    **Errors**


    `unknown-significance-order`: the specified octet order is unknown. 


### bin:pack-float

bin:pack-float($in as xs:float) as xs:base64Binary
bin:pack-float($in as xs:float, $octet-order as xs:string) as xs:base64Binary

:   Returns the 4-octet binary representation of a float value.Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. 

    **Errors**


    `unknown-significance-order`: the specified octet order is unknown. 


### bin:pack-integer

bin:pack-integer($in as xs:integer, $size as xs:integer) as xs:base64Binary
bin:pack-integer($in as xs:integer, $size as xs:integer, $octet-order as xs:string) as xs:base64Binary

:   Returns the twos-complement binary representation of an integer value treated as `$size` octets long. Any 'excess' high-order bits are discarded.Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. Specifying a `$size` of zero yields an empty binary data. 

    **Errors**


    `unknown-significance-order`: the specified octet order is unknown.`negative-size`: the specified size is negative. 


### bin:unpack-double

bin:unpack-double($in as xs:base64Binary, $offset as xs:integer) as xs:double
bin:unpack-double($in as xs:base64Binary, $offset as xs:integer, $octet-order as xs:string) as xs:double

:   Extracts the double value stored at the particular offset in binary data.Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. The `$offset` is zero based. 

    **Errors**


    `index-out-of-range`: the specified offset is out of range.`unknown-significance-order`: the specified octet order is unknown. 


### bin:unpack-float

bin:unpack-float($in as xs:base64Binary, $offset as xs:integer) as xs:float
bin:unpack-float($in as xs:base64Binary, $offset as xs:integer, $octet-order as xs:string) as xs:float

:   Extracts the float value stored at the particular offset in binary data.Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. The `$offset` is zero based. 

    **Errors**


    `index-out-of-range`: the specified offset + size is out of range.`unknown-significance-order`: the specified octet order is unknown. 


### bin:unpack-integer

bin:unpack-integer($in as xs:base64Binary, $offset as xs:integer, $size as xs:integer) as xs:integer
bin:unpack-integer($in as xs:base64Binary, $offset as xs:integer, $size as xs:integer, $octet-order as xs:string) as xs:integer

:   Returns a signed integer value represented by the `$size` octets starting from `$offset` in the input binary representation. Necessary sign extension is performed (i.e. the result is negative if the high order bit is '1').Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. The `$offset` is zero based. Specifying a `$size` of zero yields the integer `0`. 

    **Errors**


    `negative-size`: the specified size is negative.`index-out-of-range`: the specified offset + size is out of range.`unknown-significance-order`: the specified octet order is unknown. 


### bin:unpack-unsigned-integer

bin:unpack-unsigned-integer($in as xs:base64Binary, $offset as xs:integer, $size as xs:integer) as xs:integer
bin:unpack-unsigned-integer($in as xs:base64Binary, $offset as xs:integer, $size as xs:integer, $octet-order as xs:string) as xs:integer

:   Returns an unsigned integer value represented by the `$size` octets starting from `$offset` in the input binary representation.Most-significant-octet-first number representation is assumed unless the `$octet-order` parameter is specified. The `$offset` is zero based. Specifying a `$size` of zero yields the integer `0`. 

    **Errors**


    `negative-size`: the specified size is negative.`index-out-of-range`: the specified offset + size is out of range.`unknown-significance-order`: the specified octet order is unknown. 

 
## Bitwise Operations

### bin:or

bin:or($a as xs:base64Binary?, $b as xs:base64Binary?) as xs:base64Binary?

:   Returns the "bitwise or" of two binary arguments.If either argument is the empty sequence, an empty sequence is returned. 

    **Errors**


    `differing-length-arguments`: the input arguments are of differing length. 


### bin:xor

bin:xor($a as xs:base64Binary?, $b as xs:base64Binary?) as xs:base64Binary?

:   Returns the "bitwise xor" of two binary arguments.If either argument is the empty sequence, an empty sequence is returned. 

    **Errors**


    `differing-length-arguments`: the input arguments are of differing length. 


### bin:and

bin:and($a as xs:base64Binary?, $b as xs:base64Binary?) as xs:base64Binary?

:   Returns the "bitwise and" of two binary arguments.If either argument is the empty sequence, an empty sequence is returned. 

    **Errors**


    `differing-length-arguments`: the input arguments are of differing length. 


### bin:not

bin:not($in as xs:base64Binary?) as xs:base64Binary?

:   Returns the "bitwise not" of a binary argument.If the argument is the empty sequence, an empty sequence is returned. 


### bin:shift

bin:shift($in as xs:base64Binary?, $by as xs:integer) as xs:base64Binary?

:   Shifts bits in binary data.If `$by` is zero, the result is identical to `$in`. If `$by` is positive then bits are shifted to the left. Otherwise, bits are shifted to the right. If the absolute value of `$by` is greater than the bit-length of `$in` then an all-zeros result is returned. The result always has the same size as `$in`. The shifting is logical: zeros are placed into discarded bits. If the value of `$in` is the empty sequence, the function returns an empty sequence. 

 
## Errors

**Code ** | Description 
--------- | ------------
`differing-length-arguments` | The arguments to a bitwise operation have different lengths. 
`index-out-of-range` | An offset value is out of range. 
`negative-size` | A size value is negative. 
`octet-out-of-range` | An octet value lies outside the range 0-255. 
`non-numeric-character` | Binary data cannot be parsed as number. 
`unknown-encoding` | An encoding is not supported. 
`conversion-error` | An error or malformed input during converting a string. 
`unknown-significance-order` | An octet-order value is unknown. 
 
## Changelog

Introduced with Version 7.8. 

