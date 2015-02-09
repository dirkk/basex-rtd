
# Repository
 


 
This article is part of the [XQuery Portal](XQuery.md). It describes how external XQuery modules and Java code can be installed in the XQuery module repository, and how new packages are built and deployed. 

 
## Introduction

One of the reasons why languages such as Java or Perl have been so successful is the vast amount of libraries that are available to developers. As XQuery comes with only 150 pre-defined functions, which cannot meet all requirements, there is some need for additional library modules – such as [FunctX](http://www.xqueryfunctions.com/) – that extend the language with new features. 


BaseX offers the following mechanisms to make modules accessible to the XQuery processor: 

1. The default [Packaging](Repository.md#Packaging) mechanism will install single XQuery and Java modules in the repository. 
2. The [EXPath Packaging](Repository.md#EXPath_Packaging) system provides a generic mechanism for adding XQuery modules to query processors. A package is defined as a `.xar` archive, which encapsulates one or more extension libraries. 

### Importing Modules

Library modules can be imported with the `import module` statement, followed by a freely choosable prefix and the namespace of the target module. The specified location may be absolute or relative; in the latter case, it is resolved against the location (i.e., _static base URI_) of the calling module. Import module statements must be placed at the beginning of a module: 


**Main Module**`HelloUniverse.xq`: 


    import module namespace m = 'http://basex.org/modules/Hello' at 'HelloWorld.xqm';
    m:hello("Universe")


**Library Module**`HelloWorld.xqm` (in the same directory): 


    module namespace m = 'http://basex.org/modules/Hello';
    declare function m:hello($world) {
      'Hello ' || $world
    };


Repository modules are stored in a directory named `BaseXRepo` or `repo`, which resides in your [home directory](Configuration.md#Home_Directory). XQuery modules can be manually copied to the repository directory or installed and deleted via [commands](Repository.md#RepositoryCommands). 


If a modules is placed in the repository, there is no need to specify a location. The following example calls a function from the FunctX module: 


    import module namespace functx = 'http://www.functx.com';
    functx:capitalize-first('test')


### Commands

There are various ways to handle your packages: 

 * Execute BaseX REPO commands (listed below) 
 * Call XQuery functions of the [Repository Module](Repository Module.md)
 * Use the GUI (_Options_ → _Packages_) 

You can even manually add and remove packages in the repository directory; all changes will automatically be detected by the query processor. 


#### Installation

A module or package can be installed with the `REPO INSTALL` command. The path to the file has to be given as a parameter: 


    REPO INSTALL http://files.basex.org/modules/expath/functx-1.0.xar
    REPO INSTALL hello-world.xqm


The installation will only succeed if the specified file conforms to the constraints described below. If you know that your input is valid, you may as well copy the files directly to the repository directory, or edit its contents in the repository without deleting and reinstalling them. 


#### Listing

All currently installed packages can be listed with the `REPO LIST` command. It will return the names of all packages, their version, and the directory in which they are installed: 


    URI                    Version  Directory
    -------------------------------------------------------
    http://www.functx.com  1.0      http-www.functx.com-1.0
    1 package(s).


#### Removal

A package can be deleted with the command REPO DELETE and an additional argument, containing its name or the name suffixed with a hyphen and the package version: 


    REPO DELETE http://www.functx.com  ...or...
    REPO DELETE http://www.functx.com-1.0


### Packaging

#### XQuery

If an XQuery file is specified as input for the install command, it will be parsed as XQuery library module. If parsing was successful, the module URI will be [rewritten](Repository.md#URI_Rewriting) to a file path and attached with the `.xqm` file suffix, and the original file will be renamed and copied to that path into the repository. 


**Example:**


Installation (the original file will be copied to the `org/basex/modules/Hello.xqm` sub-directory of the repository): 


    REPO INSTALL http://files.basex.org/modules/org/basex/modules/Hello/HelloWorld.xqm


Importing the repository module: 


    import module namespace m = 'http://basex.org/modules/Hello';
    m:hello("Universe")


#### Java

Suitable JAR archives may contain one or more class files. One of them will be chosen as main class, which must be specified in a `Main-Class` entry in the manifest file (`META-INF/MANIFEST.MF`). This fully qualified Java class name will be rewritten to a file path by replacing the dots with slashes and attaching with the `.jar` file suffix, and the original file will be renamed and copied to that path into the repository. 


The public functions of this class can then be addressed from XQuery, using the class or file path as namespace URI, or an alternative writing that can be [rewritten](Repository.md#URI_Rewriting) to the module file path. Moreover, a class may extend the `QueryModule` class to get access to the current query context and to be enriched by some helpful annotations (please consult [Context Awareness of Java Bindings](Java Bindings.md#Context-Awareness) for more information). 


**Example:**


Structure of the `HelloWorld.jar` archive: 


    META-INF/
      MANIFEST.MF
    org/basex/modules/
      Hello.class


Contents of the file `MANIFEST.mf` (the whitespaces are obligatory): 


    Manifest-Version: 1.0
    Main-Class: org.basex.modules.Hello


Contents of the file `Hello.java` (comments removed): 


    package org.basex.modules;
    public class Hello {
      public String hello(final String world) {
        return "Hello " + world;
      }
    }


Installation (the file will be copied to `org/basex/modules/Hello.jar`): 


    REPO INSTALL HelloWorld.jar


XQuery file `HelloUniverse.xq` (same as above): 


    import module namespace m = 'http://basex.org/modules/Hello';
    m:hello("Universe")


After installing the module, all of the following URIs can be used in XQuery to import this module or call its functions: 


    http://basex.org/modules/Hello
    org/basex/modules/Hello
    org.basex.modules.Hello


Please be aware that the execution of Java code can cause side effects that conflict with the functional nature of XQuery, or may introduce new security risks. The article on [Java Bindings](Java Bindings.md) gives more insight on how Java code is handled from the XQuery processor. 


### EXPath Packaging

The [EXPath specification](http://expath.org/spec/pkg) defines how the structure of a .xar archive shall look like. The package contains at its root a package descriptor named `expath-pkg.xml`. This descriptor presents some meta data about the package as well as the libraries which it contains and their dependencies on other libraries or processors. 


#### XQuery

Apart from the package descriptor, a `.xar` archive contains a directory which includes the actual XQuery modules. For example, the [FunctX XQuery Library](http://www.functx.com/) is packaged as follows: 


    expath-pkg.xml
    functx/
      functx.xql
      functx.xsl


#### Java

In case you want to extend BaseX with a Java archive, some additional requirements have to be fulfilled: 

 * Apart from the package descriptor `expath-pkg.xml`, the package has to contain a descriptor file at its root, defining the included jars and the binary names of their public classes. It must be named `basex.xml` and must conform to the following structure: 

    <package xmlns="http://expath.org/ns/pkg">
      <jar>...</jar>
        ....
        <class>...</class>
        <class>...</class>
        ....
    </package>

 * The jar file itself along with an XQuery file defining wrapper functions around the java methods has to reside in the module directory. The following example illustrates how java methods are wrapped with XQuery functions: 

**Example:**Suppose we have a simple class `Printer` having just one public method `print()`: 


    package test;
    public final class Printer {
      public String print(final String s) {
        return new Writer(s).write();
      }
    }


We want to extend BaseX with this class and use its method. In order to make this possible we have to define an XQuery function which wraps the `print` method of our class. This can be done in the following way: 


    import module namespace j="http://basex.org/lib/testJar";
    declare namespace p="java:test.Printer";
    declare function j:print($str as xs:string) as xs:string {
      let $printer := p:new()
      return p:print($printer, $str)
    };


As it can be seen, the class `Printer` is declared with its binary name as a namespace prefixed with "java" and the XQuery function is implemented using the [Java Bindings](http://docs.basex.org/wiki/Java_Bindings) offered by BaseX. 


On our [file server](http://files.basex.org/modules/), you can find some example libraries packaged as XML archives (xar files). You can use them to try our packaging API or just as a reference for creating your own packages. 


### URI Rewriting

If modules are looked up in the repository, their URIs are rewritten to a local file path. The URI transformation has been inspired by [Zorba](http://www.zorba.io/documentation/3.0/zorba/architecture/uriresolvers): 

1. In the URI authority, the order of all substrings separated by dots is reversed. 
2. Dots in the authority and the path are replaced by slashes. If no path exists, a single slash is appended. 
3. If the resulting string ends with a slash, the `index` string is appended. 
4. URI are required to have a [path component](http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax). 

If the resulting path has no file suffix, it may point to either an XQuery module or a Java archive. The following examples show some rewritings: 

 * `http://basex.org/modules/hello/World`  → `org/basex/modules/hello/World`
 * `http://www.example.com`  → `com/example/www/index`
 * `a/little/example`  → `a/little/example`
 * `a:b:c`  → not supported (_no path component_) 

### Changelog
** Version 7.2.1 **

 * Updated: [Installation](Repository.md#RepositoryInstallation): existing packages will be replaced without raising an error 
 * Updated: [Removal](Repository.md#Removal): remove specific version of a package 
 * Added: [Packaging](Repository.md#Packaging), [URI Rewriting](Repository.md#URI_Rewriting)
** Version 7.1 **

 * Added: [Repository Module](Repository Module.md)
** Version 7.0 **

 * Added: [EXPath Packaging](Repository.md#EXPath_Packaging)
