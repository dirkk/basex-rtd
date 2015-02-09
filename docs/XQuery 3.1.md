
# XQuery 3.1
 


 
This article is part of the [XQuery Portal](XQuery.md). It summarizes the new features of the [XQuery 3.1](http://www.w3.org/TR/xquery-31/) Working Draft that are already supported by BaseX. 

 
## Maps

A _map_ is a function that associates a set of keys with values, resulting in a collection of key/value pairs. Each key/value pair in a map is called an entry. A key is an arbitrary atomic value, and the associated value is an arbitrary sequence. Within a map, no two entries have the same key, when compared using the `eq` operator. It is not necessary that all the keys should be mutually comparable (for example, they can include a mixture of integers and strings). 


Maps can be constructed as follows: 


    map { },                                    (: empty map :)
    map { 'key': true(), 1984: (<a/>, <b/>) },  (: map with two entries :)
    map:merge(                                  (: map with ten entries :)
      for $i in 1 to 10
      return map { $i: 'value' || $i }
    )


The function corresponding to the map has the signature `function($key as xs:anyAtomicType) as item()*`. The expression `$map($key)` returns the associated value; the function call `map:get($map, $key)` is equivalent. For example, if `$books-by-isbn` is a map whose keys are ISBNs and whose associated values are `book` elements, then the expression `$books-by-isbn("0470192747")` returns the `book` element with the given ISBN. The fact that a map is a function item allows it to be passed as an argument to higher-order functions that expect a function item as one of their arguments. As an example, the following query uses the higher-order function `fn:map($f, $seq)` to extract all bound values from a map: 


    let $map := map { 'foo': 42, 'bar': 'baz', 123: 456 }
    return fn:for-each(map:keys($map), $map)


This returns some permutation of `(42, 'baz', 456)`. 


Because a map is a function item, functions that apply to functions also apply to maps. A map is an anonymous function, so `fn:function-name` returns the empty sequence; `fn:function-arity` always returns `1`. 


Like all other values, maps are immutable. For example, the `map:remove` function creates a new map by removing an entry from an existing map, but the existing map is not changed by the operation. Like sequences, maps have no identity. It is meaningful to compare the contents of two maps, but there is no way of asking whether they are "the same map": two maps with the same content are indistinguishable. 


Maps may be compared using the `fn:deep-equal` function. The [Map Module](Map Module.md) describes the available set of map functions. 


### Arrays

An _array_ is a function that associates a set of positions, represented as positive integer keys, with values. The first position in an array is associated with the integer `1`. The values of an array are called its members. In the type hierarchy, array has a distinct type, which is derived from function. 


Arrays can be constructed in two ways. With the square bracket notation, the comma serves as delimiter: 


    [],            (: empty array :)
    [ (1, 2) ],    (: array with single member :)
    [ 1 to 2, 3 ]  (: array with two members; same as: [ (1, 2), 3 ] :)


With the `array` keyword and curly brackets, the inner expression is evaluated as usual, and the resulting values will be the members of the array: 


    array { },           (: empty array;              same as: array { () } :)  
    array { (1, 2) },    (: array with two members;   same as: array { 1, 2 } :)
    array { 1 to 2, 3 }  (: array with three members; same as: array { 1, 2, 3 } :)


The function corresponding to the array has the signature `function($index as xs:integer) as item()*`. The expression `$array($index)` returns an addressed member of the array. The following query returns the five array members `48 49 50 51 52` as result: 


    let $array := array { 48 to 52 }
    for $i in 1 to array:size($array)
    return $array($i)


Like all other values, arrays are immutable. For example, the `array:reverse` function creates a new array containing a re-ordering of the members of an existing array, but the existing array is not changed by the operation. Like sequences, arrays have no identity. It is meaningful to compare the contents of two arrays, but there is no way of asking whether they are "the same array": two arrays with the same content are indistinguishable. 


#### Atomization

If an array is _atomized_, all of its members will be atomized. As a result, an atomized item may now result in more than one item. Some examples: 


    fn:data([1 to 2])        (: returns the sequence 1, 2 :)
    [ 'a', 'b', 'c' ] = 'b'  (: returns true :)
    <a>{ [ 1, 2 ] }</a>      (: returns <a>1 2</a> :)
    array { 1 to 2 } + 3     (: error: the left operand returns two items :)


Atomization also applies to function arguments. The following query returns 5, because the array will be atomized to a sequence of 5 integers: 


    let $f := function($x as xs:integer*) { count($x) }
    return $f([1 to 5])


However, the next query returns 1, because the array is already of the general type `item()`, and no atomization will take place: 


    let $f := function($x as item()*) { count($x) }
    return $f([1 to 5])


Arrays can be compared with the `fn:deep-equal` function. The [Array Module](Array Module.md) describes the available set of array functions. 


### Lookup Operator

The lookup operator provides some syntactic sugar to access values of maps or array members at a specified position. It is introduced by the question mark (`?`) and followed by a specifier. The specifier can be: 

1. A wildcard `*`, 
2. The name of the key, 
3. The integer offset, or 
4. Any other parenthesized expression. 

The following example demonstrates the four alternatives: 


    let $map := map { 'R': 'red', 'G': 'green', 'B': 'blue' }
    return (
      $map?*          (: 1. returns all values; same as: map:keys($map) ! $map(.) :),
      $map?R          (: 2. returns the value associated with the key 'R'; same as: $map('R') :),
      $map?('G','B')  (: 3. returns the values associated with the key 'G' and 'B' :)
    ),
    let $array := [ 'one', 'two', 'three' ]
    return (
      $array?*         (: 1. returns all values; same as: (1 to array:size($array)) ! $array(.) :),
      $array?1         (: 2. returns the first value; same as: $array(1) :),
      $array?(2 to 3)  (: 3. returns the second and third values; same as: (1 to 2) ! $array(.) :)
    )


The lookup operator can also be used without left operand. In this case, the context item will be used as input. This query returns `Akureyri`: 


    for $map in (
      map { 'name': 'Guðrún', 'city': 'Reykjavík' },
      map { 'name': 'Hildur', 'city': 'Akureyri' }
    )
    return $map[?name = 'Hildur'] ?city


### Arrow Operator

The arrow operator applies a function to a value. The value is used as the first argument to the function. It is introduced with the characters `=>`, and it is followed by the function to be called. If `$v` is a value and `f()` is a function, then `$v=>f()` is equivalent to `f($v)`, and `$v=>f($j)` is equivalent to `f($v, $j)`. This is further illustrated by an example: 


    (: Returns 3 :)
    count(('A', 'B', 'C')),
    ('A', 'B', 'C') => count(),
    ('A', 'B', 'C') => (function( $sequence) { count( $sequence)})(),
    (: Returns W-E-L-C-O-M-E :)
    string-join(tokenize(upper-case('w e l c o m e')), '-'),
    'w e l c o m e' => upper-case() => tokenize() => string-join('-'),
    (: Returns xfmdpnf :)
    codepoints-to-string(
      for $i in string-to-codepoints('welcome')
      return $i + 1
    ),
    (for $i in 'welcome' => string-to-codepoints()
     return $i + 1) => codepoints-to-string()


The syntax makes nested function calls more readable, as it is easy to see if parentheses are balanced. 


### Serialization

Two [Serialization](Serialization.md) methods have been added to the [Serialization spec](http://www.w3.org/TR/xslt-xquery-serialization-31/): 


#### Adaptive Serialization

In Version 8.0 of BaseX, `adaptive` is the new default serialization method. It provides a textual representation for all XDM types, including maps and arrays, functions, attributes, and namespaces. All items will be separated using the value of the `item-separator` parameter, or a newline if no value is specified: 


    <element id='id0'/>/@id,
    map { 'key': 'value' },
    true#0


Result: 


     id="id0"
    {
      "key": "value"
    }
    function true#0


#### JSON Serialization

The new `json` serialization output method can be used to serialize XQuery maps, arrays, atomic values and empty sequences as JSON. 


Warning: The `json` output method has been introduced in BaseX quite a while ago. With BaseX 8.0, the implementation of this method has been rewritten to comply with the new standard serialization rules and, at the same time, to preserve the existing semantics: 

 * If an XML node of type `element(json)` is found, it will be serialized following the serialization rules of the [JSON Module](JSON Module.md). 
 * Any other node or atomic value, map, array, or empty sequence will be serialized according to the [rules in the specification](http://www.w3.org/TR/xslt-xquery-serialization-31/#json-output). 

The following two queries will both return the JSON snippet `{ "key": "value" }`: 


    declare option output:method 'json';
    map { "key": "value" }


    declare option output:method 'json';
    <json type='object'>
      <key>value</key>
    </json>


### Functions

The following functions of the [XQuery 3.1 Functions and Operators](http://www.w3.org/TR/xpath-functions-31/) Working Draft have been added. Please be aware that the functions are still subject to change: 


#### Map Functions

The following map functions are now available: 


`map:merge`, `map:size`, `map:keys`, `map:contains`, `map:get`, `map:entry`, `map:put`, `map:remove`, `map:for-each`


Please check out the [Map Module](Map Module.md) for more details. 


#### Array Functions

The following array functions are now available: 


`array:size`, `array:append`, `array:subarray`, `array:remove`, `array:insert-before`, `array:head`, `array:tail`, `array:reverse`, `array:join`, `array:flatten`, `array:for-each`, `array:filter`, `array:fold-left`, `array:fold-right`, `array:for-each-pair`


Please check out the [Array Module](Array Module.md) for more details. 


#### JSON Functions

XQuery now provides native support for JSON objects. Strings and resources can be parsed to XQuery items and, as [shown above](XQuery 3.1.md#JSON_Serialization), serialized back to their original form. 


##### fn:parse-json
** Signatures **

 * `fn:parse-json($input as xs:string) as item()?`
 * `fn:parse-json($input as xs:string, $options as map(*)) as item()?`

Parses the supplied string as JSON text and returns its item representation. The result may be a map, an array, a string, a double, a boolean, or an empty sequence. The allowed options are further specified in the [specification](http://www.w3.org/TR/xpath-functions-31/#func-parse-json). 


    map:serialize(parse-json('{ "name": "john" }'))  (: yields { "name": "json" } :),
    parse-json('[ 1, 2, 4, 8, 16]')?*                (: yields the integer sequence 1, 2, 4, 8, 16 :),


##### fn:json-docs
** Signatures **

 * `fn:json-doc($uri as xs:string) as item()?`
 * `fn:json-doc($uri as xs:string, $options as map(*)) as item()?`

Retrieves the text from the specified URI, parses the supplied string as JSON text and returns its item representation (see [fn:parse-json](XQuery 3.1.md#fn-parse-json) for more details). 


    json-doc("http://ip.jsontest.com/")('ip')  (: returns your IP address :)


#### fn:sort
** Signatures **

 * `fn:sort($input as item()*) as item()*`
 * `fn:sort($input as item()*, $key as function(item()*) as xs:anyAtomicType*)) as item()*`

Returns a new sequence with sorted `$input` items. If a sort `$key` function is given, it will be applied on all items. The items of the resulting values will be sorted using the semantics of the `lt` expression. 


    sort(reverse(1 to 3))                (: yields 1, 2, 3 :),
    sort((3, -2, 1), abs#1)              (: yields 1, -2, 3 :),
    sort((1,2,3), function($x) { -$x })  (: yields 3, 2, 1 :),
    sort((1, 'a'))                       (: yields an error, as strings and integers cannot be compared :)


#### fn:contains-token
** Signatures **

 * `fn:contains-token($input as xs:string*, $token as string) as xs:boolean`
 * `fn:contains-token($input as xs:string*, $token as string, $collation as xs:string) as xs:boolean`

The supplied strings will be tokenized at whitespace boundaries. The function returns `true` if one of the strings equals the supplied token, possibly under the rules of a supplied collation: 


    contains-token(('a', 'b c', 'd'), 'c')                (: yields true :)
    <xml class='one two'/>/contains-token(@class, 'one')  (: yields true :)


#### fn:parse-ietf-date
** Signature **

 * `fn:parse-ietf-date($input as xs:string?) as xs:string?`

Parses a string in the IETF format (which is widely used on the Internet) and returns a `xs:dateTime` item: 


    fn:parse-ietf-date('28-Feb-1984 07:07:07')"              (: yields 1984-02-28T07:07:07Z :),
    fn:parse-ietf-date('Wed, 01 Jun 2001 23:45:54 +02:00')"  (: yields 2001-06-01T23:45:54+02:00 :)


#### fn:apply
** Signatures **

 * `fn:apply($function as function(*), $array as array(*)) as item()*`

A supplied function is invoked with the arguments supplied by an array. The arity of the function must be the same as the size of the array. 


Example: 


    fn:apply(concat#5, array { 1 to 5 })            (: 12345 :)
    fn:apply(function($a) { sum($a) }, [ 1 to 5 ])  (: 15 :)
    fn:apply(count#1, [ 1,2 ])  (: error (the array has two members) :)


#### fn:random-number-generator
** Signatures **

 * `fn:random-number-generator() as map(xs:string, item())`
 * `fn:random-number-generator($seed as xs:anyAtomicType) as map(xs:string, item())`

Creates a random number generator, using an optional seed. The returned map contains three entries: 

 * `number`  is a random double between 0 and 1 
 * `next`  is a function that returns another random number generator 
 * `permute`  is a function that returns a random permutation of its argument 

The returned random generator is _deterministic_: If the function is called twice with the same arguments and in the same execution scope, it will always return the same result. 


Example: 


    let $rng := fn:random-number-generator()
    let $number := $rng('number')               (: returns a random number :)
    let $next-rng := $rng('next')()             (: returns a new generator :)
    let $next-number := $next-rng('number')     (: returns another random number :)
    let $permutation := $rng('permute')(1 to 5) (: returns a random permutation of (1,2,3,4,5) :)
    return ($number, $next-number, $permutation)


#### fn:format-number

The function has been extended to support scientific notation: 


    format-number(1984.42, '00.0e0')  (: yields 19.8e2 :)


#### fn:tokenize

If no separator is specified as second argument, a string will be tokenized at whitespace boundaries: 


    fn:tokenize("  a b  c d")  (: yields "a", "b", "c", "d" :)


#### fn:trace

The second argument can now be omitted: 


    fn:trace(<xml/>, "Node: ")/node()  (: yields the debugging output "Node: <xml/>" :),
    fn:trace(<xml/>)/node()            (: returns the debugging output "<xml/>" :)


### Binary Data

Items of type `xs:hexBinary` and `xs:base64Binary` can now be compared against each other. The following queries all yield `true`: 


    xs:hexBinary('') < xs:hexBinary('bb'),
    xs:hexBinary('aa') < xs:hexBinary('bb'),
    max((xs:hexBinary('aa'), xs:hexBinary('bb'))) = xs:hexBinary('bb')


### Collations

XQuery 3.1 provides a new default collation, which allows for a case-insensitive comparison of ASCII characters (`A-Z` = `a-z`). This query returns `true`: 


    declare default collation 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive';
    'HTML' = 'html'


If the [ICU Library](http://site.icu-project.org/download) is downloaded and added to the classpath, the full [Unicode Collation Algorithm](http://www.w3.org/TR/xpath-functions-31/#uca-collations) features get available in BaseX: 


    (: returns 0 (both strings are compared as equal) :)
    compare('a-b', 'ab', 'http://www.w3.org/2013/collation/UCA?alternate=shifted')


### Pending Features

The features of XQuery 3.1 are still subject to change, but we are planning to add the following enhancements in near future: 

 * New functions: `fn:collation-key`, `fn:load-xquery-module`, `fn:transform`
 
## Changelog

Introduced with Version 8.0. 

