
# Array Module
 


 
This [XQuery Module](Module Library.md) contains functions for manipulating arrays, which will officially be introduced with [XQuery 3.1](XQuery 3.1.md#Arrays). **Please note** that the functions are subject to change until the specification has reached its final stage. 

 
## Conventions

All functions in this module are assigned to the `http://www.w3.org/2005/xpath-functions/array` namespace, which is statically bound to the `array` prefix. 

 
## Functions

### array:size

`array:size($input as array(*)) as xs:integer`

 Returns the number of members in `$array`. Note that because an array is an item, the `fn:count` function when applied to an array always returns `1`. 

**Examples**

 * `array:size([1 to 10])`  returns `10`. 
 * `array:size(array { 1 to 10 })`  returns `10`. 


### array:get

`array:get($array as array(*), $position as xs:integer) as item()*`

 Returns the `$array` member at the specified `$position`. 

**Errors**

`FOAY0001`: `$position` is not in the range `1` to `array:size($array)` inclusive. 
**Examples**

 * `array:get(array { reverse(1 to 5) }, 5)`  returns the value `1`. 


### array:append

`array:append($array as array(*), $member as item()*) as array(*)`

 Returns a copy of `$array` with a new `$member` attached. 

**Examples**

 * `array:append([], 'member1')`  returns the array `["member1"]`. 


### array:subarray

`array:subarray($array as array(*), $position as xs:integer) as array(*)`
`array:subarray($array as array(*), $position as xs:integer, $length as xs:integer) as array(*)`

 Constructs a new array with with `$length` members of `$array` beginning from the specified `$position`.The two-argument version of the function returns the same result as the three-argument version when called with `$length` equal to the value of `array:size($array) - $position + 1`. 

**Errors**

`FOAY0001`: `$position` is less than one, or if `$position + $length` is greater than `array:size($array) + 1`.`FOAY0002`: `$length` is less than zero. 
**Examples**

 * `array:append(['member1'], 'member2')`  returns the array `["member1", "member2"]`. 


### array:remove

`array:remove($array as array(*), $position as xs:integer) as array(*)`

 Returns a copy of `$array` without the member at the specified `$position`. 

**Errors**

`FOAY0001`: `$position` is not in the range `1` to `array:size($array)` inclusive. 
**Examples**

 * `array:append(["a"], 1)`  returns the array `[]`. 


### array:insert-before

`array:insert-before($array as array(*), $position as xs:integer, $member as item()*) as array(*)`

 Returns a copy of `$array` with one new `$member` at the specified `$position`. Setting `$position` to the value `array:size($array) + 1` yields the same result as `array:append($array, $insert)`. 

**Errors**

`FOAY0001`: `$position` is not in the range `1` to `array:size($array) + 1` inclusive. 
**Examples**

 * `array:insert-before(["a"], 1, "b")`  returns the array `["b", "a"]`. 


### array:head

`array:head($array as array(*)) as item()*`

 Returns the first member of `$array`. This function is equivalent to the expression `$array(1)`. 

**Errors**

`FOAY0001`: The array is empty. 
**Examples**

 * `array:head(["a", "b"])`  returns `"a"`. 
 * `array:head([["a", "b"], ["c", "d"]])`  returns the array `["a", "b"]`. 


### array:tail

`array:tail($array as array(*)) as array(*)`

 Returns a new array with all members except the first from `$array`. This function is equivalent to the expression `array:remove($array, 1)`. 

**Errors**

`FOAY0001`: The array is empty. 
**Examples**

 * `array:insert-before(["a"], 1, "b")`  returns the array `["b", "a"]`. 


### array:reverse

`array:reverse($array as array(*)) as array(*)`

 Returns a new array with all members of `$array` in reverse order. 

**Examples**

 * `array:reverse(array { 1 to 3 })`  returns the array `[3, 2, 1]`. 


### array:join

`array:join($arrays as array(*)*) as array(*)`

 Concatenates the contents of several `$arrays` into a single array. 

**Examples**

 * `array:join(())`  returns the array `[]`. 
 * `array:join((1 to 3) ! array { . })`  returns the array `[1, 2, 3]`. 


### array:flatten

`array:flatten($items as item()*) as item()*`

 Recursively flattens all arrays that occur in the supplied `$items`. 

**Examples**

 * `array:flatten(["a","b"])`  returns the sequence `"a", "b"`. 
 * `array:flatten([1,[2,3],4]])`  returns the sequence `1, 2, 3, 4`. 


### array:for-each

`array:for-each($array as array(*), $function as function(item()*) as item()*) as array(*)`

 Returns a new array, in which each member is computed by applying `$function` to the corresponding member of `$array`. 

**Examples**

The following query returns the array `[2, 3, 4, 5, 6]`: 
    array:for-each(
      array { 1 to 5 },
      function($i) { $i + 1}
    )



### array:filter

`array:filter($array as array(*), $function as function(item()*) as xs:boolean) as array(*)`

 Returns a new array with those members of [Template:$array](/index.php?title=Template:$array&action=edit&redlink=1) for which `$function` returns `true`. 

**Examples**

The following query returns the array `[0, 1, 3]`: 
    array:filter(
      array { 0, 1, -2, 3, -4 },
      function($i) { $i > 0 }
    )



### array:fold-left

`array:fold-left($array as array(*), $zero as item()*, $function as function(item()*, item()*) as item()*) as item()*`

 Evaluates the supplied `$function` cumulatively on successive members of the supplied `$array` from left to right and using `$zero` as first argument. 

**Examples**

The following query returns `55` (the sum of the integers 1 to 10): 
    array:fold-left(
      array { 1 to 10 },
      0,
      function($a, $b) { $a + $b }
    )



### array:fold-right

`array:fold-right($array as array(*), $zero as item()*, $function as function(item()*, item()*) as item()*) as item()*`

 Evaluates the supplied `$function` cumulatively on successive members of the supplied `$array` from right to left and using `$zero` as first argument. 

**Examples**

The following query is equivalent to the expression `array:reverse(array { 1 to 5 })`: 
    array {
      array:fold-right(
        array { 1 to 5 },
        (),
        function($a, $b) { $b, $a }
      )
    }



### array:for-each-pair

`array:for-each-pair($array1 as array(*), $array2 as array(*), $function as function(item()*) as item()*) as array(*)`

 Returns a new array obtained by evaluating the supplied `$function` for each pair of members at the same position in `$array1` and `$array2`. 

**Examples**

The following query returns the array `[5, 7, 9]`: 
    array:for-each-pair(
      array { 1 to 3 },
      array { 4 to 6 },
      function($a + $b) { $a + $b }
    )



### array:sort

`array:sort($array as array(*)) as array(*)`
`array:sort($array as array(*), $key as function(item()*) as xs:anyAtomicType*)) as array(*)`

 Returns a new array with sorted `$array` members. If a sort `$key` function is given, it will be applied on all array members. The items of the resulting values will be sorted using the semantics of the `lt` expression. 

**Examples**

 * `array:sort(array { reverse(1 to 3) })`  returns `[1, 2, 3]`
 * `array:sort([3, -2, 1], abs#1)`  returns `[1, -2, 3]`
 * `array:sort([1,2,3], function($x) { -$x })`  returns `[3, 2, 1]`
 * `array:sort((1, 'a'))`  returns an error (strings and integers cannot be compared) 


### array:serialize

`array:serialize($input as array(*)) as xs:string`

 This function is specific to BaseX. It returns a string representation of the supplied array. The purpose of this function is to get an insight into the structure of an array item; it cannot necessarily be used for reconstructing the original array. 

**Examples**

 * `array:serialize([ 1, (2, 3), 4 to 6 ])`  returns `[1, (2, 3), (4, 5, 6)]`. 

 
## Errors

**Code ** | Description 
--------- | ------------
`FOAY0001` | The specified index extends beyonds the bounds of an array. 
`FOAY0002` | The specified length is less than zero. 
 
## Changelog

Introduced with Version 8.0. 

