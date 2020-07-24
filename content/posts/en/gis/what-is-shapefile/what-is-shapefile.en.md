---
layout: "post"
title: "What is a shapefile? .shp, .dbf and .shx"
date: "2019-04-20"
description: "The shapefile format is a general format for storing vector GIS-data. Shapefiles can store non-topological vector data together with the associated attribute data."
category: "GIS"
tags: ["Geodata", "Shapefile"]
image: "./what-is-shapefile.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---

The shapefile format is a general format for storing vector [GIS](/en/gis/geographic-information-system-what-is-gis "What is GIS?") - [data](/en/gis/geodata-what-are-geodata "What is geodata?"). Shapefiles can store non-topological vector data together with the associated attribute data.

Shapefiles were developed by Esri and are now an open format and a popular option for data transfer. For example, shapefiles can be read directly by nearly all [GIS software programs](/en/gis/open-source-proprietary-software-options "GIS software options") such as ArcGIS and QGIS.

Although the name of a shapefile indicates a single file, a shapefile is actually a collection of at least three basic files: .shp, .shx and .dbf. All three files must be in the same directory so that they can be viewed.

There may be additional files such as a .prj with the projection information of the shapefile. Shapefiles are usually compressed in a ZIP file to be transmitted, for example by email as an attachment or as a download link on a website.

## Which file extensions are associated with a shapefile?

First of all, all files for a shapefile must have the same name, but different file formats. There are three required files that make up at least one shapefile.

*   .shp: The geometry of a data record are saved in the file with the extension .shp. If you want to transform coordinates for example, you only have to transform this file.
*   .dbf: Here all factual data or attribute data are saved in [dBASE](https://de.wikipedia.org/wiki/DBASE) format.
*   .shx: Links the factual data (.dbf) with the geometry (.shp) via a common index.

In addition to these three files, which must always be available, there are a number of optional files.

*   .atx: attribute index
*   .sbx: and .sbn Spatial index
*   .qix: Alternative spatial index (used and created by [GDAL](https://www.gdal.org/ "Geospatial Data Abstraction Library")
*   .aih and .ain: index for table links
*   .shp.xml: metadata about the shapefile
*   .prj: projection of the data
*   .cpg: to specify the character set used in the [.dbf](https://de.wikipedia.org/wiki/DBASE "DBASE").

## Geometries

Only elements of one geometry type can be saved in a shapefile. For example

*   Points or
*   Lines or
*   Surfaces and polygons or
*   Multi-points (multiple points)

A geometry does not necessarily have to exist for a data record. Pure factual data can also be saved as a shapefile.

## Disadvantages of shapefiles

*   Shape files are relatively sluggish
*   A shapefile always has several files (everyone knows the problem if you only get the .shp sent)
*   Attribute names are limited to 10 characters
*   No possibility to save topologies in the data
*   The file size is limited to 2GB
*   Can only contain one geometry type per file
*   No real 3D support

## Alternatives to shapefiles

The best alternative to shapefiles are [GIS databases](/en/gis/gis-and-geo-database-management-system-options "GIS databases") e.g. PostGIS (PostgreSQL) or also [GeoPackages](https://de.wikipedia.org/wiki/GeoPackage).

In databases, the file size is theoretically unlimited, different geometry types can be saved and topologies can be created. All data in databases can be easily played out and sent, for example, as geopackage, which is just one handy file.