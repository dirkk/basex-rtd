
# Random Module
 


 
This [XQuery Module](Module Library.md) contains functions for computing random values. All functions except for [random:seeded-double](Random Module.md#random-seeded-double) and [random:seeded-integer](Random Module.md#random-seeded-integer) are non-deterministic, i. e., they return different values for each call. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/random` namespace, which is statically bound to the `random` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### random:double

`random:double() as xs:double`

Returns a double value between 0.0 (inclusive) and 1.0 (exclusive). 


### random:integer

Updated with Version 8.0: raise error for invalid input. 


`random:integer() as xs:integer`
`random:integer($max as xs:integer) as xs:integer`

Returns an integer value, either in the whole integer range or between 0 (inclusive) and the given maximum (exclusive) 

**Errors**

`BXRA0001`: the maximum value is out of bounds. 

### random:seeded-double

`random:seeded-double($seed as xs:integer, $num as xs:integer) as xs:double*`

Returns a sequence with `$num` double values between 0.0 (inclusive) and 1.0 (exclusive). The random values are created using the initial seed given in `$seed`. 


### random:seeded-integer

Updated with Version 8.0: raise error for invalid input. 


`random:seeded-integer($seed as xs:integer, $num as xs:integer) as xs:integer*`
`random:seeded-integer($seed as xs:integer, $num as xs:integer, $max as xs:integer) as xs:integer*`

Returns a sequence with `$num` integer values, either in the whole integer range or between 0 (inclusive) and the given maximum (exclusive). The random values are created using the initial seed given in `$seed`. 

**Errors**

`BXRA0001`: the maximum value is out of bounds.`BXRA0002`: the number of values to be returned is negative. 

### random:gaussian

`random:gaussian($num as xs:integer) as xs:double*`

Returns a sequence with `$num` double values. The random values are Gaussian (i.e. normally) distributed with the mean 0.0. and the derivation 1.0. 


### random:uuid

`random:uuid() as xs:string`

Creates a random universally unique identifier (UUID), represented as 128-bit value. 

**Examples**

 * `random:uuid() eq random:uuid()`  will (most probably) return the boolean value `false`. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXRA0001` | The specified maximum value is out of bounds. 
`BXRA0002` | The specified number of values to be returned is negative. 
 
## Changelog
UNKNOWN * Updated: [random:integer](Random Module.md#random-integer), [random:seeded-integer](Random Module.md#random-seeded-integer) raise error for invalid input. 

The module was introduced with Version 7.5. It includes some functionality which was previously located in the [Math Module](Math Module.md). 

