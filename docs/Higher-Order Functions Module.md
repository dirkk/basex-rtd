
# Higher-Order Functions Module
 


 
This [XQuery Module](Module Library.md) adds some useful higher-order functions, additional to the [Higher-Order Functions](Higher-Order Functions.md) provided by the official specification. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/hof` namespace, which is statically bound to the `hof` prefix. 

 
## Functions

### hof:id

`hof:id($expr as item()*) as item()*`

Returns its argument unchanged. This function isn't useful on its own, but can be used as argument to other higher-order functions. 

**Examples**

 * `hof:id(1 to 5)`  returns `1 2 3 4 5`
 * With higher-order functions: 

    let $sort-by := function($f, $seq) {
        for $x in $seq
        order by $f($x)
        return $x
      }
    let $sort := $sort-by(hof:id#1, ?),
        $reverse-sort := $sort-by(function($x) { -$x }, ?)
    return (
      $sort((1, 5, 3, 2, 4)),
      '|',
      $reverse-sort((1, 5, 3, 2, 4))
    )

 returns: `1 2 3 4 5 | 5 4 3 2 1`

### hof:const

`hof:const($expr as item()*, $ignored as item()*) as item()*`

Returns its first argument unchanged and ignores the second. This function isn't useful on its own, but can be used as argument to other higher-order functions, e.g. when a function combining two values is expected and one only wants to retain the left one. 

**Examples**

 * `hof:const(42, 1337)`  returns `42`. 
 * With higher-order functions: 

    let $zip-sum := function($f, $seq1, $seq2) {
        sum(map-pairs($f, $seq1, $seq2))
      }
    let $sum-all := $zip-sum(function($a, $b) { $a + $b }, ?, ?),
        $sum-left := $zip-sum(hof:const#2, ?, ?)
    return (
      $sum-all((1, 1, 1, 1, 1), 1 to 5),
      $sum-left((1, 1, 1, 1, 1), 1 to 5)
    )

 * Another use-case: When inserting a key into a map, `$f` decides how to combine the new value with a possibly existing old one. `hof:const` here means ignoring the old value, so that's normal insertion. 

    let $insert-with := function($f, $map, $k, $v) {
        let $old := $map($k),
            $new := if($old) then $f($v, $old) else $v
        return map:new(($map, map { $k: $new }))
      }
    let $map := map { 'foo': 1 }
    let $add := $insert-with(function($a, $b) {$a + $b}, ?, ?, ?),
        $insert := $insert-with(hof:const#2, ?, ?, ?)
    return (
      $add($map, 'foo', 2)('foo'),
      $insert($map, 'foo', 42)('foo')
    )

 returns `3 42`

### hof:fold-left1

`hof:fold-left1($seq as item()+, $f as function(item()*, item()) as item()*) as item()*`

Works the same as [fn:fold-left](Higher-Order Functions.md#fn-fold-left), but doesn't need a seed, because the sequence must be non-empty. 

**Examples**

 * `hof:fold-left1(1 to 10, function($a, $b) { $a + $b })`  returns `55`. 
 * `hof:fold-left1((), function($a, $b) { $a + $b })`  throws `XPTY0004`, because `$seq` has to be non-empty. 


### hof:until

`hof:until($pred as function(item()*) as xs:boolean, $f as function(item()*) as item()*, $start as item()*) as item()*`

Applies the function `$f` to the initial value `$start` until the predicate `$pred` applied to the result returns `true()`. 

**Examples**

 * `hof:until(function($x) { $x ge 1000 }, function($y) { 2 * $y }, 1)`  returns `1024`. 
 * Calculating the square-root of a number by iteratively improving an initial guess: 

    let $sqrt := function($x as xs:double) as xs:double {
      hof:until(
        function($res) { abs($res * $res - $x) < 0.00001 },
        function($guess) { ($guess + $x div $guess) div 2 },
        $x
      )
    }
    return $sqrt(25)

 returns `5.000000000053722`. 

### hof:top-k-by

`hof:top-k-by($seq as item()*, $sort-key as function(item()) as item(), $k as xs:integer) as item()*`

Returns the `$k` items in `$seq` that are greatest when sorted by the result of `$f` applied to the item. The function is a much more efficient implementation of the following scheme: 
    (for $x in $seq
     order by $sort-key($x) descending
     return $x
    )[position() <= $k]



**Examples**

 * `hof:top-k-by(1 to 1000, hof:id#1, 5)`  returns `1000 999 998 997 996`
 * `hof:top-k-by(1 to 1000, function($x) { -$x }, 3)`  returns `1 2 3`
 * `hof:top-k-by(<x a='1' b='2' c='3'/>/@*, xs:integer#1, 2)/node-name()`  returns `c b`


### hof:top-k-with

`hof:top-k-with($seq as item()*, $lt as function(item(), item()) as xs:boolean, $k as xs:integer) as item()*`

Returns the `$k` items in `$seq` that are greatest when sorted in the order of the _less-than_ predicate `$lt`. The function is a general version of `hof:top-k-by($seq, $sort-key, $k)`. 

**Examples**

 * `hof:top-k-with(1 to 1000, function($a, $b) { $a lt $b }, 5)`  returns `1000 999 998 997 996`
 * `hof:top-k-with(-5 to 5, function($a, $b) { abs($a) gt abs($b) }, 5)`  returns `0 1 -1 2 -2`

 
## Changelog
** Version 7.2 **

 * Added: [hof:top-k-by](Higher-Order Functions Module.md#hof-top-k-by), [hof:top-k-with](Higher-Order Functions Module.md#hof-top-k-with)
 * Removed: hof:iterate 
** Version 7.0 **

 * module added 
