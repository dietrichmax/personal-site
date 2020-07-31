---
layout: "Artikel"
title: "GK - UTM Koordinaten umrechnen - Transformationstool"
date: "2019-04-14"
description: "Das Gauß-Krüger-System (GK) wird damit nun auch in Bayern abgelöst und durch UTM ersetzt. Wie du Geodaten von GK nach UTM transfomieren kannst erfährst du hier"
category: "GIS"
tags: ["Koordinatentransformation", "Geodaten"]
image: "../../../../../static/assets/img/postImg/transformation-konvertierung-und-formatumwandlung.jpg"
caption: "Photo by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

Zum Jahreswechsel 2018/2019 hat die Bayrische Vermessungsverwaltung das Koordinatenrefernzsystem ETRS89 als neues Bezugssystem eingeführt.

Das Gauß-Krüger-System (GK) wird damit nun auch in Bayern abgelöst und durch UTM ersetzt.

Weiterführende Informationen dazu findest du auf der Seite der [Bayrischen Vermessungsverwaltung](https://www.ldbv.bayern.de/vermessung/utm_umstellung.html "Bayrischen Vermessungsverwaltung").

Viele Datensätze sind nun allerdings noch in Gauß-Krüger vorhanden und müssen dementsprechend von Gauß-Krüger nach UTM umgerechnet bzw. transformiert werden.

## NTv2-Dateien

Dafür stellt das Vermessungsamt sogenannte Gitterdateien (NTv2-Dateien) kostenlos zur Verfügung, mit denen Datensätze lagegenau auf Basis des Liegenschaftskatasters transformiert werden können.

Es werden Gitterdateien für jeden Regierungsbezirk und eine Gesamtdatei für Bayern angeboten ([NTv2-Datei BY-KanU](https://www.ldbv.bayern.de/vermessung/utm_umstellung/trans_geofach.htm)).

*   [Gitterdatei 1'' Bayern (zip, 1.089,7 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/ntv2_bayern.zip "Gitterdatei Bayern")
*   [Gitterdatei 1'' Schwaben (zip, 214,4 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_schwaben.zip "Gitterdatei Schwaben")
*   [Gitterdatei 1'' Oberfranken (zip, 116,4 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_oberfranken.zip "Gitterdatei Oberfranken")
*   [Gitterdatei 1'' Mittelfranken (zip, 100,3 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_mittelfranken.zip "Gitterdatei Mittelfranken")
*   [Gitterdatei 1'' Unterfranken (zip, 139,9 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_unterfranken.zip "Gitterdatei Unterfranken")
*   [Gitterdatei 1'' Oberpfalz (zip, 178,4 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_oberpfalz.zip "Gitterdatei Oberpfalz")
*   [Gitterdatei 1'' Oberbayern (zip, 288 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_oberbayern.zip "Gitterdatei Oberbayern")
*   [Gitterdatei 1'' Niederbayern (zip, 150,6 MB)](http://geodaten.bayern.de/oadownload/bvv_internet/kanu/kanu_ntv2_niederbayern.zip "Gitterdatei Niederbayern")

## UTM Transformationstools

Mit diesen Gitterdateien ist es aber noch nicht ganz erledigt. Für eine einfache und schnelle Transformation empfiehlt es sich Transformationstools zu verwenden. Unter [gis.makobo.de](http://gis.makobo.de/ "gis.makobo.de") werden kostenlose Konverter bereitgestellt.

In der Unterseite [KooTransBY](http://gis.makobo.de/kootransby/ "KooTransBY") findet man einen Konverter(KooTransBYV0_7R0) für die Koordinaten Transformationen zwischen DHDN/GK und ETRS89/UTM in Bayern. Dieser funktioniert von Gauß-Krüger nach UTM, sowie andersherum.

Diesen muss man nur als ZIP-Datei herunterladen, an einem beliebigen Ort speichern und ausführen.

## Transformationen Bayern zwischen DHDN/GK und ETRS89/UTM

Wenn man das Programm ausführt werden zuerst alle im Internet verfügbaren NTv2-Dateien für Bayern angezeigt. Hier kann man einfach die passende auswählen und über "Download" herunterladen oder sofern man dies bereits beim Vermessungsamt gemacht hab den Speicherort der Datei auswählen.

![NTv2 Datei einbinden](/static/e309da2dece04d467f64576058133b2a/c6d7b/NTv2-Datei-ausw%C3%A4hlen.jpg "NTv2 Datei einbinden")

Die verwendete NTv2 kann man jederzeit ändern. Mit einem Klick auf "Weiter >>" landet man bei der eigentlichen Transformation.

Es können einzelne Punkte, Koordinatentextdateien, Excelkoordinatenmappen, DXF-Dateien, Shapefiles oder Rasterdateien, wie z.B. TIF, JPEG, PNG, usw. transformiert werden.

Das Programm erkennt automatisch das vorhandene Koordinatensystem und transformiert in das jeweilige Andere.

Es muss die Datei oder die Koordinate und der Gauß-Krüger-Streifen bzw. die UTM-Zone angegeben werden.

Nun wählt man noch einen Speicherort und -Namen für die Zieldatei und mit einem Klick auf den rot umrandeten "DHDN <-> ETRS89" Button wird die Datei bzw. die Koordinate transformiert.

Mit der Version zur Koordinatentransformation für Deutschland (GeoTKFV) können noch detaillierte Einstellungen vorgenommen werden. Außerdem können mit dieser Version auch mehr Dateiformate wie:

*   Excelmappe mit Koordinaten
*   MicroStation DGN
*   GeoPackage
*   NAS-Dateien
*   KML
*   TAB
*   GPX-Dateien und
*   GeoJSON

transformiert werden.

![Koordinaten Transformationstool](/static/f553793a3dc009c91ff0f6ac583a5715/398b7/2019-04-18.png "Koordinaten Transformationstool")

Bei Fragen zu Programm gibt es sogar ein [Hilfe bzw. Kontaktforum](http://forum.makobo.de/index.php "Hilfe bzw. Kontaktforum"), das bereitgestellt wird.