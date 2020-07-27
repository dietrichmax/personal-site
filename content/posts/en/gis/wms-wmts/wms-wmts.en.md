---
layout: "Article"
title: "WMS - Web Map Service and WMTS"
date: "2019-03-02"
description: "Basically, a WMS - short for Web Map Service - is an interface for accessing digital maps over the Internet."
category: "GIS"
tags: ["WMS", "Web-GIS"]
image: "../../../../../static/assets/img/postImg/wms-wmts.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---

## WMS and WMTS

Web Map Service (**WMS**) and Web Map Tile Service (**WMTS**)

Basically, a WMS - short for Web Map Service - is an interface for accessing digital maps over the Internet. GIS Service providers and surveying offices mainly use this web service. This means that GIS service providers who work for municipalities and host their data, the [geodata] (/ geodata-what-are-geodata "What is geodata") (e.g. aerial photographs, hiking trails, development plans, etc.) of the municipalities online make available and then these are integrated by the surveying offices into their respective Web GIS.

The aim of the surveying offices is to provide central access to the geodata infrastructure of the federal states.

With a web map service, geodata or maps are visualized.

How the transfer of this data should look like was written by the [Open Geospatial Consortium](http://www.opengeospatial.org/ "Open Geospatial Consortium") (OGC). A web map service basically has three functions.

* `GetCapabilities`: An XML document with metadata is transferred here. This contains general information, supported formats and the layers.
* `GetFeatureInfo`: Transfers thematic information about a position in the map section shown.
* `GetMap`: This function transfers the actual georeferenced map, the representation and the coordinate system.

This data is (usually) transferred from one geographic information system to another over the Internet.

So much for that. But what is a WMTS now?

## WMTS

A Web Map Tile Service is - as the name suggests - an extension to the WMS. Namely with a tile cache.

The most fundamental difference is that the WMTS cards are loaded in tiles. This is much faster because only a section of the complete map is loaded. Namely, the one you just want to look at. With the WMS, the complete map is always loaded, which of course takes much longer.

So that only a section is transferred, the card must be pre-rendered by the transmitting server. This "dismembered" the card and sends a section. However, since only a section is always displayed, it can happen that important information is clipped (clipped) at the borders of the tiles.

## Conclusion

Web Map Service (WMS) and Web Map Tile Service (WMTS) are web services for the transmission of geodata.

A WMS sends one picture per request.

A WMTS previously divides this picture into tiles and sends only a section of the overall picture. This is faster. However, important information can be cut off.