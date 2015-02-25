 


 
This article is part of the [XQuery Portal](XQuery.md). It summarizes the most interesting features of the [XQuery 3.0](http://www.w3.org/TR/xquery-30/) Recommendations. XQuery 3.0 is fully supported by BaseX. 

 
# Enhanced FLWOR Expressions

Most clauses of FLWOR expressions can now be specified in an arbitrary order: additional `let` and `for` clauses can be put after a `where` clause, and multiple `where`, `order by` and `group by` statements can be used. This means that many nested loops can now be rewritten to a single FLWOR expression. 


**Example:**


    for $country in db:open('factbook')//country
    where $country/@population > 100000000
    let $name
    := $country/name[1]
    for $city in $country//city[population > 1000000]
    group by $name
    return <country name='{ $name }'>{ $city/name }</country>


A new `count` clause enhances the FLWOR expression with a variable that enumerates the iterated tuples. 


    for $n in (1 to 10)[. mod 2 = 1]
    count $c
    return <number count="{ $c }" number="{ $n }"/>


The `allowing empty` provides functionality similar to outer joins in SQL: 


    for $n allowing empty in ()
    return 'empty? ' || empty($n)


Window clauses provide a rich set of variable declarations to process sub-sequences of iterated tuples. An example: 


    for tumbling window $w in (2, 4, 6, 8, 10, 12, 14)
        start at $s when fn:true()
        only end at $e when $e - $s eq 2
    return <window>{ $w }</window>


More information on window clauses, and all other enhancements, can be found in the [specification](http://www.w3.org/TR/xquery-30/#id-windows). 


## Simple Map Operator

The [simple map](http://www.w3.org/TR/xquery-30/#id-map-operator) operator `!` provides a compact notation for applying the results of a first to a second expression: the resulting items of the first expression are bound to the context item one by one, and the second expression is evaluated for each item. The map operator may be used as replacement for FLWOR expressions: 


**Example:**


    (: Simple map notation
    :)
    (1 to 10)
    ! element node { . },
    (: FLWOR notation
    :)
    for $i in 1 to 10
    return element node { $i }


A map operator is defined to be part of a path expression, which may now mix path and map operators. In contrast to the path operator, the results of the map operator will not be made duplicate-free and returned in document order. 


## Group By

FLWOR expressions have been extended to include the [group by](http://www.w3.org/TR/xquery-30/#id-group-by) clause, which is well-established among relational database systems. `group by` can be used to apply value-based partitioning to query results: 


**XQuery:**


    for $ppl in doc('xmark')//people/person  
    let $ic
    := $ppl/profile/@income
    let $income
    :=  if($ic < 30000) then
                       "challenge" 
                    else if($ic >= 30000 and $ic < 100000) then 
                       "standard" 
                    else if($ic >= 100000) then 
                       "preferred" 
                    else 
                       "na"  
    group by $income
    order by $income
    return element { $income } { count($ppl) }


This query is a rewrite of [Query #20](http://www.ins.cwi.nl/projects/xmark/Assets/xmlquery.txt) contained in the [XMark Benchmark Suite](http://www.ins.cwi.nl/projects/xmark) to use `group by`. The query partitions the customers based on their income. 


**Result:**


    <challenge>4731</challenge>
    <na>12677</na>
    <preferred>314</preferred>
    <standard>7778</standard>


In contrast to the relational GROUP BY statement, the XQuery counterpart concatenates the values of all non-grouping variables that belong to a specific group. In the context of our example, all nodes in `//people/person` that belong to the `preferred` partition are concatenated in `$ppl` after grouping has finished. You can see this effect by changing the return statement to: 


    ...
    return element { $income } { $ppl }


**Result:**


    <challenge>
      <person id="person0">
        <name>Kasidit Treweek</name>
        …
      <person id="personX">
        …
    </challenge>


Moreover, a value can be assigned to the grouping variable. This is shown in the following example: 


**XQuery:**


    let $data
    :=
      <xml>
        <person country='USA' name='John'/>
        <person country='USA' name='Jack'/>
        <person country='Germany' name='Johann'/>
      </xml>
    for $person in $data/person
    group by $country
    := $person/@country/string()
    return element persons {
      attribute country { $country },
      $person/@name
    ! element name { data() }
    }


**Result:**


    <persons country="USA">
      <name>John</name>
      <name>Jack</name>
    </persons>
    <persons country="Germany">
      <name>Johann</name>
    </persons>


## Try/Catch

The [try/catch](http://www.w3.org/TR/xquery-30/#id-try-catch) construct can be used to handle errors at runtime: 


**Example:**


    try {
      1 + '2'
    } catch err:XPTY0004 {
      'Typing error: ' || $err:description
    } catch * {
      'Error [' || $err:code || ']: ' || $err:description
    }


**Result:**`Typing error: '+' operator: number expected, xs:string found.`


Within the scope of the catch clause, a number of variables are implicitly declared, giving information about the error that occurred: 

 * `$err:code`  error code 
 * `$err:description` : error message 
 * `$err:value` : value associated with the error (optional) 
 * `$err:module` : URI of the module where the error occurred 
 * `$err:line-number` : line number where the error occurred 
 * `$err:column-number` : column number where the error occurred 
 * `$err:additional` : error stack trace 

## Switch

The [switch](http://www.w3.org/TR/xquery-30/#id-switch) statement is available in many other programming languages. It chooses one of several expressions to evaluate based on its input value. 


**Example:**


    for $fruit in ("Apple", "Pear", "Peach")
    return switch ($fruit)
      case "Apple" return "red"
      case "Pear"  return "green"
      case "Peach" return "pink"
      default      return "unknown"


**Result:**`red green pink`


The expression to evaluate can correspond to multiple input values. 


**Example:**


    for $fruit in ("Apple", "Cherry")
    return switch ($fruit)
      case "Apple"
      case "Cherry"
         return "red"
      case "Pear"
         return "green"
      case "Peach"
         return "pink"
      default
         return "unknown"


**Result:**`red red`


## Function Items

One of the most distinguishing features added in _XQuery 3.0_ are _function items_, also known as _lambdas_ or _lambda functions_. They make it possible to abstract over functions and thus write more modular code. 


**Examples:**


Function items can be obtained in three different ways: 

 * Declaring a new _inline function_: 
 * **Result:**`42`
 * Getting the function item of an existing (built-in or user-defined) XQuery function. The arity (number of arguments) has to be specified as there can be more than one function with the same name: 
 * **Result:**`25`
 * _Partially applying_  another function or function item. This is done by supplying only some of the required arguments, writing the placeholder `?` in the positions of the arguments left out. The produced function item has one argument for every placeholder. 
 * **Result:**`foo bar`

Function items can also be passed as arguments to and returned as results from functions. These so-called [Higher-Order Functions](Higher-Order Functions.md) like `fn:map` and `fn:fold-left` are discussed in more depth on their own Wiki page. 


## Expanded QNames

A _QName_ can now be directly prefixed with the letter "Q" and a namespace URI in the [Clark Notation](http://www.jclark.com/xml/xmlns.htm). 


**Examples:**

 * `Q{http://www.w3.org/2005/xpath-functions/math}pi()`  returns the number π 
 * `Q{java:java.io.FileOutputStream}new("output.txt")`  creates a new Java file output stream 

The syntax differed in older versions of the XQuery 3.0 specification, in which the prefixed namespace URI was quoted: 

 * `"http://www.w3.org/2005/xpath-functions/math":pi()`
 * `"java:java.io.FileOutputStream":new("output")`

## Namespace Constructors

New namespaces can now be created via so-called 'Computed Namespace Constructors'. 


    element node { namespace pref { 'http://url.org/' } }


## String Concatenations

Two vertical bars `||` (also named _pipe characters_) can be used to concatenate strings. This operator is a shortcut for the `fn:concat()` function. 


    'Hello' || '' || 'Universe'


## External Variables

Default values can now be attached to external variable declarations. This way, an expression can also be evaluated if its external variables have not been bound to a new value. 


    declare variable $user external
    := "admin";
    "User:", $user


## Serialization

[Serialization parameters](Serialization.md) can now be defined within XQuery expressions. Parameters are placed in the query prolog and need to be specified as option declarations, using the `output` prefix. 


**Example:**


    declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
    declare option output:omit-xml-declaration "no";
    declare option output:method "xhtml";
    <html/>


**Result:**`<?xml version="1.0" encoding="UTF-8"?><html></html>`


In BaseX, the `output` prefix is statically bound and can thus be omitted. Note that all namespaces need to be specified when using external APIs, such as [XQJ](http://xqj.net/basex/). 


## Context Item

The context item can now be specified in the prolog of an XQuery expression: 


**Example:**


    declare context item
    := document {
      <xml>
        <text>Hello</text>
        <text>World</text>
      </xml>
    };
    for $t in .//text()
    return string-length($t)


**Result:**`5 5`


## Annotations

XQuery 3.0 introduces annotations to declare properties associated with functions and variables. For instance, a function may be declared %public, %private, or %updating. 


**Example:**


    declare
    %private function local:max($x1, $x2) {
      if($x1 > $x2) then $x1 else $x2
    };
    local:max(2, 3)


Since Version 8.0 of BaseX, the following implementation-defined annotations are available: 

 * `%basex:inline([limit])`  enforces the inlining of a function. Example: 

**Example:**


    declare option db:inlinelimit '0';
    declare
    %basex:inline function local:id($x) { $x };
    local:id(123)


In this query, function inlining has been deactivated by setting [inlinelimit](Options.md#inlinelimit) to `0`. The annotation enforces inlining for the given function, though, resulting in the optimized query expression `123`. 


If an integer is specified as annotation argument, it will be interpreted a local inline limit. 

 * `%basex:lazy`  enforces the lazy evaluation of a global variable. Example: 

**Example:**


    declare
    %basex:lazy variable $january
    := doc('does-not-exist');
    if(month-from-date(current-date()) == 1) then $january else ()


The annotation ensures that an error will only be thrown if the condition yields true. Without the annotation, the error will always be thrown, because the referenced document is not found. 


## Functions

The following functions have been added in the [XQuery 3.0 Functions and Operators](http://www.w3.org/TR/xpath-functions-30/) Specification: 


`fn:analyze-string`* `fn:available-environment-variables`, `fn:element-with-id`, `fn:environment-variable`, `fn:filter`, `fn:fold-left`, `fn:fold-right`, `fn:format-date`, `fn:format-dateTime`, `fn:format-integer`, `fn:format-number`, `fn:format-time`, `fn:function-arity`, `fn:function-lookup`, `fn:function-name`, `fn:generate-id`, `fn:has-children`, `fn:head`, `fn:innermost`, `fn:map`, `fn:map-pairs`, `fn:outermost`, `fn:parse-xml`, `fn:parse-xml-fragment`, `fn:path`, `fn:serialize`, `fn:tail`, `fn:unparsed-text`, `fn:unparsed-text-available`, `fn:unparsed-text-lines`, `fn:uri-collection`


New signatures have been added for the following functions: 


`fn:document-uri`, `fn:string-join`, `fn:node-name`, `fn:round`, `fn:data`

 
# Changelog
** Version 8.0 **

 * Added: %basex:inline, %basex:lazy 
** Version 7.7 **

 * Added: [Enhanced FLWOR Expressions](XQuery 3.0.md#enhancedflwor-expressions)
** Version 7.3 **

 * Added: [Simple Map Operator](XQuery 3.0.md#simplemap-operator)
** Version 7.2 **

 * Added: [Annotations](XQuery 3.0.md#xquery3.0annotations)
 * Updated: [Expanded QNames](XQuery 3.0.md#expandedqnames)
** Version 7.1 **

 * Added: [Expanded QNames](XQuery 3.0.md#expandedqnames), [Namespace Constructors](XQuery 3.0.md#namespaceconstructors)
** Version 7.0 **

 * Added: [String Concatenations](XQuery 3.0.md#stringconcatenations)
