---
layout: "Artikel"
title: "Fernerkundung und Bildklassifikation"
date: "2019-05-19"
description: "Navigationsgeräte, Smartphones und Wettervorhersagen sind abhängig von Satelliten und ohne diese müssten mir auf einige Dienste, die unseren Alltag erleichtern, verzichten."
category: "GIS"
tags: ["Fernerkundung"]
image: "../../../../../static/assets/img/postImg/fernerkundung-und-bildklassifikation.webp"
caption: "by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
lang: "de"
---


## Fernerkundung

Navigationsgeräte, Smartphones und Wettervorhersagen sind abhängig von Satelliten und ohne diese müssten mir auf einige Dienste, die unseren Alltag erleichtern, verzichten.

Ständig werden Bilder der Erde von Satelliten oder Befliegungen aufgenommen. Diese Fernerkundungsdaten haben oft eine Auflösung von bis zu 30cm, werden in einem Spektrum von 450 nm bis 2273 nm aufgenommen und von den Betreibern der Satelliten meistens georeferenziert.

Diese Bilder werden dann verkauft oder auch von manchen Anbietern auch kostenlos zur Verfügung gestellt.

## Copernicus Open Access Hub

Auf [Sentinel Open Access Hub](https://scihub.copernicus.eu/dhus/#/home) findet man kostenlose Produkte des [Copernicus Programms](https://www.d-copernicus.de/), das von von der [Europäischen Union](https://europa.eu/european-union/index_de) und unter anderem der [European Space Agency](https://www.esa.int/ESA) (ESA) betrieben wird.

_Das Copernicus-Programm umfasst im Prinzip sechs Satelliten ([Sentinel-1](https://de.wikipedia.org/wiki/Sentinel-1), [Sentinel-2](https://de.wikipedia.org/wiki/Sentinel-2), [Sentinel-3](https://de.wikipedia.org/wiki/Sentinel-3), [Sentinel-4](https://de.wikipedia.org/wiki/Sentinel-4) (geplanter Start 2021), [Sentinel-5](https://de.wikipedia.org/wiki/Sentinel-5) und Sentinel-6 (geplanter Start Ende 2020)._

_Alle diese Satelliten erfüllen unterschiedliche Aufgaben und helfen dabei Land, Meer und die Atmossphäre zu beobachten._

Im Copernicus Open Access Hub kann man sich nun nach einer kostenfreien Anmeldung alle zur Verfügung gestellten Daten herunterladen. Über Suchkriterien und einem gewünschten Bildausschnitt, den man einfach mit einem Rechteck zeichnen kann, werden alle verfügbaren Daten zum Download angezeigt

**ArcGIS unterstützt aktuell die Produkte der Ebene 1C.**

Diese Bilddateien sind relativ groß und es kann (je nach Internetbandbreite) etwas dauern, bis die ZIP-Datei fertig heruntergeladen ist.

## Bildklassifikation

Diese Multispectral-Bänder kann man dann in Arc[GIS](/gis/was-ist-gis "Was ist GIS?") oder QGIS einbinden.

Eine Klassifikation besteht nun grob aus zwei Hauptkomponenten.

1.  Erzeugen von [Training Samples](https://pro.arcgis.com/de/pro-app/help/analysis/image-analyst/training-samples-manager.htm) und
2.  [Klassifikation](https://data-science-blog.com/blog/2017/12/20/maschinelles-lernen-klassifikation-vs-regression/) anhand der Training Samples und [Validierung](https://towardsdatascience.com/supervised-machine-learning-model-validation-a-step-by-step-approach-771109ae0253)

### Erzeugen von _Training Samples_

Zunächst muss eine Klassifikationsmethode gewählt werden (z.B. Supervised und Pixel-based). Diese Klassifikationsmethode unterteilt einzelne Pixel des Satellitenbilds in thematische Klassen ein, z.B

*   Siedlung
*   Wald
*   Wasser
*   Wiese usw.

Hier wird dem System also beigebracht ([Machine Learning](https://de.wikipedia.org/wiki/Maschinelles_Lernen)), dass beispielsweise ein grüner Pixel für die Klasse Wald, blau für Wasser, hellgrün für Wiese und grau für Siedlung steht.

Um ein möglichst realitätsgetreues Ergebnis zu bekommen sollte man für diese Samples möglichst eindeutige Flächen/Pixel wählen. D.h. in der Klasse sollte zum Beispiel kein grauer Pixel sein.

Wenn die Zuweisung von Samples für jede Klasse erledigt ist, beginnt nun die eigentliche Klassifikation.

### Klassifikation anhand der _Training Samples_ und Validierung_

Hier gibt es verschiedene Klassifikationsmethoden, die genutzt werden können z.B [Maximum likelihood](https://de.wikipedia.org/wiki/Maximum-Likelihood-Methode). Die Klassifikationsmethode muss nun nurnoch ausgewählt werden und dann kann die Klassifizierung gestartet werden.

Um die Qualität der Klassifikation nun zu prüfen wird normalerweise eine Validierung der Ergebnisse mit z.B. der [_ground truthing._](https://de.wikipedia.org/wiki/Ground_Truth) Methode durchgeführt.

Anschließend wird geprüft, wieviele Punkte in die richtige Klasse (also zum Beispiel eine Siedlung wurde als Siedlung erkannt) eingestuft wurden. Hier sollte man mit den _Validierungssamples_ nicht zu geizig sein, um eine aussagekräftige Validierung der Bildklassifikation zu erreichen.

Diese kann man sich in einer Excelliste notieren und die Gesamtgenauigkeit der Klassifikation einfach ausrechnen lassen. Dafür muss man sich natürlich falsche und richtige Klassifizierung notieren.

Und das wars dann auch schon.

Fernerkundung ist also sehr kurz gesagt die Erhebung von [Geodaten](/gis/was-sind-geodaten/ "Was sind Geodaten?") bzw. [Satellitenaufnahmen](/gis/hochaufloesende-satellitenbilder-downloaden/ "Hochaufloesende Satellitenbilder downloaden") durch Satelliten und die anschließende Methodik (Bildklassifikation) zur Auswertung dieser Fernerkundungsdaten über die Beschaffenheit der Erdoberfläche