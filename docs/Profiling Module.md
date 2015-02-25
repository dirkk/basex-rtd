 


 
This [XQuery Module](Module Library.md) contains various testing, profiling and helper functions. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/prof` namespace, which is statically bound to the `prof` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## prof:time

prof:time($expr as item()) as item()*
prof:time($expr as item(), $cache as xs:boolean) as item()*
prof:time($expr as item(), $cache as xs:boolean, $label as xs:string) as item()*

:   Measures the time needed to evaluate `$expr` and sends it to standard error or, if the GUI is used, to the Info View.If `$cache` is set to `true()`, the result will be temporarily cached. This way, a potential iterative execution of the expression (which often yields different memory usage) is blocked.A third, optional argument `$label` may be specified to tag the profiling result. 

    **Examples**


    * `prof:time("1 to 100000")`  may output `25.69 ms`. 
    * `prof:time("1 to 100000", true())`  may output `208.12 ms`. 


## prof:mem

prof:mem($expr as item()) as item()*
prof:mem($expr as item(), $cache as xs:boolean) as item()*
prof:mem($expr as item(), $cache as xs:boolean, $label as xs:string) as item()*

:   Measures the memory allocated by evaluating `$expr` and sends it to standard error or, if the GUI is used, to the Info View.If `$cache` is set to `true()`, the result will be temporarily cached. This way, a potential iterative execution of the expression (which often yields different memory usage) is blocked.A third, optional argument `$label` may be specified to tag the profiling result. 

    **Examples**


    * `prof:mb("1 to 100000")`  may output `0 Bytes`. 
    * `prof:mb("1 to 100000", true())`  may output `26.678 mb`. 


## prof:sleep

prof:sleep($ms as xs:integer) as empty-sequence()

:   Sleeps for the specified number of milliseconds. 


## prof:human

prof:human($number as xs:integer) as xs:string

:   Returns a human-readable representation of the specified `$number`. 


## prof:dump

prof:dump($expr as item()) as empty-sequence()
prof:dump($expr as item(), $label as xs:string) as empty-sequence()

:   Dumps a serialized representation of `$expr` to `STDERR`, optionally prefixed with `$label`, and returns an empty sequence. If the GUI is used, the dumped result is shown in the [Info View](Graphical User Interface.md#visualizations). 


## prof:current-ms

prof:current-ms() as xs:integer

:   Returns the number of milliseconds passed since 1970/01/01 UTC. The granularity of the value depends on the underlying operating system and may be larger. For example, many operating systems measure time in units of tens of milliseconds. 


## prof:current-ns

prof:current-ns() as xs:integer

:   Returns the current value of the most precise available system timer in nanoseconds. 


## prof:void

prof:void($value as item()*) as empty-sequence()

:   Swallows all items of the specified `$value` and returns an empty sequence. This function is helpful if some code needs to be evaluated and if the actual result is irrelevant. 

    **Examples**


    * `prof:void(fetch:binary('http://my.rest.service'))`  performs an HTTP request and ignores the result. 

 
# Changelog
** Version 7.7 **

 * Added: `prof:void`
** Version 7.6 **

 * Added: `prof:human`
** Version 7.5 **

 * Added: `prof:dump`, `prof:current-ms`, `prof:current-ns`

This module was introduced with Version 7.3. 

