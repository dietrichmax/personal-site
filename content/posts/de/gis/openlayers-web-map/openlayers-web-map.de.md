---
layout: "post"
title: "Javascript Web-Map mit OpenLayers erstellen"
date: "2019-10-24"
description: "OpenLayers ist eine JavaScript-Bibliothek, die es ermöglicht relativ einfach Geodaten in Webanwendungen (=Web GIS)zu visualisiern."
category: "GIS"
tags: ["Web-GIS", "Open-Layers", "API","Javascript"]
image: "../../../../../static/assets/img/postImg/openlayers-javascript-web-map.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

## Was ist OpenLayers?

[OpenLayers](/gis/openlayers-web-map "OpenLayers") ist eine JavaScript-Bibliothek, die es ermöglicht relativ einfach Geodaten in Webanwendungen (=Web [GIS](/gis/was-ist-gis "Was ist GIS?"))zu visualisiern.

Bei OpenLayers handelt es sich um eine Programmierschnittstelle, die eine clientseitige Entwicklung unabhängig vom Server zulässt. Es können Kartenkacheln, Vektordaten, und Marker aus den verschiedensten Datenquellen angezeigt werden.

Open Layers wurde entwickelt um die Nutzung von [Geodaten](/gis/was-sind-geodaten "Was sind Geodaten?") aller Art zu fördern. Außerdem ist OpenLayers kostenlos, Open-Sourceund wird unter "2-clause BSD License" veröffentlicht.

Um eine Karte mit OpenLayers erstellen zu können, braucht man eigentlich nur etwas allgemeines Grundwissen in Programmiersprachen. Die fehlenden Puzzelteilchen kann man sich sehr einfach über die ausführlichen Dokumentationen zu OpenLayers zusammensuchen.

## HTML Datei erstellen

Als allererstes wird als Grundgerüst eine HTML-Datei benötigt. Der grundlegende Aufbau schaut in der Regel ersteinmal wie folgt aus:

```html
    <html>
      <head>
        <title>OpenLayers Demo</title>
      </head>
      <body>
      </body>
    </html>
```

Diesen Code kannst du nun kopieren und in einer Datei einfügen, die du zum Beispiel "jsmap.html" nennst.

Alles also erst einmal halb so wild. Der Inhalt dürfte auch selbsterklärend sein.

