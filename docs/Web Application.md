
# Web Application
 


 
BaseX provides access to stored database resources and to the XQuery engine via [REST](REST.md), [RESTXQ](RESTXQ.md) and [WebDAV](WebDAV.md) services. This article describes different ways of deploying and configuring these services. The services can be deployed in three different ways: 

  * as standalone application by running the [BaseX HTTP Server](Startup.md#StartupBaseX_HTTP_Server), 
 * as web servlets in a J2EE [Servlet Container](Web Application.md#Servlet_Container), and 
 * for development purposes, using [Maven](Web Application.md#Web_ApplicationMaven). 
 
## Servlet Container

In order to deploy BaseX HTTP Services in a servlet container, you may download the WAR distribution of BaseX from the [download site](http://basex.org/download) or compile it via `mvn compile war:war` in the `basex-api` package. The WAR file can then be deployed following the instructions of the corresponding servlet container ([jetty](http://docs.codehaus.org/display/JETTY/WebAppDeployer), [tomcat](http://tomcat.apache.org/tomcat-7.0-doc/deployer-howto.html)). 


Configuring port, context path, etc. can be done by following the corresponding instructions of the used servlet container. This is needed if you want to replace the default URL path (e.g. [http://localhost:8080/rest](http://localhost:8080/rest)) with a custom one (e.g. [http://localhost:8080/BaseX711/rest](http://localhost:8080/BaseX711/rest)). 


If run on a Jetty server you may use a `jetty.xml` file for detailed server configuration. You can e.g. enable SSL connections or Jetty logging. Place the `jetty.xml` right next to the `web.xml`. For detailed configuration refer to the [Jetty Documentation](http://wiki.eclipse.org/Jetty/Reference/jetty.xml). A sample [jetty.xml](https://github.com/BaseXdb/basex/blob/master/basex-api/src/main/webapp/WEB-INF/jetty.xml) is placed in the basex-api package. 


To run on [Apache Tomcat](http://tomcat.apache.org/), start the tomcat server and add any `*.WAR` distribution to deploy using the Tomcat web interface (by default located at [http://localhost:8080/manager/html/](http://localhost:8080/manager/html/) ). 


### Configuration

All database options can be specified in the `web.xml` file by prefixing the key with `org.basex.`. The most important options for the web application context are as follows: 


** Option ** | **Default ** | ** Description **
------------ | ------------ | -----------------
[USER](Options.md#USER) | `admin` |  Applies to REST and WebDAV service: If no user is specified, the credentials must be passed on by the client. Please check by yourself if it is safe to store your credentials in plain text. Until Version 7.9, the `admin` user was specified as default. 
[PASSWORD](Options.md#USER) | `admin` |  Applies to REST and WebDAV service: If no password is specified, it must be passed on by the client. Please check by yourself if it is safe to store your credentials in plain text. Until Version 7.9, the `admin` password was specified as default. 
[HTTPLOCAL](Options.md#HTTPLOCAL) | `false` | Operation mode. By default, the servlets will work in client/server mode, and a database server instance will be started along with the web server, which can also be addressed from other BaseX clients. If the flag is set to `true`, all servlets will communicate with a local database context which is not accessible from outside. 
[RESTXQPATH](Options.md#RESTXQPATH) | `.` | [RESTXQ](RESTXQ.md) directory. By default, all RESTXQ modules are located in the standard web application directory. 
[AUTHMETHOD](Options.md#AUTHMETHOD) | `Basic` | Version 8.0: The default authentication method proposed by the server. `Basic` and `Digest` is available. 

Path options may contain an absolute or relative path. If a relative path is specified, its root will be the servlet (`webapp`) path: 


      <context-param>
        <param-name>org.basex.dbpath</param-name>
        <!-- will be rewritten to ..../webapp/WEB-INF/data -->
        <param-value>WEB-INF/data</param-value>
      </context-param>
      <context-param>
        <param-name>org.basex.repopath</param-name>
        <!-- will be kept as is -->
        <param-value>f:/basex/repository</param-value>
      </context-param>


How to set these options in the `web.xml` of the BaseX web application is specific to the servlet container. For example, in Jetty it is done by [overriding the web.xml](https://wiki.eclipse.org/Jetty/Reference/override-web.xml) file. Another option is to directly edit the `WEB-INF/web.xml` file in the WAR archive (WAR files are simple ZIP files). Refer to the sample [web.xml](https://github.com/BaseXdb/basex/blob/master/basex-api/src/main/webapp/WEB-INF/web.xml) of the basex-api package. 


Different credentials can be assigned to the REST and WebDAV service by specifying local init parameters. In the following example, specific credentials are set for the REST service: 


      <servlet>
        <servlet-name>REST</servlet-name>
        <servlet-class>org.basex.http.rest.RESTServlet</servlet-class>
        <init-param>
          <param-name>org.basex.user</param-name>
          <param-value>rest-user</param-value>
        </init-param>
        <init-param>
          <param-name>org.basex.password</param-name>
          <param-value>(:87!7X3$o3p</param-value>
        </init-param>
      </servlet>


### Available Services

To enable or disable one of the provided services, the corresponding servlet entry in the `web.xml` file needs to be removed/commented. The default URL paths are listed in the following table: 


** Service ** | ** URL ** | ** Usage **
------------- | --------- | -----------
 Default web server  | `http://[host]:[port]/[servlet_context_path]/static`Before: `http://[host]:[port]/[servlet_context_path]` |  Access your standard web files (e.g. HTML, JavaScript or CSS). 
[RESTXQ](RESTXQ.md) | `http://[host]:[port]/[servlet_context_path]`Before: `http://[host]:[port]/[servlet_context_path]/restxq` |  Create XQuery web services and applications. 
[REST](REST.md) | `http://[host]:[port]/[servlet_context_path]/rest` |  Access XML database and its resources. 
[WebDAV](WebDAV.md) | `http://[host]:[port]/[servlet_context_path]/webdav` or`webdav://[host]:[port]/[servlet_context_path]/webdav` (depending on client)  |  Access databases via the filesystem. 
 
## Maven

Checkout the BaseX sources via [Eclipse](Developing with Eclipse.md) or [Git](Git.md). Execute `mvn install` in the `basex-core` project folder and then `mvn install jetty:run` in the `basex-api` project folder. This will start a Jetty instance in which the servlets will be deployed. 


### Configuration

The same options as in the case of deployment in a servlet container apply. In this case, however, there is no WAR archive. Instead, Jetty looks up all files in the directory `basex-api/src/main/webapp`. Jetty and servlet options can be configured in the `jetty.xml` and `web.xml` files as described above in the [Servlet Container Configuration](Web Application.md#Web_ApplicationConfiguration). The Jetty stop port can be changed in the [Maven Jetty Plugin](http://docs.codehaus.org/display/JETTY/Maven+Jetty+Plugin) sesion in the `pom.xml` file. 

 
## User Management

By default, REST and WebDAV services require client-side authentication. Default credentials can be stored server-side in the `web.xml` file or specified via [command-line arguments](Command-Line Options.md#Command-Line_OptionsBaseX_HTTP_Server). If the HTTP server is started with no pre-defined credentials, users and passwords can be sent via [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) with each HTTP request. Since Version 8.0, [Digest Authentication](http://en.wikipedia.org/wiki/Digest_authentication) is available as well, with support for all qop directives (`auth` and `auth-int`). 


Users are specified in a `users.xml` file, which is stored in the database directory (see [User Management](User Management.md) for more information). 


With cURL, and most browsers, you can specify the user name and password with each HTTP request within the request string as plain text, using the format `USER:PASSWORD@URL`. An example: 

** **

 
## Changelog
** Version 8.0 **

 * Added: digest authentication 
 * Updated: user management 
 * Updated: default user/password disabled in web.xml 
** Version 7.7 **

 * Added: service-specific permissions 
** Version 7.5 **

 * Added: `jetty.xml`: configuration for Jetty Server 
 * Updated: `server` replaced with `httplocal` mode 
** Version 7.3 **

 * Updated: `client` mode replaced with `server` mode 
** Version 7.2 **

 * Web Application concept revised 
