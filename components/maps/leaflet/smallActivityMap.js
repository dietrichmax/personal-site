import React from "react"
import { Marker, MapContainer, TileLayer, LayersControl, Polyline } from "react-leaflet";

/*import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
const iconEnd = divIcon({
  html: renderToStaticMarkup(<FaFlagCheckered />),
});*/

const Map = (data) => {
  const geo = data.data
  const style= { 
    color: '#11a9ed',
    weight: "5"
  }

  const bounds = [[geo.maxLat, geo.maxLon], [geo.minLat, geo.minLon]]
  return (
    <MapContainer
      style={{ height: "200px", width: "100%" }}
      bounds={bounds}       
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer 
        url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
        attribution ='Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      />

      <Marker id="start" position={geo.startPoint}/>
      <Polyline pathOptions={style} positions={geo.polyline} />
      <Marker id="end" position={geo.endPoint}/>

    </MapContainer>
  );
};

export default Map;
