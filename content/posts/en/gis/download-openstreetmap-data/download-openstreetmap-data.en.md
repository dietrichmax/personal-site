---
layout: "post"
title: "Download OpenStreetMap data as shapefiles"
date: "2019-04-29"
description: "OpenStreetMap is the largest international project that aims to create a free world map."
category: "GIS"
tags: ["OpenStreetMap", "Geodata"]
image: "../../../../../static/assets/img/postImg/openstreetmap-daten-downloaden.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---

## What is OpenStreetMap?

[OpenStreetMap](https://www.openstreetmap.com/ "OpenStreetMap") is the largest international project that aims to create a free world map. Voluntary "mappers" collect data about roads, railways, rivers, forests and houses and make them available online.

If you also want to get involved in the OpenStreetMap project, you can find further information here: [https://www.openstreetmap.de/faq.html#wie_mitmachen.](https://www.openstreetmap.de/faq.html#wie_mitmachen)

The data is freely available to all people. You can also use OpenStreetMap data commercially because it was published under the [Open Data Commons Open Database License](https://opendatacommons.org/licenses/odbl/)

## Data formats of OSM data

The data is offered by OSM as XML or PBF, which is a "compact" data format for the raw data from OpenStreetMap. The file Planet.osm contains the entire planet that has been recorded so far and the full history planet version even contains all version histories of all objects. This file is usually updated once a week.

With tools such as [Osmosis](https://wiki.openstreetmap.org/wiki/Osmosis) or [Osm2pgsql](https://wiki.openstreetmap.org/wiki/Osm2pgsql), this geodata can then be imported into a Postgis database. However, since this file is very large (76GB), most of you will probably not be able to start with it.
Instead of using the file of the entire planet it is more useful to extract the part of it that you will need. You can do this on your own or use services such as [Geofabrik](http://www.geofabrik.de/ "Geofabrik") offers them.

## Download via Geofabrik

Fortunately, there are [Geofabrik](https://www.geofabrik.de) that process OSM files and partially also make them available free of charge.

At [https://download.geofabrik.de/](https://download.geofabrik.de/) you will find download links for specific regions, where you can finally download OpenStreetMap data as shapefiles. There is also a small map at the top right of the website that shows the area of the selected data.

The data can also be downloaded as .pbf or bz2 files.

With a click on a region you land in the "sub-region", in which data of individual countries can then be downloaded. In Europe, shapefiles of the OSM data can be downloaded for almost all countries.

For Germany there is unfortunately only the possibility to download shapefiles of the individual federal states.

In addition, polygons of the dimensions of the individual federal states can be downloaded.

## Structure of raw OSM data

There is of course a unique ID for each object. When looking at street objects, there are so-called "other_tags" in addition to the name and type of street (residential, tertiary, secondary, unclassified, etc.).

There you will find all additional attributes that describe the object in more detail. In the case of the street, the maximum permitted speed, the maximum allowed weight, the zip code of the municipality, the material of the street and even more properties are described.

With special queries you can access these "other_tags" and, for example, only show all paved roads in QGIS.

With the usual "OSM Basemap" all these objects are rendered and displayed in the usual OpenStreetMap design.

[OpenStreetMap](https://www.openstreetmap.org/)