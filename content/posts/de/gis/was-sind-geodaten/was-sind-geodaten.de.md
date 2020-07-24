---
layout: "post"
title: "Geodaten - Was sind Geodaten?"
date: "2018-04-12"
description: "Geodaten sind Informationen mit einem räumlichen Bezug, die unter anderem in einem GIS genutzt werden können."
category: "GIS"
tags: ["Geodaten"]
image: "./was-sind-geodaten.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---


## Was sind GIS-Daten bzw. Geodaten

Geodaten sind Informationen mit einem räumlichen Bezug, die unter anderem in einem [Geoinformationssystem (GIS)](/gis/was-ist-gis "Was ist GIS?") genutzt werden können.

Sie werden in mehreren Kategorien unterschieden. Grundlegend gibt es erstmal Primärdaten und Sekundärdaten.

*   **Primärdaten**: Primärdaten sind Rohdaten, also Daten die unmittelbar aus einer Datenerfassung abstammen und zum Beispiel bei der Vermessung von einem Grundstück entstehen.
*   **Sekundärdaten**: Sekundärdaten sind berarbeitete Primärdaten. Sie wurden berechnet, modelliert oder anderweitig verarbeitet.

Dabei bestehen alle Geodaten grundsätzlich aus **Objektattributen** und **Objektgeometrien**. Die Attribute beschreiben das Objekt und die Geometrie bestimmt die Lage, sowie die Form Fläche des Objekts. Objekte können als Punkte, Linien, Flächen oder Körper dargestellt werden.

Kommen wir wieder zum Beispiel Google Maps zurück. Sucht man dort zum Beispiel nach Tankstellen in Honolulu, werden alle erfassten Tankstellen auf einer Karte dargestellt.

**Objektattribute** wären hier zum Beispiel:

*   _Tankstelle_
*   _Marke_
*   _Anschrift_
*   _Bewertungen_

Die **Objektgeometrie** ist in diesem Fall ein Punkt mit entsprechendem Koordinaten. Für eine schöner Darstellung hat sich Google einen "roten, umgedrehten Regentropfen" für diesen Punkt ausgesucht.

(Beispiel für Geodaten):

<div class="gatsby-resp-iframe-wrapper" style="padding-bottom:75%;position:relative;height:0;overflow:hidden"><iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d5255.6858645833445!2d-157.91487938763447!3d21.337430898960356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stankstelle%20honolulu%20shell!5e0!3m2!1sde!2sde!4v1570290782945!5m2!1sde!2sde" style="border:0;position:absolute;top:0;left:0;width:100%;height:100%" allowfullscreen="" frameborder="0"></iframe></div>

Handelt es sich hier nun um Primär- oder Sekundärdaten?

Die Informationen über diese Tankstelle gehören zu den Sekundärdaten.

Dies wissen wir einerseits, weil die Lage der Tankstelle einmal vermessen wurde, sonst könnte man ihr keinen Punkt mit Koordinaten zuweisen und weil nachträglich alle dazugehörigen Informationen, wie Shell, Anschrift, Bewertungen, Berichte, usw hinzugefügt wurden und die Darstellung angepasst wurde.

Des Weiteren wird nun zwischen Geobasisdaten und Geofachdaten unterschieden.

**Geobasisdaten:** Unter Geobasisdaten versteht man grundlegende amtliche Daten. Sie dienen als Basis für Fachkarten und thematische Karten. Zum Beispiel Landschaft (Topographie), Liegenschaften, Daten aus Alkis oder Erdoberfläche. Sie sind Daten der Vermessungsverwaltung und werden von öffentlichen Stellen erstellt. Die Nutzung dieser Daten kommerzieller Art sind gesetzlich eingeschränkt.

**Geofachdaten:** Geofachdaten sind Daten aus verschiedenen Fachbereichen und werden auf den entsprechenden Karten dargestellt. Sie finden Verwendung in: Stadtplanung, Demographie, Umweltschutz, Bildung, Soziales, Ver-und Entsorgung, Katastrophenschutz, Immobilienverwaltung, Geomarketing

Es gibt verschiedene Möglichkeiten geographische Informationen abzuspeichern. Unter anderem:

*   _in einer Datenbank z.B. [PostgreSQL](/postgre-sql-mit-post-gis-installieren-und-in-qgis-einrichten)_
*   _als Shapefile_
*   _in einer Geodatabase_
*   _als Raster-Bild_
*   __als Tabellendaten__

Geodaten können von öffentlichen und privaten Anbieter bezogen werden. Das Landesamt für Digitalisierung, Breitband und Vermessung bietet zum Beispiel Luftbilder und topographische Karten an, welche aber gesetzlichen Einschränkungen unterliegen. Die Kosten hierfür sind sehr unterschiedlich.

*   _[Bundesamt für Kartographie und Geodäsie](https://www.bkg.bund.de/DE/Home/home.html "Bundesamt für Kartographie und Geodäsie")_
*   [_Bayrische Vermessungsverwaltung_](https://www.ldbv.bayern.de/ "Bayrische Vermessungsverwaltung")

Je nach Einsatzbereich müssen Geodaten gewisse Qualitätsmerkmale besitzen, um ihren Zweck erfüllen zu können. Bei unterirdischen Leitungen reicht es zum Beispiel nicht, wenn sie auf ein paar Meter genau sind, da man sonst bei eventuell anfallenden Reparaturen erstmal die Leitung suchen müsste. Bei der Bestimmung der Position der Tankstelle, wäre es theoretisch egal ob der Punkt nun um ein oder zwei Meter verschoben wäre, da eine Tankstelle im Normalfall größer als zwei Meter ist. Im Prinzip kann man sagen, dass sich die Messgenauigkeit mit der Dimension eines Objekts direkt proportional verhalten kann.

Darüber hinaus müssen Geodaten auch logisch sein, das heißt bei einer Datenerfassung zur Bevölkerungskartierung, dürfen keine negativen Werte auftreten. Oft spielt auch die Zeit eine wichtige Rolle. Folgend sind Objekte mit einer genauen Lage und Zeitangabe vierdimensional. Dies ist zum Beispiel wichtig bei historischen Daten oder bei der Analyse von Beölkerungsstrukturen über einen gewissen Zeitraum.

## Fazit

Geodaten sind räumliche Daten, die ein reales Objekt darstellen. Sie umfassen Attribute, die das Objekt beschreiben und eine Geometrie, die die Lage des Objekts bestimmt. Geodaten werden in Primär- und Sekundärdaten unterschieden und in Datenbanken, Tabellendaten, als Bilder oder Shapefiles gespeichert. Sie sind das Medium für Karten, die in einem Geoinformationssystem dargestellt werden, um komplexe Themen zu analysieren und eine Entscheidung zu finden.