 


 
This page contains code snippets that mainly originate from our [basex-talk](https://mailman.uni-konstanz.de/mailman/listinfo/basex-talk) mailing list. 

 
# Compact Notations 

`if`/`not`/`else` constructs can look pretty verbose in XQuery. However, some alternatives exist in order to make conditional code more compact: 

 * The [Simple Map Operator](XQuery 3.0.md#Simple_Map_Operator) can be used to trigger an action if a value has a single item. The following two expressions are equivalent: 

    let $s
    := "X" return (
      (: OLD
    :) if(count($s) = 1) then 'OK' else (),
      (: NEW
    :) $s
    ! 'OK'
    )


In some cases, also the first solution can be written more compact. If we know that our input will always have 0-1 items, we can write `if(exists($s))`. If our input will never be an empty string, a zero, etc, it’s sufficient to write `if($s)`. 

 * If you want to choose the first non-empty item from two arguments, we can use the position predicate: 

    let $s
    := "X" return (
      (: OLD
    :) if(exists($s)) then $s else 'default',
      (: NEW
    :) ($s, 'default')[1]
    )


Note that this only works if both of your inputs have zero or one items. 


## Computed Elements 

Returns dynamically named elements: 


    let $root
    := "element"
    let $value
    := "hi"
    let $contents
    := <foo>Bar!</foo>
    return element { $root } {
      attribute { "about" } { $value }, $contents
    }


The result is an XML fragment with `<element>` as root node: 


    <element about="hi">
      <foo>Bar!</foo>
    </element>


## Transform List to Tree 

This snippet transform a _flat_ list of elements with `parentId`-references to a nested list. 


    declare function local:link($entries as node()*, $id as xs:string) {
     let $entry   
    := $entries[@id eq $id],
         $children
    := $entries[@parentId eq $id]
     return element entry {
       $entry/@*,
       for $child in $children
       return local:link($entries, $child/@id)
     }
    };
    let $entries
    :=
     <entries>
    	  <entry id="entry1" />
    	  <entry id="entry2" parentId="entry1" />
    	  <entry id="entry3" parentId="entry1" />
    	  <entry id="entry4" parentId="entry2" />
    	  <entry id="entry5" parentId="entry2" />
    	  <entry id="entry6" parentId="entry3" />
    	  <entry id="entry7" parentId="entry3" />
     </entries>
    return local:link($entries/entry, 'entry1')


results in 


    <entry id="entry1">
      <entry id="entry2" parentId="entry1">
        <entry id="entry4" parentId="entry2"/>
        <entry id="entry5" parentId="entry2"/>
      </entry>
      <entry id="entry3" parentId="entry1">
        <entry id="entry6" parentId="entry3"/>
        <entry id="entry7" parentId="entry3"/>
      </entry>
    </entry>


## IP-Converter 

This snippet converts an IP address to its numeric representation: 


    let $ip
    := '134.34.226.65'
    return fold-left(
     function($n, $d) { 256 * $n + $d },
     0,
     map(xs:integer#1, tokenize($ip, '\.'))
    )


results in 


    2250433089


## Count number of files 

This snippets returns the number of JPG files in a directory and its sub-directories: 


    basex "count(file:list('.',true(),'*.jpg'))"


The Linux equivalent is 


    find . | grep \.jpg$ | wc -l

