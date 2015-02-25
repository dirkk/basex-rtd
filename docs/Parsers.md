 


 
This article is part of the [Getting Started](Getting Started.md) Section. It presents the available parsers that can be used to import various data sources in BaseX databases. Please visit the [Serialization](Serialization.md) article if you want to know how to export data. 

 
# XML Parsers

BaseX provides two parsers to import XML data: 

 * By default, the internal, built-in XML parser is used, which is more fault-tolerant than Java’s XML parser. It supports standard HTML entities out-of-the-box, and is faster in most cases. In turn, it does not support all oddities specified by DTDs, and cannot resolve [catalogs](Catalog Resolver.md). 
 * Java’s [SAXParser](http://download.oracle.com/javase/6/docs/api/javax/xml/parsers/SAXParser.html) can also be selected for parsing XML documents. This parser is stricter than the built-in parser, but it refuses to process some large documents. 

## GUI

Go to Menu _Database_ → _New_, then choose the _Parsing_ tab and (de)activate _Use internal XML parser_. The parsing of DTDs can be turned on/off by selecting the checkbox below. 


## Command Line

To turn the internal XML parser and DTD parsing on/off, modify the `INTPARSE` and `DTD` options: 


     SET INTPARSE true
     SET DTD true


## XQuery

The [db:add](Database Module.md#dbadd) and [db:replace](Database Module.md#dbreplace) functions can also be used to add new XML documents to the database. The following example query uses the internal XML parser and adds all files to the database `DB` that are found in the directory `2Bimported`: 


    declare option db:intparse "yes";
    for $file in file:list("2Bimported")
    return db:add('DB', $file)


## HTML Parser

With [TagSoup](http://home.ccil.org/~cowan/XML/tagsoup/), HTML can be imported in BaseX without any problems. TagSoup ensures that only well-formed HTML arrives at the XML parser (correct opening and closing tags, etc.). Hence, if TagSoup is not available on a system, there will be a lot of cases where importing HTML fails, no matter whether you use the GUI or the standalone mode. 


### Installation

#### Downloads

TagSoup is already included in the full BaseX distributions (`BaseX.zip`, `BaseX.exe`, etc.). It can also be manually downloaded and embedded on the appropriate platforms. 


#### Maven

An easy way to add TagSoup to your own project is to follow this steps: 


1. visit [MVN TagSoup Repository](http://mvnrepository.com/artifact/org.ccil.cowan.tagsoup/tagsoup/)


2. click on the version you want 


3. you can see on the first tab called Maven a XML like this : 


    <dependency>
      <groupId>org.ccil.cowan.tagsoup</groupId>
      <artifactId>tagsoup</artifactId>
      <version>1.2.1</version>
    </dependency>


4. copy that in your own maven project's pom.xml under the <dependencies> tag. 


5. don't forget to run `mvn jetty:run` again 


#### Debian

With Debian, TagSoup will be automatically detected and included after it has been installed via: 


     apt-get install libtagsoup-java


### TagSoup Options

TagSoup offers a variety of options to customize the HTML conversion. For the complete list please visit the [TagSoup](http://home.ccil.org/~cowan/XML/tagsoup#program) website. BaseX supports most of these options with a few exceptions: 

 * **encoding** : BaseX tries to guess the input encoding but this can be overwritten by the user if necessary. 
 * **files** : not supported as input documents are piped directly to the XML parser. 
 * **method** : set to 'xml' as default. If this is set to 'html' ending tags may be missing for instance. 
 * **version** : dismissed, as TagSoup always falls back to 'version 1.0', no matter what the input is. 
 * **standalone** : deactivated. 
 * **pyx** , **pyxin**: not supported as the XML parser can't handle this kind of input. 
 * **output-encoding** : not supported, BaseX already takes care of that. 
 * **reuse** , **help**: not supported. 

#### GUI

Go to Menu _Database_ → _New_ and select "HTML" in the input format combo box. There's an info in the "Parsing" tab about whether TagSoup is available or not. The same applies to the "Resources" tab in the "Database Properties" dialog. 


These two dialogs come with an input field 'Parameters' where TagSoup options can be entered. 


#### Command Line

Turn on the HTML Parser before parsing documents, and set a file filter: 


     SET PARSER html
     SET HTMLPARSER method=xml,nons=true,ncdata=true,nodefaults=true,nobogons=true,nocolons=true,ignorable=true
     SET CREATEFILTER *.html


#### XQuery

The [HTML Module](HTML Module.md) provides a function for converting HTML to XML documents. 


Documents can also be converted by specifying the parser and additional options in the query prolog: 


    declare option db:parser "html";
    declare option db:htmlparser "html=false,nodefaults=true";
    doc("index.html")


## JSON Parser

BaseX can also import JSON documents. The resulting format is described in the documentation for the XQuery [JSON Module](JSON Module.md): 


### GUI

Go to Menu _Database_ → _New_ and select "JSON" in the input format combo box. You can set the following options for parsing JSON documents in the "Parsing" tab: 

 * **Encoding** : Choose the appropriate encoding of the JSON file. 
 * **JsonML** : Activate this option if the incoming file is a JsonML file. 

### Command Line

Turn on the JSON Parser before parsing documents, and set some optional, parser-specific options and a file filter: 


     SET PARSER json
     SET JSONPARSER encoding=utf-8, jsonml=true
     SET CREATEFILTER *.json


### XQuery

The [JSON Module](JSON Module.md) provides functions for converting JSON objects to XML documents. 


## CSV Parser

BaseX can be used to import CSV documents. Different alternatives how to proceed are shown in the following: 


### GUI

Go to Menu _Database_ → _New_ and select "CSV" in the input format combo box. You can set the following options for parsing CSV documents in the "Parsing" tab: 

 * **Encoding** : Choose the appropriate encoding of the CSV file. 
 * **Separator** : Choose the column separator of the CSV file. Possible: `comma`, `semicolon`, `tab` or `space` or an arbitrary character. 
 * **Header** : Activate this option if the incoming CSV files have a header line. 

### Command Line

Turn on the CSV Parser before parsing documents, and set some optional, parser-specific options and a file filter. Unicode code points can be specified as separators; `32` is the code point for spaces: 


     SET PARSER csv
     SET CSVPARSER encoding=utf-8, lines=true, header=false, separator=space
     SET CREATEFILTER *.csv


### XQuery

The [CSV Module](CSV Module.md) provides a function for converting CSV to XML documents. 


Documents can also be converted by specifying the parser in the query prolog. The following example query adds all CSV files that are located in the directory `2Bimported` to the database `DB` and interprets the first lines as column headers: 


    declare option db:parser "csv";
    declare option db:csvparser "header=yes";
    for $file in file:list("2Bimported", false(), "*.csv")
    return db:add('DB', $file)


## Text Parser

Plain text can be imported as well: 


### GUI

Go to Menu _Database_ → _New_ and select "TEXT" in the input format combobox. You can set the following option for parsing text documents in the "Parsing" tab: 

 * **Encoding** : Choose the appropriate encoding of the text file. 
 * **Lines** : Activate this option to create a `<line>...</line>` element for each line of the input text file. 

### Command Line

Turn on the CSV Parser before parsing documents and set some optional, parser-specific options and a file filter: 


     SET PARSER text
     SET TEXTPARSER lines=yes
     SET CREATEFILTER *


### XQuery

Similar to the other formats the text parser can be specified in the prolog of an XQuery expression: 


    declare option db:parser "text";
    for $file in file:list("2Bimported", true(), "*.txt")
    return db:add('DB', $file)

 
# Changelog
** Version 7.8 **

 * Updated: parser options 
** Version 7.7.2 **

 * Removed: CSV option "format"
** Version 7.3 **

 * Updated: the CSV `SEPARATOR` option may now be assigned arbitrary single characters 
** Version 7.2 **

 * Updated: Enhanced support for TagSoup options 
