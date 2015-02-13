 


 
This [XQuery Module](Module Library.md) provides functions that perform different hash operations. 

 
# Conventions

All functions in this module are assigned to the `http://basex.org/modules/hash` namespace, which is statically bound to the `hash` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
# Functions

## hash:md5

hash:md5($value as xs:anyAtomicType) as xs:base64Binary

:   Computes the MD5 hash of the given `$value`, which may be of type xs:string, xs:base64Binary, or xs:hexBinary. 

    **Errors**


    `FORG0006`: the specified value is neither a string nor a binary item. 

    **Examples**


    * `xs:hexBinary(hash:md5("BaseX"))`  returns `0D65185C9E296311C0A2200179E479A2`. 
    * `hash:md5(xs:base64Binary(""))`  returns `1B2M2Y8AsgTpgAmY7PhCfg==`. 


## hash:sha1

hash:sha1($value as xs:anyAtomicType) as xs:base64Binary

:   Computes the SHA-1 hash of the given `$value`, which may be of type xs:string, xs:base64Binary, or xs:hexBinary. 

    **Errors**


    `FORG0006`: the specified value is neither a string nor a binary item. 

    **Examples**


    * `xs:hexBinary(hash:sha1("BaseX"))`  returns `3AD5958F0F27D5AFFDCA2957560F121D0597A4ED`. 
    * `hash:sha1(xs:base64Binary(""))`  returns `2jmj7l5rSw0yVb/vlWAYkK/YBwk=`. 


## hash:sha256

hash:sha256($value as xs:anyAtomicType) as xs:base64Binary

:   Computes the SHA-256 hash of the given `$value`, which may be of type xs:string, xs:base64Binary, or xs:hexBinary. 

    **Errors**


    `FORG0006`: the specified value is neither a string nor a binary item. 

    **Examples**


    * `xs:hexBinary(hash:sha256("BaseX"))`  returns `15D570763DEB75D728BB69643392873B835CCCC94A2F1E881909DA47662821A3`. 
    * `hash:sha256(xs:base64Binary(""))`  returns `47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=`. 


## hash:hash

hash:hash($value as xs:anyAtomicType, $algorithm as xs:string) as xs:base64Binary

:   Computes the hash of the given `$value`, using the specified `$algorithm`. The specified values may be of type xs:string, xs:base64Binary, or xs:hexBinary.The following three algorihms are supported: `MD5`, `SHA-1`, and `SHA-256`. 

    **Errors**


    `HASH0001`: the specified hashing algorithm is unknown.`FORG0006`: the specified value is neither a string nor a binary item. 

    **Examples**


    * `xs:hexBinary(hash:md5("", "MD5"))`  returns `D41D8CD98F00B204E9800998ECF8427E`. 
    * `hash:md5("", "")`  raises an error. 

 
# Errors

**Code ** | Description 
--------- | ------------
`HASH0001` | The specified hash algorithm is unknown. 
 
# Changelog

The module was introduced with Version 7.3. 

