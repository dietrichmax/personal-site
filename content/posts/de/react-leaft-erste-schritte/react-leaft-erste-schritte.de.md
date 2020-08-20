---
layout: "Artikel"
title: "Erste Schritte mit React und Leaflet"
date: "2020-01-18"
description: "Leaflet ist eine freie JavaScript-Bibliothek mit der Web-GIS-Anwendungen erstellt werden können. Leaflet verwendet dafür HTML5, CSS3 und ist mit allen geläufigen Browsern kompatibel."
category: "GIS"
tags: ["Web-GIS", "React", "Leaflet", "Javascript", "API"]
image: "../../../../static/assets/img/postImg/react-leaflet-erste-schritte.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
lang: "de"
---
import LeafletDemo from "./react-leaflet-demo.js"

## Was ist Leaflet?

[Leaflet](/gis/react-leaft-erste-schritte "Leaflet") ist eine freie JavaScript-Bibliothek mit der Web-[GIS](/gis/was-ist-gis "Was ist GIS?")-Anwendungen erstellt werden können. Leaflet verwendet dafür HTML5, CSS3 und ist mit allen geläufigen Browsern kompatibel.

Ebenso wie bei <a href="">OpenLayers</a> können [Raster, sowie Vektordaten](/gis/raster-und-vektordaten) aus den verschiedensten Datenquellen eingebunden werden.

## React und Leaflet

In diesem Artikel werde ich auf den Umgang mit [react-leaflet](https://github.com/PaulLeCam/react-leaflet) Components genauer eingehen und wie man eine Web-Map mit

*   Basiskarte ([OpenStreetMap](https://www.openstreetmap.de/)),
*   Daten im GeoJSON Format,
*   Marker und
*   Popup

erstellt.

Als Erstes sollte man diese Components natürlich erst einmal installieren und diese in eine neue Datei importieren.

_Da Leaflet Server-Side Rendering nicht unterstützt, muss man einen kleinen "Workaround" einbauen, wenn man zum Beispiel Leaflet mit [Gatsby](https://www.gatsbyjs.org/) nutzen möchte._ Bei der Ausführung von `gatsby build` wird ein Webpack Fehler erscheinen, da es noch kein "window"-Objekt gibt, Leaflet dieses aber benötigt. Diese Fehler behebt man, indem man das window-Objekt der Seite überprüft, bevor das Map-Component kommt.

```js
    import React from "react"
    import Helmet from "react-helmet";
    import Layout from "../../src/layout";
    import config from "../../data/SiteConfig";
    import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
    import "../components/Leaflet/map.scss";
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

Mit dem Style-Objekt wird auch schonmal ein Style definiert, der festlegt wie die GeoJSON-Daten dargestellt werden. Die jeweiligen Werte für diesen Style werden, genauso wie

*   die Koordinaten für einen Marker
*   Angaben zum Zentrieren der Map und
*   dem "Default-Zoom"

als "state objects" Variablen bzw. Arrays festgelegt.

## Basiskarte

Nun kommt als Erstes das Map-Component mit einer OpenStreetMap als Basiskarte.

```js
    <Map>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
     </Map>
```

`<TileLayer>` erstellt einen neuen Tile-Layer in der Karte in der mit `url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'` die OpenStreetMap Daten und mit `attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'` wird die Quelle dieser Daten angegeben. Dadurch wird "rechts-unten" dann der übliche Hinweis gerendert.

## Daten im GeoJSON Format

Das Hinzufügen von Geodaten im GeoJSON ist relativ simpel. Diese fügt man am Besten gleich in eine Funktion ein. Diese wird dann in der Karte aufgerufen.

```js
    function getGeoJSON() {
      return {
        "type":"GeometryCollection", "geometries": [
          {"type":"Polygon","coordinates":[[[6.000000248663241,56.000000155530984],[7.000000192318055,56.000000155530984],[8.000000135973096,56.000000155530984],[9.000000247266257,56.000000155530984],[10.000000190921071,56.000000155530984],[11.000000134576112,56.000000155530984],[12.000000245869273,56.000000155530984],[12.000000245869273,55.000000211876],[12.000000245869273,54.00000010058284],[12.000000245869273,53.00000015692797],[12.000000245869273,52.00000021327298],[12.000000245869273,51.00000010197982],[12.000000245869273,50.00000015832478],[12.000000245869273,49.00000004703179],[12.000000245869273,48.000000103376806],[11.000000134576112,48.000000103376806],[10.000000190921071,48.000000103376806],[9.000000247266257,48.000000103376806],[8.000000135973096,48.000000103376806],[7.000000192318055,48.000000103376806],[6.000000248663241,48.000000103376806],[6.000000248663241,49.00000004703179],[6.000000248663241,50.00000015832478],[6.000000248663241,51.00000010197982],[6.000000248663241,52.00000021327298],[6.000000248663241,53.00000015692797],[6.000000248663241,54.00000010058284],[6.000000248663241,55.000000211876],[6.000000248663241,56.000000155530984]]]}
          ]
      }
    }
```

Im Map-Component werden die Daten dann mit dem GeoJSON-Component eingefügt.

```js
    <GeoJSON key={hash(getGeoJSON())} data={getGeoJson()} style={Style}/>
```

Damit die Daten immer gererendert werden muss man einen "unique-key" vergeben. Dieser "unique-key" wird mit der Funktion `hash(getGeoJSON())` generiert. Als Daten werden einfach die Daten im GeoJSO-Format mit dem zuvor definierten Style übergeben.

## Marker mit Popup

Mit dem Marker-Component können Marker eingefügt werden.

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

Mit der "map()" Methode werden neue Arrays aus dem dem bereitgestellten Array erzeugt. Da im Array "markers" nur ein Marker vorhanden ist wird natürlich beim Seitenaufruf nur ein Marker erstellt. Diese eigentliche Position bzw. die Koordinaten werden als `{position}` übergeben.

Außerdem wird mit dem Popup-Component für diese Marker ein Popup erstellt, dass die Position anzeigt.

Das Ganze sollte nun so aussehen:

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

Das Ganze sollte dann wie folgt aussehen:

<LeafletDemo/>

Nun könnte man zum Beispiel noch eine Funktion einbauen, die bei jedem Klick auf die Karte einen neuen Marker erstellt.