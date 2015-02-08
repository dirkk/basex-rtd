
# Index File Structure
 


 
This page is provided to help those who are interested in the specific file format of the index files used by BaseX. It was predominantly written to aid research into the reasons for ever increasing file size when using the `UPDINDEX` option. 

 
## Attribute Index Files 

### atvr.basex 

This file is made up of a series of 5-byte records. There is one record for each attribute value in the index and the records are sorted by ascending order of value. The record itself is big-endian integer value giving the position of the start of the ID list in the atvl.basex file. 


In the example below we have a file for a database with attribute values entered in the order 100, 200, 1 & d. The actual attribute values are not held in this file but because we know the records in this file are ordered by value so we can interpret that the ID list for 1 is at position 8, the ID list for 100 is at position 4, the ID list for 200 is at position 6. 


The bytes of the file (in hex) are: 


`00 00 00 00 08``00 00 00 00 04``00 00 00 00 06``00 00 00 00 0A`


### atvl.basex 

This file provides a number of details. 

 * The total number of attribute values 
 * The number of times each attribute value appears 
 * The offsets for each occurrence of each attribute value 

In the example below we have the file for the database used in the atrv.basex example above. The first four bytes provide a big-endian integer value of the total number of different attribute values in the index - in this case 4. 


The remainder of the file is made up of ID lists. Each list starts on one of the bytes from atvr.basex - in the case of our example there is a list starting on byte at position 8 (counting starting from 0). The first item in the list is a count of the number of attributes will this value - in our case here it's 1. Then the list has the locations of the attributes - in our case there is only one attribute and it's at a position 8. This means that it is offset 8 positions from the beginning of the database (use [INFO STORAGE](Commands.md#INFO_STORAGE) command to view the order). 


`00 00 00 04``[01] 02``[01] 05`**`[01] 08`**`[01] 0B`


The offset is against the beginning of the database for the first occurrence of the attribute and then against the previous attribute for all the rest in the list. So: 


`[03] 0B 02 02`


would show that there are three values of the attribute. The first is offset 11 places from the beginning of the database (ID 11), the second is offset 2 places from that (ID 13) and the third is offset two places from the second (ID 15). 


#### Compressed Integers 

The example here is from a very small database so the elements of the ID lists are all one byte long. However the ID lists actually use compressed integers (see `Num` under [Storage Layout](Storage Layout.md#Data_Types) and [Num.java](https://github.com/BaseXdb/basex/blob/master/basex-core/src/main/java/org/basex/util/Num.java)). This means that each element in the list can be from one to five bytes in length. The value of the first byte tells you how many bytes the element is and how to interpret the value. 


Values from `00` to `3F` are single byte elements can be read directly as 0 to 63. 


Value from `40` to `7F` are dual byte elements. The value is given by the integer value of the first byte, subtract 64 and multiply by 256 plus the direct value of the second byte. 


`40 A1` = ((64 - 64) * 256) + 161 = 161 


`41 A1` = ((65 - 64) * 256) + 161 = 417 


`51 A1` = ((81 - 64) * 256) + 161 = 4513 


`7F FF` = ((127 - 64) * 256) + 161 = 16383 


Values from `80` to `BF` are four-byte elements. The value is given by the integer value of the first byte, subtract 128 and multiply by 16,777,216 plus the direct value of the following three bytes. 


`80 11 12 13` = ((128 - 128) * 16777216) + 1118739 = 1,118,739 


A value of `C0` shows a five-byte element. The value of the element is the direct value of the following four bytes. 


`C0 11 12 13 14` is 286,397,204 


#### Gaps in the File 

When an index is created by using the functions in the GUI, commands or XQuery then the atvl.basex file will be a continuous run of ID lists. However, when the index is being updated automatically because UPDINDEX is set to true then gaps can be created in the file. 


Consider the example we had before where each attribute had only once occurrence in the database. Now we add a new file and there are now two instances of **d** as an attribute value. 


The atvr.basex file may now look like this: 


`00 00 00 00 08``00 00 00 00 04``00 00 00 00 06``00 00 00 00 0C`


The atvl.basex file may now look like this: 


`00 00 00 04``[01] 02``[01] 05``[01] 08``[01] 0B``[02] 0B 03`


The header tells us that there are 4 attribute values but we can see there are 5 ID lists in the file. One has become orphaned - a new longer list was required to include the newly added attribute and has been appended to the end of the file. 


In versions of BaseX prior to 8.0 when items are deleted and a shorter list is required it will be updated in place. When items are added and a longer list is required the new list is always added at the end of the file. Over a period of time the file will grow - running the [OPTIMIZE](Commands.md#OPTIMIZE) command will recreate the index from scratch and recover the lost space. 


From BaseX 8.0 some optimizations have been applies so that while a database is open a list of free spaces is maintained and a new list will only be added to the end of the file if there isn't a free space available that is large enough. However this list of free spaces is lost when the database is closed and future operations will not be aware of any free space available when the database is opened. This, and the fact that small spaces are unlikely to be filled (single bytes for example) mean that the index file may still grow larger than it needs to be. This space can be recovered, as before, by running [OPTIMIZE](Commands.md#OPTIMIZE). 


### Value Index Files 

These files, txtr.basex and txtl.basex work in the same way as the attribute index files but with references to the text nodes instead of attributes. 

