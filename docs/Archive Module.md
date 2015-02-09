
# Archive Module
 


 
This [XQuery Module](Module Library.md) contains functions to handle archives (including ePub, Open Office, JAR, and many other formats). New ZIP and GZIP archives can be created, existing archives can be updated, and the archive entries can be listed and extracted. The [archive:extract-binary](Archive Module.md#archive-extract-binary) function includes an example for writing the contents of an archive to disk. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/archive` namespace, which is statically bound to the `archive` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### archive:create

archive:create($entries as item(), $contents as item()*) as xs:base64Binary
archive:create($entries as item(), $contents as item()*, $options as item()) as xs:base64Binary

:   Creates a new archive from the specified entries and contents.The `$entries` argument contains meta information required to create new entries. All items may either be of type `xs:string`, representing the entry name, or `element(archive:entry)`, containing the name as text node and additional, optional attributes:  * `last-modified` : timestamp, specified as xs:dateTime (default: current time)     * `compression-level` : 0-9, 0 = uncompressed (default: 8) 
    * `encoding` : for textual entries (default: UTF-8) 
    An example: The actual `$contents` must be `xs:string` or `xs:base64Binary` items. The `$options` parameter contains archiving options, which can either be specified Currently, the following combinations are supported (all others will be rejected): 


    **Errors**


    `ARCH0001`: the number of entries and contents differs.`ARCH0002`: the specified option or its value is invalid or not supported.`ARCH0003`: entry descriptors contain invalid entry names, timestamps or compression levels.`ARCH0004`: the specified encoding is invalid or not supported, or the string conversion failed. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off.`ARCH0005`: the chosen archive format only allows single entries.`ARCH9999`: archive creation failed for some other reason.`FORG0006`: an argument has a wrong type. 

    **Examples**


    The following one-liner creates an archive `archive.zip` with one file `file.txt`: 
    archive:create(<archive:entry>file.txt</archive:entry>, 'Hello World')
    The following function creates an archive `mp3.zip`, which contains all MP3 files of a local directory: 


### archive:entries

archive:entries($archive as xs:base64Binary) as element(archive:entry)*

:   Returns the entry descriptors of the specified `$archive`. A descriptor contains the following attributes, provided that they are available in the archive format:  * `size` : original file size     * `last-modified` : timestamp, formatted as xs:dateTime 
    * `compressed-size` : compressed file size 
    An example: 


    **Errors**


    `ARCH9999`: archive creation failed for some other reason. 

    **Examples**


    Sums up the file sizes of all entries of a JAR file: 
    sum(archive:entries(file:read-binary('zip.zip'))/@size)


### archive:options

archive:options($archive as xs:base64Binary) as element(archive:options)

:   Returns the options of the specified `$archive` in the format specified by [archive:create](Archive Module.md#archive-create). 

    **Errors**


    `ARCH0002`: The packing format is not supported.`ARCH9999`: archive creation failed for some other reason. 

    **Examples**


    A standard ZIP archive will return the following options: 
    <archive:options xmlns:archive="http://basex.org/modules/archive">
    <archive:format value="zip"/>
    <archive:algorithm value="deflate"/>
    </archive:options>


### archive:extract-text

archive:extract-text($archive as xs:base64Binary) as xs:string*
archive:extract-text($archive as xs:base64Binary, $entries as item()*) as xs:string*
archive:extract-text($archive as xs:base64Binary, $entries as item()*, $encoding as xs:string) as xs:string*

:   Extracts entries of the specified `$archive` and returns them as texts.The returned entries can be limited via `$entries`. The format of the argument is the same as for [archive:create](Archive Module.md#archive-create) (attributes will be ignored).The encoding of the input files can be specified via `$encoding`. 

    **Errors**


    `ARCH0004`: the specified encoding is invalid or not supported, or the string conversion failed. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off.`ARCH9999`: archive creation failed for some other reason. 

    **Examples**


    The following expression extracts all `.txt` files from an archive: 
    let $archive
    := file:read-binary("documents.zip")
    for $entry in archive:entries($archive)[ends-with(., '.txt')]
    return archive:extract-text($archive, $entry)


### archive:extract-binary

archive:extract-binary($archive as xs:base64Binary) as xs:string*
archive:extract-binary($archive as xs:base64Binary, $entries as item()*) as xs:base64Binary*

:   Extracts entries of the specified `$archive` and returns them as binaries.The returned entries can be limited via `$entries`. The format of the argument is the same as for [archive:create](Archive Module.md#archive-create) (attributes will be ignored). 

    **Errors**


    `ARCH9999`: archive creation failed for some other reason. 

    **Examples**


    This example unzips all files of an archive to the current directory: 
    let $archive 
    := file:read-binary('archive.zip')
    let $entries 
    := archive:entries($archive)
    let $contents
    := archive:extract-binary($archive)
    for $entry at $p in $entries
    return (
    file:create-dir(replace($entry, "[^/]*$", "")),
    file:write-binary($entry, $contents[$p])
    )


### archive:update

archive:update($archive as xs:base64Binary, $entries as item()*, $contents as item()*) as xs:base64Binary

:   Creates an updated version of the specified `$archive` with new or replaced entries.The format of `$entries` and `$contents` is the same as for [archive:create](Archive Module.md#archive-create). 

    **Errors**


    `ARCH0001`: the number of entries and contents differs.`ARCH0003`: entry descriptors contain invalid entry names, timestamps, compression levels or encodings.`ARCH0004`: the specified encoding is invalid or not supported, or the string conversion failed. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off.`ARCH0005`: the entries of the given archive cannot be modified.`ARCH9999`: archive creation failed for some other reason.`FORG0006`: (some of) the contents are not of type `xs:string` or `xs:base64Binary`. 

    **Examples**


    This example replaces texts in a Word document: 
    declare variable $input 
    := "HelloWorld.docx";
    declare variable $output
    := "HelloUniverse.docx";
    declare variable $doc   
    := "word/document.xml";
    let $archive
    := file:read-binary($input)
    let $entry  
    :=
    copy $c
    := fn:parse-xml(archive:extract-text($archive, $doc))
    modify replace value of node $c//*[text() = "HELLO WORLD!"] with "HELLO UNIVERSE!"
    return fn:serialize($c)
    let $updated
    := archive:update($archive, $doc, $entry)
    return file:write-binary($output, $updated)


### archive:delete

archive:delete($archive as xs:base64Binary, $entries as item()*) as xs:base64Binary

:   Deletes entries from an `$archive`.The format of `$entries` is the same as for [archive:create](Archive Module.md#archive-create). 

    **Errors**


    `ARCH0005`: the entries of the given archive cannot be modified.`ARCH9999`: archive creation failed for some other reason. 

    **Examples**


    This example deletes all HTML files in an archive and creates a new file: 
    let $zip
    := file:read-binary('old.zip')
    let $entries
    := archive:entries($zip)[matches(., '\.x?html?$', 'i')]
    return file:write-binary('new.zip', archive:delete($zip, $entries))


### archive:write

archive:write($path as xs:string, $archive as xs:base64Binary) as xs:string*
archive:write($path as xs:string, $archive as xs:base64Binary, $entries as item()*) as empty-sequence()

:   This convenience function directly writes files of an `$archive` to the specified directory `$path`.The entries to be written can be limited via `$entries`. The format of the argument is the same as for [archive:create](Archive Module.md#archive-create) (attributes will be ignored). 

    **Errors**


    `FILE0001`: a specified path does not exist.`ARCH9999`: archive creation failed for some other reason. 

    **Examples**


    This example unzips all files of an archive to the current directory: 
    archive:write(file:read-binary('archive.zip'))

 
## Errors

**Code ** | Description 
--------- | ------------
`ARCH0001` | The number of specified entries and contents differs. 
`ARCH0002` | The packing format or the specified option is invalid or not supported. 
`ARCH0003` | Entry descriptors contain invalid entry names, timestamps or compression levels. 
`ARCH0004` | The specified encoding is invalid or not supported, or the string conversion failed. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off. 
`ARCH0005` | The entries of the given archive cannot be modified. 
`ARCH0006` | The chosen archive format only allows single entries. 
`ARCH9999` | Archive processing failed for some other reason. 
 
## Changelog
** Version 7.7 **

 * Added: [archive:write](Archive Module.md#archive-write)

The module was introduced with Version 7.3. 

