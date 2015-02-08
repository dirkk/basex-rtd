
# Geo Module
 


 
This [XQuery Module](Module Library.md) contains functions that may be applied to geometry data conforming to the Open Geospatial Consortium (OGC) Simple Feature (SF) data model. It is based on the [EXPath Geo Module](http://expath.org/spec/geo) and uses the [JTS](http://www.vividsolutions.com/jts/jtshome.htm) library. 

 
Geometries introduced in GML 2 are: Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, and MultiGeometry. All nodes queried by BaseX should be a valid geometry. The only geometry type which is not supported by BaseX right now is MultiGeometry. 

 
## Conventions
 * This module is included in the complete distributions of BaseX (zip, exe, war). 
 * All functions are assigned to the `http://expath.org/ns/geo` namespace, which must be dynamically imported: 

    import module namespace geo = "http://expath.org/ns/geo";
    ...

 * In this documentation, the namespace is bound to the `geo` prefix. 
 * All errors are assigned to the `http://expath.org/ns/error` namespace, which is statically bound to the `experr` prefix. 
 
## General Functions

### geo:dimension

`geo:dimension($geometry as element(*)) as xs:integer`

 Returns the dimension of the given geometry `$geometry`. 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:geometry-type

`geo:geometry-type($geometry as element(*)) as xs:QName`

 Returns the name of the geometry type of given geometry `$geometry`, if the geometry is not recognized with an error massage. 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:srid

`geo:srid($geometry as element(*)) as xs:integer`

 Returns the ID of the Spatial Reference System used by the given geometry `$geometry`. Spatial Reference System information is supported in the simple way defined in the SFS. A Spatial Reference System ID (SRID) is present in each Geometry object. Geometry provides basic accessor operations for this field, but no others. The SRID is represented as an integer (based on the [OpenGIS Simple Features Specifications For SQL](http://www.opengis.org/docs/99-049.pdf)). Here is a difference between the [EXPath Geo Module](http://expath.org/spec/geo) and the implementation in BaseX, since the specification return the URI. 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:envelope

`geo:envelope($geometry as element(*)) as element(*)`

 Returns the gml:Envelope of the given geometry `$geometry`. The envelope is the minimum bounding box of this geometry. If this Geometry is the empty geometry, returns an empty Point. If the Geometry is a point, returns a non-empty Point. Otherwise, returns a Polygon whose points are (minx, miny), (maxx, miny), (maxx, maxy), (minx, maxy), (minx, miny). 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:as-text

`geo:as-text($geometry as element(*)) as xs:string`

 Returns the WKT (Well-known Text) representation of the given geometry `$geometry`. The envelope is the minimum bounding box of this geometry 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:as-binary

`geo:as-binary($geometry as element(*)) as xs:base64Binary`

 Returns the WKB (Well-known Binary) representation of the given geometry `$geometry`. 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:is-simple

`geo:is-simple($geometry as element(*)) as xs:boolean`

 Returns whether the given geometry is simple `$geometry` and does not have has no anomalous geometric points (ie. the geometry does not self-intersect and does not pass through the same point more than once (may be a ring)). 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:boundary

`geo:boundary($geometry as element(*)) as element(*)?`

 Returns the boundary of the given geometry `$geometry`, in GML 2. The return value is a sequence of either gml:Point or gml:LinearRing elements as a GeometryCollection object. For a Point or MultiPoint, the boundary is the empty geometry, nothing is returned. 

**Errors**

`GEO0001`: the given element is not recognized as a valid geometry.`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:num-geometries

`geo:num-geometries($geometry as element(*)) as xs:integer`

 Returns the number of geometry in a geometry-collection `$geometry`, in GML. For the geometries which are not a collection, it returns the instant value 1. This function is implemented wider than the specification and accepts all types of geometries, while the specification limits it to the collection types (MultiPoint, MultiPolygon, ...). 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:geometry-n

`geo:geometry-n($geometry as element(*), $geoNumber as xs:integer) as element(*)`

 Returns the Nth geometry in geometry-collection `$geometry`, in GML. For the geometries which are not a collection, it returns the geometry if geoNumber `$geoNumber` is 1. This function is implemented wider than the specification and accepts all types of geometries, while the specification limits it to the collection types (MultiPoint, MultiPolygon, ...). 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0004`: the the input index of geometry is out of range.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:length

`geo:length($geometry as element(*)) as xs:double`

 Returns the length of the geometry `$geometry`. If the geometry is a point, zero value will be returned. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:num-points

`geo:num-points($geometry as element(*)) as xs:integer`

 Returns integer value of number of the points in the given geometry`$geometry`. It can be used not only for Lines, also any other geometry types, like MultiPolygon. For Point geometry it will return 1. This is an implementation different from the EXPath geo specification, as it limits the input geometry type only to lines. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:area

`geo:area($geometry as element(*)) as xs:double`

 Returns the area of the given geometry `$geometry`. For points and line the return value will be zero. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:centroid

`geo:centroid($geometry as element(*)) as element(*)`

 Returns the mathematical centroid of the given geometry `$geometry`, as a gml:Point. Based on the definition, this point is not always on the surface of the geometry `$geometry`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:point-on-surface

`geo:point-on-surface($geometry as element(*)) as element(*)`

 Returns an interior point on the given geometry `$geometry`, as a gml:Point. It is guaranteed to be on surface. Otherwise, the point may lie on the boundary of the geometry. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 
 
## Spatial Predicate Functions

### geo:equals

`geo:equals($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially equal to $geometry2 `$geometry2`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:disjoint

`geo:disjoint($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially disjoint from $geometry2 `$geometry2` (they have no point in common, they do not intersect each other, and the DE-9IM Intersection Matrix for the two geometries is FF*FF****). 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:intersects

`geo:intersects($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially intersects $geometry2 `$geometry2`. This is true if disjoint function of the two geometries returns false. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:touches

`geo:touches($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially touches $geometry2 `$geometry2`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:crosses

`geo:crosses($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially crosses $geometry2 `$geometry2`. It means, if the geometries have some but not all interior points in common. Returns true if the DE-9IM intersection matrix for the two geometries is:  `T*T******` (for P/L, P/A, and L/A situations) `T*****T**` (for L/P, A/P, and A/L situations) `0********` (for L/L situations). 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:within

`geo:within($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially within $geometry2 `$geometry2`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:contains

`geo:contains($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` spatially contains $geometry2 `$geometry2`. Returns true if within function of these two geometries also returns true. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:overlaps

`geo:overlaps($geometry1 as element(*), $geometry2 as element(*)) as xs:boolean`

 Returns whether geometry1 `$geometry1` is spatially overlaps $geometry2 `$geometry2`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:relate

`geo:relate($geometry1 as element(*), $geometry2 as element(*), $intersectionMatrix as xs:string) as xs:boolean`

 Returns whether relationships between the boundaries, interiors and exteriors of geometry1 `$geometry1` and geometry2 `$geometry2` match the pattern specified in intersectionMatrix `$geometry2`, which should have the length of 9 charachters.The values in the DE-9IM can be T, F, *, 0, 1, 2 .  - T means the intersection gives a non-empty result. - F means the intersection gives an empty result. - * means any result. - 0, 1, 2 gives the expected dimension of the result (point, curve, surface) 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 
 
## Analysis Functions

### geo:distance

`geo:distance($geometry1 as element(*), $geometry2 as element(*)) as xs:double`

 Returns the shortest distance, in the units of the spatial reference system of geometry1 `$geometry1`, between the geometries, where that distance is the distance between a point on each of the geometries. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:buffer

`geo:buffer($geometry as element(*), $distance as xs:double) as element(*)`

 Returns polygonal geometry representing the buffer by distance `$distance` of geometry `$geometry` a buffer area around this geometry having the given width, in the spatial reference system of geometry. The buffer of a Geometry is the Minkowski sum or difference of the geometry with a disc of radius abs(distance). The buffer is constructed using 8 segments per quadrant to represent curves. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:convex-hull

`geo:convex-hull($geometry as element(*)) as element(*)`

 Returns the convex hull geometry of the given geometry `$geometry` in GML, or the empty sequence. Actually returns the object of smallest dimension possible. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:intersection

`geo:intersection($geometry1 as element(*), $geometry2 as element(*)) as element(*)?`

 Returns the intersection geometry of geometry1 `$geometry1` with geometry2 `$geometry2`, in GML or empty sequence if there is no intersection of these geometries. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:union

`geo:union($geometry1 as element(*), $geometry2 as element(*)) as element(*)`

 Returns the union geometry of geometry1 `$geometry1` with geometry2 `$geometry2`, in GML. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:difference

`geo:difference($geometry1 as element(*), $geometry2 as element(*)) as element(*)?`

 Returns the difference geometry of geometry1 `$geometry1` with geometry2 `$geometry2`, in GML, or empty sequence if the difference is empty, as a set of point in geometry1 `$geometry1` and not included in geometry2 `$geometry2`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:sym-difference

`geo:sym-difference($geometry1 as element(*), $geometry2 as element(*)) as element(*)?`

 Returns the symmetric difference geometry of geometry1 `$geometry1` with geometry2 `$geometry2`, in GML, or empty sequence if the difference is empty, as a set of point in one of the geometries and not included in the other. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0005`: the output object cannot be written as an element by writer for some reason. 
 
## Functions Specific to Geometry Type

### geo:x

`geo:x($point as element(*)) as xs:double`

 Returns the x coordinate of point `$point`. A point has to have an x coordinate. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:y

`geo:y($point as element(*)) as xs:double?`

 Returns the y coordinate of point `$point`. If the point does not have the y coordinate, 0 will be returned. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:z

`geo:z($point as element(*)) as xs:double?`

 Returns the z coordinate of point `$point`. If the point does not have the y coordinate, 0 will be returned. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason. 

### geo:start-point

`geo:start-point($line as element(*)) as element(*)`

 Returns the starting point of the given line `$line`. `$line` has to be a single line, LineString or LinearRing. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a line. Other geometries are not accepted. 

### geo:end-point

`geo:end-point($line as element(*)) as element(*)`

 Returns the ending point of the given line `$line`. `$line` has to be a single line, LineString or LinearRing. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a line. Other geometries are not accepted. 

### geo:is-closed

`geo:is-closed($line as element(*)) as xs:boolean`

 Returns a boolean value that shows the line `$line` is a closed loop (start point and end point are the same) or not. `$line` has to be a line, as a geometry, LineString or LinearRing, and MultiLineString. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a line. Other geometries are not accepted. 

### geo:is-ring

`geo:is-ring($line as element(*)) as xs:boolean`

 Returns a boolean value that shows the line `$line` is a ring (closed loop and single) or not. `$line` has to be a single line, as a geometry, LineString or LinearRing. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a line. Other geometries are not accepted. 

### geo:point-n

`geo:point-n($line as element(*)) as element(*)`

 Returns the Nth point in the given line `$geometry`. `$line` has to be a single line, as a geometry, LineString or LinearRing. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a line. Other geometries are not accepted.`GEO0004`: the the input index of geometry is out of range.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:exterior-ring

`geo:exterior-ring($polygon as element(*)) as element(*)`

 Returns the outer ring of the given polygon `$geometry`, as a gml:LineString. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a polygon. Other geometries are not accepted.`GEO0005`: the output object cannot be written as an element by writer for some reason. 

### geo:num-interior-ring

`geo:num-interior-ring($polygon as element(*)) as xs:integer`

 Returns the number of interior rings in the given polygon `$geometry`. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a polygon. Other geometries are not accepted. 

### geo:interior-ring-n

`geo:interior-ring-n($polygon as element(*)) as element(*)`

 Returns the outer ring of the given polygon `$geometry`, as a gml:LineString. 

**Errors**

`GEO0001`: the given element(s) is not recognized as a valid geometry (QName).`GEO0002`: the given element cannot be read by reader for some reason.`GEO0003`: the given element has to be a polygon. Other geometries are not accepted.`GEO0004`: the the input index of geometry is out of range.`GEO0005`: the output object cannot be written as an element by writer for some reason. 
 
## Errors

**Code ** | Description 
--------- | ------------
`GEO0001` | Unrecognized Geo type. 
`GEO0002` | The input GML node cannot be read by GMLreader. 
`GEO0003` | Input geometry is not an appropriate geometry for this function. 
`GEO0004` | The input index is out of range. 
`GEO0005` | The result geometry can not be written by GMLwriter. 
 
## Changelog

The module was introduced with Version 7.6. 

