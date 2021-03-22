import React, { useEffect, useState } from "react"
import { Marker, MapContainer, TileLayer, LayersControl, Polyline, AttributionControl } from "react-leaflet";
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
      style={{ height: "500px", width: "100%" }}
      bounds={bounds}       
      scrollWheelZoom={false}
      fullscreenControl={true}
      attributionControl={false}
    >
    <LayersControl position="topright" collapsed={false}>
      <LayersControl.BaseLayer checked name="Topo">
        <TileLayer 
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          attribution ='Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        />
        <AttributionControl position="bottomleft" prefix={false} />
      </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <AttributionControl position="bottomleft" prefix={false} />
        </LayersControl.BaseLayer>

        <Marker id="start" position={geo.startPoint}/>
        <Polyline pathOptions={style} positions={geo.polyline} />
        <Marker id="end" position={geo.endPoint}/>
    

      </LayersControl>
    </MapContainer>
  );
};

export default Map;
