
# Higher-Order Functions
 


 
This page talks about _higher-order functions_ introduced with [XQuery 3.0](XQuery 3.0.md). The BaseX-specific [Higher-Order Functions Module](Higher-Order Functions Module.md) contains some additional useful functions. 

 
## Function Items

Probably the most important new feature in XQuery 3.0 are _function items_, i. e., items that act as functions, but can also be passed to and from other functions and expressions. This feature makes functions _first-class citizens_ of the language. 


The [XQuery 3.0](XQuery 3.0.md#XQuery_3.0Function_Items) page goes into details on how function items can be obtained. 


### Function Types 

Like every XQuery item, function items have a _sequence type_. It can be used to specify the _arity_ (number of arguments the function takes) and the argument and result types. 


The most general function type is `function(*)`. It's the type of all function items. The following query for example goes through a list of XQuery items and, if it is a function item, prints its arity: 


    for $item in (1, 'foo', fn:concat#3, function($a) { 42 * $a })
    where $item instance of function(*)
    return fn:function-arity($item)


_Result:_`3 1`


The notation for specifying argument and return types is quite intuitive, as it closely resembles the function declaration. The XQuery function 


    declare function local:char-at(
      $str as xs:string,
      $pos as xs:integer
    ) as xs:string {
      fn:substring($str, $pos, 1)
    };


for example has the type `function(xs:string, xs:integer) as xs:string`. It isn't possible to specify only the argument and not the result type or the other way round. A good place-holder to use when no restriction is wanted is `item()*`, as it matches any XQuery value. 


Function types can also be nested. As an example we take `local:on-sequences`, which takes a function defined on single items and makes it work on sequences as well: 


    declare function local:on-sequences(
      $fun as function(item()) as item()*
    ) as function(item()*) as item()* {
      fn:for-each($fun, ?)
    };


We'll see later how `fn:for-each(...)` works. The type of `local:on-sequences(...)` on the other hand is easily constructed, if a bit long: 


`function(function(item()) as item()*) as function(item()*) as item()*`. 

 
## Higher-Order Functions

A _higher-order function_ is a function that takes other functions as arguments and/or returns them as results. `fn:for-each` and `local:on-sequences` from the last chapter are nice examples. 


With the help of higher-order functions, one can extract common patterns of _behaviour_ and abstract them into a library function. 


### Higher-Order Functions on Sequences 

Some usage patterns on sequences are so common that the higher-order functions describing them are in the XQuery standard libraries. They are listed here, together with their possible XQuery implementation and some motivating examples. 


#### fn:for-each

`fn:for-each($seq as item()*, $fun as function(item()) as item()*)) as item()*`

Applies the function item `$fun` to every element of the sequence `$seq` and returns all of the results as a sequence. 

**Examples**

 * Squaring all numbers from 1 to 10: 
 * _Result:_`1 4 9 16 25 36 49 64 81 100`
 * Applying a list of functions to a string: 
 * _Result:_`FOOBAR bar 6`


#### fn:filter

`fn:filter($seq as item()*, $pred as function(item()) as xs:boolean)) as item()*`

Applies the boolean predicate `$pred` to all elements of the sequence `$seq`, returning those for which it returns `true()`. 

**Examples**

 * All even integers until 10: 
 * _Result:_`2 4 6 8 10`
 * Strings that start with an upper-case letter: 
 * _Result:_`FooBar BAR`
 * Inefficient prime number generator: 
 * _Result:_`2 3 5 7 11 13 17 19`


#### fn:for-each-pair

`fn:for-each-pair($seq1 as item()*, $seq2 as item()*, $fun as function(item(), item()) as item()*) as item()*`

_zips_ the elements from the two sequences `$seq1` and `$seq2` together with the function `$f`. It stops after the shorter sequence ends. 

**Examples**

 * Adding one to the numbers at odd positions: 
 * _Result:_`2 1 2 1 2`
 * Line numbering: 
 * _Result:_
 * Checking if a sequence is sorted: 
 * _Result:_`true false`


### Folds 

A _fold_, also called _reduce_ or _accumulate_ in other languages, is a very basic higher-order function on sequences. It starts from a seed value and incrementally builds up a result, consuming one element from the sequence at a time and combining it with the aggregate of a user-defined function. 


Folds are one solution to the problem of not having _state_ in functional programs. Solving a problem in _imperative_ programming languages often means repeatedly updating the value of variables, which isn't allowed in functional languages. 


Calculating the _product_ of a sequence of integers for example is easy in `Java`: 


    public int product(int[] seq) {
      int result = 1;
      for(int i : seq) {
        result = result * i;
      }
      return result;
    }


Nice and efficient implementations using folds will be given below. 


The _linear_ folds on sequences come in two flavours. They differ in the direction in which they traverse the sequence: 


#### fn:fold-left

`fn:fold-left($seq as item()*, $seed as item()*, $fun as function(item()*, item()) as item()*) as item()*`

The _left fold_ traverses the sequence from the left.  The query `fn:fold-left(1 to 5, 0, $f)` for example would be evaluated as: 

**Examples**

 * Product of a sequence of integers: 
 * _Result:_`120`
 * Illustrating the evaluation order: 
 * _Result:_`$f($f($f($f($f($seed, 1), 2), 3), 4), 5)`
 * Building a decimal number from digits: 
 * _Result:_`12345 42`


#### fn:fold-right

`fn:fold-right($seq as item()*, $seed as item()*, $fun as function(item(), item()*) as item()*) as item()*`

The _right fold_`fn:fold-right($seq, $seed, $fun)` traverses the from the right.  The query `fn:fold-right(1 to 5, 0, $f)` for example would be evaluated as: 

**Examples**

 * Product of a sequence of integers: 
 * _Result:_`120`
 * Illustrating the evaluation order: 
 * _Result:_`$f(1, $f(2, $f(3, $f(4, $f(5, $seed)))))`
 * Reversing a sequence of items: 
 * _Result:_`10 9 8 7 6 5 4 3 2 1`

