---
layout: "post"
title: "PyQGIS - Layer als Bilder exportieren"
date: "2020-01-29"
description: "Mithilfe von PyQGIS können Prozesse, wie zum Beispiel das Exportieren von Bildern für alle Ebene aus einer Karte automatisiert werden."
category: "GIS"
tags: ["PyQGIS", "QGIS", "Python", "API"]
image: "../../../../../static/assets/img/postImg/pyqgis-layer-als-bilder-exportieren.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
---

Mithilfe von [PyQGIS](https://docs.qgis.org/2.18/de/docs/pyqgis_developer_cookbook/index.html "PyQGIS") können Prozesse, wie zum Beispiel das Exportieren von Bildern für alle Ebene aus einer Karte automatisiert werden.

Dafür benötigt man als aller Erstes natürlich erst einmal eine oder mehrere Ebenen mit [Raster- und/oder Vektordaten](/gis/raster-und-vektordaten "Raster- oder Vektordaten").

## Ebenen mit PyQGIS hinzufügen

Falls alle Dateien in dem gleichen Ordner liegen können diese mit einer ["for .. in loop](https://www.w3schools.com/python/python_for_loops.asp "Python For Loops") eingelesen werden. Außerdem kann mit `.endswith(".gpkg")` zum Beispiel nur nach Dateien mit der Endung ".gpkg" gesucht werden. Darüber hinaus wird beim Hinzufügen der Layer jeder Layername in einen Array gepackt, der später noch benötigt wird.

```py
    import os, sys
    from PyQt5.QtCore import QTimer

    # path to look for files
    path = "ordner/nocheinordner/"
    # set path
    dirs = os.listdir( path )
    # array for storing layer_names
    layer_list = []
    # variable for further processing
    count = 0
    #look for files inpath
    for file in dirs:
    	# search for ".gpkg" files 
        if file.endswith(".gpkg"):
    		#add vectorlayers
            vlayer = iface.addVectorLayer(path + file, "Layername", "ogr")
            layer_list.append(vlayer.name())
```
Anschließend erscheinen die neuen Vektorebenen in dem QGIS Ebenenbaum.

## Bild Export für jeden Layer

Wenn man mit der Darstellung zufrieden ist, kann mithilfe von zwei kleinen Funktionen für jeden Layer ein georeferenziertes Bild exportiert werden.

```py
    def prepareMap():
        # make all layers invisible
    	iface.actionHideAllLayers().trigger()
        # get layer by layer_name
    	layer_name = QgsProject.instance().mapLayersByName(layer_list[count])[0]
        # select layer
    	iface.layerTreeView().setCurrentLayer(layer_name)
        # set selected layer visible
    	iface.actionShowSelectedLayers().trigger()
        # Wait a second and export the map
    	QTimer.singleShot(1000, exportMap) 
```

Die Funktion "prepareMap()" deaktiviert zuerst alle Layer. Anschließend wird ein Layer mithilfe dessen Layernamens aus dem Array "layer_list" selektiert und wieder eingeblendet. Besonders wichtigt ist hier die Klasse QTimer. Bevor ein Bild erzeugt wird, muss immer eine kurze Zeit gewartet werden, damit der selektierte Layer auch wirklich sichtbar ist. Ohne QTimer würde das Script so schnell durchlaufen, dass man als Ergebnis lauter Bilder mit gleichen Inhalt bekommt. Nachdem eine Sekunde gewartet wurde, wird die Funktion "exportMap" aufgerufen.

```py
    def exportMap(): 
        global count
    	# save current view as image
        iface.mapCanvas().saveAsImage( path + layer_list[count] + ".png" )
    	# feedback for printed map
        print('{}.png exported sucessfully'.format(layer_list[count]))
    	# get map for every layer in layer_list
        if count < len(layer_list)-1:
    		# Wait a second and prepare next map (timer is needed because otherwise all images have the samec content 
    		# the script excecutes faster then the mapCanvas can be reloaded
            QTimer.singleShot(1000, prepareMap) 
        count += 1
```

Nun wird die aktuelle Karte, in der nur noch eine Ebene eingeblendet ist, als PNG-Bild in dem Ursprungsverzeichnis gespeichert. Letztendlich "landet" man in einer Schleife, die alle Layer, die im Array "layer_list" vorhanden sind, durch geht und für jeden Layer wieder die Funktion "prepareMap" aufruft.