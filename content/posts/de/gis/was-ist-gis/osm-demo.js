import React from "react"
import Helmet from "react-helmet";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import hash from 'object-hash';
import "./leafletmap.css"

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
      <div className="react-leaflet-demo-container">
              {typeof window !== 'undefined' &&
                  <Map 
                  center={this.state.center} 
                  zoom={this.state.zoom} 
                  attribution="false"
                  >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                </Map>
              }
      </div>
    );
  }
}

export default OnlineKoordinaten;

