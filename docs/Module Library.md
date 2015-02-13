 


 
This article is part of the [XQuery Portal](XQuery.md). 

 
In addition to the standard [XQuery Functions](http://www.w3.org/TR/xpath-functions-30/), BaseX offers further function modules, which are listed in the following table. The module namespaces are statically bound, which means that they need not (but may) be explicitly declared in the query prolog. 

 
** Module ** | ** Description ** | ** Prefix ** | ** Namespace URI **
------------ | ----------------- | ------------ | -------------------
[Admin](Admin Module.md) |  Functions restricted to admin users.  | `admin` | `http://basex.org/modules/admin`
[Archive](Archive Module.md) |  Creating and processing ZIP archives.  | `archive` | `http://basex.org/modules/archive`
[Array](Array Module.md) |  Functions for handling arrays. Introduced with Version 8.0 | `array` | `http://www.w3.org/2005/xpath-functions/array`
[Binary](Binary Module.md) |  Processing binary data.  | `bin` | `http://expath.org/ns/binary`
[Client](Client Module.md) |  Executing commands and queries on remote BaseX servers.  | `client` | `http://basex.org/modules/client`
[Conversion](Conversion Module.md) |  Converting data (binary, numeric) to other formats.  | `convert` | `http://basex.org/modules/convert`
[Cryptography](Cryptographic Module.md) |  Cryptographic functions, based on the [EXPath Cryptograhic](http://expath.org/spec/crypto) module.  | `crypto` | `http://expath.org/ns/crypto`
[CSV](CSV Module.md) |  Functions for processing CSV input.  | `csv` | `http://basex.org/modules/csv`
[Database](Database Module.md) |  Functions for accessing and updating databases.  | `db` | `http://basex.org/modules/db`
[Fetch](Fetch Module.md) |  Functions for fetching resources identified by URIs.  | `fetch` | `http://basex.org/modules/fetch`
[File](File Module.md) |  File handling, based on the latest draft of the [EXPath File](http://expath.org/spec/file) module.  | `file` | `http://expath.org/ns/file`
[Full-Text](Full-Text Module.md) |  Functions for performing full-text operations.  | `ft` | `http://basex.org/modules/ft`
[Hashing](Hashing Module.md) |  Cryptographic hash functions.  | `hash` | `http://basex.org/modules/hash`
[Higher-Order](Higher-Order Functions Module.md) |  Additional higher-order functions that are not in the standard libraries.  | `hof` | `http://basex.org/modules/hof`
[HTML](HTML Module.md) |  Functions for converting HTML input to XML documents.  | `html` | `http://basex.org/modules/html`
[HTTP](HTTP Module.md) |  Sending HTTP requests, based on the [EXPath HTTP](http://expath.org/spec/http-client) module.  | `http` | `http://expath.org/ns/http-client`
[Index](Index Module.md) |  Functions for requesting details on database indexes.  | `index` | `http://basex.org/modules/index`
[Inspection](Inspection Module.md) |  Functions for extracting internal module information.  | `inspect` | `http://basex.org/modules/inspect`
[JSON](JSON Module.md) |  Parsing and serializing [JSON documents](http://www.json.org).  | `json` | `http://basex.org/modules/json`
[Map](Map Module.md) |  Functions for handling maps (key/value pairs).  | `map` | `http://www.w3.org/2005/xpath-functions/map`
[Math](Math Module.md) |  Mathematical operations, extending the [W3C Working Draft](http://www.w3.org/TR/xpath-functions-30/).  | `math` | `http://www.w3.org/2005/xpath-functions/math`
[Output](Output Module.md) |  Functions for simplifying formatted output.  | `out` | `http://basex.org/modules/out`
[Process](Process Module.md) |  Executing system commands from XQuery.  | `proc` | `http://basex.org/modules/proc`
[Profiling](Profiling Module.md) |  Functions for profiling code snippets.  | `prof` | `http://basex.org/modules/prof`
[Random](Random Module.md) |  Functions for creating random numbers.  | `random` | `http://basex.org/modules/random`
[Repository](Repository Module.md) |  Installing, deleting and listing packages.  | `repo` | `http://basex.org/modules/repo`
[SQL](SQL Module.md) |  JDBC bridge to access relational databases.  | `sql` | `http://basex.org/modules/sql`
[Streaming](Streaming Module.md) |  Functions for handling streamable items.  | `stream` | `http://basex.org/modules/stream`
[Unit](Unit Module.md) |  Unit testing framework.  | `unit` | `http://basex.org/modules/unit`
[User](User Module.md) |  Creating and administering database users. Introduced with Version 8.0 | `user` | `http://basex.org/modules/user`
[Validation](Validation Module.md) |  Validating documents against DTDs or XML Schema files.  | `validate` | `http://basex.org/modules/validate`
[XQuery](XQuery Module.md) |  Evaluating new XQuery expressions at runtime.  | `xquery` | `http://basex.org/modules/xquery`
[XSLT](XSLT Module.md) |  Stylesheet transformations, based on Java’s and Saxon’s XSLT processor.  | `xslt` | `http://basex.org/modules/xslt`
[ZIP](ZIP Module.md) |  ZIP functionality, based on the [EXPath ZIP](http://expath.org/spec/zip) module (soon obsolete).  | `zip` | `http://expath.org/ns/zip`
 
For the following web application modules, the `basex-api` package must be included in the classpath and the modules must be imported in the query prolog. This is automatically the case if you use one of the complete distributions (zip, exe, war) of BaseX: 

 
** Module ** | ** Description ** | ** Prefix ** | ** Namespace URI **
------------ | ----------------- | ------------ | -------------------
[Geo](Geo Module.md) |  Functions for processing geospatial data.  | `geo` | `http://expath.org/ns/geo`
[Request](Request Module.md) |  Server-side functions for handling HTTP Request data.  | `request` | `http://exquery.org/ns/request`
[RESTXQ](RESTXQ Module.md) |  Helper functions for the RESTXQ API.  | `rest` | `http://exquery.org/ns/restxq`
[Session](Session Module.md) |  Functions for handling server-side HTTP Sessions.  | `session` | `http://basex.org/modules/session`
[Sessions](Sessions Module.md) |  Functions for managing all server-side HTTP Sessions.  | `sessions` | `http://basex.org/modules/sessions`
