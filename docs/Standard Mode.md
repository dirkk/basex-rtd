
# Standard Mode
 


 
In the standard mode of the [Clients](Clients.md), a database command can be sent to the server using the `execute()` function of the `Session`. This functions returns the whole result. With the `info()` function, you can request some information on your executed process. If an error occurs, an exception with the error message will be thrown.

 
## Usage

The standard execution works as follows:

1. Create a new session instance with hostname, port, username and password. 
2. Call the `execute()` function of the session with the [database commands](Commands.md) as argument. 
3. Receive the result of a successfully executed command. If an error occurs, an exception is thrown. 
4. Optionally, call `info()` to get some process information 
5. Continue using the client (back to 2.), or close the session. 

### Example in PHP

Taken from our [repository](https://github.com/BaseXdb/basex-api/blob/master/src/main/php/Example.php): 


    <?php
    /*
     * This example shows how database commands can be executed.
     * Documentation: http://basex.org/api
     *
     * (C) BaseX Team 2005-11, BSD License
     */
    include("BaseXClient.php");
    try {
      // initialize timer
      $start = microtime(true);
      // create session
      $session = new Session("localhost", 1984, "admin", "admin");
      // perform command and print returned string
      print $session->execute("xquery 1 to 10");
      // close session
      $session->close();
      // print time needed
      $time = (microtime(true) - $start) * 1000;
      print "\n$time ms\n";
    } catch (Exception $e) {
      // print exception
      print $e->getMessage();
    }
    ?>

