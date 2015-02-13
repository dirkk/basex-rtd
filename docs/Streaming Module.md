 


 
This [XQuery Module](Module Library.md) contains functions for handling _streamable_ items. 

 
In contrast to standard XQuery items, a streamable item contains only a reference to the actual data. The data itself will be retrieved if it is requested by an expression, or if the item is to be serialized. Hence, a streamable item only uses a few bytes, and no additional memory is occupied during serialization. 

 
The following BaseX functions return streamable items: 

  * Streamable Base64 binaries: 
  * Streamable strings: 
 
Some functions are capable of consuming items in a _streamable_ fashion: data will never be cached, but instead passed on to another target (file, the calling expression, etc.). The following streaming functions are currently available: 

  * `convert:binary-to-bytes`
 * `db:store`
 * `file:write-binary`
 * `file:write-text`
 
The XQuery expression below serves as an example on how large files can be downloaded and written to a file with constant memory consumption: 

 
    file:write-binary('output.data', fetch:binary('http://files.basex.org/xml/xmark111mb.zip'))

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/stream` namespace, which is statically bound to the `stream` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## stream:materialize

Updated with Version 8.0: Extended to sequences. 


stream:materialize($value as item()*) as item()*

:   Returns a materialized instance of the specified `$value`:  * if an item is streamable, its value will be retrieved, and a new item containing the value will be returned. 


## stream:is-streamable

stream:is-streamable($item as item()) as item()

:   Checks whether the specified `$item` is streamable. 

 
# Changelog
** Version 8.0 **

 * Update: [stream:materialize](Streaming Module.md#stream-materialize) extended to sequences. 

This module was introduced with Version 7.7. 

