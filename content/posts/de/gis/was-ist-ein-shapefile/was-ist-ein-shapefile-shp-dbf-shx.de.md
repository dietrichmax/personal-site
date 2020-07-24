---
layout: "post"
title: "Was ist ein Shapefile? .shp, .dbf und .shx"
date: "2019-04-20"
description: "Das Shapefile-Format ist ein allgemeines Format zum Speichern von Vektor-Daten"
category: "GIS"
tags: ["Geodaten", "Shapefile"]
image: "./was-ist-ein-shapefile.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

Das Shapefile-Format ist ein allgemeines Format zum Speichern von Vektor-[GIS](/gis/was-ist-gis "Was ist GIS?")-[Daten](/gis/was-sind-geodaten "Was sind Geodaten?"). In Shapefiles können nicht-topologische Vektordaten zusammen mit zugehörigen Attributdaten gespeichert werden.

Shapefiles wurden von Esri entwickelt und sind jetzt ein offenes Format und eine beliebte Option für die Datenübertragung. Zum Beispiel können Shapefiles direkt von einer Reihe von [GIS-Softwareprogrammen](/gis/gis-software-optionen "GIS-Software Optionen") wie ArcGIS und QGIS gelesen werden.

Obwohl der Name eine einzelne Datei angibt, ist ein Shapefile eigentlich eine Sammlung von mindestens drei Basisdateien: .shp, .shx und .dbf. Alle drei Dateien müssen sich im selben Verzeichnis befinden, damit sie angezeigt werden können.

Es können zusätzliche Dateien wie eine .prj mit den Projektionsinformationen des Shapefiles vorhanden sein. In der Regel werden Shapefiles in einer ZIP-Datei komprimiert, um sie zu übermitteln, beispielsweise per E-Mail als Anhang oder als Downloadlink auf einer Website.

## Welche Dateierweiterungen sind mit einem Shapefile verknüpft?

Alle Dateien zu einem Shapefile müssen den selben Namen, jedoch unterschiedliche Dateiformate haben. Es gibt drei erforderliche Dateien, aus denen mindestens ein Shapefile besteht.

*   .shp: In der Datei mit der Endung .shp werden die Geometriedaten eines Datensatz gespeichert. Wenn man zum Beispiel Koordinaten transformieren möchte, muss nur die diese Datei transformiert werden.
*   .dbf: Hier werden alle Sachdaten bzw. Attributdaten im [dBASE](https://de.wikipedia.org/wiki/DBASE)-Format gespeichert
*   .shx: Verknüpft die Sachdaten (.dbf) mit der Geometrie (.shp) über einen gemeinsamen Index

Neben diesen drei Dateien, die immer vorhanden sein müssen gibt es noch eine Reihe optionaler Dateien.

*   .atx: Attributindex
*   .sbx: und .sbn Räumlicher Index
*   .qix: Alternativer Räumlicher Index (von [GDAL](https://www.gdal.org/ "Geospatial Data Abstraction Library") benutzt und angelegt)
*   .aih und .ain: Index für Tabellenverknüpfungen (Links)
*   .shp.xml: Metadaten zum Shapefile
*   .prj: Projektion der Daten
*   .cpg: um den in der [.dbf](https://de.wikipedia.org/wiki/DBASE "DBASE") verwendeten Zeichensatz zu spezifizieren.

## Geometrien

In einem Shapefile können immer nur Elemente eines Geometrietyps gespeichert werden. Zum Beispiel

*   Punkte
*   Linien
*   Flächen bzw. Polygone und
*   Multi-Punkte (mehrere Punkte)

Eine Geometrie muss zu einem Datensatz nicht zwingend vorhanden sein. Es können auch reine Sachdaten als Shapefile abgespeichert werden.

## Nachteile von Shapefiles

*   Shapefiles sind relativ träge
*   Ein Shapefile hat immer mehrere Dateien (Jeder kennt das Problem, wenn man nur die .shp gesendet bekommt)
*   Attributnamen sind auf 10 Zeichen begrenzt
*   Keine Möglichkeit Topoligien in den Daten zu speichern
*   Die Dateigröße ist auf 2GB beschränkt
*   Kann nur einen Geometrietyp pro Datei enthalten
*   Keine echte 3D-Unterstützung

## Alternativen zu Shapefiles

Die beste Alternative zu Shapefiles sind [GIS-Datenbanken](/gis/geo-datenbank-optionen "GIS-Datenbanken") z.B. [PostGIS](/gis/postgis-qgis) (PostgreSQL) oder auch [GeoPackages](https://de.wikipedia.org/wiki/GeoPackage).

In Datenbanken ist die Dateigröße praktisch nicht beschränkt, es können unterschiedliche Geometrietypen gespeichert werden und Topologien erstellt werden. Alle Daten in Datenbanken können einfach ausgespielt und zum Beispiel als Geopackage versendet werden, was nur eine handliche Datei ist.
