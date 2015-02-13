 


 
This article lists extended type information that is returned by the [Server Protocol](Server Protocol.md). 

 
# XDM Meta Data

In most cases, the XDM meta data is nothing else than the [Type ID](Server Protocol: Types.md#Type_IDs). There are three exceptions, though: document-node(), attribute() and xs:QName items are followed by an additional {URI} string. 


## Type IDs

The following table lists the type IDs that are returned by the server. Currently, all node kinds are of type `xs:untypedAtomic`: 


** Type ID ** | ** Node Kind/Item Type ** | ** Type **
------------- | ------------------------- | ----------
 7  | [Function item](XQuery 3.0.md#XQuery_3.0Function_Items) | _function_
 8  | `node()` | _node_
 9  | `text()` | _node_
 10  | `processing-instruction()` | _node_
 11  | `element()` | _node_
 12  | `document-node()` | _node_
 13  | `document-node(element())` | _node_
 14  | `attribute()` | _node_
 15  | `comment()` | _node_
 32  | `item()` | _atomic value_
 33  | `xs:untyped` | _atomic value_
 34  | `xs:anyType` | _atomic value_
 35  | `xs:anySimpleType` | _atomic value_
 36  | `xs:anyAtomicType` | _atomic value_
 37  | `xs:untypedAtomic` | _atomic value_
 38  | `xs:string` | _atomic value_
 39  | `xs:normalizedString` | _atomic value_
 40  | `xs:token` | _atomic value_
 41  | `xs:language` | _atomic value_
 42  | `xs:NMTOKEN` | _atomic value_
 43  | `xs:Name` | _atomic value_
 44  | `xs:NCName` | _atomic value_
 45  | `xs:ID` | _atomic value_
 46  | `xs:IDREF` | _atomic value_
 47  | `xs:ENTITY` | _atomic value_
 48  | `xs:float` | _atomic value_
 49  | `xs:double` | _atomic value_
 50  | `xs:decimal` | _atomic value_
 51  | `xs:precisionDecimal` | _atomic value_
 52  | `xs:integer` | _atomic value_
 53  | `xs:nonPositiveInteger` | _atomic value_
 54  | `xs:negativeInteger` | _atomic value_
 55  | `xs:long` | _atomic value_
 56  | `xs:int` | _atomic value_
 57  | `xs:short` | _atomic value_
 58  | `xs:byte` | _atomic value_
 59  | `xs:nonNegativeInteger` | _atomic value_
 60  | `xs:unsignedLong` | _atomic value_
 61  | `xs:unsignedInt` | _atomic value_
 62  | `xs:unsignedShort` | _atomic value_
 63  | `xs:unsignedByte` | _atomic value_
 64  | `xs:positiveInteger` | _atomic value_
 65  | `xs:duration` | _atomic value_
 66  | `xs:yearMonthDuration` | _atomic value_
 67  | `xs:dayTimeDuration` | _atomic value_
 68  | `xs:dateTime` | _atomic value_
 69  | `xs:dateTimeStamp` | _atomic value_
 70  | `xs:date` | _atomic value_
 71  | `xs:time` | _atomic value_
 72  | `xs:gYearMonth` | _atomic value_
 73  | `xs:gYear` | _atomic value_
 74  | `xs:gMonthDay` | _atomic value_
 75  | `xs:gDay` | _atomic value_
 76  | `xs:gMonth` | _atomic value_
 77  | `xs:boolean` | _atomic value_
 78  | `basex:binary` | _atomic value_
 79  | `xs:base64Binary` | _atomic value_
 80  | `xs:hexBinary` | _atomic value_
 81  | `xs:anyURI` | _atomic value_
 82  | `xs:QName` | _atomic value_
 83  | `xs:NOTATION` | _atomic value_
