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
    >
      <TileLayer 
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <Marker id="start" position={geo.startPoint}/>
      <Polyline pathOptions={style} positions={geo.polyline} />
      <Marker id="end" position={geo.endPoint}/>

    </MapContainer>
  );
};

export default Map;
