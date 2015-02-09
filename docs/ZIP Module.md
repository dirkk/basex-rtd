
# ZIP Module
 


 
This [XQuery Module](Module Library.md) contains functions to handle ZIP archives. The contents of ZIP files can be extracted and listed, and new archives can be created. The module is based on the [EXPath ZIP Module](http://expath.org/spec/zip). It may soon be replaced by the [Archive Module](Archive Module.md). 

 
## Conventions

All functions in this module are assigned to the `http://expath.org/ns/zip` namespace, which is statically bound to the `zip` prefix. All errors are assigned to the `http://expath.org/ns/error` namespace, which is statically bound to the `experr` prefix. 

 
## Functions

### zip:binary-entry

zip:binary-entry($uri as xs:string, $path as xs:string) as xs:base64Binary

:   Extracts the binary file at `$path` within the ZIP file located at `$uri` and returns it as an `xs:base64Binary` item. 

    **Errors**


    `ZIP0001`: the specified path does not exist.`ZIP0003`: the operation fails for some other reason. 


### zip:text-entry

zip:text-entry($uri as xs:string, $path as xs:string) as xs:string
zip:text-entry($uri as xs:string, $path as xs:string, $encoding as xs:string) as xs:string

:   Extracts the text file at `$path` within the ZIP file located at `$uri` and returns it as an `xs:string` item.An optional encoding can be specified via `$encoding`. 

    **Errors**


    `ZIP0001`: the specified path does not exist.`ZIP0003`: the operation fails for some other reason. 


### zip:xml-entry

zip:xml-entry($uri as xs:string, $path as xs:string) as document-node()

:   Extracts the XML file at `$path` within the ZIP file located at `$uri` and returns it as a document node. 

    **Errors**


    `FODC0006`: the addressed file is not well-formed.`ZIP0001`: the specified path does not exist.`ZIP0003`: the operation fails for some other reason. 


### zip:html-entry

zip:html-entry($uri as xs:string, $path as xs:string) as document-node()

:   Extracts the HTML file at `$path` within the ZIP file located at `$uri` and returns it as a document node. The file is converted to XML first if [Tagsoup](http://home.ccil.org/~cowan/XML/tagsoup/) is found in the classpath. 

    **Errors**


    `FODC0006`: the addressed file is not well-formed, or cannot be converted to correct XML.`ZIP0001`: the specified path does not exist.`ZIP0003`: the operation fails for some other reason. 


### zip:entries

zip:entries($uri as xs:string) as element(zip:file)

:   Generates an [ZIP XML Representation](http://expath.org/spec/zip#spec-file-handling-elements-sect) of the hierarchical structure of the ZIP file located at `$uri` and returns it as an element node. The file contents are not returned by this function. 

    **Errors**


    `ZIP0001`: the specified path does not exist.`ZIP0003`: the operation fails for some other reason. 

    **Examples**


    If the ZIP archive `archive.zip` is empty, `zip:entries('archive.zip')` returns:
    <zip:file xmlns:zip="http://expath.org/ns/zip" href="archive.zip"/>


### zip:zip-file

zip:zip-file($zip as element(zip:file)) as empty-sequence()

:   Creates a new ZIP archive with the characteristics described by `$zip`, the [ZIP XML Representation](http://expath.org/spec/zip#spec-file-handling-elements-sect). 

    **Errors**


    `ZIP0001`: an addressed file does not exist.`ZIP0002`: entries in the ZIP archive description are unknown, missing, or invalid.`ZIP0003`: the operation fails for some other reason.`Serialization Errors`: an inlined XML fragment cannot be successfully serialized. 

    **Examples**


    The following function creates a file `archive.zip` with the file `file.txt` inside: 
    zip:zip-file(
    <file xmlns="http://expath.org/ns/zip" href="archive.zip">
    <entry src="file.txt"/>
    </file>)
    The following function creates a file `archive.zip`. It contains one file `readme` with the content "`thanks`": 


### zip:update-entries

zip:update-entries($zip as element(zip:file), $output as xs:string) as empty-sequence()

:   Updates an existing ZIP archive or creates a modifed copy, based on the characteristics described by `$zip`, the [ZIP XML Representation](http://expath.org/spec/zip#spec-file-handling-elements-sect). The `$output` argument is the URI where the modified ZIP file is copied to. 

    **Errors**


    `ZIP0001`: an addressed file does not exist.`ZIP0002`: entries in the ZIP archive description are unknown, missing, or invalid.`ZIP0003`: the operation fails for some other reason.`Serialization Errors`: an inlined XML fragment cannot be successfully serialized. 

    **Examples**


    The following function creates a copy `new.zip` of the existing `archive.zip` file: 
    zip:update-entries(zip:entries('archive.zip'), 'new.zip')
    The following function deletes all PNG files from `archive.zip`: 

 
## Errors

**Code ** | Description 
--------- | ------------
`ZIP0001` | A specified path does not exist. 
`ZIP0002` | Entries in the ZIP archive description are unknown, missing, or invalid. 
`ZIP0003` | An operation fails for some other reason. 
