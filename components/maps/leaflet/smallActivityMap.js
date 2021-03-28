import React from "react"
import { Marker, MapContainer, TileLayer, LayersControl, Polyline, AttributionControl } from "react-leaflet";

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
      attributionControl={false}
    >
      <TileLayer 
        url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
        attribution ='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AttributionControl position="bottomleft" prefix={false} />

      <Marker id="start" position={geo.startPoint}/>
      <Polyline pathOptions={style} positions={geo.polyline} />
      <Marker id="end" position={geo.endPoint}/>

    </MapContainer>
  );
};

export default Map;
