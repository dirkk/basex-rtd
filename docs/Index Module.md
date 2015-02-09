
# Index Module
 


 
This [XQuery Module](Module Library.md) provides functions for displaying information stored in the database index structures. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/index` namespace, which is statically bound to the `index` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### index:facets

index:facets($db as xs:string) as xs:string
index:facets($db as xs:string, $type as xs:string) as xs:string

:   Returns information about all facets and facet values of the database `$db` in document structure format.If `$type` is specified as `flat`, the function returns this information in a flat summarized version. The returned data is derived from the [Path Index](Indexes.md#Path_Index). 

    **Errors**


    `BXDB0002`: The addressed database does not exist or could not be opened. 

    **Examples**


    * `index:facets("DB")`  returns information about facets and facet values on the database `DB` in document structure. 
    * `index:facets("DB", "flat")`  returns information about facets and facet values on the database `DB` in a summarized flat structure. 


### index:texts

index:texts($db as xs:string) as element(value)*
index:texts($db as xs:string, $prefix as xs:string) as element(value)*
index:texts($db as xs:string, $start as xs:string, $ascending as xs:boolean) as element(value)*

:   Returns all strings stored in the [Text Index](Indexes.md#Text_Index) of the database `$db`, along with their number of occurrences.If `$prefix` is specified, the returned entries will be refined to the ones starting with that prefix.If `$start` and `$ascending` are specified, all nodes will be returned after or before the specified start entry. 

    **Errors**


    `BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0004`: the text index is not available. 


### index:attributes

index:attributes($db as xs:string) as element(value)*
index:attributes($db as xs:string, $prefix as xs:string) as element(value)*
index:attributes($db as xs:string, $start as xs:string, $ascending as xs:boolean) as element(value)*

:   Returns all strings stored in the [Attribute Index](Indexes.md#Attribute_Index) of the database `$db`, along with their number of occurrences.If `$prefix` is specified, the returned entries will be refined to the ones starting with that prefix.If `$start` and `$ascending` are specified, all nodes will be returned after or before the specified start entry. 

    **Errors**


    `BXDB0002`: The addressed database does not exist or could not be opened.`BXDB0004`: the attribute index is not available. 


### index:element-names

index:element-names($db as xs:string) as element(value)*

:   Returns all element names stored in the [Name Index](Indexes.md#Name_Index) of the database `$db`, along with their number of occurrences. 

    **Errors**


    `BXDB0002`: The addressed database does not exist or could not be opened. 


### index:attribute-names

index:attribute-names($db as xs:string) as element(value)*

:   Returns all attribute names stored in the [Name Index](Indexes.md#Name_Index) of the database `$db`, along with their number of occurrences. 

    **Errors**


    `BXDB0002`: The addressed database does not exist or could not be opened. 

 
## Changelog
** Version 7.7 **

 * Updated: the functions no longer accept [Database Nodes](Database Module.md#Database_Nodes) as reference. Instead, the name of a database must now be specified. 
** Version 7.3 **

 * Updated: [index:texts](Index Module.md#index-texts), [index:attributes](Index Module.md#index-attributes): signature with three arguments added. 

The module was introduced with Version 7.1. 

