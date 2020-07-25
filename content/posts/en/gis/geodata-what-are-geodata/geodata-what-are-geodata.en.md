---
layout: "post"
title: "Geodata - What are geodata?"
date: "2018-04-12"
description: "Geodata is data with a spatial reference that can be used, among other things, in a Geographic Information System ."
category: "GIS"
tags: ["Geodata"]
image: "../../../../../static/assets/img/postImg/was-sind-geodaten.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---


## What is GIS data or geodata?

Geodata is information with a spatial reference that can be used, among other things, in a [Geographic Information System (GIS)](/en/gis/geographic-information-system-what-is-gis "What is GIS?").

They are divided into several categories. Basically there are primary data and secondary data.

*   **Primary data**: Primary data is raw data, i.e. data that comes directly from a data acquisition and is created, for example, when measuring a property.
*   **Secondary data**: Secondary data are revised primary data. They were calculated, modeled or otherwise processed.

All geodata consist of ** object attributes ** and ** object geometries **. The attributes describe the object and the geometry determines the position and shape of the object. Objects can be represented as points, lines, surfaces or bodies.

Let's come back to Google Maps, for example. For example, if you search there for petrol stations in Honolulu, all the petrol stations recorded are shown on a map.

**Object attributes** would be here, for example:

*   _Gas station_
*	_Brand_
*   _Address_
*   _Reviews_

In this case, the **object geometry** is a point with the corresponding coordinates. Google has chosen a "red, upside down raindrop" for this point for a nice display.

(Example for geodata):

<div class="gatsby-resp-iframe-wrapper" style="padding-bottom:75%;position:relative;height:0;overflow:hidden"><iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5255.6858645833445!2d-157.91487938763447!3d21.337430898960356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stankstelle%20honolulu%20shell!5e0!3m2!1sde!2sde!4v1570290782945!5m2!1sde!2sde" style="border:0;position:absolute;top:0;left:0;width:100%;height:100%" allowfullscreen="" frameborder="0"></iframe></div>

Is this primary or secondary data?

The information about this gas station belongs to the secondary data.

We know this on the one hand because the location of the petrol station was measured once, otherwise you could not assign a point with coordinates and because all the relevant information such as shell, address, ratings, reports, etc. was added afterwards and the display was adjusted.

Furthermore, a distinction is now made between geodata and geodata.

**Geospatial base data:** Geospatial base data means basic official data. They serve as the basis for specialist cards and thematic cards. For example, landscape (topography), properties, data from Alkis or the surface of the earth. They are data from the surveying administration and are created by public bodies. The use of this commercial data is restricted by law.

**Geo-technical data:** Geo-technical data are data from various specialist areas and are shown on the corresponding maps. They are used in: urban planning, demography, environmental protection, education, social affairs, supply and disposal, disaster protection, real estate management, geomarketing

There are various ways of storing geographic information. Amongst other things:

* _in a database e.g. PostgreSQL_
* _as [shapefile](/en/gis/what-is-shapefile "Shapefile")_
* _in a geodatabase_
* _as a raster image_
* _as table data_

Geodata can be obtained from public and private providers. The State Office for Digitization, Broadband and Surveying offers, for example, aerial photos and topographic maps, which are subject to legal restrictions. The costs for this are very different.
Depending on the area of ​​application, geodata must have certain quality features in order to fulfill its purpose. With underground lines, for example, it is not enough if they are accurate to a few meters, otherwise you would have to look for the line if repairs are required. When determining the position of the petrol station, it would theoretically not matter whether the point was now shifted by one or two meters, since a petrol station is normally larger than two meters. In principle, one can say that the measurement accuracy can be directly proportional to the dimension of an object.

In addition, geodata must also be logical, i.e. when collecting data for population mapping, no negative values ​​may occur. Time often plays an important role. In the following, objects with an exact location and time are four-dimensional. This is important, for example, for historical data or when analyzing population structures over a certain period of time.

## Conclusion

Geodata is spatial data that represents a real object. They include attributes that describe the object and a geometry that determines the position of the object. Geodata is divided into primary and secondary data and saved in databases, tabular data, as images or shapefiles. They are the medium for maps, which are represented in a geographic information system, in order to analyze complex topics and to make a decision.