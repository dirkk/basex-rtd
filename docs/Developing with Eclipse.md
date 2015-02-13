 


 
This page is part of the [Developer Section](Developing.md). It describes how to get the BaseX sources compiled and running on your system. 

 
Another article in the documentation describes how to use BaseX as a [query processor in Eclipse](Integrating Eclipse.md). 

 
# Prerequisites

BaseX is developed with the Eclipse environment (other IDEs like IntelliJ IDEA can be used as well). The [Eclipse IDE for Java Developers](https://www.eclipse.org/downloads/) includes the EGit plugin (for [Git](Git.md)) and the m2e plugin (for [Maven](Maven.md)). 


Other Eclipse plugins we use are: 


** Name ** | ** Description ** | ** Update URL **
---------- | ----------------- | ----------------
[eclipse-cs](http://eclipse-cs.sourceforge.net) |  Enforces Checkstyle coding standards.  | `http://eclipse-cs.sf.net/update/`
[FindBugs](http://findbugs.sourceforge.net) |  Analyze project at byte code level  | `http://findbugs.cs.umd.edu/eclipse`
[Core Tools](http://www.eclipse.org/eclipse/platform-core/downloads.php) |  Find dead (unreferenced) code.  | `http://eclipse.org/eclipse/platform-core/updates`
[EclEmma](http://www.eclemma.org/) |  Code coverage tool.  | `http://update.eclemma.org/`

## Check Out

Our [Git Tutorial](Git.md) explains how BaseX can be checked out from the [GitHub Repository](https://github.com/BaseXdb/basex) and embedded in Eclipse with EGit. The article also demonstrates how git can be used on command-line. 


The basex repository contains the following sub-directories: 

1. `basex-core`  is the main project 
2. `basex-api`  contains the BaseX APIs (XML:DB, bindings in other languages) and HTTP Services ([REST](REST.md), [RESTXQ](RESTXQ.md), [WebDAV](WebDAV.md)) 
3. `basex-examples`  includes some examples code for BaseX 
4. `basex-tests`  contains several unit and stress tests 

If the problems view shows a list of warning, you may need to switch to Java 6 (_Windows_ → _Preferences_ → _Installed JREs_). 


With the Maven plugin from Eclipse, it sometimes requires several attempts to get all dependencies updated. This loop can be avoided if the sources are precompiled via [Maven](Maven.md) on command-line. 


## Start in Eclipse
1. Press _Run_ → _Run…_
2. Create a new "Java Application" launch configuration 
3. Select "basex" as "Project"
4. Choose a "Main class" (e.g., `org.basex.BaseXGUI` for the graphical user interface) 
5. Launch the project via _Run_

## Alternative

You may as well use the standalone version of [Maven](Maven.md) to compile and run the project, use other IDEs such as [IntelliJ IDEA](http://www.jetbrains.com/idea). 

