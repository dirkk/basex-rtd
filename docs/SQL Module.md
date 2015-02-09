
# SQL Module
 


 
This [XQuery Module](Module Library.md) contains functions to access relational databases from XQuery using SQL. With this module, you can execute query, update and prepared statements, and the result sets are returned as sequences of XML elements representing tuples. Each element has children representing the columns returned by the SQL statement. 

 
## Conventions

All functions in this module are assigned to the `http://basex.org/modules/sql` namespace, which is statically bound to the `sql` prefix. All errors are assigned to the `http://basex.org/errors` namespace, which is statically bound to the `bxerr` prefix. This module uses JDBC to connect to a SQL server. Hence, you have to put the JDBC driver so that it is loaded into Basex. Most likely you want to put the connector into the `lib/` folder, where it will be automatically included. So to connect to MySQL, download the [Connector/J driver from their website](https://dev.mysql.com/downloads/connector/j/) and extract the archive into the `lib/` folder. 

 
## Functions

### sql:init

`sql:init($class as xs:string) as empty-sequence()`

This function initializes a JDBC driver specified via `$class`. This step might be superfluous if the SQL database is not embedded. 

**Errors**

`BXSQ0007`: the specified driver class is not found. 

### sql:connect

`sql:connect($url as xs:string) as xs:integer`
`sql:connect($url as xs:string, $user as xs:string, $password as xs:string) as xs:integer`
`sql:connect($url as xs:string, $user as xs:string, $password as xs:string, $options as item()) as xs:integer`

This function establishes a connection to a relational database. As a result a connection handle is returned. The parameter `$url` is the URL of the database and shall be of the form: `jdbc:<driver name>:[//<server>[/<database>]]`. If the parameters `$user` and `$password` are specified, they are used as credentials for connecting to the database. The `$options` parameter can be used to set connection options, which can either be specified  * as children of an `<sql:options/>` element, e.g.: 

    <sql:options>
      <sql:autocommit value='true'/>
      ...
    </sql:options>

 * as map, which contains all key/value pairs: 

    map { "autocommit": "true", ... }



**Errors**

`BXSQ0001`: an SQL exception occurs, e.g. missing JDBC driver or not existing relation. 

### sql:execute

Once a connection is established, the returned connection handle can be used to execute queries on the database. Our SQL module supports both direct queries and prepared statements. 


`sql:execute($connection as xs:integer, $query as xs:string) as element()*`

 This function executes a query or update statement. The parameter `$connection` specifies a connection handle. The parameter `$query` is a string representing an SQL statement. 

**Errors**

`BXSQ0001`: an SQL exception occurs, e.g. not existing relation is retrieved.  `BXSQ0002`: a wrong connection handle is passed. 

### sql:execute-prepared

`sql:execute-prepared($id as xs:integer, $params as element(sql:parameters)) as element()*`

 This function executes a prepared statement. The parameter `$id` specifies a prepared statement handle. The optional parameter `$params` is an element `<sql:parameters/>` representing the parameters for a prepared statement along with their types and values. The following schema shall be used: 
    element sql:parameters {
     element sql:parameter {
      attribute type { "int"|"string"|"boolean"|"date"|"double"|"float"|"short"|"time"|"timestamp" },
      attribute null { "true"|"false" }?,
      text }+ }?



**Errors**

`BXSQ0001`: an SQL exception occurs, e.g. not existing relation is retrieved.  `BXSQ0002`: a wrong prepared statement handle is passed. `BXSQ0003`: the number of `<sql:parameter/>` elements in `<sql:parameters/>` differs from the number of placeholders in the prepared statement. `BXSQ0004`: the type of a parameter for a prepared statement is not specified. `BXSQ0005`: an attribute different from `type` and `null` is set for a `<sql:parameter/>` element. `BXSQ0006`: a parameter is from type date, time or timestamp and its value is in an invalid format. 

### sql:prepare

`sql:prepare($connection as xs:integer, $statement as xs:string) as xs:integer`

This function prepares a statement and returns a handle to it. The parameter `$connection` indicates the connection handle to be used. The parameter `$statement` is a string representing an SQL statement with one or more '?' placeholders. If the value of a field has to be set to `NULL`, then the attribute `null` of the element `<sql:parameter/>` has to be `true`. 

**Errors**

`BXSQ0001`: an SQL exception occurs.  `BXSQ0002`: a wrong connection handle is passed. 

### sql:commit

`sql:commit($connection as xs:integer) as empty-sequence()`

 This function commits the changes made to a relational database. `$connection` specifies the connection handle. 

**Errors**

`BXSQ0001`: an SQL exception occurs.  `BXSQ0002`: a wrong connection handle is passed. 

### sql:rollback

`sql:rollback($connection as xs:integer) as empty-sequence()`

 This function rolls back the changes made to a relational database. `$connection` specifies the connection handle. 

**Errors**

`BXSQ0001`: an SQL exception occurs.  `BXSQ0002`: a wrong connection handle is passed. 

### sql:close

`sql:close($connection as xs:integer) as empty-sequence()`

 This function closes a connection to a relational database. `$connection` specifies the connection handle. 

**Errors**

`BXSQ0001`: an SQL exception occurs.  `BXSQ0002`: a wrong connection handle is passed. 
 
## Examples

### Direct queries

A simple select statement can be executed on the following way: 


    let $conn := sql:connect("jdbc:postgresql://localhost:5432/coffeehouse")
    return sql:execute($conn, "SELECT * FROM coffees WHERE price < 10")


The result will look like: 


    <sql:row xmlns:sql="http://basex.org/modules/sql">
      <sql:column name="cof_name">French_Roast</sql:column>
      <sql:column name="sup_id">49</sql:column>
      <sql:column name="price">9.5</sql:column>
      <sql:column name="sales">15</sql:column>
      <sql:column name="total">30</sql:column>
    </sql:row>
    <sql:row xmlns:sql="http://basex.org/modules/sql">
      <sql:column name="cof_name">French_Roast_Decaf</sql:column>
      <sql:column name="sup_id">49</sql:column>
      <sql:column name="price">7.5</sql:column>
      <sql:column name="sales">10</sql:column>
      <sql:column name="total">14</sql:column>
    </sql:row>
    <sql:row xmlns:sql="http://basex.org/modules/sql">
      <sql:column name="cof_name">Colombian_Decaf</sql:column>
      <sql:column name="sup_id">101</sql:column>
      <sql:column name="price">8.75</sql:column>
      <sql:column name="sales">6</sql:column>
      <sql:column name="total">12</sql:column>
      <sql:column name="date">2010-10-10 13:56:11.0</sql:column>
    </sql:row>


### Prepared Statements

A prepared select statement can be executed in the following way: 


    (: Establish a connection :)
    let $conn := sql:connect("jdbc:postgresql://localhost:5432/coffeehouse")
    (: Obtain a handle to a prepared statement :)
    let $prep := sql:prepare($conn, "SELECT * FROM coffees WHERE price < ? AND cof_name = ?")
    (: Values and types of prepared statement parameters :)
    let $params := <sql:parameters>
                    <sql:parameter type='double'>10</sql:parameter>
                    <sql:parameter type='string'>French_Roast</sql:parameter>
                   </sql:parameters>
    (: Execute prepared statement :)
    return sql:execute-prepared($prep, $params)


### SQLite

The following expression demonstrates how SQLite can be addressed using the [Xerial SQLite JDBC driver](http://bitbucket.org/xerial/sqlite-jdbc): 


    (: Initialize driver :)
    sql:init("org.sqlite.JDBC"),
    (: Establish a connection :)
    let $conn := sql:connect("jdbc:sqlite:database.db")
    return (
      (: Create a new table :)
      sql:execute($conn, "drop table if exists person"),
      sql:execute($conn, "create table person (id integer, name string)"),
      (: Run 10 updates :)
      for $i in 1 to 10
      let $q := "insert into person values(" || $i || ", '" || $i || "')"
      return sql:execute($conn, $q),
      (: Return table contents :)
      sql:execute($conn, "select * from person"),
      sql:close($conn)
    )

 
## Errors

**Code ** | Description 
--------- | ------------
`BXSQ0001` | An SQL exception occurred (e.g.: a non-existing relation is retrieved). 
`BXSQ0002` | A wrong connection handle or prepared statement handle is passed. 
`BXSQ0003` | The number of `<sql:parameter/>` elements in `<sql:parameters/>` differs from the number of placeholders in the prepared statement. 
`BXSQ0004` | The type of a parameter for a prepared statement is not specified. 
`BXSQ0005` | An attribute different from `type` and `null` is set for a `<sql:parameter/>` element. 
`BXSQ0006` | A parameter is from type date, time or timestamp and its value is in an invalid format. 
`BXSQ0007` | A specified database driver class is not found. 
 
## Changelog
** Version 7.5 **

 * Updated: prepared statements are now executed via [sql:execute-prepared](SQL Module.md#sql-execute-prepared)

The module was introduced with Version 7.0. 

