---
layout: "post"
title: "First steps with Leaflet and ReactJS"
date: "2020-01-18"
description: "Leaflet is a free JavaScript library that can be used to create web GIS applications. Leaflet uses HTML5, CSS3 and is compatible with all common browsers."
category: "GIS"
tags: ["Web-GIS", "React", "Leaflet", "Javascript", "API"]
image: "../../../../../static/assets/img/postImg/react-leaflet-erste-schritte.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---

import LeafletDemo from "./react-leaflet-demo.js"

## What is Leaflet?

[Leaflet](https://leafletjs.com/) is a free [JavaScript](/en/tags/javascript) library which allows us to create web-gis applications. Leaflet uses HTML5, CSS3 and is compatible with all common browsers.

As with OpenLayers, rasters and vector data from various data sources can be integrated.

## React and Leaflet

In this article I will go into more detail on how to use [react-leaflet] (https://github.com/PaulLeCam/react-leaflet) Components and how to use a web map

* Basic map ([OpenStreetMap] (https://www.openstreetmap.de/)),
* Data in GeoJSON format,
* Markers and
* Popup

created.

First of all you should of course install these components first and import them into a new file.

< Since Leaflet does not support server-side rendering, you have to install a small "workaround" if you want to use Leaflet with, for example, [Gatsby](https://www.gatsbyjs.org/).

When executing `gatsby build `a webpack error will appear since there is no" window "object yet, but Leaflet needs it. These errors are fixed by checking the window object of the page before the map component arrives.

```js
    import React from "react"
    import Helmet from "react-helmet";
    import Layout from "../../src/layout";
    import config from "../../data/SiteConfig";
    import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
    import 'leaflet/dist/leaflet.css';
    import hash from 'object-hash';

    class WebMap extends React.Component {  
        constructor() {
        super();
        this.state = {
          markers: [[51.8, 9.0]],
          center: [50.97, 10.54],
          zoom: 5,
          color: '#3f51b5',
          weight: 5,
          opacity: 0.65,
        };
      }

        render() {

            const Style = {
              color: this.state.color,
              weight: this.state.weight,
              opacity: this.state.opacity,
            };

          return (

        <Layout>
                {typeof window !== 'undefined' &&
                    {/* Map Stuff*/}
                }
        </Layout>
        );
      }
    }

    export default WebMap;
```

The style object is used to define a style that defines how the GeoJSON data is displayed. The respective values for this style are, just like

* the coordinates for a marker
* Information about centering the map and
* the "default zoom"

defined as "state objects" variables or arrays.

## Basemap

Now the map component comes first with an OpenStreetMap as the base map.

```js
    <Map>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
     </Map>
```

`<TileLayer>` creates a new tile-layer in the map and with `url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'`  openstreetmap is used with attribution `attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'`.

## Data in GeoJSON format

Adding geodata in GeoJSON is relatively simple. It is best to insert this into a function. This is then called up on the map.

```js
    function getGeoJSON() {
      return {
        "type":"GeometryCollection", "geometries": [
          {"type":"Polygon","coordinates":[[[6.000000248663241,56.000000155530984],[7.000000192318055,56.000000155530984],[8.000000135973096,56.000000155530984],[9.000000247266257,56.000000155530984],[10.000000190921071,56.000000155530984],[11.000000134576112,56.000000155530984],[12.000000245869273,56.000000155530984],[12.000000245869273,55.000000211876],[12.000000245869273,54.00000010058284],[12.000000245869273,53.00000015692797],[12.000000245869273,52.00000021327298],[12.000000245869273,51.00000010197982],[12.000000245869273,50.00000015832478],[12.000000245869273,49.00000004703179],[12.000000245869273,48.000000103376806],[11.000000134576112,48.000000103376806],[10.000000190921071,48.000000103376806],[9.000000247266257,48.000000103376806],[8.000000135973096,48.000000103376806],[7.000000192318055,48.000000103376806],[6.000000248663241,48.000000103376806],[6.000000248663241,49.00000004703179],[6.000000248663241,50.00000015832478],[6.000000248663241,51.00000010197982],[6.000000248663241,52.00000021327298],[6.000000248663241,53.00000015692797],[6.000000248663241,54.00000010058284],[6.000000248663241,55.000000211876],[6.000000248663241,56.000000155530984]]]}
          ]
      }
    }
```

The data is then inserted into the map component with the GeoJSON component.

```js
    <GeoJSON key={hash(getGeoJSON())} data={getGeoJson()} style={Style}/>
```

So that the data is always rendered you have to assign a "unique key". This "unique key" is generated with the function `hash (getGeoJSON ())`. The data is simply transferred in GeoJSO format with the style previously defined.

## Marker with popup

Markers can be inserted with the marker component.

```js
    {this.state.markers.map((position) => 
        <Marker 
            position={position}
        >
            <Popup>
                <pre>{position}</pre>
            </Popup>
        </Marker>
    )}
```

With the "map ()" method new arrays are created from the provided array. Since there is only one marker in the "markers" array, only one marker is created when the page is called up. This actual position or the coordinates are transferred as `{position}`.

In addition, the popup component for these markers creates a popup that shows the position.

The whole thing should now look like this:

```js
    import React from "react"
    import Helmet from "react-helmet";
    import Layout from "../../src/layout";
    import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
    import "../components/Leaflet/map.scss";
    import hash from 'object-hash';

    class OnlineKoordinaten extends React.Component {    
        constructor() {
        super();
        this.state = {
          markers: [[51.8, 9.0]],
          center: [51.8, 9.0],
          zoom: 5,
          color: '#3f51b5',
          weight: 5,
          opacity: 0.65,
        };
      }

        render() {

            const Style = {
              color: this.state.color,
              weight: this.state.weight,
              opacity: this.state.opacity,
            };

          return (
        <Layout title="React-Leaflet-Demo">
          <div className="react-leaflet-demo-container">
                  {typeof window !== 'undefined' &&
                      <Map 
                      center={this.state.center} 
                      zoom={this.state.zoom} 
                      >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                      />
                      <GeoJSON key={hash(getGeoJson())} data={getGeoJson()} style={Style}/>
                      {this.state.markers.map((position) => 
                      <Marker 
                        position={position}
                      >
                        <Popup>
                        <pre>{position}</pre>
                        </Popup>
                      </Marker>
                      )}
                    </Map>
                  }
          </div>
        </Layout>
        );
      }
    }

    export default OnlineKoordinaten;

    function getGeoJson() {
      return {
        "type":"GeometryCollection", "geometries": [
          {"type":"Polygon","coordinates":[[[6.000000248663241,56.000000155530984],[7.000000192318055,56.000000155530984],[8.000000135973096,56.000000155530984],[9.000000247266257,56.000000155530984],[10.000000190921071,56.000000155530984],[11.000000134576112,56.000000155530984],[12.000000245869273,56.000000155530984],[12.000000245869273,55.000000211876],[12.000000245869273,54.00000010058284],[12.000000245869273,53.00000015692797],[12.000000245869273,52.00000021327298],[12.000000245869273,51.00000010197982],[12.000000245869273,50.00000015832478],[12.000000245869273,49.00000004703179],[12.000000245869273,48.000000103376806],[11.000000134576112,48.000000103376806],[10.000000190921071,48.000000103376806],[9.000000247266257,48.000000103376806],[8.000000135973096,48.000000103376806],[7.000000192318055,48.000000103376806],[6.000000248663241,48.000000103376806],[6.000000248663241,49.00000004703179],[6.000000248663241,50.00000015832478],[6.000000248663241,51.00000010197982],[6.000000248663241,52.00000021327298],[6.000000248663241,53.00000015692797],[6.000000248663241,54.00000010058284],[6.000000248663241,55.000000211876],[6.000000248663241,56.000000155530984]]]}
          ]
      }
    }
```
<LeafletDemo/>

Now, for example, you could add a function that creates a new marker each time you click on the map.