
# Events
 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). it presents how to trigger database events and notify listening clients. 

 
## Introduction

The events feature enables users with admin permissions to create events, which can then be watched by other clients. All clients that have registered for an event will be notified if an event is triggered by another client. 


### Managing Events
** CREATE EVENT [name] **

** DROP EVENT [name] **

** SHOW EVENTS **


### Watching/Unwatching Events

The events can currently be watched by the [Java](https://github.com/BaseXdb/basex-api/tree/master/src/main/java) and [C#](https://github.com/BaseXdb/basex-api/tree/master/src/main/c%23) clients. See the following Java code example: 


**Watch events:**


    // name of the event
    String event = "call";
    // create new client
    BaseXClient client = new BaseXClient("localhost", 1984, "admin", "admin");
    // register for an event
    client.watch(event, new EventNotifier() {
      @Override
      public void notify(final String value) {
        System.out.println("Received data: " + value);
      }
    });


**Unwatch events:**


    // unregister from an event
    client.unwatch(event);


For a complete and self-contained example in Java, you may have a look [[1]](https://github.com/BaseXdb/basex-examples/blob/master/src/main/java/org/basex/examples/api/EventExample.java). 


### Firing Events

Events are triggered via the XQuery function `db:event()`: 


    db:event($name as xs:string, $query as item())


Executes a `$query` and sends the resulting value to all clients watching the event with the specified `$name`. No event will be sent to the client that fired the event. 


### Example Scenarios

#### Basic
1. **Client1**  creates an event with the name "EVENT"
2. **Client2**  and **Client3** call the watch method for event "EVENT"
3. **Client1**  executes XQuery 
4. **Client2**  and **Client3** will receive the result `1 2`
5. **Client2**  executes XQuery 
6. **Client3**  will receive the result `2 3`

#### Included in Update Expression
1. **Client1**  creates an event with the name "DELETED"
2. **Client2**  and **Client3** call the watch method for event "DELETED"
3. **Client1**  executes XQuery 
4. **Client2**  and **Client3** will receive the deleted nodes. 

#### Included in Update Expression with Payload
1. **Client1**  creates an event with the name "DELETED"
2. **Client2**  and **Client3** call the watch method for event "DELETED"
3. **Client1**  executes XQuery 
4. **Client2**  and **Client3** will receive the message with the payload and the deleted nodes. 
