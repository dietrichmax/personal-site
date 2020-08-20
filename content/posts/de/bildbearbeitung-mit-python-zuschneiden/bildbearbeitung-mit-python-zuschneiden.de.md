---
layout: "Artikel"
title: Skalieren und Zuschneiden von Bildern mit Python
date: "2020-02-05"
description: "So bearbeitest du deine Bilder mit einem kleinen Python-Skript."
category: "Web-Development"
tags: ["Python", "Bildbearbeitung"]
image: "../../../../static/assets/img/postImg/bildbearbeitung-mit-python.jpg"
caption: "by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

Da ich sehr viele Bilder (und anfangs auch sehr große) Bilder hier verwendet habe, hat sich das enorm auf die Geschwindigkeit der Seite ausgewirkt.
Seit Juli 2018 ist PageSpeed ein Ranking-Faktor für Suchmaschinen wie Google und Co und man möchte ja nicht irgendwo auf Seite 50 in den Suchergebnissen rumdümpeln sondern vorne mit dabei sein.

Die hier verwendeten Bilder sind hauptsächlich Satellitenbilder von [ESA](http://www.esa.int/ "ESA"), die unter der Lizenz [CC BY-SA 3.0 IGO](https://creativecommons.org/licenses/by-sa/3.0/igo/) IGO) veröffentlich wurden und somit auch für eigene Zwecke unter bestimmten Bedingungen genutzt werden dürfen.

Diese Bilder sind gerne auch mal ~30MB groß, was etwas zu groß für eine Website ist. +
Da ich nicht alle Bilder manuell zuschneiden wollte, habe ich mich entschieden dieses Problem mit Python bzw. Pillow zu lösen.

## Pillow Bibliothek
[Pillow](https://pillow.readthedocs.io/en/stable/) ist eine Python Bibliothek zur Bildverarbeitung, die man sich unter Windows mit
```py
pip install Pillow
```
installieren und mit
```py
from PIL import Image
```
in ein Python Script importieren kann.

Alle Bilder für Posts liegen in einem seperaten "images/" Ordner im Rootverzeichnis des Projekts. 
Als Erstes werden alle ".jpg" Dateien in einem bestimmten Verzeichnis mit Pillow geöffnet und alle Dateinamen in einen Array gespeichert. Außerdem wird eine Variable benötigt und später auf jeden Namen in dem Array zugreifen zu können.
```py 
count = 0
image_list = []

for file in glob.iglob('path/to/images/*.jpg'):
    im=Image.open(file)
    image_list.append(os.path.basename(file))
```

## Größen definieren und Seitenverhältnis berechnen
Nun solltem man wissen, auf welche Größen die Bilder zugeschnitten und ob zum Beispiel Größenverhältnisse beibehalten werden sollen.
Bei allen "PostCover" (Bilder in Beiträgen) wird das Seitenverhältnisse ignoriert und das Bild einfach auf eine bestimmte Größe zugeschnitten, die in einer globalen Variable deklariert wird.
```py
size = (1903,453) #(width,height)
```
Bei allen "PostThumbnails" (Bilder Vorschau) soll das Seitenverhältnis beibehalten werden und sozusagen nur kleiner skaliert werden. Dafür wird eine globale Standardbreite definiert.
```py
basewidth = 500
```
Anschließend wird die Originalbreite und -höhe der Bilder ermittelt, da wir diese brauchen um das Seitenverhältnis berechnen und beibehalten zu können.
Hier wird nur die neue Höhe gebraucht, da die Standardbreite bereits vordefiniert wurde.
```py
    width, height = im.size
    wpercent = (basewidth / float(im.size[0]))
    hsize = int((float(im.size[1]) * float(wpercent)))
```

## "Cropping" und "Rescaling"

Nun kann man die Bilder mit ```Image.crop```zuschneiden bzw. mit ```Image.resize``` skalieren. Bei der Skalierung werden jetzt die neue Breite "basewidth" und die berechnete Höhe "hsize" als Parameter verwendet.

```py
    imThumbnail = im.resize((basewidth, hsize), Image.LANCZOS)
    imCover = im.crop(((width-size[0])//2, (height-size[1])//2, (width+size[0])//2, (height+size[1])//2))
```
Folgend habe ich die das Thumbnail noch umbenannt und beide neuen Dateien unter [static/assets/](https://github.com/DaTurboD/GIS-Netzwerk/tree/master/static/assets) mit einer Qualität von "85" abspeichert. Mit dem zustätzlichen Parameter "optimize=True" können auch noch einmal ein paar KB gespart werden.
```py
    newCover = 'static/assets/{}'.format(image_list[count])
    newThumbnail = 'static/assets/{}_thumbnail.jpg'.format(image_list[count].replace(".jpg", ""))
    imCover.save(newCover,optimize=True,quality=85)
    imThumbnail.save(newThumbnail,optimize=True,quality=90)
    count +=1 
```

Gesamtskript:
```py
from PIL import Image
import glob, os

count = 0
image_list = []
basewidth = 500
size = (1903,453)
 

for file in glob.iglob('path/to/images/*.jpg'):
    im=Image.open(file)
    image_list.append(os.path.basename(file))
    width, height = im.size
    wpercent = (basewidth / float(im.size[0]))
    hsize = int((float(im.size[1]) * float(wpercent)))
    imThumbnail = im.resize((basewidth, hsize), Image.LANCZOS)
    imCover = im.crop(((width-size[0])//2, (height-size[1])//2, (width+size[0])//2, (height+size[1])//2))
    newCover = 'static/assets/{}'.format(image_list[count])
    newThumbnail = 'static/assets/{}_thumbnail.jpg'.format(image_list[count].replace(".jpg", ""))
    imCover.save(newCover,optimize=True,quality=85)
    imThumbnail.save(newThumbnail,optimize=True,quality=90)
    count +=1 
```

## Skript automatisch ausführen

Um das Skript nicht jedes mal manuell ausführen zu müssen kann man in "package.json" noch folgendes ergänzen.
```json
    "img-optimize": "py ./src/utils/resize_images.py"
```

Somit kann man mit ```npm run img-optimize``` alle Bilder automatisch optimieren.
