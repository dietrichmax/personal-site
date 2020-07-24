import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, FeatureLayer, DynamicMapLayer, TiledMapLayer } from "react-leaflet";
import "./Map.css";
import 'leaflet/dist/leaflet.css';

class GoTMap extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const results = new L.LayerGroup().addTo(map);

  }

  render() {
    const center = [0, 30];
    return (
      <>
        <Map
          center={center}
          zoom="4.5"
          ref={m => {
            this.leafletMap = m;
          }}
        >
          <TileLayer
            attribution='Map by <a href="https://public.carto.com/">Carto</a>'
            url="https://cartocdn-gusc.global.ssl.fastly.net//ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png" />
          
        </Map>
        
      </>
    );
  }
}

export default GoTMap;
