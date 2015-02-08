
# XQuery Errors
 


 
This article is part of the [XQuery Portal](XQuery.md). It summarizes all error codes that may be thrown by the BaseX XQuery processor. 

 
As the original specifications are rather bulky and meticulous, we tried our best to make this overview comprehensible to a wider range of readers. The following tables list the error codes that are known to BaseX, a short description, and examples of queries raising that errors. 

 
Original definitions of the error codes are found in the [XQuery 3.0](http://www.w3.org/TR/xquery-30/), [XQuery 3.0 Functions](http://www.w3.org/TR/xpath-functions-30/), [XQuery 1.0 Update](http://www.w3.org/TR/xquery-update-10/), [XQuery 1.0 Full Text](http://www.w3.org/TR/xpath-full-text-10/), and [EXPath HTTP](http://www.expath.org/spec/http-client) Specifications. 

 
## BaseX Errors

Error Codes: `BASX`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`BASX0000` |  Generic error, which is used for exceptions in [context-aware Java bindings](Java Bindings.md#Context-Awareness).  | 
`BASX0001` |  The current user has insufficient [permissions](User Management.md) to execute an expression.  | `file:delete('file.txt')`: _Create_ rights needed. 
`BASX0002` |  The specified database option is unknown.  | `declare option db:xyz "no"; 1`
`BASX0003` |  Errors related to [RESTXQ](RESTXQ.md).  | `%restxq:GET('x')`

Additional, module-specific error codes are listed in the descriptions of the query modules. 


### Static Errors

Error Codes: `XPST`, `XQST`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`XPST0003` | An error occurred while _parsing_ the query string (i.e., before the query could be compiled and executed). This error is the most common one, and may be accompanied by a variety of different error messages.  | `1+``for i in //* return $i`
`XPST0005` | An expression will never return any results, no matter what input is provided.  | `doc('input')/..`
`XPST0008` | A variable or type name is used that has not been defined in the current scope.  | `$a---``element(*, x)`
`XPST0017` |  • The specified function is unknown, or• it uses the wrong number of arguments.  | `unknown()``count(1,2,3)`
`XPST0051` |  An unknown QName is used in a _sequence type_ (e.g. in the target type of the `cast` expression).  | `1 instance of x``"test" cast as xs:itr`
`XPST0080` | `xs:NOTATION` or `xs:anyAtomicType` is used as target type of `cast` or `castable`.  | `1 castable as xs:NOTATION`
`XPST0081` |  • A QName uses a prefix that has not been bound to any namespace, or• a pragma or option declaration has not been prefixed.  | `unknown:x``(# pragma #) { 1 }`

`XQST0009` |  The query imports a schema (schema import is not supported by BaseX).  | `import schema "x"; ()`
`XQST0022` |  Namespace values must be constant strings.  | `<elem xmlns="{ 'dynamic' }"/>`
`XQST0031` |  The specified XQuery version is not specified.  | `xquery version "9.9"; ()`
`XQST0032` |  The base URI was declared more than once.  | `declare base-uri ...`
`XQST0033` |  A namespace prefix was declared more than once.  | `declare namespace a="a";declare namespace a="b"; ()`
`XQST0034` |  A function was declared more than once.  | `declare function local:a() { 1 };declare function local:a() { 2 }; local:a()`
`XQST0038` |  The default collation was declared more than once.  | `declare default collation ...`
`XQST0039` |  Two or more parameters in a user-defined function have the same name.  | `declare function local:fun($a, $a) { $a * $a };local:fun(1,2)`
`XQDY0040` |  Two or more attributes in an element have the same node name.  | `<elem a="1" a="12"/>`
`XQDY0045` |  A user-defined function uses a reserved namespace.  | `declare function fn:fun() { 1 }; ()`
`XQST0047` |  A module was defined more than once.  | `import module ...`
`XQST0048` |  A module declaration does not match the namespace of the specified module.  | `import module namespace invalid="uri"; 1`
`XQST0049` |  A global variable was declared more than once.  | `declare variable $a := 1;declare variable $a := 1; $a`
`XQST0054` |  A global variable depends on itself. This may be triggered by a circular variable definition.  | `declare variable $a := local:a();declare function local:a() { $a }; $a`
`XQST0055` |  The mode for copying namespaces was declared more than once.  | `declare copy-namespaces ...`
`XQST0057` |  The namespace of a schema import may not be empty.  | `import schema ""; ()`
`XQST0059` |  The schema or module with the specified namespace cannot be found or processed.  | `import module "unknown"; ()`
`XQST0060` |  A user-defined function has no namespace.  | `declare default function namespace "";declare function x() { 1 }; 1`
`XQST0065` |  The ordering mode was declared more than once.  | `declare ordering ...`
`XQST0065` |  The default namespace mode for elements or functions was declared more than once.  | `declare default element namespace ...`
`XQST0067` |  The construction mode was declared more than once.  | `declare construction ...`
`XQST0068` |  The mode for handling boundary spaces was declared more than once.  | `declare boundary-space ...`
`XQST0069` |  The default order for empty sequences was declared more than once.  | `declare default order empty ...`
`XQST0070` |  A namespace declaration overwrites a reserved namespace.  | `declare namespace xml=""; ()`
`XQST0071` |  A namespace is declared more than once in an element constructor.  | `<a xmlns="uri1" xmlns="uri2"/>`
`XQST0075` |  The query contains a validate expression (validation is not supported by BaseX).  | `validate strict { () }`
`XQST0076` |  A `group by` or `order by` clause specifies an unknown collation.  | `for $i in 1 to 10order by $i collation "unknown"return $i`
`XQST0079` |  A pragma was specified without the expression that is to be evaluated.  | `(# xml:a #) {}`
`XQST0085` |  An empty namespace URI was specified.  | `<pref:elem xmlns:pref=""/>`
`XQST0087` |  An unknown encoding was specified. Note that the encoding declaration is currently ignored in BaseX.  | `xquery version "1.0" encoding "a b"; ()`
`XQST0088` |  An empty module namespace was specified.  | `import module ""; ()`
`XQST0089` |  Two variables in a `for` or `let` clause have the same name.  | `for $a at $a in 1 return $i`
`XQST0090` |  A character reference specifies an invalid character.  | `"&#0;"`
`XQST0093` |  A module depends on itself. This may be triggered by a circular module definition.  | `import module ...`
`XQST0094` | `group by` references a variable that has not been declared before.  | `for $a in 1 group by $b return $a`
`XQST0097` |  A `decimal-format` property is invalid.  | `declare default decimal-format digit = "xxx"; 1`
`XQST0098` |  A single `decimal-format` character was assigned to multiple properties.  | `declare default decimal-format digit = "%"; 1`
`XQST0099` |  The context item was declared more than once.  | `declare context item ...`
`XQST0106` |  An annotation has been declared twice in a variable or function declaration.  | `declare %updating %updating function ...`
`XQST0108` |  Output declarations may only be specified in the main module.  | Module: `declare output ...`
`XQST0109` |  The specified serialization parameter is unknown.  | `declare option output:unknown "..."; 1`
`XQST0110` |  A serialization parameter was specified more than once in the output declarations.  | `declare option output:indent "no";declare option output:indent "no"; 1`
`XQST0111` |  A decimal format was declared more than once.  | `declare decimal-format ...`
`XQST0113` |  Context item values may only be in the main module.  | Module: `declare context item := 1;`
`XQST0114` |  A decimal-format property has been specified more than once.  | `declare decimal-format EN NaN="!" NaN="?"; ()`

### Type Errors

Error Codes: `XPTY`, `XQTY`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`XPTY0004` |  This error is raised if an expression has the wrong type, or cannot be cast into the specified type. It may be raised both statically (during query compilation) or dynamically (at runtime).  | `1 + "A"``abs("a")``1 cast as xs:gYear`
`XPTY0018` |  The result of the last step in a path expression contains both nodes and atomic values.  | `doc('input.xml')/(*, 1)`
`XPTY0019` |  The result of a step (other than the last step) in a path expression contains an atomic values.  | `(1 to 10)/*`

`XQTY0024` |  An attribute node cannot be bound to its parent element, as other nodes of a different type were specified before.  | `<elem>text { attribute a { "val" } }</elem>`
`XQTY0105` |  A function item has been specified as content of an element.  | `<X>{ false#0 }</X>`

### Dynamic Errors

Error Codes: `XPDY`, `XQDY`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`XPDY0002` |  • No value has been defined for an external variable, or• no context item has been set before the query was executed.  | `declare variable $x external; $x``descendant::*`
`XPDY0050` |  • The operand type of a `treat` expression does not match the type of the argument, or• the root of the context item must be a document node.  | `"string" treat as xs:int``"string"[/]`

`XQDY0025` |  Two or more attributes in a constructed element have the same node name.  | `element x { attribute a { "" } attribute a { "" } }`
`XQDY0026` |  The content of a computed processing instruction contains "?>".  | `processing-instruction pi { "?>" }`
`XQDY0041` |  The name of a processing instruction is invalid.  | `processing-instruction { "1" } { "" }`
`XQDY0044` |  The node name of an attribute uses reserved prefixes or namespaces.  | `attribute xmlns { "etc" }`
`XQDY0064` |  The name of a processing instruction equals "XML" (case insensitive).  | `processing-instruction xml { "etc" }`
`XQDY0072` |  The content of a computed comment contains "--" or ends with "-".  | `comment { "one -- two" }`
`XQDY0074` |  The name of a computed attribute or element is invalid, or uses an unbound prefix.  | `element { "x y" } { "" }`
`XQDY0095` |  A sequence with more than one item was bound to a `group by` clause.  | `let $a := (1,2) group by $a return $a`
`XQDY0096` |  The node name of an element uses reserved prefixes or namespaces.  | `element { QName("uri", "xml:n") } {}`
`XQDY0101` |  Invalid namespace declaration.  | `namespace xmlns { 'x' }`
`XQDY0102` |  Duplicate namespace declaration.  | `element x { namespace a {'b'}, namespace a {'c'} }`

### Functions Errors

Error Codes: `FOAR`, `FOCA`, `FOCH`, `FODC`, `FODF`, `FODT`, `FOER`, `FOFD`, `FONS`, `FORG`, `FORX`, `FOTY`, `FOUT`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`FOAR0001` |  A value was divided by zero.  | `1 div 0`
`FOAR0002` |  A numeric declaration or operation causes an over- or underflow.  | `12345678901234567890``xs:double("-INF") idiv 1`

`FOCA0002` |  • A float number cannot be converted to a decimal or integer value, or• a function argument cannot be converted to a valid QName.  | `xs:int(xs:double("INF"))``QName("", "el em")`
`FOCA0003` |  A value is too large to be represented as integer.  | `xs:integer(99e100)`
`FOCA0005` | `"NaN"` is supplied to duration operations.  | `xs:yearMonthDuration("P1Y") * xs:double("NaN")`

`FOCH0001` |  A codepoint was specified that does not represent a valid XML character.  | `codepoints-to-string(0)`
`FOCH0002` |  A unsupported collation was specified in a function.  | `compare('a', 'a', 'unknown')`
`FOCH0003` |  A unsupported normalization form was specified in a function.  | `normalize-unicode('a', 'unknown')`

`FODC0001` |  The argument specified in `fn:id()` or `fn:idref()` must have a document node as root.  | `id("id0", <xml/>)`
`FODC0002` |  The specified document resource cannot be retrieved.  | `doc("unknown.xml")`
`FODC0004` |  The specified collection cannot be retrieved.  | `collection("unknown")`
`FODC0005` |  The specified URI to a document resource is invalid.  | `doc("<xml/>")`
`FODC0006` |  The string passed to `fn:parse-xml()` is not well-formed.  | `parse-xml("<x/")`
`FODC0007` |  The base URI passed to `fn:parse-xml()` is invalid.  | `parse-xml("<x/>", ":")`

`FODF1280` |  The name of the decimal format passed to `fn:format-number()` is invalid.  | `format-number(1, "0", "invalid")`
`FODF1310` |  The picture string passed to `fn:format-number()` is invalid.  | `format-number(1, "invalid")`

`FODT0001` |  An arithmetic duration operation causes an over- or underflow.  | `xs:date('2000-01-01') + xs:duration('P99999Y')`
`FODT0002` |  A duration declaration or operation causes an over- or underflow.  | `implicit-timezone() div 0`
`FODT0003` |  An invalid timezone was specified.  | `adjust-time-to-timezone(xs:time("01:01:01"), xs:dayTimeDuration("PT20H"))`

`FOER0000` |  Error triggered by the `fn:error()` function.  | `error()`

`FOFD1340` |  The picture string passed to `fn:format-date()`, `fn:format-time()` or `fn:format-dateTime()` is invalid.  | `format-date(current-date(), "[]")`
`FOFD1350` |  The picture string passed to `fn:format-date()`, `fn:format-time()` or `fn:format-dateTime()` specifies an non-available component.  | `format-time(current-time(), "[Y2]")`

`FONS0004` |  A function has a QName as argument that specifies an unbound prefix.  | `resolve-QName("x:e", <e/>)`

`FORG0001` |  A value cannot be cast to the required target type.  | `xs:integer("A")``1 + <x>a</x>`
`FORG0002` |  The URI passed to `fn:resolve-URI()` is invalid.  | `resolve-URI(":")`
`FORG0003` | `fn:zero-or-one()` was called with more than one item.  | `zero-or-one((1, 2))`
`FORG0004` | `fn:one-or-more()` was called with zero items.  | `one-or-more(())`
`FORG0005` | `fn:exactly-one()` was called with zero or more than one item.  | `exactly-one((1, 2))`
`FORG0006` |  A wrong argument type was specified in a function call.  | `sum((1, "string"))`
`FORG0008` |  The arguments passed to `fn:dateTime()` have different timezones.  | `dateTime(xs:date("2001-01-01+01:01"), current-time())`

`FORX0001` |  A function specifies an invalid regular expression flag.  | `matches('input', 'query', 'invalid')`
`FORX0002` |  A function specifies an invalid regular expression.  | `matches('input', '[')`
`FORX0003` |  A regular expression matches an empty string.  | `tokenize('input', '.?')`
`FORX0004` |  The replacement string of a regular expression is invalid.  | `replace("input", "match", "\")`

`FOTY0012` |  An item has no typed value.  | `count#1`
`FOTY0013` |  Functions items cannot be atomized, have no defined equality, and have no string representation.  | `data(false#0)`
`FOTY0014` |  Function items have no string representation.  | `string(map {})`
`FOTY0015` |  Function items cannot be compared.  | `deep-equal(false#0, true#0)`

`FOUT1170` |  Function argument cannot be used to retrieve a text resource.  | `unparsed-text(':')`
`FOUT1190` |  Encoding to retrieve a text resource is invalid or not supported.  | `unparsed-text('file.txt', 'InvalidEncoding')`

### Serialization Errors

Error Codes: `SEPM`, `SERE`, `SESU`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`SESU0007` |  The specified encoding is not supported.  | `declare option output:encoding "xyz"; 1`
`SEPM0009` | `omit-xml-declaration` is set to `yes`, and `standalone` has a value other than `omit`.  | 
`SEPM0010` | `method` is set to `xml`, `undeclare-prefixes` is set to `yes`, and `version` is set to `1.0`.  | 
`SERE0014` | `method` is set to `html`, and an invalid HTML character is found.  | 
`SERE0015` | `method` is set to `html`, and a closing bracket (>) appears inside a processing instruction.  | 
`SEPM0016` |  A specified parameter is unknown or has an invalid value.  | `declare option output:indent "nope"; 1` | 

### Update Errors

Error Codes: `FOUP`, `XUDY`, `XUST`, `XUTY`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`FOUP0001` |  The first argument of `fn:put()` must be a document node or element.  | `fn:put(text { 1 }, 'file.txt')`
`FOUP0002` |  The second argument of `fn:put()` is not a valid URI.  | `fn:put(<a/>, '//')`

`XUDY0009` |  The target node of a replace expression needs a parent in order to be replaced.  | `replace node <target/> with <new/>`
`XUDY0014` |  The expression updated by the `modify` clause was not created by the `copy` clause.  | `let $a := doc('a') return copy $b := $a modify delete node $a/* return $b`
`XUDY0015` |  In a `rename` expression, a target is renamed more than once.  | `let $a := <xml/> return (rename node $a as 'a', rename node $a as 'b')`
`XUDY0016` |  In a `replace` expression, a target is replaced more than once.  | `let $a := <x>x</x>/node() return (replace node $a with <a/>, replace node $a with <b/>)`
`XUDY0017` |  In a `replace value of` expression, a target is replaced more than once.  | `let $a := <x/> return (replace value of node $a with 'a', replace value of node $a with 'a')`
`XUDY0021` |  The resulting update expression contains duplicate attributes.  | `copy $c := <x a='a'/> modify insert node attribute a {""} into $c return $c`
`XUDY0023` |  The resulting update expression conflicts with existing namespaces.  | `rename node <a:ns xmlns:a='uri'/> as QName('URI', 'a:ns')`
`XUDY0024` |  New namespaces conflict with each other.  | `copy $n := <x/> modify (insert node attribute { QName('uri1', 'a') } { "" } into $n, insert node attribute { QName('uri2', 'a') } { "" } into $n) return $n`
`XUDY0027` |  Target of an update expression is an empty sequence.  | `insert node <x/> into ()`
`XUDY0029` |  The target of an update expression has no parent node.  | `insert node <new/> before <target/>`
`XUDY0030` |  Attributes cannot be inserted before or after the child of a document node.  | `insert node <e a='a'/>/@a after document { <e/> }/*`
`XUDY0031` |  Multiple calls to `fn:put()` address the same URI.  | `for $i in 1 to 3 return put(<a/>, 'file.txt')`

`XUST0001` |  No updating expression is allowed here.  | `delete node /, "finished."`
`XUST0002` |  An updating expression is expected in the `modify` clause or an updating function.  | `copy $a := <x/> modify 1 return $a`
`XUST0003` |  The revalidation mode was declared more than once.  | `declare revalidation ...`
`XUST0026` |  The query contains a revalidate expression (revalidation is not supported by BaseX).  | `declare revalidation ...`
`XUST0028` |  no return type may be specified in an updating function.  | `declare updating function local:x() as item() { () }; ()`

`XUTY0004` |  New attributes to be inserted must directly follow the root node.  | `insert node (<a/>, attribute a {""}) into <a/>`
`XUTY0005` |  A single element or document node is expected as target of an `insert` expression.  | `insert node <new/> into attribute a { "" }`
`XUTY0006` |  A single element, text, comment or processing instruction is expected as target of an `insert before/after` expression.  | `insert node <new/> after attribute a { "" }`
`XUTY0007` |  Only nodes can be deleted.  | `delete node "string"`
`XUTY0008` |  A single element, text, attribute, comment or processing instruction is expected as target of a `replace` expression.  | `replace node document { <a/> } with <b/>`
`XUTY0010` |  In a `replace` expression, in which no attributes are targeted, the replacing nodes must not be attributes as well.  | `replace node <a><b/></a>/b with attribute size { 1 }`
`XUTY0011` |  In the `replace` expression, in which attributes are targeted, the replacing nodes must be attributes as well.  | `replace node <e a=""/>/@a with <a/>`
`XUTY0012` |  In a `rename` expression, the target nodes must be an element, attribute or processing instruction.  | `rename node text { 1 } as <x/>`
`XUTY0013` |  An expression in the `copy` clause must return a single node.  | `copy $c := (<a/>, <b/>) modify () return $c`
`XUTY0022` |  An attribute must not be inserted into a document node.  | `insert node <e a=""/>/@a into document {'a'}`

### Full-Text Errors

Error Codes: `FTDY`, `FTST`


**Code ** | **Description ** | Examples 
--------- | ---------------- | ---------
`FTDY0016` |  The specified weight value is out of range.  | `'a' contains text 'a' weight { 1001 }`
`FTDY0017` |  The `not in` operator contains a _string exclude_.  | `'a' contains text 'a' not in (ftnot 'a')`
`FTDY0020` |  The search term uses an invalid wildcard syntax.  | `'a' contains text '.{}' using wildcards`

`FTST0007` |  The full-text expression contains an ignore option (the `ignore option` is not supported by BaseX).  | `'a' contains text 'a' without content 'x'`
`FTST0008` |  The specified stop word file could not be opened or processed.  | `'a' contains text 'a' using stop words at 'unknown.txt'`
`FTST0009` |  The specified language is not supported.  | `'a' contains text 'a' using language 'aaa'`
`FTST0018` |  The specified thesaurus file could not be opened or processed.  | `'a' contains text 'a' using thesaurus at 'aaa'`
`FTST0019` |  A match option was specified more than once.  | `'a' contains text 'a' using stemming using stemming`
