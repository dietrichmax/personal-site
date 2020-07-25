---
layout: "post"
title: "AutoCAD Map 3D Shapefile Export"
date: "2018-05-07"
description: "Die Universität bietet attraktive Weiterbildungsmöglichkeiten für Geoinformatik"
category: "GIS"
tags: ["CAD", "AutoCAD", "Shapefile"]
image: '../../../../../static/assets/img/postImg/autocad-map-3d-shapefile-export.jpg'
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

In diesem Artikel zeige ich dir wie man [Shapefiles](/gis/was-ist-ein-shapefile-shp-dbf-shx/ "Was ist ein Shapefile?") aus [CAD](https://gis-netzwerk.com/gis/unterschied-cad-gis/ "GIS vs CAD") also DWG- oder DXF-Dateien in AutoCAD Map 3D exportieren kann.

Dafür geht man unter "Karte zeichnen", was man in der obersten Menüleiste findet azf "Import/Export" und "Exportieren".

![Screenshot AutoCAD Map3D Shapefile Exportieren...](/autocad-map-3d-shapefile-export%5C2018-05-07-13_42_20-Autodesk-AutoCAD-Map-3D-20152-1.png)2018-05-07-13_42_20-Autodesk-AutoCAD-Map-3D-20152-1.png

Es öffnet sich nun ein Fenster, bei dem man den Dateinamen und das Verzeichnis wählt, in welches das Shapefile gespeichert werden soll.

Anschließend öffnet sich folgende Maske:

![AutoCAD Shapefile Export GIS](/autocad-map-3d-shapefile-export%5C2018-05-07-13_46_30-Exportieren.png)AutoCAD Shapefile Export [GIS](/gis/was-ist-gis "Was ist GIS?")

## Einstellungen des Shapeexport

Hier selektieren wir den Geometrietyp den wir in dem Shapefile haben möchten. Zur Auswahl stehen die Geometrietypen:

*   Punkt
*   Linie
*   Polygon
*   Text

Es kann pro Layer und Geometrieart **nur ein** Shapefile exportiert werden.

Wenn man also beispielsweise mehrere Texte unterschiedlicher Layer exportieren möchte, so muss man diese erst auf einen gemeinsamen Layer "legen".

Bei den zu exportierenden Objekten gibt es zwei Optionen. Entweder man wählt alle Objekte einer Zeichnung mit "Alle wählen" aus oder man markiert bestimmte Objekte mit der Funktion "Manuell auswählen".

Folgend wählt man den Layer aus, auf dem sich die Objekte befinden und gegebenenfalls die Objektklasse.

_Falls man ein Polygon exportieren möchte gibt es unter dem Tab "Optionen" die Möglichkeit "geschlossene Polylinien als Polygone" zu behandeln._

**WICHTIG:**

Es wird immer nur **ein** Shapefile ausgespielt.

Möchte man nun zum Beispiel alle Objekte eines Layers ausspielen, müsste man das obere Prozedere vier mal durchlaufen.

Viel Erfolg beim Exportieren.

Sollten noch Fragen zum Export von Shapefiles in AutoCAD offen sein, dann kannst du diese gerne in den Kommentaren stellen.