
# Process Module
 


 
This [XQuery Module](Module Library.md) provides functions for executing system commands from XQuery. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/proc` namespace, which is statically bound to the `proc` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### proc:system

proc:system($cmd as xs:string) as xs:string
proc:system($cmd as xs:string, $args as xs:string*) as xs:string
proc:system($cmd as xs:string, $args as xs:string*, $encoding as xs:string) as xs:string

:   Executes the specified command in a separate process and returns the result as string.Additional command arguments may be specified via `$args`.The result can be explicitly converted to a specified `$encoding`. If no encoding is specified, the system’s default encoding is used. 

    **Errors**


    `BXPRnnnn`: If the command results in an error, an XQuery error will be raised. Its code will consist of the letters `BXPR` and four digits with the command’s exit code.`BXPR9999`: the specified encoding does not exist or is not supported. 

    **Examples**


    * `proc:system('date')`  returns the current date on a Linux system. 
    * The following example returns "Command not found", if the command "xyz" cannot be located or executed: 
    try {
    proc:system('xyz')
    } catch bxerr:BXPR0002 {
    'Command not found.'
    }


### proc:execute

proc:execute($cmd as xs:string) as element(result)
proc:execute($cmd as xs:string, $args as xs:string*) as element(result)
proc:execute($cmd as xs:string, $args as xs:string*, $encoding as xs:string) as element(result)

:   Executes the specified command in a separate process and returns the result as element.Additional command arguments may be specified via `$args`.The result can be explicitly converted to a specified `$encoding`. If no encoding is specified, the system’s default encoding is used.A result has the following structure:     <result>
    <output>...result output...</output>
    <error>...error output...</error>
    <code>0</code>
    </result>


    **Errors**


    `BXPR9999`: the specified encoding does not exist or is not supported. 

    **Examples**


    * `proc:execute('dir', '\')`  returns the files of the root directory of a Windows system. 
    * `proc:execute('ls', ('-l', '-a'))`  executes the `ls -la` command on Unix systems. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXPR9999` | The specified encoding does not exist or is not supported. 
 
## Changelog

The module was introduced with Version 7.3. 

