---
layout: "Artikel"
title: "WMS - Web Map Service und WMTS"
date: "2019-03-02"
description: "Grundsätzlich ist ein WMS - Abkürzung für Web Map Service - eine Schnittstelle zum Abrufen von digitalen Karten über das Internet."
category: "GIS"
tags: ["WMS", "Web-GIS"]
image: "../../../../static/assets/img/postImg/wms-wmts.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

## [](#wms-und-wmts)WMS und WMTS

Web Map Service ( **WMS** ) und Web Map Tile Service ( **WMTS** )

Grundsätzlich ist ein WMS - Abkürzung für Web Map Service - eine Schnittstelle zum Abrufen von digitalen Karten über das Internet. [GIS](/gis/was-ist-gis "Was ist GIS?") Dienstleister und Vermessungsämtern nutzen hauptsächlich diesen Webservice. Das heißt, dass GIS-Dienstleister, die für Kommunen arbeiten und deren Daten hosten, die [Geodaten](/gis/was-sind-geodaten "Was sind Geodaten") (z.B Luftbilder, Wanderwege, Bebauungspläne, usw.) der Kommunen online verfügbar stellen und diese dann von den Vermessungsämtern in ihr jeweiliges Web GIS eingebunden werden.

Ziel der Vermessungsämter ist es einen zentralen Zugang zur Geodateninfrastruktur der Bundesländer zu schaffen (siehe [Geoportal Bayern](https://geoportal.bayern.de/geoportalbayern/ "Geoportal Bayern")).

Mit einem Web Map Service werden also Geodaten oder Karten visuell dargestellt.

Wie die Übergabe dieser Daten genau auszusehen hat, wurde vom [Open Geospatial Consortium](http://www.opengeospatial.org/ "Open Geospatial Consortium") ( OGC ) verfasst. Ein Web Map Service besitzt im Prinzip drei Funktionen.

*   `GetCapabilities`: Hier wird ein XML Dokument mit Metadaten übertragen. Dieses beinhaltet allgemeine Angaben, unterstützte Formate und die Layer der Karte bzw. der Karten.
*   `GetFeatureInfo`: Übeträgt thematische Informationen zu einer Position im dargestellten Kartenausschnitt.
*   `GetMap`: Diese Funktion überträgt die eigentliche georeferenzierte Karte, Die Darstellung und das Koordinatensystem.

Diese Daten werden also (üblicherweise) von einem [Geoinformationssystem](/gis/was-ist-gis "Was ist GIS?") (GIS) in ein anderes über das Internet übertragen.

Soviel dazu. Was ist aber nun ein WMTS?

## [](#wmts)WMTS

Ein Web Map Tile Service ist - wie der Name schon vermuten lässt - eine Erweiterung zum WMS. Nämlich mit einem Tile Cache.

Der Grundlegenste Unterschied ist, dass beim WMTS Karten in Kacheln (Tiles) geladen werden. Dies geht wesentlich schneller, da nur ein Ausschnit der kompletten Karte geladen wird. Nämlich der, den man gerade anschauen will. Beim WMS wird immer die komplette Karte geladen, was natürlich wesentlich länger dauert.

Damit nur ein Ausschnitt übertragen wird, muss vom übertragenden Server die Karte vorgerendert werden. Dieser "zerstückelt" die Karte und sendet einen Ausschnitt. Da aber immer nur ein Ausschnitt angezeigt wird, kann es passieren, dass wichtige Informationen an den Grenzen der Kacheln abgeschnitten (geclippt) werden.

## [](#fazit)Fazit

Web Map Service ( WMS ) und Web Map Tile Service ( WMTS ) sind Webservices zur Übertragung von Geodaten.

Ein WMS schickt pro Anfrage ein Bild.

Ein WMTS teilt dieses Bild zuvor in Kacheln auf und sendet nur einen Ausschnitt von dem Gesamtbild. Dies geht schneller. Wichtige Informationen können aber abgeschnitten werden.