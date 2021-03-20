import React, { useEffect, useState } from "react"
import { Marker, MapContainer, TileLayer, LayersControl, Polyline } from "react-leaflet";
import { getLocationData } from '@/lib/data/api/cms'


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
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer 
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

        />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Esri World Imagery">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <Marker id="start" position={geo.startPoint}/>
        <Polyline pathOptions={style} positions={geo.polyline} />
        <Marker id="end" position={geo.endPoint}/>

      </LayersControl>
    </MapContainer>
  );
};

export default Map;
