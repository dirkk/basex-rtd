
# Start Scripts
 


 
The following scripts, which are referenced in the [Startup](Startup.md) and [Command-Line Options](Command-Line Options.md) articles, are also included in the [Windows and ZIP distributions](http://basex.org/products/download/). 

  * We recommend you to manually add the `bin` directory of your BaseX directory to the [PATH variable](http://en.wikipedia.org/wiki/PATH_(variable)) of your environment. 
 * The Windows installer automatically adds the project’s `bin` directory to your path environment. 
 * If you work with [Maven](Maven.md), you can directly run the scripts in the [basex-core/etc](https://github.com/BaseXdb/basex/tree/master/basex-core/etc) and [basex-api/etc](https://github.com/BaseXdb/basex/tree/master/basex-api/etc) sub-directories of the project. 
 
If BaseX terminates with an `Out of Memory` error, you can assign more RAM via the `-Xmx` flag (see below). 

 
## Main Package

The following scripts can be used to launch the standalone version of BaseX. Please replace the class name in `org.basex.BaseX` with either `BaseXClient`, `BaseXServer`, or `BaseXGUI` to run the client, server or GUI version. 


### Windows: basex.bat

    @echo off
    setLocal EnableDelayedExpansion
    REM Path to this script
    set PWD=%~dp0
    REM Core and library classes
    set CP=%PWD%/../BaseX.jar
    set LIB=%PWD%/../lib
    for /R "%LIB%" %%a in (*.jar) do set CP=!CP!;%%a
    REM Options for virtual machine
    set VM=-Xmx512m
    REM Run code
    java -cp "%CP%" %VM% org.basex.BaseX %*


### Linux/Mac: basex

    #!/bin/bash
    # Path to this script
    FILE="${BASH_SOURCE[0]}"
    while [ -h "$FILE" ] ; do
      SRC="$(readlink "$FILE")"
      FILE="$( cd -P "$(dirname "$FILE")" && \
               cd -P "$(dirname "$SRC")" && pwd )/$(basename "$SRC")"
    done
    BX="$( cd -P "$(dirname "$FILE")/.." && pwd )"
    # Core and library classes
    CP="$BX/BaseX.jar"
    CP="$CP$(for JAR in "$BX"/lib/*.jar; do echo -n ":$JAR"; done)"
    # Options for virtual machine
    VM=-Xmx512m
    # Run code
    java -cp "$CP" $VM org.basex.BaseX "$@"

 
## HTTP Server

The scripts for starting the HTTP server, which gives access to the [REST](REST.md), [RESTXQ](RESTXQ.md) and [WebDAV](WebDAV.md) services, can be found below. 


### Windows: basexhttp.bat

    @echo off
    setLocal EnableDelayedExpansion
    REM Path to this script
    set PWD=%~dp0
    REM Core and library classes
    set CP=%PWD%/../BaseX.jar
    set LIB=%PWD%/../lib
    for /R "%LIB%" %%a in (*.jar) do set CP=!CP!;%%a
    for /R "%LIB%" %%a in (*.jar) do set CP=!CP!;%%a
    REM Options for virtual machine
    set VM=-Xmx512m
    REM Run code
    java -cp "%CP%;." %VM% org.basex.BaseXHTTP %*


### Linux/Mac: basexhttp

    #!/bin/bash
    # Path to this script
    FILE="${BASH_SOURCE[0]}"
    while [ -h "$FILE" ] ; do
      SRC="$(readlink "$FILE")"
      FILE="$( cd -P "$(dirname "$FILE")" && \
               cd -P "$(dirname "$SRC")" && pwd )/$(basename "$SRC")"
    done
    BX="$( cd -P "$(dirname "$FILE")/.." && pwd )"
    BXCORE="$( cd -P "$BX/../basex" && pwd )"
    # API, core, and library classes
    CP="$BX/BaseX.jar$(printf ":%s""$BX/BaseX.jar""$BX/lib/"*.jar "$BXCORE/target/classes""$BXCORE/lib/"*.jar)"
    # Options for virtual machine
    VM=-Xmx512m
    # Run code
    java -cp "$CP" $VM org.basex.BaseXHTTP "$@"

 
## Changelog
** Version 7.5 **

 * Updated: Static dependencies removed from Windows batch scripts. 
** Version 7.2 **

 * Updated: The `BaseXHTTP` start class moved from `org.basex.api` to `org.basex`. 
** Version 7.0 **

 * Updated: The `basexjaxrx` scripts have been replaced with the `basexhttp` scripts. 
