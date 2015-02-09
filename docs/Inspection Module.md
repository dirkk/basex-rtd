
# Inspection Module
 


 
This [XQuery Module](Module Library.md) contains functions for extracting internal information about modules and functions and generating documentation. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/inspect` namespace, which is statically bound to the `inspect` prefix. xqDoc document instances are assigned to the `http://www.xqdoc.org/1.0` namespace, which is statically bound to the `xqdoc` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Reflection

### inspect:functions

Updated with Version 7.9: a query URI can now be specified. 


`inspect:functions() as function(*)*`
`inspect:functions($uri as xs:string) as function(*)*`

Returns function items for all user-defined functions (both public and private) that are known in the current query context. If a `$uri` is specified, the addressed file will be compiled, its functions will be added to the query context and returned to the user. 

**Examples**

Invokes the declared functions and returns its values: 
    declare %private function local:one() { 12 };
    declare %private function local:two() { 34 };
    for $f in inspect:functions() return $f()

 Compiles all functions in `code.xqm` and invokes the function named `run`: 
 
## Documentation

### inspect:function

`inspect:function($function as function(*)) as element(function)`

Inspects the specified `$function` and returns an element that describes its structure. The output of this function is similar to eXist-db’s [inspect:inspect-function](http://exist-db.org/exist/apps/fundocs/view.html?uri=http://exist-db.org/xquery/inspection&location=java:org.exist.xquery.functions.inspect.InspectionModule) function. 

**Examples**

The query `inspect:function(count#1)` yields: 
    <function name="count" uri="http://www.w3.org/2005/xpath-functions">
      <argument type="item()" occurrence="*"/>
      <return type="xs:integer"/>
    </function>

 The function… …is represented by `inspect:function(local:same#1)` as… 

### inspect:context

`inspect:context() as element(context)`

Generates an element that describes all variables and functions in the current query context. 

**Examples**

Evaluate all user-defined functions with zero arguments in the query context: 
    inspect:context()/function ! function-lookup(QName(@uri, @name), 0) ! .()

 Return the names of all private functions in the current context: 

### inspect:module

`inspect:module($input as xs:string) as element(module)`

Retrieves the string from the specified `$input`, parses it as XQuery module, and generates an element that dscribes its structure. 

**Errors**

`FODC0002`: the addressed resource cannot be retrieved. 
**Examples**

An example is [shown below](Inspection Module.md#Inspection_ModuleExamples). 

### inspect:xqdoc

`inspect:xqdoc($input as xs:string) as element(xqdoc:xqdoc)`

Retrieves the string from the specified `$input`, parses it as XQuery module, and generates an xqDoc element.[xqDoc](http://xqdoc.org) provides a simple vendor neutral solution for generating a documentation from XQuery modules. The documentation conventions have been inspired by the JavaDoc standard. Documentation comments begin with `(:~` and end with `:)`, and tags start with `@`. xqDoc comments can be specified for main and library modules and variable and function declarations.  We have slightly extended the xqDoc conventions to do justice to the current status of XQuery (Schema: [xqdoc-1.1.30052013.xsd](http://files.basex.org/etc/xqdoc-1.1.30052013.xsd)): 

**Errors**

`FODC0002`: the addressed resource cannot be retrieved. 
**Examples**

An example is [shown below](Inspection Module.md#Inspection_ModuleExamples). 
 
## Examples

This is the `sample.xqm` library module: 


    (:~ 
     : This module provides some sample functions to demonstrate
     : the features of the Inspection Module.
     :
     : @author   BaseX Team
     : @see      http://docs.basex.org/wiki/XQDoc_Module
     : @version  1.0
     :)
    module namespace samples = 'http://basex.org/modules/samples';
    (:~ This is a sample string. :)
    declare variable $samples:test-string as xs:string := 'this is a string';
    (:~
     : This function simply returns the specified integer.
     : @param   $number number to return
     : @return  specified number
     :)
    declare %private function samples:same($number as xs:integer) as xs:integer {
      $number
    };


If `inspect:module('sample.xqm')` is run, the following output will be generated: 


    <module prefix="samples" uri="http://basex.org/modules/samples">
      <description>This module provides some sample functions to demonstrate
    the features of the Inspection Module.</description>
      <author>BaseX Team</author>
      <see>http://docs.basex.org/wiki/XQDoc_Module</see>
      <version>1.0</version>
      <variable name="samples:test-string" uri="http://basex.org/modules/samples" type="xs:string">
        <description>This is a sample string.</description>
      </variable>
      <function name="samples:same" uri="http://basex.org/modules/samples">
        <argument name="number" type="xs:integer">number to return</argument>
        <annotation name="private" uri="http://www.w3.org/2012/xquery"/>
        <description>This function simply returns the specified integer.</description>
        <return type="xs:integer">specified number</return>
      </function>
    </module>


The output looks as follows if `inspect:xqdoc('sample.xqm')` is called: 


    <xqdoc:xqdoc xmlns:xqdoc="http://www.xqdoc.org/1.0">
      <xqdoc:control>
        <xqdoc:date>2013-06-01T16:59:33.654+02:00</xqdoc:date>
        <xqdoc:version>1.1</xqdoc:version>
      </xqdoc:control>
      <xqdoc:module type="library">
        <xqdoc:uri>http://basex.org/modules/samples</xqdoc:uri>
        <xqdoc:name>sample.xqm</xqdoc:name>
        <xqdoc:comment>
          <xqdoc:description>This module provides some sample functions to demonstrate
    the features of the Inspection Module.</xqdoc:description>
          <xqdoc:author>BaseX Team</xqdoc:author>
          <xqdoc:see>http://docs.basex.org/wiki/XQDoc_Module</xqdoc:see>
          <xqdoc:version>1.0</xqdoc:version>
        </xqdoc:comment>
      </xqdoc:module>
      <xqdoc:namespaces>
        <xqdoc:namespace prefix="samples" uri="http://basex.org/modules/samples"/>
      </xqdoc:namespaces>
      <xqdoc:imports/>
      <xqdoc:variables>
        <xqdoc:variable>
          <xqdoc:name>samples:test-string</xqdoc:name>
          <xqdoc:comment>
            <xqdoc:description>This is a sample string.</xqdoc:description>
          </xqdoc:comment>
          <xqdoc:type>xs:string</xqdoc:type>
        </xqdoc:variable>
      </xqdoc:variables>
      <xqdoc:functions>
        <xqdoc:function arity="1">
          <xqdoc:comment>
            <xqdoc:description>This function simply returns the specified integer.</xqdoc:description>
            <xqdoc:param>$number number to return</xqdoc:param>
            <xqdoc:return>specified number</xqdoc:return>
          </xqdoc:comment>
          <xqdoc:name>samples:same</xqdoc:name>
          <xqdoc:annotations>
            <xqdoc:annotation name="private"/>
          </xqdoc:annotations>
          <xqdoc:signature>declare %private function samples:same($number as xs:integer) as xs:integer</xqdoc:signature>
          <xqdoc:parameters>
            <xqdoc:parameter>
              <xqdoc:name>number</xqdoc:name>
              <xqdoc:type>xs:integer</xqdoc:type>
            </xqdoc:parameter>
          </xqdoc:parameters>
          <xqdoc:return>
            <xqdoc:type>xs:integer</xqdoc:type>
          </xqdoc:return>
        </xqdoc:function>
      </xqdoc:functions>
    </xqdoc:xqdoc>

 
## Changelog
** Version 7.9 **

 * Updated: a query URI can now be specified with [inspect:functions](Inspection Module.md#inspect-functions). 

This module was introduced with Version 7.7. 

