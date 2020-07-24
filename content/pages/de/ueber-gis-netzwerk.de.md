---
page: true
layout: "page"
title: "Über GIS-Netzwerk"
date: "2020-02-16"
author: "Max Dietrich"
---

GIS-Netzwerk ist eine Informationsplattform für (Web-)[GIS](/gis/was-ist-gis "Was ist GIS"), [Geodaten](/gis/was-sind-geodaten "Was sind Geodaten?") und [Web-Development](/web-development "Web-Development").

Thematische Schwerpunkte sind die Verbindung dieser Themen, also insbesondere 
+ [Web-GIS](/tags/web-gis/ "Web-GIS"), 
+ die Datenerhebung, Verarbeitung, Analyse und Visualisierung von [Geodaten](/tags/geodaten/ "Geodaten") via 
+ [FME](/tags/fme/ "FME"), 
+ [SQL](/tags/sql/ "SQL"), 
+ [Leaflet](/tags/leaflet/ "Leaflet"), 
+ [OpenLayers](/tags/open-layers/ "OpenLayers"), und Ähnliches.

Der Veröffentlicher dieser Webseite ist Max Dietrich.

[Instagram](https://www.instagram.com/_maxdietrich/ "Instagram") / [Twitter](https://twitter.com/GISNetzwerk "Twitter") / [Linkedin](https://www.linkedin.com/in/max-dietrich-807bb5161/ "Linkedin") / [Xing](https://www.xing.com/profile/Max_Dietrich7 "Xing") / [Github](https://github.com/DaTurboD/GIS-Netzwerk "Github") / [Mail](kontakt@gis-netzwerk.com "Mail")

Jede Person kann bei ernsthaftem Interesse gerne eigenen Content auf GIS-Netzwerk veröffentlichen.

## Auf GIS-Netzwerk Content veröffentlichen

> Auf GIS-Netzwerk werden immer motivierte und engagierte Autoren gesucht, die ihr Wissen mit der Welt teilen möchten.

+ Du bist Experte in einem (oder mehreren) dieser [Themen](https://github.com/DaTurboD/GIS-Netzwerk/tree/master/data/category.yaml "category.yaml")?.
+ Dein Artikel umfasst mindestens 600 Wörter.
+ Dein Content wurde und wird auch nicht anderswo veröffentlicht.

**So reichst Du deinen Gastbeitrag ein:**

Du schreibst an kontakt@gis-netzwerk.com eine E-Mail mit folgenden Inhalten: 

* Infos zu dir: Name, Links zu Social-Media Profilen etc. (siehe [author.yaml](https://github.com/DaTurboD/GIS-Netzwerk/tree/master/data/author.yaml  "author.yaml")) mit einer kurzen Begründung, warum auf auf GIS-Netzwerk einen Beitrag veröffentlichen möchtest.
* Deinen Beitrag als zum Beispiel Markdown-Datei inkl. aller verwendeteten Bilder (am Besten in einer .zip-Datei)

Anschließend werde ich mich bei Dir so schnell wie möglich melden.

## Technische Details

Die Webseite wurde mit dem React-Framework [GatsbyJS](https://www.gatsbyjs.org/ "GatsbyJS lernen") erstellt.
Momentan wird die Webseite auf Amazon S3 gehostet und über Cloudflare CDN bereitgestellt.
Außerdem wird für ein paar Components, wie zum Beispiel dem [View-Counter](https://github.com/DaTurboD/GIS-Netzwerk/tree/master/src/components/articles/viewcounter "ViewCounter") oder den [Post-Reactions](https://github.com/DaTurboD/GIS-Netzwerk/tree/master/src/components/articles/postreactions "Post-Reactions") [Google Firebase](https://console.firebase.google.com/ "Google Firebase") bzw. Cloud Firestore genutzt.

Bei momentan ca. 10.000 Seitenaufrufen im Monat belaufen sich die Kosten für das S3-Hosting auf ca. 0,10€ (hauptsächlich durch häufige Änderungen an der Webseite) im Monat. Da die Limits für das kostenlose Kontigent bei Google Firebase nicht erreicht werden, fallen hierfür keine Kosten an und Cloudflare wird auch kostenlos angeboten. Deployed wird die Seite über [GatsbyCloud](https://www.gatsbyjs.com/ "GatsbyCloud") 🎉.

> Wenn Sie an Kooperationen oder Werbemöglichkeiten interessiert sind, setzen Sie sich einfach mit mir in Verbindung unter kontakt@gis-netzwerk.com.