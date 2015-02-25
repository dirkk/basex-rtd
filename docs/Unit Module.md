 


 
This [XQuery Module](Module Library.md) contains annotations and functions for performing XQUnit tests. 

 
With Version 7.9, the unit testing functionality has been further stabilized: 

  * Tests are now started with a [TEST](Commands.md#test) command. 
 * Tests can also be executed from the BaseX GUI. 
 * XQUnit functions can now contain updating functions.  
 
# Introduction

The more complex a software application grows, the more error-prone it gets. This is why testing frameworks have been developed, which provide a standardized, automatized way for testing software. The [XUnit](http://en.wikipedia.org/wiki/XUnit) frameworks (such as SUnit or JUnit) allow testing of atomic unit of a program, such as single functions and algorithms. 


This module borrows heavily from the existing frameworks: it provides various annotations for testing XQuery functions. Unit functions are provided to assert the validity of arbitrary conditions expressed in XQuery and to raise errors whenever a condition is not satisfied. Some additional functions exist to run all unit tests of the current module or a set of specified library modules. 

 
# Usage

Tests are not started from within XQuery anymore. Instead, a [TEST](Commands.md#test) command is now available, which compiles all XQuery modules in a given file or directory and runs all functions that are annotated with `%unit:test`. A test report is generated and returned, which resembles the format returned by other xUnit testing frameworks, such as the Maven Surefire Plugin ([see below](Unit Module.md#result)). 

 
# Conventions

All annotations, functions and errors in this module are assigned to the `http://basex.org/modules/unit` namespace, which is statically bound to the `unit` prefix. 

 
# Annotations

## %unit:test

**Syntax** | `%unit:test``%unit:test("expected", <ERROR>)`
---------- | ---------------------------------------------
**Summary** | With this annotation, a function can be marked as unit test. It will be evaluated whenever a test report is created for the module in which this function is located.If an optional error code is specified and if the function expression does not raise that error, the test will fail. 

## %unit:before

Updated with Version 8.0: filter argument added. 


**Syntax** | `%unit:before``%unit:before(<FUNCTION>)`
---------- | ----------------------------------------
**Summary** | A function decorated with this annotation will be evaluated **before each** unit test. If a function name is specified as argument, it will only be evaluated before that function. 

## %unit:after

Updated with Version 8.0: filter argument added. 


**Syntax** | `%unit:after``%unit:after(<FUNCTION>)`
---------- | --------------------------------------
**Summary** | A function decorated with this annotation will be evaluated **after each** unit test. If a function name is specified as argument, it will only be evaluated before that function. 

## %unit:before-module

**Syntax** | `%unit:before-module`
---------- | ---------------------
**Summary** | If a function is decorated with this annotation, it will be evaluated **before all** unit tests in the current module. 

## %unit:after-module

**Syntax** | `%unit:after-module`
---------- | --------------------
**Summary** | If a function is decorated with this annotation, it will be evaluated **after all** unit tests in the current module. 

## %unit:ignore

**Syntax** | `%unit:ignore``%unit:ignore(<MESSAGE>)`
---------- | ---------------------------------------
**Summary** | If a function is decorated with this annotation, it will temporarily be ignored by the test suite runner. 
 
# Functions

Updated with Version 8.0: failure argument can now be an arbitrary item. 


## unit:assert

unit:assert($test as item()*) as empty-sequence()
unit:assert($test as item()*, $info as item()) as empty-sequence()

:   Asserts that the effective boolean value of the specified `$test` is true and returns an empty sequence. Otherwise, raises an error. The _effective boolean value_ of an expression can be explicitly computed by using the `fn:boolean` function.The default failure message can be overridden with the `$info` argument. 

    **Errors**


    `UNIT0001`: the assertion failed, or an error was raised. 


## unit:assert-equals

unit:assert-equals($returned as item()*, $expected as item()*) as empty-sequence()
unit:assert-equals($returned as item()*, $expected as item()*, $info as item()) as empty-sequence()

:   Asserts that the specified arguments are equal according to the rules of the `fn:deep-equals` function. Otherwise, raises an error.The default failure message can be overridden with the `$info` argument. 

    **Errors**


    `UNIT0001`: the assertion failed, or an error was raised. 


## unit:fail

Updated with Version 8.0: 0-argument signature adeded. 


unit:fail() as empty-sequence()
unit:fail($info as item()) as empty-sequence()

:   Raises a unit error. The default failure message can be overridden with the `$info` argument. 

    **Errors**


    `UNIT0001`: default error raised by this function. 

 
# Example

The following XQUnit module `tests.xqm` contains all available unit annotations: 


## Query

    module namespace test = 'http://basex.org/modules/xqunit-tests';
    (:~ Initializing function, which is called once before all tests.
    :)
    declare
    %unit:before-module function test:before-all-tests() {
      ()
    };
    (:~ Initializing function, which is called once after all tests.
    :)
    declare
    %unit:after-module function test:after-all-tests() {
      ()
    };
    (:~ Initializing function, which is called before each test.
    :)
    declare
    %unit:before function test:before() {
      ()
    };
    (:~ Initializing function, which is called after each test.
    :)
    declare
    %unit:after function test:after() {
      ()
    };
    (:~ Function demonstrating a successful test.
    :)
    declare
    %unit:test function test:assert-success() {
      unit:assert(<a/>)
    };
    (:~ Function demonstrating a failure using unit:assert.
    :)
    declare
    %unit:test function test:assert-failure() {
      unit:assert((), 'Empty sequence.')
    };
    (:~ Function demonstrating a failure using unit:assert-equals.
    :)
    declare
    %unit:test function test:assert-equals-failure() {
      unit:assert-equals(4 + 5, 6)
    };
    (:~ Function demonstrating an unexpected success.
    :)
    declare
    %unit:test("expected", "FORG0001") function test:unexpected-success() {
      ()
    };
    (:~ Function demonstrating an expected failure.
    :)
    declare
    %unit:test("expected", "FORG0001") function test:expected-failure() {
      1 + <a/>
    };
    (:~ Function demonstrating the creation of a failure.
    :)
    declare
    %unit:test function test:failure() {
      unit:fail("Failure!")
    };
    (:~ Function demonstrating an error.
    :)
    declare
    %unit:test function test:error() {
      1 + <a/>
    };
    (:~ Skipping a test.
    :)
    declare
    %unit:test
    %unit:ignore("Skipped!") function test:skipped() {
      ()
    };


By running `TEST tests.xqm`, the following report will be generated (timings may differ): 


## Result

    <testsuites time="PT0.256S">
      <testsuite name="file:///C:/Users/user/Desktop/test.xqm" time="PT0.212S" tests="8" failures="4" errors="1" skipped="1">
        <testcase name="assert-success" time="PT0.016S"/>
        <testcase name="assert-failure" time="PT0.005S">
          <failure line="30" column="15">
            <info>Empty sequence.</info>
          </failure>
        </testcase>
        <testcase name="assert-equals-failure" time="PT0.006S">
          <failure line="35" column="22">
            <returned item="1" type="xs:integer">9</returned>
            <expected item="1" type="xs:integer">6</expected>
            <info>Item 1: 6 expected, 9 returned.</info>
          </failure>
        </testcase>
        <testcase name="unexpected-success" time="PT0.006S">
          <failure>
            <expected>FORG0001</expected>
          </failure>
        </testcase>
        <testcase name="expected-failure" time="PT0.004S"/>
        <testcase name="failure" time="PT0.004S">
          <failure line="50" column="13">
            <info>Failure!</info>
          </failure>
        </testcase>
        <testcase name="error" time="PT0.004S">
          <error line="55" column="6" type="FORG0001">
            <info>Cannot cast to xs:double: "".</info>
          </error>
        </testcase>
        <testcase name="skipped" skipped="Skipped!" time="PT0S"/>
      </testsuite>
    </testsuites>

 
# Errors

**Code ** | Description 
--------- | ------------
`UNIT0001` | An assertion failed, or an error was raised. 
`UNIT0002` | A test function must have no arguments. 
`UNIT0003` | A test function is not public. 
`UNIT0004` | An annotation was declared twice. 
`UNIT0005` | An annotation has invalid arguments. 
 
# Changelog
** Version 8.0 **

 * Deleted: `UNIT0006` (ignore results returned by functions). 
 * Added: [unit:fail](Unit Module.md#unitfail), 0-argument signature. 
 * Updated: the info argument of functions can now be an arbitrary item. 
 * Updated: infos are now represented in an `info` child element. 
 * Updated: [unit:before](.md) and [unit:after](.md) can be extended by a filter argument. 
** Version 7.9 **

 * Added: TEST command 
 * Removed: [unit:test](.md), [unit:test-uris](.md)
** Version 7.8 **

 * Added: [unit:assert-equals](Unit Module.md#unitassert-equals)
 * Updated: enhanced test report output 

This module was introduced with Version 7.7. 

