 


 
This [XQuery Module](Module Library.md) contains functions related to file system operations, such as listing, reading, or writing files. 

 
This module is based on the [EXPath File Module](http://expath.org/spec/file). 

 
# Conventions

All functions and errors in this module are assigned to the `http://expath.org/ns/file` namespace, which is statically bound to the `file` prefix. 


For serialization parameters, the `http://www.w3.org/2010/xslt-xquery-serialization` namespace is used, which is statically bound to the `output` prefix. 


Returned strings that refer to existing directories are suffixed with a directory separator. The error `invalid-path` is raised if a path is invalid. 

 
# Read Operations

## file:list

file:list($dir as xs:string) as xs:string*
file:list($dir as xs:string, $recursive as xs:boolean) as xs:string*
file:list($dir as xs:string, $recursive as xs:boolean, $pattern as xs:string) as xs:string*

:   Lists all files and directories found in the specified `$dir`. The returned paths are relative to the provided path.The optional parameter `$recursive` specifies whether sub-directories will be traversed, too.The optional parameter `$pattern` defines a file name pattern in the [Glob Syntax](Commands.md#Glob_Syntax). If present, only those files and directories are returned that correspond to the pattern. Several patterns can be separated with a comma (`,`). 

    **Errors**


    `not-found`: the specified file does not exist.`no-dir`: the specified path does not point to a directory.`io-error`: the operation fails for some other reason. 


## file:children

Introduced with Version 8.0:


file:children($dir as xs:string) as xs:string*

:   Returns the full paths to all files and directories found in the specified `$dir`.The inverse function is [file:parent](File Module.md#file-parent). The related function [file:list](File Module.md#file-list) returns relative file paths. 

    **Errors**


    `not-found`: the specified file does not exist.`no-dir`: the specified path does not point to a directory.`io-error`: the operation fails for some other reason. 


## file:read-binary

file:read-binary($path as xs:string) as xs:base64Binary
file:read-binary($path as xs:string, $offset as xs:integer) as xs:base64Binary
file:read-binary($path as xs:string, $offset as xs:integer, $length as xs:integer) as xs:base64Binary

:   Reads the binary content of the file specified by `$path` and returns it as [streamable](Streaming Module.md)`xs:base64Binary`.The optional parameters `$offset` and `$length` can be used to read chunks of a file. 

    **Errors**


    `not-found`: the specified file does not exist.`is-dir`: the specified path is a directory.`out-of-range`: the offset or length is negative, or the chosen values would exceed the file bounds.`io-error`: the operation fails for some other reason. 

    **Examples**


    * `stream:materialize(file:read-binary("config.data"))`  returns a materialized representation of the streamable result. 


## file:read-text

file:read-text($path as xs:string) as xs:string
file:read-text($path as xs:string, $encoding as xs:string) as xs:string

:   Reads the textual contents of the file specified by `$path` and returns it as [streamable](Streaming Module.md)`xs:string`.The optional parameter `$encoding` defines the encoding of the file. 

    **Errors**


    `not-found`: the specified file does not exist.`is-dir`: the specified path is a directory.`unknown-encoding`: the specified encoding is not supported, or unknown.`io-error`: the operation fails for some other reason. Invalid XML characters will be ignored if the `CHECKSTRINGS` option is turned off. 

    **Examples**


    * `stream:materialize(file:read-text("config.txt"))`  returns a materialized representation of the streamable result. 


## file:read-text-lines

file:read-text-lines($path as xs:string) as xs:string
file:read-text-lines($path as xs:string, $encoding as xs:string) as xs:string*

:   Reads the textual contents of the file specified by `$path` and returns it as a sequence of `xs:string` items.The optional parameter `$encoding` defines the encoding of the file. 

    **Errors**


    `not-found`: the specified file does not exist.`is-dir`: the specified path is a directory.`unknown-encoding`: the specified encoding is not supported, or unknown.`io-error`: the operation fails for some other reason. 

 
# Write Operations

## file:create-dir

file:create-dir($dir as xs:string) as empty-sequence()

:   Creates the directory specified by `$dir`, including all non-existing parent directories. 

    **Errors**


    `exists`: a file with the same path already exists.`io-error`: the operation fails for some other reason. 


## file:create-temp-dir

file:create-temp-dir($prefix as xs:string, $suffix as xs:string) as xs:string
file:create-temp-dir($prefix as xs:string, $suffix as xs:string, $dir as xs:string) as xs:string

:   Creates a new temporary directory that did not exist before this function was called, and returns its full file path. The directory name begins and ends with the specified `$prefix` and `$suffix`. If no directory is specified via `$dir`, the directory will be placed in the system’s default temporary directory. The operation will create all non-existing parent directories. 

    **Errors**


    `no-dir`: the specified directory points to a file.`io-error`: the directory could not be created. 


## file:create-temp-file

file:create-temp-file($prefix as xs:string, $suffix as xs:string) as xs:string
file:create-temp-file($prefix as xs:string, $suffix as xs:string, $dir as xs:string) as xs:string

:   Creates a new temporary file that did not exist before this function was called, and returns its full file path. The file name begins and ends with the specified `$prefix` and `$suffix`. If no directory is specified via `$dir`, the file will be placed in the system’s default temporary directory. The operation will create all non-existing parent directories. 

    **Errors**


    `no-dir`: the specified directory points to a file.`io-error`: the directory could not be created. 


## file:delete

file:delete($path as xs:string) as empty-sequence()
file:delete($path as xs:string, $recursive as xs:boolean) as empty-sequence()

:   Recursively deletes a file or directory specified by `$path`.The optional parameter `$recursive` specifies whether sub-directories will be deleted, too. 

    **Errors**


    `not-found`: the specified path does not exist.`io-error`: the operation fails for some other reason. 


## file:write

file:write($path as xs:string, $items as item()*) as empty-sequence()
file:write($path as xs:string, $items as item()*, $params as item()) as empty-sequence()

:   Writes a serialized sequence of items to the specified file. If the file already exists, it will be overwritten.The `$params` argument contains serialization parameters (see [Serialization](Serialization.md) for more details), which can either be specified  * as children of an `<output:serialization-parameters/>` element, as defined for the [fn:serialize()](http://www.w3.org/TR/xpath-functions-30/#func-serialize) function; e.g.: 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`io-error`: the operation fails for some other reason. 


## file:write-binary

file:write-binary($path as xs:string, $value as xs:anyAtomicType) as empty-sequence()
file:write-binary($path as xs:string, $value as xs:anyAtomicType, $offset as xs:integer) as empty-sequence()

:   Writes a binary item (xs:base64Binary, xs:hexBinary) to the specified file. If the file already exists, it will be overwritten.If `$offset` is specified, data will be written at this file position. An existing file may be resized by that operation. 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`out-of-range`: the offset is negative, or it exceeds the current file size.`io-error`: the operation fails for some other reason. 


## file:write-text

file:write-text($path as xs:string, $value as xs:string) as empty-sequence()
file:write-text($path as xs:string, $value as xs:string, $encoding as xs:string) as empty-sequence()

:   Writes a string to the specified file. If the file already exists, it will be overwritten.The optional parameter `$encoding` defines the output encoding (default: UTF-8). 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`unknown-encoding`: the specified encoding is not supported, or unknown.`io-error`: the operation fails for some other reason. 


## file:write-text-lines

file:write-text-lines($path as xs:string, $values as xs:string*) as empty-sequence()
file:write-text-lines($path as xs:string, $values as xs:string*, $encoding as xs:string) as empty-sequence()

:   Writes a sequence of strings to the specified file, each followed by the system specific newline character. If the file already exists, it will be overwritten.The optional parameter `$encoding` defines the output encoding (default: UTF-8). 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`unknown-encoding`: the specified encoding is not supported, or unknown.`io-error`: the operation fails for some other reason. 


## file:append

file:append($path as xs:string, $items as item()*) as empty-sequence()
file:append($path as xs:string, $items as item()*, $params as item()) as empty-sequence()

:   Appends a serialized sequence of items to the specified file. If the file does not exists, a new file is created. 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`io-error`: the operation fails for some other reason. 


## file:append-binary

file:append-binary($path as xs:string, $value as xs:anyAtomicType) as empty-sequence()

:   Appends a binary item (xs:base64Binary, xs:hexBinary) to the specified file. If the file does not exists, a new one is created. 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`io-error`: the operation fails for some other reason. 


## file:append-text

file:append-text($path as xs:string, $value as xs:string) as empty-sequence()
file:append-text($path as xs:string, $value as xs:string, $encoding as xs:string) as empty-sequence()

:   Appends a string to a file specified by `$path`. If the specified file does not exists, a new file is created.The optional parameter `$encoding` defines the output encoding (default: UTF-8). 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`unknown-encoding`: the specified encoding is not supported, or unknown.`io-error`: the operation fails for some other reason. 


## file:append-text-lines

file:append-text-lines($path as xs:string, $values as xs:string*) as empty-sequence()
file:append-text-lines($path as xs:string, $values as xs:string*, $encoding as xs:string) as empty-sequence()

:   Appends a sequence of strings to the specified file, each followed by the system specific newline character. If the specified file does not exists, a new file is created.The optional parameter `$encoding` defines the output encoding (default: UTF-8). 

    **Errors**


    `no-dir`: the parent of specified path is no directory.`is-dir`: the specified path is a directory.`unknown-encoding`: the specified encoding is not supported, or unknown.`io-error`: the operation fails for some other reason. 


## file:copy

file:copy($source as xs:string, $target as xs:string) as empty-sequence()

:   Copies a file or directory specified by `$source` to the file or directory specified by `$target`. If the target file already exists, it will be overwritten. No operation will be performed if the source and target path are equal. 

    **Errors**


    `not-found`: the specified source does not exist.`exists`: the specified source is a directory and the target is a file.`no-dir`: the parent of the specified target is no directory.`io-error`: the operation fails for some other reason. 


## file:move

file:move($source as xs:string, $target as xs:string) as empty-sequence()

:   Moves or renames the file or directory specified by `$source` to the path specified by `$target`. If the target file already exists, it will be overwritten. No operation will be performed if the source and target path are equal. 

    **Errors**


    `not-found`: the specified source does not exist.`exists`: the specified source is a directory and the target is a file.`no-dir`: the parent of the specified target is no directory.`io-error`: the operation fails for some other reason. 

 
# File Properties

## file:exists

file:exists($path as xs:string) as xs:boolean

:   Returns an `xs:boolean` indicating whether a file or directory specified by `$path` exists in the file system. 


## file:is-dir

file:is-dir($path as xs:string) as xs:boolean

:   Returns an `xs:boolean` indicating whether the argument `$path` points to an existing directory. 


## file:is-file

file:is-file($path as xs:string) as xs:boolean

:   Returns an `xs:boolean` indicating whether the argument `$path` points to an existing file. 


## file:last-modified

file:last-modified($path as xs:string) as xs:dateTime

:   Retrieves the timestamp of the last modification of the file or directory specified by `$path`. 

    **Errors**


    `not-found`: the specified path does not exist. 


## file:size

file:size($file as xs:string) as xs:integer

:   Returns the size, in bytes, of the file specified by `$path`, or `0` for directories. 

    **Errors**


    `not-found`: the specified file does not exist. 

 
# Path Functions

## file:name

file:name($path as xs:string) as xs:string

:   Returns the name of a file or directory specified by `$path`. An empty string is returned if the path points to the root directory. 


## file:parent

file:parent($path as xs:string) as xs:string?

:   Returns the absolute path to the parent directory of a file or directory specified by `$path`. An empty sequence is returned if the path points to a root directory.The inverse function is [file:children](File Module.md#file-children). 

    **Examples**


    * `file:parent(static-base-uri())`  returns the directory of the current XQuery module. 


## file:path-to-native

file:path-to-native($path as xs:string) as xs:string

:   Transforms the `$path` argument to its native representation on the operating system. 

    **Errors**


    `not-found`: the specified file does not exist.`io-error`: the specified path cannot be transformed to its native representation. 


## file:resolve-path

file:resolve-path($path as xs:string) as xs:string

:   Transforms the `$path` argument to an absolute operating system path. 


## file:path-to-uri

file:path-to-uri($path as xs:string) as xs:string

:   Transforms the path specified by `$path` into a URI with the `file://` scheme. 

 
# System Properties

## file:dir-separator

file:dir-separator() as xs:string

:   Returns the directory separator used by the operating system, such as `/` or `\`. 


## file:path-separator

file:path-separator() as xs:string

:   Returns the path separator used by the operating system, such as `;` or `:`. 


## file:line-separator

file:line-separator() as xs:string

:   Returns the line separator used by the operating system, such as `&#10;`, `&#13;&#10;` or `&#13;`. 


## file:temp-dir

file:temp-dir() as xs:string

:   Returns the system’s default temporary-file directory. 


## file:current-dir

Introduced with Version 8.0:


file:current-dir() as xs:string

:   Returns the current working directory. - This function returns the same result as the function call `file:resolve-path()`<nulli/> </td> 


## file:base-dir

Introduced with Version 8.0:


file:base-dir() as xs:string?

:   Returns the parent directory of the static base URI. If the Base URI property is undefined, the empty sequence is returned. - If a static base URI exists, and if points to a local file path, this function returns the same result as the expression `file:parent(static-base-uri())`. 

 
# Errors

**Code ** | Description 
--------- | ------------
`not-found` | A specified path does not exist. 
`invalid-path` | A specified path is invalid. 
`exists` | A file with the same path already exists. 
`no-dir` | The specified path does not point to a directory. 
`is-dir` | The specified path is a directory. 
`unknown-encoding` | The specified encoding is not supported, or unknown. 
`out-of-range` | The specified offset or length is negative, or the chosen values would exceed the file bounds. 
`io-error` | The operation fails for some other reason specific to the operating system. 
 
# Changelog
** Version 8.0 **

 * Added: [file:current-dir](File Module.md#file-current-dir), [file:base-dir](File Module.md#file-base-dir), [file:children](File Module.md#file-children)
** Version 7.8 **

 * Added: [file:parent](File Module.md#file-parent), [file:name](File Module.md#file-name)
 * Updated: error codes; [file:read-binary](File Module.md#file-read-binary), [file:write-binary](File Module.md#file-write-binary): `$offset` and `$length` arguments added. 
 * Deleted: file:base-name, file:dir-name 
** Version 7.7 **

 * Added: [file:create-temp-dir](File Module.md#file-create-temp-dir), [file:create-temp-file](File Module.md#file-create-temp-file), [file:temp-dir](File Module.md#file-temp-dir)
 * Updated: all returned strings that refer to existing directories will be suffixed with a directory separator. 
** Version 7.3 **

 * Added: [file:append-text](File Module.md#file-append-text), [file:write-text](File Module.md#file-write-text), [file:append-text-lines](File Module.md#file-append-text-lines), [file:write-text-lines](File Module.md#file-write-text-lines), [file:line-separator](File Module.md#file-line-separator)
 * Aligned with latest specification: $file:directory-separator → [file:dir-separator](File Module.md#file-dir-separator), $file:path-separator → [file:path-separator](File Module.md#file-path-separator), file:is-directory → [file:is-dir](File Module.md#file-is-dir), file:create-directory → [file:create-dir](File Module.md#file-create-dir)
 * Updated: [file:write-binary](File Module.md#file-write-binary), [file:append-binary](File Module.md#file-append-binary): output limited to a single value 
** Version 7.2.1 **

 * Updated: [file:delete](File Module.md#file-delete): `$recursive` parameter added to prevent sub-directories from being accidentally deleted. 
 * Fixed: [file:list](File Module.md#file-list) now returns relative instead of absolute paths. 
