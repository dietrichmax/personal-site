---
layout: "post"
title: "OpenStreetMap Daten als Shapefiles downloaden"
date: "2019-04-29"
description: "OpenStreetMap ist das größte internationale Projekt, dass sich mit dem Ziel beschäftigt eine freie Weltkarte zu erschaffen."
category: "GIS"
tags: ["OpenStreetMap","Geodaten"]
image: "../../../../../static/assets/img/postImg/openstreetmap-daten-downloaden.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

## [](#was-ist-openstreetmap)Was ist OpenStreetMap?

[OpenStreetMap](https://www.openstreetmap.de/ "OpenStreetMap") ist das größte internationale Projekt, dass sich mit dem Ziel beschäftigt eine freie Weltkarte zu erschaffen. Freiwillige "Mapper" sammeln Daten über Straßen, Eisenbahnen, Flüsse, Wälder und Häuser und stellen diese online zur Verfügung.

Falls du dich auch im OpenStreetMap Projekt engagieren willst, findest du hier weiter Informationen: [https://www.openstreetmap.de/faq.html#wie_mitmachen.](https://www.openstreetmap.de/faq.html#wie_mitmachen)

Die Daten stehen allen Menschen zur freien Verfügung. Du kannst OpenStreetMap Daten auch kommerziell nutzen, da diese unter der [Open Data Commons Open Database Lizenz](https://opendatacommons.org/licenses/odbl/) veröffentlich werden.

## [](#datenformate-von-osm-daten)Datenformate von OSM-Daten

Angeboten werden die Daten von OSM als XML oder PBF, was ein "kompaktes" Datenformat für die Rohdaten von OpenStreetMap ist. Die Datei Planet.osm enthält den gesamten Planeten, der bisher erfasst wurde und in der Full History Planet Version sind sogar noch alle Versionsgeschichten sämtlicher Objekte enthalten. Diese Datei wird normalerweise einmal wöchentlich aktualisiert.

Mit Tools wie [Osmosis](https://wiki.openstreetmap.org/wiki/Osmosis) oder [Osm2pgsql](https://wiki.openstreetmap.org/wiki/Osm2pgsql) können diese Geodaten dann in zum Beispiel einer Postgis Datenbank importiert werden (Dazu aber mehr in einem separaten Beitrag). Da diese Datei aber sehr groß ist (76GB) werden die meisten damit wahrscheinlich weniger anfangen können.

## [](#download-via-geofabrik)Download via Geofabrik

Glücklicherweise gibt es [Geofabrik](https://www.geofabrik.de), die OSM-Dateien verarbeiten und teilweise auch kostenlos zur Verfügung stellen.

Unter [https://download.geofabrik.de/](https://download.geofabrik.de/) findet man Downloadlinks für spezifische Regionen, wo man letztendlich OpenStreetMap Daten als Shapefiles downloaden kann. Rechts oben auf der Website gibt es außerdem eine kleine Karte, die das betreffende Gebiet der ausgewählten Daten anzeigt.

Die Daten können außerdem als .pbf- oder bz2-Dateien gedownloadet werden.

Mit einem Klick auf eine Region landet man in der "Sub-Region", in der dann Daten einzelne Länder heruntergeladen werden können. In Europa können zu fast allen Ländern Shapefiles der OSM-Daten heruntergeladen werden.

Für Deutschland gibt es leider nur die Möglichkeit Shapefiles der einzelnen Bundesländer herunterzuladen.

Es können außerdem Polygone der Außmaße der einzelnen Bundesländer heruntergeladen werden.

## [](#struktur-osm-rohdaten)Struktur OSM-Rohdaten

Es gibt natürlich eine eindeutige ID für jedes Objekt. Wenn man Straßenobjekte betrachtet, gibt es neben dem Namen und der Art der Straße (residential, tertiary, secondary, unclassified, usw.) auch sogenannte "other_tags".

Dort findet man alle zusätzlichen Attribute, die das Objekt genauer beschreiben. Im Fall der Straße sind die maximale erlaubte Geschwindigkeit, das Maximalgewicht, PLZ der Gemeinde, das Material der Straße und weitere Eigenschaften beschrieben.

Mit speziellen Abfragen kann man auf diese "other_tags" zugreifen und sich zum Beispiel nur alle asphaltierten Straßen in QGIS anzeigen lassen.

Bei der üblichen "OSM Basemap" werden alle diese Objekte gerendert und im OpenStreetMap üblichen Design dargestellt.

[OpenStreetMap](https://www.openstreetmap.org/)