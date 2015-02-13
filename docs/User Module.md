 


 
This [XQuery Module](Module Library.md) contains functions for creating and administering database users. The [User Management](User Management.md) article gives more information on database users and permissions. 

 
# Conventions

All functions in this module and errors are assigned to the `http://basex.org/modules/user` namespace, which is statically bound to the `user` prefix. 

 
# Functions

## user:list

user:list() as xs:string*

:   Returns the names of all registered users. 

    **Examples**


    * `user:list()`  returns all registered users. 


## user:list-details

user:list-details() as element(user)*
user:list-details($name as xs:string) as element(user)*

:   Returns an element sequence, containing all registered users and their permissions.In addition to the [SHOW USERS](Commands.md#SHOW_USERS) command, encoded password strings and database permissions will be output. A user `$name` can be specified to filter the results in advance. 

    **Errors**


    `unknown`: The specified user name is unknown. 

    **Examples**


    * By default, `user:list-details()` returns the following output: 
    <user name="admin" permission="admin">
    <password algorithm="digest">
    <hash>304bdfb0383c16f070a897fc1eb25cb4</hash>
    </password>
    <password algorithm="salted-sha256">
    <salt>871602799292195</salt>
    <hash>a065ca66fa3d6da5762c227587f1c8258c6dc08ee867e44a605a72da115dcb41</hash>
    </password>
    </user>


## user:exists

user:exists($name as xs:string) as xs:boolean

:   Checks if a user with the specified `$name` exists. 

    **Errors**


    `name`: The specified user name is invalid. 

    **Examples**


    * `user:exists('admin')`  will always yield true. 


## user:create

user:create($name as xs:string, $password as xs:string) as empty-sequence()
user:create($name as xs:string, $password as xs:string, $permission as xs:string) as empty-sequence()

:   Creates a new user with the specified `$name` and `$password`. The default permission `none` can be overwritten with the `$permission` argument. Existing users will be overwritten. 

    **Errors**


    `name`: The specified user name is invalid.`permission`: The specified permission is invalid.`admin`: The "admin" user cannot be modified.`logged-in`: The specified user is currently logged in.`update`: The operation can only be performed once per user or database pattern. 

    **Examples**


    * `user:create('John', '7e$j#!1', 'admin')`  creates a new user 'John' with admin permissions. 


## user:grant

user:grant($name as xs:string, $permission as xs:string) as empty-sequence()
user:grant($name as xs:string, $permission as xs:string, $pattern as xs:string) as empty-sequence()

:   Grants the specified `$permission` to a user with the specified `$name`. If a glob `$pattern` is specified, the permission will only be applied to databases matching that pattern. 

    **Errors**


    `unknown`: The specified user name is unknown.`name`: The specified user name is invalid.`pattern`: The specified database pattern is invalid.`permission`: The specified permission is invalid.`admin`: The "admin" user cannot be modified.`local`: A local permission can only be 'none', 'read' or 'write'.`logged-in`: The specified user is currently logged in.`update`: The operation can only be performed once per user or database pattern. 

    **Examples**


    * `user:grant('John', 'create')`  grants create permissions to the user 'John'. 
    * `user:grant('John', 'write', 'unit*')`  allows John to write to all databases starting with the letters 'unit'. 


## user:drop

user:drop($name as xs:string) as empty-sequence()
user:drop($name as xs:string, $pattern as xs:string) as empty-sequence()

:   Drops a user with the specified `$name`. If a glob `$pattern` is specified, only the database pattern will be dropped. 

    **Errors**


    `unknown`: The specified user name is unknown.`name`: The specified user name is invalid.`pattern`: The specified database pattern is invalid.`admin`: The "admin" user cannot be modified.`logged-in`: The specified user is currently logged in.`update`: The operation can only be performed once per user or database pattern.`conflict`: A user cannot be both altered and dropped. 

    **Examples**


    * `user:drop('John')`  drops the user 'John'. 
    * `user:grant('John', 'unit*')`  removes the 'unit*' database pattern. If John accesses any of these database, his global permission will be checked again. 


## user:alter

user:alter($name as xs:string, $newname as xs:string) as empty-sequence()

:   Renames a user with the specified `$name` to `$newname`. 

    **Errors**


    `unknown`: The specified user name is unknown.`name`: The specified user name is invalid.`admin`: The "admin" user cannot be modified.`logged-in`: The specified user is currently logged in.`update`: The operation can only be performed once per user or database pattern.`conflict`: A user cannot be both altered and dropped. 

    **Examples**


    * `user:rename('John', 'Jack')`  renames the user 'John' to 'Jack'. 


## user:password

user:password($name as xs:string, $password as xs:string) as empty-sequence()

:   Changes the `password` of a user with the specified `$name`. 

    **Errors**


    `unknown`: The specified user name is unknown.`name`: The specified user name is invalid.`update`: The operation can only be performed once per user or database pattern. 

    **Examples**


    * `user:password('John', )`_ assigns user 'John' an empty password string._

 
# Errors

**Code ** | Description 
--------- | ------------
`name` | The specified user name is invalid. 
`pattern` | The specified database name is invalid. 
`permission` | The specified permission is invalid. 
`unknown` | The specified user does not exist. 
`admin` | The "admin" user cannot be modified. 
`equal` | Name of old and new user is equal. 
`local` | A local permission can only be 'none', 'read' or 'write'. 
`logged-in` | The specified user is currently logged in. 
`update` | The operation can only be performed once per user or database pattern. 
`conflict` | A user cannot be both altered and dropped. 
 
# Changelog

The Module was introduced with Version 8.0. 

