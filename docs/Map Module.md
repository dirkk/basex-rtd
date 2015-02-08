
# Map Module
 


 
This [XQuery Module](Module Library.md) contains functions for manipulating maps, which will officially be introduced with [XQuery 3.1](XQuery 3.1.md#Maps). **Please note** that the functions are subject to change until the specification has reached its final stage. 

 
## Conventions

All functions in this module are assigned to the `http://www.w3.org/2005/xpath-functions/map` namespace, which is statically bound to the `map` prefix. 

 
## Functions

Some examples use the _map_`$week` defined as: 


    declare variable $week as map(*) := map {
      0: "Sonntag",
      1: "Montag",
      2: "Dienstag",
      3: "Mittwoch",
      4: "Donnerstag",
      5: "Freitag",
      6: "Samstag"
    };


### map:contains

`map:contains($input as map(*), $key as xs:anyAtomicType) as xs:boolean`

 Returns true if the _map_ supplied as `$input` contains an entry with a key equal to the supplied value of `$key`; otherwise it returns false. No error is raised if the map contains keys that are not comparable with the supplied `$key`.  If the supplied key is `xs:untypedAtomic`, it is compared as an instance of `xs:string`. If the supplied key is the `xs:float` or `xs:double` value `NaN`, the function returns true if there is an entry whose key is `NaN`, or false otherwise. 

**Examples**

 * `map:contains($week, 2)`  returns `true()`. 
 * `map:contains($week, 9)`  returns `false()`. 
 * `map:contains(map {}, "xyz")`  returns `false()`. 
 * `map:contains(map { "xyz": 23 }, "xyz")`  returns `true()`. 


### map:entry

`map:entry($key as xs:anyAtomicType, $value as item()*) as map(*)`

 Creates a new _map_ containing a single entry. The key of the entry in the new map is `$key`, and its associated value is `$value`. If the supplied key is `xs:untypedAtomic`, it is compared as an instance of `xs:string`. If the supplied key is the `xs:float` or `xs:double` value `NaN`, the function returns the value in the entry whose key is `NaN`, or the empty sequence otherwise.  The function `map:entry` is intended primarily for use in conjunction with the function `map:merge`. For example, a map containing seven entries may be constructed like this: Unlike the `map { ... }` expression, this technique can be used to construct a map with a variable number of entries, for example: 

**Examples**

`map:entry("M", "Monday")` creates `map { "M": "Monday" }`. 

### map:for-each

Introduced with Version 8.0: 


`map:for-each($input as map(*), $fun as function($key as xs:anyAtomicType, $value as item()*)) as item()*`

Applies a function to every entry of the map `$input` and returns the results as a sequence. The function supplied as `$fun` takes two arguments. It is called supplying the key of the map entry as the first argument, and the associated value as the second argument. 

**Examples**

The following query adds the keys and values of all map entries and returns `(3,7)`: 
    map:for-each(
      map { 1: 2, 3: 4 },
      function($a, $b) { $a + $b }
    )



### map:get

`map:get($input as map(*), $key as xs:anyAtomicType) as item()*`

Returns the value associated with a supplied key in a given map. This function attempts to find an entry within the _map_ supplied as `$input` that has a key equal to the supplied value of `$key`. If there is such an entry, it returns the associated value; otherwise it returns an empty sequence. No error is raised if the map contains keys that are not comparable with the supplied `$key`. If the supplied key is `xs:untypedAtomic`, it is converted to `xs:string`. If the supplied key is the `xs:float` or `xs:double` value `NaN`, the function returns an empty sequence.  A return value of `()` from `map:get` could indicate that the key is present in the map with an associated value of `()`, or it could indicate that the key is not present in the map. The two cases can be distinguished by calling `map:contains`. Invoking the _map_ as a function item has the same effect as calling `get`: that is, when `$input` is a map, the expression `$input($K)` is equivalent to `get($input, $K)`. Similarly, the expression `get(get(get($input, 'employee'), 'name'), 'first')` can be written as `$input('employee')('name')('first')`. 

**Examples**

 * `map:get($week, 4)`  returns `"Donnerstag"`. 
 * `map:get($week, 9)`  returns `()`. _(When the key is not present, the function returns an empty sequence.)._
 * `map:get(map:entry(7,())), 7)`  returns `()`. _(An empty sequence as the result can also signify that the key is present and the associated value is an empty sequence.)._


### map:keys

`map:keys($input as map(*)) as xs:anyAtomicType*`

Returns a sequence containing all the key values present in a map. The function takes any _map_ as its `$input` argument and returns the keys that are present in the map as a sequence of atomic values. The order may differ from the order in which entries were inserted in the map. 

**Examples**

 * `map:keys(map { 1: "yes", 2: "no" })`  returns `(1,2)`. 


### map:merge

Introduced with Version 8.0 (replacing `map:new`): 


`map:merge($input as map(*)*) as map(*)`

 Constructs and returns a new map. The _map_ is formed by combining the contents of the maps supplied in the `$input` argument. The maps are combined as follows: 1. There is one entry in the new map for each distinct key value present in the union of the input maps, where keys are considered distinct according to the rules of the `distinct-values` function. 
2. The associated value for each such key is taken from the last map in the input sequence `$input` that contains an entry with this key. 
 There is no requirement that the supplied input maps should have the same or compatible types. The type of a map (for example `map(xs:integer, xs:string)`) is descriptive of the entries it currently contains, but is not a constraint on how the map may be combined with other maps. 

**Examples**

 * `map:merge(())`  creates an empty map. 
 * `map:merge((map:entry(0, "no"), map:entry(1, "yes")))`  creates `map { 0: "no", 1: "yes" }`. 
 * `map:merge(($week, map { 7: "Unbekannt" }))`  creates `map { 0: "Sonntag", 1: "Montag", 2: "Dienstag", 3: "Mittwoch", 4: "Donnerstag", 5: "Freitag", 6: "Samstag", 7: "Unbekannt" }`. 
 * `map:merge(($week, map { 6: "Sonnabend" }))`  creates `map { 0: "Sonntag", 1: "Montag", 2: "Dienstag", 3: "Mittwoch", 4: "Donnerstag", 5: "Freitag", 6: "Sonnabend" }`. 


### map:put

Introduced with Version 8.0: 


`map:put($input as map(*), $key as xs:anyAtomicType, $value as item()*) as map(*)`

 Creates a new _map_, containing the entries of the `$input` argument and a new entry composed by `$key` and `$value`. The semantics of this function are equivalent to `map:merge(($input, map { $key, $value }))`


### map:remove

`map:remove($input as map(*), $key as xs:anyAtomicType) as map(*)`

 Constructs a new map by removing an entry from an existing map. The entries in the new map correspond to the entries of `$input`, excluding any entry whose key is equal to `$key`.  No failure occurs if the input map contains no entry with the supplied key; the input map is returned unchanged 

**Examples**

 * `map:remove($week, 4)`  creates `map { 0: "Sonntag", 1: "Montag", 2: "Dienstag", 3: "Mittwoch", 5: "Freitag", 6: "Samstag" }`. 
 * `map:remove($week, 23)`  creates `map { 0: "Sonntag", 1: "Montag", 2: "Dienstag", 3: "Mittwoch", 4: "Donnerstag", 5: "Freitag", 6: "Samstag" }`. 


### map:size

`map:size($input as map(*)) as xs:integer`

 Returns a the number of entries in the supplied map. The function takes any _map_ as its `$input` argument and returns the number of entries that are present in the map. 

**Examples**

 * `map:size(map:merge(()))`  returns `0`. 
 * `map:size(map { "true": 1, "false": 0 })`  returns `2`. 


### map:serialize

`map:serialize($input as map(*)) as xs:string`

 This function is specific to BaseX. It returns a string representation of the supplied map. The purpose of this function is to get an insight into the structure of a map item; it cannot necessarily be used for reconstructing the original map. 

**Examples**

 * `map:serialize(map { 'A': (.1, xs:date('2001-01-01')) })`  returns `{ "A": (0.1, "2001-01-01") }`. 

 
## Changelog
UNKNOWN * Added: `map:for-each`, `map:merge`, `map:put`
 * Removed: support for collations (in accordance with the XQuery 3.1 spec). 
 * Removed: `map:new` (replaced with `map:merge`) 
 * Updated: aligned with latest specification: compare keys of type `xs:untypedAtomic` as `xs:string` instances, store `xs:float` or `xs:double` value `NaN`. 
 * Introduction on maps is now found in the article on [XQuery 3.1](XQuery 3.1.md#Maps). 
UNKNOWN * Updated: map syntax `map { 'key': 'value' }`
 * Added: [map:serialize](Map Module.md#map-serialize)
UNKNOWN * Updated: alternative map syntax without `map` keyword and `:` as key/value delimiter (e.g.: `{ 'key': 'value' })`
