---
layout: "Article"
title: "Create Javascript web map with OpenLayers"
date: "2019-10-24"
description: "OpenLayers is a JavaScript library that makes it relatively easy to visualize geodata in web applications (Web GIS)."
category: "GIS"
tags: ["Web-GIS", "Open-Layers", "API","Javascript"]
image: "../../../../../static/assets/img/postImg/openlayers-javascript-web-map.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---

## What is OpenLayers?

[OpenLayers](https://openlayers.org/) is a JavaScript library that makes it relatively easy to visualize geodata in web applications (Web-GIS).

OpenLayers is a programming interface that allows client-side development independent of the server. Map tiles, vector data and markers from various data sources can be displayed.

Open Layers was developed to promote the use of [geodata](/en/gis/geodata-what-are-geodata "What are geodata?") Of all kinds. OpenLayers is also free, open-source and is published under "2-clause BSD License".

To be able to create a map with OpenLayers, all you need is a basic general knowledge of programming languages. The missing pieces of the puzzle can be found very easily using the detailed documentation on OpenLayers.

## Create HTML file

First of all, an HTML file is required as the basic framework. The basic structure usually looks like this:

```html
    <html>
      <head>
        <title>OpenLayers Demo</title>
      </head>
      <body>
      </body>
    </html>
```

You can now copy this code and paste it into a file that you name, for example, "jsmap.html".

So everything is half as wild. The content should also be self-explanatory.

_If you want to learn more about HTML, you can find a few useful tutorials on [w3schools](https://www.w3schools.com/html/)._

## Insert OpenLayers Javascript library

Now the OpenLayers Javascript is integrated into the HTML. You copy for that

```html
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
```

between `<title>` and `<head>`. You can do that right away

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

also included in script tags. Here a function with the name init is created, the

* which creates the map and inserts it in the element "basicMap"
* created a layer with [OpenStreetMap](https://www.openstreetmap.org/#map=6/51.330/10.453) data and added it to the map
* creates a layer for markers and also adds this to the map
* Defined a marker in WGS84 and then transformed it from WGS1984 to Spherical Mercator Projection
* add this marker to the map
* and finally centered the map on this marker and set a zoom level.

Now this function must also be loaded and the card placed. For that you are replacing now

```html
    <body>
      </body>
```

with

```html
    <body onload="init();">
        <div style="width: 100%; height: 60%;" id="basicMap"></div>
    </body>
```

With `javascript onload =" init (); `the function is executed when loading the HTML file and inserted via the id` id = "basicMap" `.

Your complete file should now look like this:

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

If you save the file and open it, you will end up in the browser of your choice and your Javascript web map will be displayed with OpenLayers.

If you now want to change the position of the marker, all you have to do is change the coordinates.

## Create markers with a 'for .. of ..' loop

Normally, you often want to display several points and not just one on the map.
In theory you could

```js
    var lonLat = new OpenLayers.LonLat( 13.0 ,47.8 ) //define a new location with these coordinates in WGS84
              .transform(  //transform the location to the coordinate system of our OpenLayers map
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
            );
        markers.addMarker(new OpenLayers.Marker(lonLat)); //add the newly created marker to the markers layer
```

now copy for each additional marker you want to create and simply change the coordinates. But since the whole thing becomes relatively confusing, we will solve it differently.

First, we create an array of arrays.

```js
    var poi = [ // create array with point of interests
    			[ 11.557617 ,48.092757 ],
    			[ 8.558350, 50.028917 ],
    			[ 6.701660, 51.289406 ],
    			[ 13.337402, 52.496160 ]
          ];
```

All coordinates for the markers to be displayed are now stored in this array. Now we create a function that can be called to create markers and add them to the map.

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

This function should now be carried out for each pair of coordinates in the "poi" array. This can be solved with a "for .. of" loop.

```js
    for (var x of poi) { // for each array(object) in array 
    				createmarker (x[0],x[1]) // create markers
    			}
```

In this loop, a marker is now created for each coordinate pair in the array, transformed and added to the map. The "poi" array can now be expanded as required and the additional markers are automatically added to the map.

## Add markers via UI

In order to make the whole thing more user-friendly and not having to change the code manually every time, we are now creating a simple user interface to add additional markers.

The new coordinates should be entered via two input fields and created with a confirmation on a button.

The HTML framework can look like this and should be placed somewhere in the "body" area:

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

The most important here are the ids via which the values of the fields are later adopted.

To create these markers we use a function that is called every time the button "Add Marker!" is clicked.

The complete function looks like this:

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

Are references to the elements with the ID "lat" and "lon", ie the two input fields. Here the two variables "lat" and "lon" are created, to which the value from the input fields is assigned.

Then they are merged into an array, since a marker always consists of two coordinates and is added to the "poi" array.

```js
    var newFeature = [ lon, lat ] // create array "newFeature" with lon , lat
    poi.push(newFeature) // add NewFeature to array "poi"
```

Adding it to the "poi" array is not functionally necessary, but it can be useful if, for example, you want to create popovers that show the coordinates of each marker.

The coordinates are now saved in "lat" and "lon" and they only have to be transferred to the previously created function "createmarker", which creates the markers and adds them to the map.

```js
    createmarker (lon,lat) // create marker for input lat, lon  
```

It would be nice if the user received feedback about what happened after clicking the button. This can be done with

```js
    document.getElementById('poi_added').innerHTML = "Added marker for " + "latitude: " + lat + "; longitude: " + lon; // visual feedback for added marker
```

The last thing that is missing is that the function is executed with a click on the button.

```js
    document.getElementById('add_marker').addEventListener('click', addFeature); // execute function "addFeature" when button with id "add_marjer" is clicked
```

As soon as the button with the id "add_marker" is clicked, the "addFeature" function is now executed.

With

```js
    var extent = map.zoomToExtent(markers.getDataExtent()); // get extent of markers layer
```

the extent of the "markers" layer is determined, zoomed onto it and assigned to the variable extent.

If you now save and open your file again, you should see your map with all markers and be able to add additional markers via a graphical user interface.


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