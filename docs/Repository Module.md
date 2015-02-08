
# Repository Module
 


 
This [XQuery Module](Module Library.md) contains functions for installing, listing and deleting modules contained in the [Repository](Repository.md). 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/repo` namespace, which is statically bound to the `repo` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. 

 
## Functions

### repo:install

`repo:install($path as xs:string) as empty-sequence()`

Installs a package or replaces an existing package. The parameter `$path` indicates the path to the package. 

**Errors**

`BXRE0001`: the package does not exist.`BXRE0002`: a package uses an invalid namespace URI.`BXRE0003`: the package to be installed requires a package which is still not installed.`BXRE0004`: the package descriptor is invalid.`BXRE0005`: the module contained in the package to be installed is already installed as part of another package.`BXRE0006`: the package cannot be parsed.`BXRE0009`: the package version is not supported.`BXRE0010`: the package contains an invalid JAR descriptor.`BXRE0011`: the package contains a JAR descriptor but it cannot be read. 

### repo:delete

`repo:delete($pkg as xs:string) as empty-sequence()`

Deletes a package. The parameter `$pkg` indicates either the package name as specified in the package descriptor or the name, suffixed with a hyphen and the package version. 

**Errors**

`BXRE0007`: the package cannot be deleted.`BXRE0008`: another package depends on the package to be deleted. 

### repo:list

`repo:list() as element(package)*`

Lists the names and versions of all currently installed packages. 

 
## Errors

**Code ** | Description 
--------- | ------------
`BXRE0001` | The addressed package does not exist. 
`BXRE0002` | A package uses an invalid namespace URI. 
`BXRE0003` | The package to be installed requires a package which is not installed yet. 
`BXRE0004` | The package descriptor is invalid. 
`BXRE0005` | The module contained in the package to be installed is already installed as part of another package. 
`BXRE0006` | The package cannot be parsed. 
`BXRE0007` | The package cannot be deleted. 
`BXRE0008` | Another package depends on the package to be deleted 
`BXRE0009` | The package version is not supported. 
`BXRE0010` | The package contains an invalid JAR descriptor. 
`BXRE0011` | The package contains a JAR descriptor but it cannot be read. 
 
## Changelog
UNKNOWN * Updated: [repo:install](Repository Module.md#repo-install): existing packages will be replaced 
 * Updated: [repo:delete](Repository Module.md#repo-delete): remove specific version of a package 
UNKNOWN * Updated: [repo:list](Repository Module.md#repo-list) now returns nodes 

The module was introduced with Version 7.1. 

