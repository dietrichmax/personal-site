import React from "react"
import { MapContainer, TileLayer, Circle } from "react-leaflet";


const Map = (data) => {
  
  const bounds = []

  const getVel = (vel) => {
    if (vel == 0 && vel < 1) {
      return "white"
    } else if (vel > 1 && vel < 15) {
      return "#FFFFB7"
    } else if (vel > 15 && vel < 30) {
      return "#FFF192"
    } else if (vel > 30 && vel < 50) {
      return "#FFEA61"
    } else if (vel > 50 && vel < 60) {
      return "#FFDD3C"
    } else if (vel > 60 && vel < 70) {
      return "#FFD400"
    } else if (vel > 70 ) {
      return "yellow"
    } 
  };

  return (
    <MapContainer
      scrollWheelZoom={false}
      style={{ height: "500px", width: "1200px" }}
      bounds={bounds}
    >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
        />
        {data.data.map((position,i) => {
          bounds.push([position.lat, position.lon])
          return (
            <Circle center={[position.lat, position.lon]} radius={5} color={getVel(position.vel)} fillOpacity={.8} weight={0}/>
         )
        })}
    </MapContainer>
  );
};

export default Map;
