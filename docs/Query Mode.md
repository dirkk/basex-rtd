
# Query Mode
 


 
The query mode of the [Clients](Clients.md) allows you to bind external variables to a query and evaluate the query in an iterative manner. The `query()` function of the `Session` instance returns a new query instance.

 
## Usage

The query execution works as follows: 

1. Create a new session instance with hostname, port, username and password. 
2. Call `query()` with your XQuery expression to get a query object. 
3. Optionally bind variables to the query with one of the `bind()` functions. 
4. Optionally bind a value to the context item via `context()`. 
5. Iterate through the query object with the `more()` and `next()` functions. 
6. As an alternative, call `execute()` to get the whole result at a time. 
7. `info()`  gives you information on query evaluation. 
8. `options()`  returns the query serialization parameters. 
9. Don't forget to close the query with `close()`. 

### PHP Example

Taken from our [repository](https://github.com/BaseXdb/basex-api/blob/master/src/main/php/QueryBindExample.php): 


    <?php
    /*
     * This example shows how queries can be executed in an iterative manner.
     * Documentation: http://basex.org/api
     *
     * (C) BaseX Team 2005-11, BSD License
     */
    include("BaseXClient.php");
    try {
      // create session
      $session = new Session("localhost", 1984, "admin", "admin");
      try {
        // create query instance
        $input = 'declare variable $name external; '.
          'for $i in 1 to 10 return element { $name } { $i }';
        $query = $session->query($input);
        // bind variable
        $query->bind("$name", "number");
        // print result
        print $query->execute()."\n";
        // close query instance
        $query->close();
      } catch (Exception $e) {
        // print exception
        print $e->getMessage();
      }
      // close session
      $session->close();
    } catch (Exception $e) {
      // print exception
      print $e->getMessage();
    }
    ?>

 
## Changelog
UNKNOWN * Added: `context()` function 
