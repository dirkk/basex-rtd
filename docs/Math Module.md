 


 
The math [XQuery Module](Module Library.md) defines functions to perform mathematical operations, such as `pi`, `asin` and `acos`. Most functions are specified in the [Functions and Operators Specification](http://www.w3.org/TR/xpath-functions-30/) of the upcoming XQuery 3.0 Recommendation, and some additional ones have been added in this module. 

 
# Conventions

All functions in this module are assigned to the `http://www.w3.org/2005/xpath-functions/math` namespace, which is statically bound to the `math` prefix. 

 
# W3 Functions

## math:pi

math:pi() as xs:double

:   Returns the `xs:double` value of the mathematical constant π whose lexical representation is 3.141592653589793. 

    **Examples**


    * `2*math:pi()`  returns `6.283185307179586e0`. 
    * `60 * (math:pi() div 180)`  converts an angle of 60 degrees to radians. 


## math:sqrt

math:sqrt($arg as xs:double?) as xs:double?

:   Returns the square root of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the `xs:double` value of the mathematical square root of `$arg`. 


## math:sin

math:sin($arg as xs:double?) as xs:double?

:   Returns the sine of the `$arg`, expressed in radians.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the sine of `$arg`, treated as an angle in radians. 


## math:cos

math:cos($arg as xs:double?) as xs:double?

:   Returns the cosine of `$arg`, expressed in radians.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the cosine of `$arg`, treated as an angle in radians. 


## math:tan

math:tan($arg as xs:double?) as xs:double?

:   Returns the tangent of `$arg`, expressed in radians.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the tangent of `$arg`, treated as an angle in radians. 


## math:asin

math:asin($arg as xs:double?) as xs:double?

:   Returns the arc sine of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the arc sine of `$arg`, returned as an angle in radians in the range -π/2 to +π/2. 


## math:acos

math:acos($arg as xs:double?) as xs:double?

:   Returns the arc cosine of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the arc cosine of `$arg`, returned as an angle in radians in the range 0 to +π. 


## math:atan

math:atan($arg as xs:double?) as xs:double?

:   Returns the arc tangent of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the arc tangent of `$arg`, returned as an angle in radians in the range -π/2 to +π/2. 


## math:atan2

math:atan2($arg1 as xs:double?, $arg2 as xs:double) as xs:double?

:   Returns the arc tangent of `$arg1` divided by `$arg2`, the result being in the range -π/2 to +π/2 radians.If `$arg1` is the empty sequence, the empty sequence is returned.Otherwise the result is the arc tangent of `$arg1` divided by `$arg2`, returned as an angle in radians in the range -π to +π. 


## math:pow

math:pow($arg1 as xs:double?, $arg2 as xs:double) as xs:double?

:   Returns `$arg1` raised to the power of `$arg2`.If `$arg1` is the empty sequence, the empty sequence is returned.Otherwise the result is the `$arg1` raised to the power of `$arg2`. 

    **Examples**


    * `math:pow(2, 3)`  returns `8`. 


## math:exp

math:exp($arg as xs:double?) as xs:double?

:   Returns _e_ raised to the power of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the value of _e_ raised to the power of `$arg`. 

    **Examples**


    * `math:exp(1)`  returns _e_. 


## math:log

math:log($arg as xs:double?) as xs:double?

:   Returns the natural logarithm of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the natural logarithm (base _e_) of `$arg`. 

    **Examples**


    * `math:log(math:e())`  returns `1`. 


## math:log10

math:log10($arg as xs:double?) as xs:double?

:   Returns the base 10 logarithm of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the base 10 logarithm of `$arg`. 

    **Examples**


    * `math:log(100)`  returns `2`. 

 
# Additional Functions

## math:e

math:e() as xs:double

:   Returns the `xs:double` value of the mathematical constant _e_ whose lexical representation is 2.718281828459045. 

    **Examples**


    * `5*math:e()`  returns `13.591409142295225`. 


## math:sinh

math:sinh($arg as xs:double?) as xs:double?

:   Returns the hyperbolic sine of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the hyperbolic sine of `$arg`. 

    **Examples**


    * `math:sinh(0)`  returns `0`. 


## math:cosh

math:cosh($arg as xs:double?) as xs:double?

:   Returns the hyperbolic cosine of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the hyperbolic cosine of `$arg`. 

    **Examples**


    * `math:cosh(0)`  returns `1`. 


## math:tanh

math:tanh($arg as xs:double?) as xs:double?

:   Returns the hyperbolic tangent of `$arg`.If `$arg` is the empty sequence, the empty sequence is returned.Otherwise the result is the hyperbolic tangent of `$arg`. 

    **Examples**


    * `math:tanh(100)`  returns `1`. 


## math:crc32

math:crc32($str as xs:string) as xs:hexBinary

:   Calculates the CRC32 check sum of the given string `$str`. 

    **Examples**


    * `math:crc32("")`  returns `'00000000'`. 
    * `math:crc32("BaseX")`  returns `'4C06FC7F'`. 

 
# Changelog
** Version 7.5 **

 * Moved: [math:random](Random Module.md#random-integer) and [math:uuid](Random Module.md#random-uuid) have been move to [Random Module](Random Module.md). 
** Version 7.3 **

 * Added: [math:crc32](Math Module.md#math-crc32) and [math:uuid](Random Module.md#random-uuid) have been adopted from the obsolete Utility Module. 