_Wer mehr über HTML lernen möchte findet auf [w3schools](https://www.w3schools.com/html/) ein paar nützliche Tutorials._

## OpenLayers Javascript einfügen

Nun wird das OpenLayers Javascript in die HTML eingebunden. Dafür kopierst du

```html
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
```

zwischen `<title>` und `<head>`. Direkt darauf kannst du

```js
          function init() {
            map = new OpenLayers.Map("basicMap"); //create a new map
            var mapnik = new OpenLayers.Layer.OSM(); //add an OpenStreetMap layer to have some data in the mapview
            map.addLayer(mapnik); //add the OSM layer to the map

    		var markers = new OpenLayers.Layer.Markers( "Markers" ); //add a layer where markers can be put
    		map.addLayer(markers); //add the markers layer to the current map

    		var lonLat = new OpenLayers.LonLat( 13.0 ,47.8 ) //define a new location with these coordinates in WGS84
              .transform(  //transform the location to the coordinate system of our OpenLayers map
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
            );
    		markers.addMarker(new OpenLayers.Marker(lonLat)); //add the newly created marker to the markers layer

            map.setCenter(lonLat, 15); // Use maker to center the map above and set zoom level to 15
          }
```

ebenfalls in Script-tags eingeschlossen einfügen. Hier wird eine Funktion mit den Namen init erstellt, die

*   die die Karte erstellt und im Element "basicMap" einfügt
*   einen Layer mit [OpenStreetMap](https://www.openstreetmap.org/#map=6/51.330/10.453) Daten erstellt und der Karte hinzufügt
*   einen Layer für Marker erstellt und diesen ebenfalls der Karte hinzufügt
*   eine marker in WGS84 definiert und anschließend von WGS1984 nach Spherical Mercator Projection transformiert
*   diesen Marker der Karte hinzufügt
*   und letztendlich die Karte auf diesen Marker zentriert und ein Zoom Level einstellt.

Jetzt muss diese Funktion auch noch geladen und die Karte platziert werden. Dafür ersetzt du nun

```html
    <body>
      </body>
```

mit

```html
    <body onload="init();">
        <div style="width: 100%; height: 60%;" id="basicMap"></div>
    </body>
```

Mit `javascript onload="init();` wird die Funktion beim Laden der HTML-Datei ausgeführt und über die id `id="basicMap"` eingefügt.

Deine komplette Datei sollte nun so aussehen:

```html
    <html>
      <head>
        <title>OpenLayers Demo</title>
        <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
        <script>
          function init() {
            map = new OpenLayers.Map("basicMap"); //create a new map
            var mapnik = new OpenLayers.Layer.OSM(); //add an OpenStreetMap layer to have some data in the mapview
            map.addLayer(mapnik); //add the OSM layer to the map

    		var markers = new OpenLayers.Layer.Markers( "Markers" ); //add a layer where markers can be put
    		map.addLayer(markers); //add the markers layer to the current map

    		var lonLat = new OpenLayers.LonLat( 13.0 ,47.8 ) //define a new location with these coordinates in WGS84
              .transform(  //transform the location to the coordinate system of our OpenLayers map
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
            );
    		markers.addMarker(new OpenLayers.Marker(lonLat)); //add the newly created marker to the markers layer

            map.setCenter(lonLat, 15); // Use maker to center the map above and set zoom level to 15
          }
        </script>
      </head>
      <body onload="init();">
        <div style="width: 100%; height: 60%;" id="basicMap"></div>
      </body>
    </html>
```

Wenn du die Datei nun abspeicherst und öffnest, landest du im Browser deiner Wahl und es wird deine Javascript Web-Map mit OpenLayers angezeigt.

Wenn du die Position des Markers nun ändern willst, musst du nur die Koordinaten ändern.

## [](#marker-mit-schleife-erstellen)Marker mit Schleife erstellen

Im Normalfalll möchte man oft mehre Punkte und nicht nur einen auf der Karte darstellen.

Theoretisch könnte man

```js
    var lonLat = new OpenLayers.LonLat( 13.0 ,47.8 ) //define a new location with these coordinates in WGS84
              .transform(  //transform the location to the coordinate system of our OpenLayers map
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
            );
        markers.addMarker(new OpenLayers.Marker(lonLat)); //add the newly created marker to the markers layer
```

nun für jeden zusätzliche Marker, den man erstellen möchte kopieren und einfach die Koordinaten ändern. Da das Ganze aber dann relativ unübersichtlich wird, werden wir das anders lösen.

Als erstes erstellen wir einen Array aus Arrays.

```js
    var poi = [ // create array with point of interests
    			[ 11.557617 ,48.092757 ],
    			[ 8.558350, 50.028917 ],
    			[ 6.701660, 51.289406 ],
    			[ 13.337402, 52.496160 ]
          ];
```

In diesen Array sind nun alle Koordinaten für die Marker, die dargestellt werden sollen gespeichert. Nun erstellen wir eine Funktion, die aufgerufen werden kann um Marker zu erstellen und der Karte hinzuzufügen.

```js
    function createmarker (lon,lat) {
    				var feature = new OpenLayers.LonLat( lon, lat ) // create features (locations) out of arrays in points
    						.transform(  //transform the location to the coordinate system of our OpenLayers map
    							new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    							map.getProjectionObject() // to Spherical Mercator Projection
    						);
    				markers.addMarker(new OpenLayers.Marker(feature)); // Add new features to markers layer
          }	
```

Für jedes Koordinatenpaar in dem Array "poi" soll nun diese Funktion ausgeführt werden. Dies kann man mit einer "for .. of" Schleife lösen.

```js
    for (var x of poi) { // for each array(object) in array 
    				createmarker (x[0],x[1]) // create markers
    			}
```

In dieser Schleife wird nun für jedes Koordinatenpaar im Array ein Marker erstellt, transformiert und zu der Karte hinzugefügt. Der Array "poi" kann nun beliebig erweitert werden und die zusätzlichen Marker werden automatisch der Karte hinzugefügt.

## Marker über UI hinzufügen

Um das Ganze benutzerfreundlicher zu gestalten und nicht jedes Mal den Code manuell verändern zu müssen erstellen wir nun eine einfache Benutzeroberfläche um zusätzliche Marker hinzufügen zu könnnen.

Die neuen Koordinaten sollen über zwei Input Felder eingegeben werden und mit einer Bestätigung auf einem Button erstellt werden.

Das HTML-Grundgerüst kann dafür so aussehen und sollte irgendwo im "body" Bereich platziert werden:

```html
    <div class="add_markers">
    	<div class="input_markers">	
    	  Add new markers with coordinates in WGS84!
    		<div class="row">
    			<div class="col-25">
    				<label for="lat">Latitude:</label>
    			</div>
    			<div class="col-75">
    				<input type="text" id="lat" name="firstname" placeholder="48.060614">
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-25">
    				<label for="lon">Longitude:</label>
    			</div>
    			<div class="col-75">
    				<input type="text" id="lon" name="lastname" placeholder="12.190876">
    			</div>
    		</div>
    		<button id="add_marker" class="button">Add marker!</button>
    		<div id="poi_added" class="poi_added"></div>
    	</div>
    </div>
    </div>
```

Das wichtigste sind hier die ids über die später die Werte der Felder übernommen werden.

Um diese Marker zu erstellen verwenden wir wieder eine Funktion, die jedes Mal aufgerufen wird, wenn der Button "Add Marker!" geklickt wird.

Die komplette Funktion schaut so aus:

```js
    function addFeature() {
    			  var lat = parseFloat(document.getElementById("lat").value); // get value of input lat and parse to float
    			  var lon = parseFloat(document.getElementById("lon").value); // get value of input lon and parse to float

    			  var newFeature = [ lon, lat ] // create array "newFeature" with lon , lat
    			  poi.push(newFeature) // add NewFeature to array "poi"

    			  createmarker (lon,lat) // create marker for input lat, lon  
    			  document.getElementById('poi_added').innerHTML = "Added marker for " + "latitude: " + lat + "; longitude: " + lon; // visual feedback for added marker
    			}
```

```js
    var lat = parseFloat(document.getElementById("lat").value); // get value of input lat and parse to float
    var lon = parseFloat(document.getElementById("lon").value);
```

Sind Refernzen zu den Elementen mit der ID "lat" und "lon", also den beiden Input Felder. Hier werden die beiden Variablen "lat" und "lon" erstellt, denen der Wert von den Input-Feldern zugewiesen wird.

Anschließend werden diese zu einem Array zusammengeführt, da ein Marker immer aus zwei Koordinaten besteht und dem Array "poi" hinzugefügt.

```js
    var newFeature = [ lon, lat ] // create array "newFeature" with lon , lat
    poi.push(newFeature) // add NewFeature to array "poi"
```

Das Hinzufügen zum Array "poi" ist funktionell nicht notwendig, kann aber nützlich sein, wenn man zum Beispiel Popover erstellen möchte, die die Koordinaten eines jeden Markers anzeigen.

In "lat" und "lon" sind die Koordinaten nun gespeichert und diese müssen anschließend nurnoch an die zuvor erstellte Funktion "createmarker" übergeben werden, welche die Marker erstellt und der Karte hinzufügt.

```js
    createmarker (lon,lat) // create marker for input lat, lon  
```

Schön wäre es nun wenn der Nutzer ein Feedback bekommt, was nach dem Klick auf den Button passiert ist. Dies kann mit

```js
    document.getElementById('poi_added').innerHTML = "Added marker for " + "latitude: " + lat + "; longitude: " + lon; // visual feedback for added marker
```

realisiert werden.

Das letzte was nun noch fehlt ist, dass die Funktion mit einem Klick auf den Button ausgeführt wird.

```js
    document.getElementById('add_marker').addEventListener('click', addFeature); // execute function "addFeature" when button with id "add_marjer" is clicked
```

Sobald der Button mit der id "add_marker" geklicked wird, wird die Funktion "addFeature" nun ausgeführt.

Mit

```js
    var extent = map.zoomToExtent(markers.getDataExtent()); // get extent of markers layer
```

wird der Umfang des Layers "markers" ermittelt, auf diesen gezoomt und der Variable extent zugewiesen.

Wenn du deine Datei nun wieder abspeicherst und öffnest, solltest du deine Karte mit allen Markern sehen und zusätzliche Marker über eine grafische Benutzeroberfläche hinzufügen können.

```html
    <html>
      <head>
        <title>OpenLayers Demo</title>
        <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
        <script>
    		function init() {
    			map = new OpenLayers.Map("basicMap"); //create a new map
    			var mapnik = new OpenLayers.Layer.OSM(); //add an OpenStreetMap layer to have some data in the mapview
    			map.addLayer(mapnik); //add the OSM layer to the map

    			var markers = new OpenLayers.Layer.Markers( "Markers" ); //add a layer where markers can be put
    			map.addLayer(markers); //add the markers layer to the current map

    			function createmarker (lon,lat) {
    				var feature = new OpenLayers.LonLat( lon, lat ) // create features (locations) out of arrays in points
    						.transform(  //transform the location to the coordinate system of our OpenLayers map
    							new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    							map.getProjectionObject() // to Spherical Mercator Projection
    						);
    				markers.addMarker(new OpenLayers.Marker(feature)); // Add new features to markers layer
    			}	

    			var poi = [ // create array with point of interests
    			[ 11.557617 ,48.092757 ],
    			[ 8.558350, 50.028917 ],
    			[ 6.701660, 51.289406 ],
    			[ 13.337402, 52.496160 ]
          ];

    			for (var x of poi) { // for each array(object) in array 
    				createmarker (x[0],x[1]) // create markers
    			}

    			var extent = map.zoomToExtent(markers.getDataExtent()); // get extent of markers layer

    			function addFeature() {
    			  var lat = parseFloat(document.getElementById("lat").value); // get value of input lat and parse to float
    			  var lon = parseFloat(document.getElementById("lon").value); // get value of input lon and parse to float

    			  var newFeature = [ lon, lat ] // create array "newFeature" with lon , lat
    			  poi.push(newFeature) // add NewFeature to array "poi"

    			  createmarker (lon,lat) // create marker for input lat, lon  
    			  document.getElementById('poi_added').innerHTML = "Added marker for " + "latitude: " + lat + "; longitude: " + lon; // visual feedback for added marker
    			}

    			document.getElementById('add_marker').addEventListener('click', addFeature); // execute function "addFeature" when button with id "add_marjer" is clicked
    		}

    		//  popover coordinates markers 
        </script> 
    	<style>
      /*dein style*/
    	</style>
      </head>
      <body onload="init();">
    	<div id="wrapper"  >
    		<div style="width: 100%; height: 80%" id="basicMap"></div>
    			<div class="add_markers">
    				<div class="input_markers">	
    					Add new markers with coordinates in WGS84!
    					<div class="row">
    						<div class="col-25">
    							<label for="lat">Latitude:</label>
    						</div>
    						<div class="col-75">
    							<input type="text" id="lat" name="firstname" placeholder="48.060614">
    						</div>
    					</div>
    					<div class="row">
    						<div class="col-25">
    							<label for="lon">Longitude:</label>
    						</div>
    						<div class="col-75">
    							<input type="text" id="lon" name="lastname" placeholder="12.190876">
    						</div>
    					</div>
    					<button id="add_marker" class="button">Add marker!</button>
    					<div id="poi_added" class="poi_added"></div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
      </body>
    </html>
```