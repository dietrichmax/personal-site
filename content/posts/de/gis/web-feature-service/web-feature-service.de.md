---
layout: "Artikel"
title: "Web Feature Service - Open Source WFS"
date: "2019-03-09"
description: "In diesem Beitrag findest du Open Source Web Feature Service Server mit denen du deinen eigenen Web Feature Service ( WFS ) einrichten kannst und Geodaten, die du in deinem GIS über WFS kostenlos einbinden kannst."
category: "GIS"
tags: ["WFS", "Web-GIS"]
image: "../../../../../static/assets/img/postImg/web-feature-service.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

## [](#web-feature-service)Web Feature Service

Ein Web Feature Service ermöglicht den Austausch von [Geodaten](/gis/was-sind-geodaten "Was sind Geodaten?") in einem [Geoinformationssystem](/gis/was-ist-gis "Was ist GIS?") ( GIS ) über das Internet.

In diesem Beitrag findest du Open Source Web Feature Service Server mit denen du deinen eigenen Web Feature Service ( WFS ) einrichten kannst und Geodaten, die du in deinem GIS über WFS kostenlos einbinden kannst.

## [](#open-source-web-feature-service-server--wfs-)Open Source Web Feature Service Server ( WFS )

*   [**GeoServer**](http://geoserver.org/ "GeoServer")

GeoServer ist ein Open Source Server um Geodaten mit anderen zu teilen. GeoServer basiert auf Java und erlaubt den Anwender die Geodaten anzusehen und zu bearbeiten. Es verwendet die Standards des [Open Geospatial Consortium (OCG)](http://www.opengeospatial.org/ "Open Geospatial Consortium (OCG)") wordurch es sehr flexibel bei der Erstellung von Karten und dem Teilen von Geodaten ist.

*   [**degree**](https://www.deegree.org/ "degree")

Degree ist ein Open Source Software für räumliche Datenstrukturen und WEBGIS. Es bietet Funktionen für Datenmanagement, Visualisierung und Sicherheit. Degree wird von FOSSGIS gesponsort und wurde auf den Standards von Open Geospatial Consortium ( OGC ) aufgebaut.

Es bietet den OGC [Web Map Service](/wms-web-map-service-und-wmts "Web Map Service") ( WMS ). einen vollständig kompatiblen Web Feature Service ( WFS ) und Plugins für Catalogue Service ( CSW ), Web Coverage Service ( WCS ), Web Processing Service ( WPS ) und [Web Map Tile Service](/wms-web-map-service-und-wmts "Web Map Tile Service") ( [WMTS](/wms-web-map-service-und-wmts "WMTS") ).

*   [**FeatureServer**](http://featureserver.org/ "FeatureServer")

FeatureServer bietet - wie der Name schon andeutet - einen Feature Service Server. FeatureServer erlaubt es Anwendern Geodaten zu sehen, zu verändern oder neu hinzuzufügen.

## [](#wfs-geodaten-service)WFS Geodaten Service

### [](#deutschland)**Deutschland**

#### [](#bund)**Bund**

*   [Gewässerkundliches Informationssystem der Wasserstraßen- und Schifffahrtsverwaltung des Bundes](https://www.pegelonline.wsv.de/webservice/wfsAktuell "Gewässerkundliches Informationssystem der Wasserstraßen- und Schifffahrtsverwaltung des Bundes")
*   [Bundesamt für Kartographie und Geodäsie](http://www.geodatenzentrum.de/geodaten/gdz_rahmen.gdz_div?gdz_spr=deu&gdz_akt_zeile=2&gdz_anz_zeile=5&gdz_unt_zeile=0&gdz_user_id=0 "Bundesamt für Kartographie und Geodäsie")

#### [](#regionale-geodaten)**Regionale Geodaten**

*   **Baden-Württemberg:** [Landesamt für Geoinformation und Landentwicklung Baden-Württemberg](https://www.lgl-bw.de/lgl-internet/opencms/de/07_Produkte_und_Dienstleistungen/Open_Data_Initiative/)
*   **Bayern:** [Bayerisches Staatsministerium für Wohnen, Bau und Verkehr](https://www.baysis.bayern.de/web/content/geodaten/wfs.aspx)
*   **Brandenburg:** [Karten-Service des Landesamtes für Bergbau, Geologie und Rohstoffe Brandenburg](http://www.geo.brandenburg.de/ows)
*   **Brandenburg** [Geoportal Brandenburg](https://geoportal.brandenburg.de/efre/ergebnisse/infrastrukturknoten-und-webbasierte-dienste/)
*   **Berlin:** [Berlin.de](https://daten.berlin.de/datensaetze)
*   **Gelsenkirchen:** [Open Data Gelsenkirchen](https://opendata.gelsenkirchen.de/dataset/infrastrukturdatenbank-der-stadt-gelsenkirchen-wms-wfs)
*   **Hamburg:** [Landesbetrieb Geoinformation und Vermessung](https://metaver.de/trefferanzeige?cmd=doShowDocument&docuuid=CF20A153-8206-41D6-A46B-6F40FB0405E8&plugid=/ingrid-group:dsc-MV) [Hamburg](https://metaver.de/trefferanzeige?cmd=doShowDocument&docuuid=CF20A153-8206-41D6-A46B-6F40FB0405E8&plugid=/ingrid-group:dsc-MV)
*   **Hamburg:**[TransparenzPortal Hamburg](http://suche.transparenz.hamburg.de/?groups=geografie-geologie-und-geodaten&sort=title_sort+asc&res_format=wfs)
*   **Mecklenburg Vorpommern:** [Landesamt für Umwelt, Naturschutz und Geologie](https://www.lung.mv-regierung.de/insite/cms/umwelt/umweltinformation/gis/kartenportal/kartendienste.htm)
*   **Niedersachen:** [Servicezentrum Landentwicklung und Agrarförderung Niedersachens](https://www.sla.niedersachsen.de/landentwicklung/anwendungen/leaportal/landentwicklung-und-agrarfoerderung---auskunftsdienste-86779.html)
*   **NRW:** [Geologischer Dienst NRW](https://www.gd.nrw.de/pr_od.htm)
*   **NRW:** [Beauftragter der Landesregierung Nordrhein-Westfalen für Informationstechnik (CIO)](https://open.nrw/suche)
*   **Rostock:** [Hanse- und Universitätsstadt Rostock](https://www.opendata-hro.de/dataset?res_format=WFS)
*   **Schleswig-Holstein:** [Landesamt für Vermessung und Geoinformation Schleswig-Holstein](http://www.sh-mis.schleswig-holstein.de/catalog/Query/ShowCSWInfo.do?fileIdentifier=5a04820d-1d3c-4bbe-af9d-1a410f217dc8)

### [](#international-und-mehr)**International und mehr**

*   **Amt Brück:** [Geodienste Amt Brück](http://www.amt-brueck.de/seite/182941/geodienste.html)
*   **International:** [OWS terrestris Dokumentation](https://ows.terrestris.de/dienste.html#openstreetmap-wms)
*   **Beeskow:** [Wasser- und Abwasser Zweckverband](https://www.beeskow-wasser.de/geoportal-und-wmswfs-dienste.html) [Beeskow und Umland](https://www.beeskow-wasser.de/geoportal-und-wmswfs-dienste.html)
*   **Österrreich:** [Open Data Österreich](https://www.data.gv.at/suche/)

[Hier erfährst du mehr zu Web Map Services](wms-web-map-service-und-wmts)