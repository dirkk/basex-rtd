
# Binary Data
 


 
This page is linked from the [Database](Databases.md) page. 

 
The BaseX store also provides support for _raw files_ (binary data). A database may contain both XML documents and raw files. XML and binary data is handled in a uniform way: a unique database path serves as key, and the contents can be retrieved via database commands, XQuery, or the various APIs. 

 
## Storage

XML documents are stored in a proprietary format to speed up XPath axis traversals and update operations, and raw data is stored in its original format in a dedicated sub-directory (called `"raw"`). Several reasons exist why we did not extend our existing storage to binary data: 

 * **Good Performance** : the file system generally performs very well when it comes to the retrieval and update of binary files. 
 * **Key/Value Stores** : we do not want to compete with existing key/value database solutions. Again, this is not what we are after. 
 * **Our Focus** : our main focus is the efficient storage of hierarchical data structures and file formats such as XML or (more and more) JSON. The efficient storage of arbitrary binary resources would introduce many new challenges that would distract us from more pressing tasks. 

For some use cases, the chosen database design may bring along certain limitations: 

 * **Performance Limits** : most file system are not capable of handling thousands or millions of binary resources in a single directory in an efficient way. The same problem happens if you have a large number of XML documents that need to imported in or exported from a BaseX database. The general solution to avoid this bottleneck is to distribute the relevant binaries in additional sub-directories. 
 * **Keys** : if you want to use arbitrary keys for XML and binary resources, which are not supported by the underlying file system, you may either add an XML document in your database that contains all key/path mappings. 

In the latter case, a key/value store might be the better option anyway. 


### Usage

More information on how to store, retrieve, update and export binary data is found in the general [Database](Databases.md) documentation. 

