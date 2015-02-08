
# Cryptographic Module
 


 
This [XQuery Module](Module Library.md) contains functions to perform cryptographic operations in XQuery. The cryptographic module is based on an early draft of the [EXPath Cryptographic Module](http://expath.org/spec/crypto) and provides the following functionality: creation of message authentication codes (HMAC), encryption and decryption, and creation and validation of XML Digital Signatures. 

 
## Conventions

All functions in this module are assigned to the `http://expath.org/ns/crypto` namespace, which is statically bound to the `crypto` prefix. All errors are assigned to the `http://expath.org/ns/error` namespace, which is statically bound to the `experr` prefix. 

 
## Message Authentication

### crypto:hmac

`crypto:hmac($message as xs:string, $key as xs:string, $algorithm as xs:string) as xs:string`
`crypto:hmac($message as xs:string, $key as xs:string, $algorithm as xs:string, $encoding as xs:string) as xs:string`

Creates a message authentication code via a cryptographic hash function and a secret `$key`.  `$encoding` must either be `hex`, `base64` or the empty string and specifies the encoding of the returned authentication code. **Default is `base64`**. `$algorithm` describes the hash algorithm which is used for encryption. Currently supported are `md5`, `sha1`, `sha256`, `sha384`, `sha512`. **Default is `md5`**. 

**Errors**

`CX0013`: the specified hashing algorithm is not supported.`CX0014`: the specified encoding method is not supported.`CX0019`: the specified secret key is invalid. 
 
## Encryption & Decryption

The encryption and decryption functions underlie several limitations: 

 * Cryptographic algorithms are currently limited to `symmetric` algorithms only. This means that the same secret key is used for encryption and decryption. 
 * Available algorithms are `DES` and `AES`. 
 * Padding is fixed to `PKCS5Padding`. 
 * The result of an encryption using the same message, algorithm and key looks different each time it is executed. This is due to a random initialization vector (IV) which is appended to the message and simply increases security. 
 * As the IV has to be passed along with the encrypted message somehow, data which has been encrypted by the `crypto:encrypt` function in BaseX can only be decrypted by calling the `crypto:decrypt` function. 

### crypto:encrypt

`crypto:encrypt($input as xs:string, $encryption as xs:string, $key as xs:string, $algorithm as xs:string) as xs:string`

Encrypts the given input string.  `$encryption` must be `symmetric`, as asymmetric encryption is not supported so far. **Default is `symmetric`**. `$key` is the secret key which is used for both encryption and decryption of input data. Its length is fixed and depends on the chosen algorithm: `8 bytes for DES`, `16 bytes for AES`. `$algorithm` must either be `DES` or `AES`. Other algorithms are not supported so far, but, of course, can be added on demand. **Default is `DES`**. 

**Errors**

`CX0016`: padding problems arise.`CX0017`: padding is incorrect.`CX0018`: the encryption type is not supported.`CX0019`: the secret key is invalid.`CX0020`: the block size is incorrect.`CX0021`: the specified encryption algorithm is not supported. 

### crypto:decrypt

`crypto:decrypt($input as xs:string, $type as xs:string, $key as xs:string, $algorithm as xs:string) as xs:string`

Decrypts the encrypted `$input`.  `$type` must be `symmetric`. An option for asymmetric encryption will most likely be added with another version of BaseX. **Default is `symmetric`**. `$key` is the secret key which is used for both encryption and decryption of input data. Its length is fixed and depends on the chosen algorithm: `8 bytes for DES`, `16 bytes for AES`. `$algorithm` must either be `DES` or `AES`. Other algorithms are not supported so far, but, of course, can be added on demand. **Default is `DES`**. 

**Errors**

`CX0016`: padding problems arise.`CX0017`: padding is incorrect.`CX0018`: the encryption type is not supported.`CX0019`: the secret key is invalid.`CX0020`: the block size is incorrect.`CX0021`: the specified encryption algorithm is not supported. 
 
## XML Signatures

[XML Signatures](http://www.w3.org/TR/xmldsig-core/) are used to sign data. In our case, the data which is signed is an XQuery node. The following example shows the basic structure of an XML signature. 


**XML Signature**


    <Signature>
      <SignedInfo>
        <CanonicalizationMethod/>
        <SignatureMethod/>
        <Reference>
          <Transforms/>
          <DigestMethod/>
          <DigestValue/>
        </Reference>
        <Reference/>
      </SignedInfo>
      <SignatureValue/>
      <KeyInfo/>
      <Object/>
    </Signature>

 * **SignedInfo**  contains or references the signed data and lists algorithm information 
 * **Reference**  references the signed node 
 * **Transforms**  contains transformations (i.e. XPath expressions) that are applied to the input node in order to sign a subset 
 * **DigestValue**  holds digest value of the transformed references 
 * **SignatureValue**  contains the Base64 encoded value of the encrypted digest of the `SignedInfo` element 
 * **KeyInfo**  provides information on the key that is used to validate the signature 
 * **Object**  contains the node which is signed if the signature is of type `enveloping`

**Signature Types**


Depending on the signature type, the `signature` element is either placed as a child of the signed node (`enveloped` type), or directly contains the signed node (`enveloping` type). `Detached` signatures are so far not supported. 


**Digital Certificate**


The `generate-signature` function allows to pass a `digital certificate`. This certificate holds parameters that allow to access key information stored in a Java key store which is then used to sign the input document. Passing a `digital certificate` simply helps re-using the same key pair to sign and validate data. The `digital certificate` is passed as a node and has the following form: 


    <digital-certificate>
      <keystore-type>JKS</keystore-type>
      <keystore-password>...</keystore-password>
      <key-alias>...</key-alias>
      <private-key-password>...</private-key-password>
      <keystore-uri>...</keystore-uri>
    </digital-certificate>


### crypto:generate-signature

`crypto:generate-signature($input as node(), $canonicalization as xs:string, $digest as xs:string, $signature as xs:string, $prefix as xs:string, $type as xs:string) as node()`
`crypto:generate-signature($input as node(), $canonicalization as xs:string, $digest as xs:string, $signature as xs:string, $prefix as xs:string, $type as xs:string, $xpath as xs:string, $certificate as node()) as node()`
`crypto:generate-signature($input as node(), $canonicalization as xs:string, $digest as xs:string, $signature as xs:string, $prefix as xs:string, $type as xs:string, $ext as item()) as node()`

`$canonicalization` must either be `inclusive-with-comments`, `inclusive`, `exclusive-with-comments` or `exclusive`. **Default is `inclusive-with-comments`**.  `$digest` must be one of the following: `SHA1`, `SHA256` or `SHA512`. **Default is `SHA1`**. `$signature` must either be `RSA_SHA1` or `DSA_SHA1`. **Default is `RSA_SHA1`**. `$prefix` may be empty and prefixes the `Signature` element accordingly. `$type` is the signature type. It must either be `enveloped` or `enveloping` (detached signatures are not supported so far). **Default is `enveloped`**. `$xpath` is an arbitrary XPath expression which specifies a subset of the document that is to be signed. `$certificate` is the digitial certificate used to sign the input document. `$ext` may either be an `$xpath` expression or a `$certificate`. 

**Errors**

`CX0001`: the canonicalization algorithm is not supported.`CX0002`: the digest algorithm is not supported.`CX0003`: the signature algorithm is not supported.`CX0004`: the `$xpath-expression` is invalid.`CX0005`: the root name of `$digital-certificate` is not 'digital-certificate.`CX0007`: the key store is null.`CX0012`: the key cannot be found in the specified key store.`CX0023`: the certificate alias is invalid.`CX0024`: an invalid algorithm is specified.`CX0025`: an exception occurs while the signing the document.`CX0026`: an exception occurs during key store initialization.`CX0027`: an IO exception occurs.`CX0028`: the signature type is not supported. 

### crypto:validate-signature

`crypto:validate-signature($input-doc as node()) as xs:boolean`

Checks if the given node contains a `Signature` element and whether the signature is valid. In this case `true` is returned. If the signature is invalid the function returns `false`. 

**Errors**

`CX0015`: the signature element cannot be found.`CX9994`: an unspecified problem occurs during validation.`CX9996`: an IO exception occurs during validation. 
 
## Errors

**Code ** | Description 
--------- | ------------
`CX0001` | The canonicalization algorithm is not supported. 
`CX0002` | The digest algorithm is not supported. 
`CX0003` | The signature algorithm is not supported. 
`CX0004` | The XPath expression is invalid. 
`CX0005` | The root element of argument $digital-certificate must have the name 'digital-certificate'. 
`CX0006` | The child element of argument $digital-certificate having position $position must have the name $child-element-name. 
`CX0007` | The keystore is null. 
`CX0008` | I/O error while reading keystore. 
`CX0009` | Permission denied to read keystore. 
`CX0010` | The keystore URL is invalid. 
`CX0011` | The keystore type is not supported. 
`CX0012` | Cannot find key for alias in given keystore. 
`CX0013` | The hashing algorithm is not supported. 
`CX0014` | The encoding method is not supported. 
`CX0015` | Cannot find Signature element. 
`CX0016` | No such padding. 
`CX0017` | Incorrect padding. 
`CX0018` | The encryption type is not supported. 
`CX0019` | The secret key is invalid. 
`CX0020` | Illegal block size. 
`CX0021` | The algorithm is not supported. 
`CX0023` | An invalid certificate alias is specified. Added to the official specification. 
`CX0024` | The algorithm is invalid. Added to the official specification. 
`CX0025` | Signature cannot be processed. Added to the official specification. 
`CX0026` | Keystore cannot be processed. Added to the official specification. 
`CX0027` | An I/O Exception occurred. Added to the official specification. 
`CX0028` | The specified signature type is not supported. Added to the official specification. 
 
## Changelog

The Module was introduced with Version 7.0. 

