 


 
This [XQuery Module](Module Library.md) contains functions for simplifying formatted data output. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/out` namespace, which is statically bound to the `out` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## out:nl

out:nl() as xs:string

:   Returns a single newline character (`&#10;`). 


## out:tab

out:tab() as xs:string

:   Returns a single tabulator character (`&#9;`). 


## out:format

out:format($format as xs:string, $item1 as item(), ...) as xs:string

:   Returns a formatted string. `$item1` and all following items are applied to the `$format` string, according to [Java’s printf syntax](http://download.oracle.com/javase/1.5.0/docs/api/java/util/Formatter.html#syntax). 

    **Examples**


    * `out:format("%b", true())`  returns `true`. 
    * `out:format("%06d", 256)`  returns `000256`. 
    * `out:format("%e", 1234.5678)`  returns `1.234568e+03`. 

 
# Changelog

Introduced with Version 7.3. Functions have been adopted from the obsolete Utility Module. 

