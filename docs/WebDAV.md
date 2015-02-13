 


 
This page presents one of the [Web Application](Web Application.md) services. It describes how to use the WebDAV file system interface. 

 
BaseX offers access to the databases and documents using the [WebDAV](http://en.wikipedia.org/wiki/Webdav) protocol. WebDAV provides convenient means to access and edit XML documents by representing BaseX databases and documents in the form of a file system hierarchy. 

 
# Usage

By default, the BaseX HTTP server makes the WebDAV service accessible at `http://localhost:8984/webdav/`. If no default credentials are specified, they will be requested by the client ([see further](Web Application.md#Web_ApplicationUser_Management)). It can be accessed by either `http://<httphost>:<httpport>/webdav/` or `webdav://<httphost>:<httpport>/webdav/`, depending on your WebDAV client. 


Please note that the file size of XML documents will be displayed as 0 bytes, as the actual file size can only be determined if the full document is being returned and serialized. This may cause problems with some WebDAV clients (e.g. NetDrive or WebDrive). 

 
# Authorization

The WebDAV service uses the database user credentials in order to perform authentication and authorization. If database user and password are explicitly specified when starting the BaseX HTTP Server using the corresponding [startup options](Command-Line Options.md#Command-Line_OptionsBaseX_HTTP_Server), WebDAV will not request additional user authentication from the client. 

 
# Locking

The BaseX WebDAV implementation supports locking. It can be utilized with clients which support this feature (e.g. [oXygen Editor](http://docs.basex.org/wiki/Integrating oXygen)). [EXCLUSIVE and SHARED](http://tools.ietf.org/html/rfc4918#section-6.2) locks are supported, as well as [WRITE](http://tools.ietf.org/html/rfc4918#section-7) locks. 


**Note:** WebDAV locks are stored in a database called `~webdav`. Implementations should not rely on the existence of the database, since it may not be accessible in the future. 

 
# WebDAV Clients

Please check out the following tutorials to get WebDAV running on different operating systems and with oXygen: 

 * [Windows 7 and up](http://docs.basex.org/wiki/WebDAV:_Windows_7)
 * [Windows XP](http://docs.basex.org/wiki/WebDAV:_Windows_XP)
 * [Mac OSX 10.4+](http://docs.basex.org/wiki/WebDAV:_Mac_OSX)
 * [GNOME and Nautilus](http://docs.basex.org/wiki/WebDAV:_GNOME)
 * [KDE](http://docs.basex.org/wiki/WebDAV:_KDE)
 * [oXygen Editor](Integrating oXygen.md)
 
# Changelog
** Version 7.7 **

 * Added: [Locking](WebDAV.md#WebDAVLocking)
** Version 7.0 **

 * WebDAV API introduced 
