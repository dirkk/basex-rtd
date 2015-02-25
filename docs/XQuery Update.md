 


 
This article is part of the [XQuery Portal](XQuery.md). It summarizes the update features of BaseX. 

 
BaseX offers a complete implementation of the [XQuery Update Facility (XQUF)](http://www.w3.org/TR/xquery-update-10/). This article aims to provide a very quick and basic introduction to the XQUF. First, some examples for update expressions are given. After that, a few problems are addressed that frequently arise due to the nature of the language. These are stated in the [Concepts](http://docs.basex.org/wiki/XQuery UpdateConcepts) paragraph. 

 
# Features

## Updating Expressions

There are five new expressions to modify data. While `insert`, `delete`, `rename` and `replace` are basically self-explanatory, the `transform` expression is different, as modified nodes are copied in advance and the original databases remain untouched. 


An expression consists of a target node (the node we want to alter) and additional information like insertion nodes, a QName, etc. which depends on the type of expression. Optional modifiers are available for some of them. You can find a few examples and additional information below. 


### insert

    insert node (attribute { 'a' } { 5 }, 'text', <e/>) into /n


Insert enables you to insert a sequence of nodes into a single target node. Several modifiers are available to specify the exact insert location: insert into **as first**/**as last**, insert **before**/**after** and insert **into**. 


_Note_: in most cases, **as last** and **after** will be evaluated faster than **as first** and **before**! 


### delete

    delete node //node


The example query deletes all `<node>` elements in your database. Note that, in contrast to other updating expressions, the delete expression allows multiple nodes as a target. 


### replace

    replace node /n with <a/>


The target element is replaced by the DOM node `<a/>`. You can also replace the value of a node or its descendants by using the modifier **value of**. 


    replace value of node /n with 'newValue'


All descendants of /n are deleted and the given text is inserted as the only child. Note that the result of the insert sequence is either a single text node or an empty sequence. If the insert sequence is empty, all descendants of the target are deleted. Consequently, replacing the value of a node leaves the target with either a single text node or no descendants at all. 


### rename

    for $n in //node
    return rename node $n as 'renamedNode' 


All node elements are renamed. An iterative approach helps to modify multiple nodes within a single statement. Nodes on the descendant- or attribute-axis of the target are not affected. This has to be done explicitly as well. 


## Non-Updating Expressions

### transform

    copy $c
    := doc('example.xml')//node[@id = 1]
    modify rename node $c as 'copyOfNode'
    return $c


The node element with `@id=1` is copied and subsequently assigned a new QName using the rename expression. Note that the transform expression is the only expression which returns an actual XDM instance as a result. You can therefore use it to modify results and especially DOM nodes. This is an issue beginners are often confronted with. More on this topic can be found in the [XQUF Concepts](http://docs.basex.org/wiki/XQuery UpdateReturning_Results) section. 


The following example demonstrates a common use case: 


Query: 


    copy $c
    :=
      <entry>
        <title>Transform expression example</title>
        <author>BaseX Team</author>
      </entry>
    modify (
      replace value of node $c/author with 'BaseX',
      replace value of node $c/title with concat('Copy of: ', $c/title),
      insert node <author>Joey</author> into $c
    )
    return $c


Result: 


    <entry>
      <title>Copy of: Transform expression example</title>
      <author>BaseX</author>
      <author>Joey</author>
    </entry>


The `<entry>` element (here it is passed to the expression as a DOM node) can also be replaced by a database node, e.g.: 


    copy $c
    := (db:open('example')//entry)[1]
    ...


In this case, the original database node remains untouched as well, as all updates are performed on the node copy. 


Here is an example where we return an entire document, parts modified and all: 


    copy $c
    := doc("zaokeng.kml")
    modify (
      for $d in $c//*:Point
      return insert node (
        <extrude>1</extrude>,
        <altitudeMode>relativeToGround</altitudeMode>
      )  before $d/*:coordinates
    )
    return $c


### update

    for $item in db:open('data')//item
    return $item update delete node text()


The `update` expression is a convenience operator for writing simple transform expressions. Similar to the [XQuery 3.0 map operator](XQuery 3.0.md#simplemap-operator), the value of the first expression is bound as context item, and the second expression performs updates on this item. The updated item is returned as result. 


Please note that `update` is not part of the official XQuery Update Facility yet. It is currently being discussed in the [W3 Bug Tracker](https://www.w3.org/Bugs/Public/show_bug.cgi?id=23643); your feedback is welcome. 


## Functions

### fn:put

`fn:put()` is also part of the XQUF and enables the user to serialize XDM instances to secondary storage. It is executed at the end of a snapshot. Serialized documents therefore reflect all changes made effective during a query. 


### Database Functions

Some additional, updating [database functions](Database Module.md#databasemoduleupdates) exist in order to perform updates on document and database level. 


## Concepts

There are a few specialties around XQuery Update that you should know about. In addition to the **simple expression**, the XQUF adds the **updating expression** as a new type of expression. An updating expression returns only a Pending Update List (PUL) as a result which is subsequently applied to addressed databases and DOM nodes. A simple expression cannot perform any permanent changes and returns an empty or non-empty sequence. 


### Pending Update List

The most important thing to keep in mind when using XQuery Update is the Pending Update List (PUL). Updating statements are not executed immediately, but are first collected as update primitives within a set-like structure. At the end of a query, after some consistency checks and optimizations, the update primitives will be applied in the following order: 

 * **Backups (1)** : `db:create-backup()`
 * **XQuery Update** : `insert before`, `delete`, `replace`, `rename`, `replace value`, `insert attribute`, `insert into first`, `insert into`, `insert into last`, `insert`, `insert after`, `put`
 * **Documents** : `db:add()`, `db:store()`, `db:replace()`, `db:rename()`, `db:delete()`, `db:optimize()`, `db:flush()`, 
 * **Users** : `user:grant()`, `user:password()`, `user:drop()`, `user:alter()`, `user:create()`
 * **Databases** : `db:copy()`, `db:drop()`, `db:alter()`, `db:create()`
 * **Backups (2)** : `db:restore()`, `db:drop-backup()`

If an inconsistency is found, an error message is returned and all accessed databases remain untouched (atomicity). For the user, this means that updates are only visible **after** the end of a snapshot. 


It may be surprising to see `db:create` in the lower part of this list. This means that newly created database cannot be accessed by the same query, which can be explained by the semantics of updating queries: all expressions can only be evaluated on databases that already exist while the query is evaluated. As a consequence, `db:create` is mainly useful in the context of [Command Scripts](Commands.md#basics), or [Web Applications](Web Application.md), in which a redirect to another page can be triggered after having created a database. 


#### Example

The query… 


    insert node <b/> into /doc,
    for $n in /doc/child::node()
    return rename node $n as 'justRenamed'


…applied on the document… 


    <doc> <a/> </doc>


…results in the following document: 


    <doc> <justRenamed/><b/> </doc>


Despite explicitly renaming all child nodes of `<doc/>`, the former `<a/>` element is the only one to be renamed. The `<b/>` element is inserted within the same snapshot and is therefore not yet visible to the user. 


### Returning Results

By default, it is not possible to mix different types of expressions in a query result. The outermost expression of a query must either be a collection of updating or non-updating expressions. But there are two ways out: 

 * The BaseX-specific `db:output()` function bridges this gap: it caches the results of its arguments at runtime and returns them after all updates have been processed. The following example performs an update and returns a success message: 

    db:output("Update successful."), insert node <c/> into doc('factbook')/mondial

 * Since Version 8.0, the [MIXUPDATES](Options.md#mixupdates) option is available. All updating constraints will be turned off, and nodes to be returned will be copied before they are modified by updating expressions. An error is raised if items are returned within a transform expression. 

If you want to modify nodes in main memory, you can use the [transform expression](http://docs.basex.org/wiki/XQuery Updatetransform). 


### Function Declaration

To use updating expressions within a function, the `%updating` annotation has to be added to the function declaration. A correct declaration of a function that contains updating expressions (or one that calls updating functions) looks like this: 


    declare
    %updating function { ... }


## Effects

### Original Files

In BaseX, all updates are performed on database nodes or in main memory. By default, update operations never affect the original input file (since Version 8.0, the info string "Updates are not written back" appears in the query info to indicate this). The following solutions exist to write XML documents and binary resources to disk: 

 * Updates on main-memory instances of files that have been retrieved via `fn:doc` or `fn:collection` will be propagated back to disk when the `WRITEBACK` option is turned on. This option can also be activated on [command line](Command-Line Options.md#basexstandalone) via `-u`. Make sure you back up the original documents before running your queries. 
 * Functions like `fn:put` or `file:write` can be used to write single XML documents to disk. With `file:write-binary`, you can write binary resources. 
 * The [EXPORT](Commands.md#export) command can be used write all resources of a databases to disk. 

### Indexes

Index structures are discarded after update operations when [UPDINDEX](Options.md#updindex) is turned off (which is the default). More details are found in the article on [Indexing](http://docs.basex.org/wiki/IndexesUpdates). 


## Error Messages

Along with the Update Facility, a number of new error codes and messages have been added to the specification and BaseX. All errors are listed in the [XQuery Errors](XQuery Errors.md#updateerrors) overview. 

 
# Changelog
** Version 8.0 **

 * Added: `MIXUPDATES` option for [Returning Results](XQuery Update.md#returningresults) in updating expressions 
 * Added: information message if files are not written back 
** Version 7.8 **

 * Added: [update](XQuery Update.md#update) convenience operator 
