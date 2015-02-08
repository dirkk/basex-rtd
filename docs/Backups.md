
# Backups
 


 
This page is part of the [Advanced User's Guide](Advanced User's Guide.md). The following two paragraphs demonstrate how to create a backup and restore the [database](Databases.md) within BaseX. 

 
## GUI Example
1. Start the [BaseX GUI](Startup.md#StartupBaseX_GUI) and create a new database in _Database_ → _New..._ with your XML document. 
2. Go to _Database_ → _Manage..._ and create a backup of your database. The backup will be created in the database directory. 
3. Go to _Database_ → _Add..._ and add another document. 
4. Go to _Database_ → _Manage..._ and restore your database. The database will be restored from the latest backup of to the database found in the database directory. 

### Console Example
1. Start the [BaseX Standalone](Startup.md#StartupBaseX_Standalone) client from a console. 
2. Create a new database via the [CREATE DB](Commands.md#CREATE_DB) command. 
3. Use the [CREATE BACKUP](Commands.md#CREATE_BACKUP) command to back up your database. 
4. Add a new document via [ADD](Commands.md#ADD): `ADD AS newdoc.xml <newdoc/>`
5. Use the [RESTORE](Commands.md#RESTORE) command to restore the original database. 
6. Type in [XQUERY /](Commands.md#XQUERY) to see the restored database contents. 

The same commands can be used with a BaseX client connected to a remote [Database Server](Database Server.md). 

