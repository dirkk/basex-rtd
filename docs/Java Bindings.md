
# Java Bindings
 


 
This article is part of the [XQuery Portal](XQuery.md). It demonstrates two ways to invoke Java code from XQuery and an extension to make Java code aware of the current context. 

 
The Java Binding feature is an extensibility mechanism which enables developers to directly access Java variables and execute code from XQuery. Java classes are identified by namespaces. The namespace URI must simply contain the fully qualified class name. The URI can optionally be prefixed with the string `java:` to enforce that the addressed code is written in Java. 

 
If the addressed Java code is not found in the classpath, it first needs to be installed in the [Repository](Repository.md). 

 
## Namespace Declarations

Java classes can be declared via namespaces. The namespace can then be used to call static functions contained in that class. Variables are represented as function with 0 parameters. 


The following example uses Java’s `Math` class to return the cosine of an angle by calling the static method `cos()`, and the value of π by addressing the static variable via `PI()`: 


    declare namespace math = "java:java.lang.Math";
    math:cos(xs:double(0)), math:PI()


The new [Expanded QName](XQuery 3.0.md#Expanded_QNames) notation of XQuery 3.0 allows you to directly specify a namespace URI instead of the prefix: 


    Q{java:java.lang.Math}cos(xs:double(0))


The constructor of a class can be invoked by calling the virtual function `new()`. Instance methods can then called by passing on the resulting Java object as first argument. 


In the following example, 256 bytes are written to the file `output.txt`. First, a new `FileWriter` instance is created, and its `write()` function is called in the next step. The `java:` prefix is omitted in the URI: 


    declare namespace fw = "java.io.FileWriter";
    let $file
    := fw:new('output.txt')
    return (
      for $i in 0 to 255
      return fw:write($file, xs:int($i)),
      fw:close($file)
    )


Function names with dashes will be rewritten to Java’s camel case notation: 


    XQuery: get-contents($x as xs:string) 
    Java 
    : getContents(String x)


Strings with invalid XML characters will be rejected by default. The validity check can be disabled by setting the [CHECKSTRINGS](Options.md#CHECKSTRINGS) option to false. The following query writes a file with a single 00-byte, which will then be successfully read via Java functions: 


    declare namespace br = 'java.io.BufferedReader';
    declare namespace fr = 'java.io.FileReader';
    declare option db:checkstrings 'false';
    file:write-binary('00.bin', xs:hexBinary('00')),
    br:new(fr:new('00.bin'))
    ! (br:readLine(.), br:close(.))


Note that Java code cannot be pre-compiled, and will often be evaluated slower than optimized XQuery code. 

 
## Module Imports

Java code can also be integrated by _importing_ classes as modules. A new instance of the addressed class is created, which can then be accessed in the query body. 


An example (the boolean values returned by `set:add()` are ignored): 


    import module namespace set = "java.util.HashSet";
    let $loop
    := (
      set:add("check"),
      set:add("what"),
      set:add("happens")
    )
    return set:size()


Advantages of this approach are: 

 * imported code can be executed faster than instances created at runtime via `new()`. 
 * the work on class instances ensures that queries run in parallel will not cause any concurrency issues (provided that the class contains no static variables or functions). 

A drawback is that no arguments can be passed on to the class constructor. As a consequence, the addressed class must provide a constructor with no arguments. 

 
## Context-Awareness

Java classes can be coupled more closely to the BaseX core library. If a class inherits the abstract [QueryModule](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/query/QueryModule.java) class, the two variables [queryContext](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/query/QueryContext.java) and [staticContext](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/query/StaticContext.java) get available, which provide access to the global and static context of a query. Additionally, the default properties of functions can be changed via annotations: 

 * Java functions can only be executed by users with [Admin permissions](User Management.md). You may annotate a function with `@Requires(<Permission>)` to also make it accessible to users with less privileges. 
 * Java code is treated as _non-deterministic_, as its behavior cannot be predicted by the XQuery processor. You may annotate a function as `@Deterministic` if you know that it will have no side-effects and will always yield the same result. 
 * Java code is treated as _context-independent_. If a function accesses the query context, it should be annotated as `@ContextDependent`
 * Java code is treated as _focus-independent_. If a function accesses the current context item, position or size, it should be annotated as `@FocusDependent`

Since Version 8.0, the [QueryResource](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/query/QueryResource.java) interface can be implemented to finalize opened connections or resources in a module. Its `close()` method will be called after the query has been fully evaluated. 


The following XQuery code invokes two Java methods. The first Java function retrieves information from the static query context, and the second one throws a query exception: 


    import module namespace context = 'org.basex.examples.query.ContextModule';
    element user {
      context:user()
    },
    element to-int {
      try { context:to-int('abc') }
      catch * { 'Error in line', $err:line-number }
    }


The imported Java class is shown below: 


    package org.basex.examples.query;
    import org.basex.query.*;
    import org.basex.query.value.item.*;
    import org.basex.util.*;
    /**
     * This example inherits the {@link QueryModule} class and
     * implements the QueryResource interface.
     */
    public class ContextModule extends QueryModule implements QueryResource {
      /**
       * Returns the name of the logged in user.
       * @return user
       */
      @Requires(Permission.NONE)
      @Deterministic
      @ContextDependent
      public String user() {
        return queryContext.context.user.name;
      }
      /**
       * Converts the specified string to an integer.
       * @param value string representation
       * @return integer
       * @throws QueryException query exception
       */
      @Requires(Permission.NONE)
      @Deterministic
      public int toInt(final String value) throws QueryException {
        try {
          return Integer.parseInt(value);
        } catch(NumberFormatException ex) {
          throw new QueryException(ex.getMessage());
        }
      }
      @Override
      public void close() {
        // see description above
      }
    }


The result will look as follows: 


    <user>admin</admin>
    <to-int>Error in line 6</to-int>


Please visit the XQuery 3.0 specification if you want to get more insight into [function properties](http://www.w3.org/TR/xpath-functions-30/#properties-of-functions). 

 
## Locking

By default, a Java function will be executed in parallel with other code. However, if a Java function performs sensitive write operations, it is advisable to explicitly lock the code. This can be realized via locking annotations: 


      @Lock(write = { "HEAVYIO" })
      public void write() {
        // ...
      }
      @Lock(read = { "HEAVYIO" })
      public void read() {
        // ...
      }


If an XQuery expression is run which calls the Java `write()` function, every other query that calls `write()` or `read()` needs to wait for the query to be finished. If a query calls the `read()` function, only those queries are queued that call `write()`, because this function is only annotated with a `read` lock. More details on parallel query execution can be found in the article on [Transaction Management](Transaction Management.md). 

 
## Changelog
** Version 8.0 **

 * Added: `QueryResource` interface, called after a query has been fully evaluated. 
** Version 7.8 **

 * Added: Java locking annotations 
 * Updated: `context` variable has been split into `queryContext` and `staticContext`. 
** Version 7.2.1 **

 * Added: import of Java modules, context awareness 
