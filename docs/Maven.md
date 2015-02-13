 


 
This page is part of the [Developer Section](Developing.md). It demonstrates how [Maven](http://maven.apache.org) is used to compile and run BaseX, and embed it into other projects. 

 
# Using Maven

If you have [cloned our repository](Git.md) and installed Maven on your machine, you can run the following commands from all local repository directories: 

 * `mvn compile` : the BaseX source files are compiled. 
 * `mvn package` : JAR archives are created in the `target` class directory, and all relevant libraries are created in the `lib` directory. Packaging is useful if you want to use the start scripts. 
 * `mvn install` : the JAR archive is installed to the local repository, and made available to other Maven projects. This is particularly useful if you are compiling a beta version of BaseX, for which no archives exist in the repositories. 

By adding the flag `-DskipTests` you can skip the JUnit tests and speed up packaging. You may as well use [Eclipse and m2eclipse](Developing with Eclipse.md) to compile the BaseX sources. 


There are several alternatives for starting BaseX: 

 * type in `java -cp target/classes org.basex.BaseX` in the `basex-core` directory to start BaseX on the command-line mode, 
 * type in `mvn jetty:run` in the `basex-api` directory to start BaseX with Jetty and the HTTP servers, 
 * run one of the [Start Scripts](Start Scripts.md) contained in the `etc` directory 

## Artifacts

You can easily embed BaseX into your own Maven projects by adding the following XML snippets to your `pom.xml` file: 


    <repositories>
      <repository>
        <id>basex</id>
        <name>BaseX Maven Repository</name>
        <url>http://files.basex.org/maven</url>
      </repository>
    </repositories>


### BaseX Main Package

    <dependency>
      <groupId>org.basex</groupId>
      <artifactId>basex</artifactId>
      <version>7.6</version>
    </dependency>


### APIs and Services

...including APIs and the [REST](REST.md), [RESTXQ](RESTXQ.md) and [WebDAV](WebDAV.md) services:


    <dependency>
      <groupId>org.basex</groupId>
      <artifactId>basex-api</artifactId>
      <version>7.6</version>
    </dependency>


### XQJ API

The XQJ API is hosted at [http://xqj.net](http://xqj.net):


    <repository>
      <id>xqj</id>
      <name>XQJ Maven Repository</name>
      <url>http://xqj.net/maven</url>
    </repository>
    ...
    <dependency>
      <groupId>net.xqj</groupId>
      <artifactId>basex-xqj</artifactId>
      <version>1.2.0</version>
    </dependency>
    <dependency>
      <groupId>com.xqj2</groupId>
      <artifactId>xqj2</artifactId>
      <version>0.1.0</version>
    </dependency>
    <dependency>
      <groupId>javax.xml.xquery</groupId>
      <artifactId>xqj-api</artifactId>
      <version>1.0</version>
    </dependency>

