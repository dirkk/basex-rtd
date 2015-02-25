 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). It gives some more insight into the configuration of BaseX. 

 
# Configuration Files

BaseX maintains some configuration files, which are stored in the project’s [Home Directory](Configuration.md#homedirectory): 

 * `.basex`  contains all options that are relevant for running the server or standalone versions of BaseX. 
 * `.basexgui`  defines all options relevant to the BaseX GUI. 
 * `.basexevents`  contains all existing events (see [Events](Events.md)). 
 * `.basexhistory`  contains commands that have been typed in most recently. 
 * `.basexhome`  can be created by a user to mark a folder as [home directory](Configuration.md#homedirectory). Its contents do not matter, so it is usually empty. 
 * Since Version 8.0, the `.basexperm` file is obsolete. Users are now stored in `users.xml` in the database directory (see [User Management](User Management.md) for more information). 

Note that, depending on your OS and configuration, files and folders with a '.' prefix may be hidden. 


## Home Directory

As BaseX is distributed in different flavors, and may be started from different locations, it dynamically determines its home directory: 

 * First, the **system property**`org.basex.path` is checked. If it contains a value, it is chosen as directory path. 
 * If not, the **current user directory** (defined by the system property `user.dir`) is chosen if the `.basex` or `.basexhome` file is found in this directory. 
 * Otherwise, the files are searched in the **application directory** (the folder in which the BaseX code is located). 
 * In all other cases, the **user's home directory** (defined in `user.home`) is chosen. 

## Database Directory

A database in BaseX consists of several files, which are located in a directory named by the name of the database. If the user’s home directory has been chosen as base directory, the database directories will be planed in a `BaseXData` directory. Otherwise, the directory will be named `data`. 


The database path can be changed as follows: 

 * GUI: Choose _Options_ → _Preferences_ and choose a new database path. 
 * General: edit the `DBPATH` option in the `.basex` configuration file 

**Note:** Existing databases will not be automatically moved to the new destination. 


## Log Files

Log files are stored in text format in a `.logs` sub-directory of the database folder (see [Logging](Logging.md) for more information). 

 
# Changelog
** Version 8.0 **

 * Updated: `.basexperm` is obsolete. 
** Version 7.7 **

 * Updated: the `.basexhome` file marks a folder as [home directory](Configuration.md#homedirectory). 
