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
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer 
          url='https://a.tile.opentopomap.org/${z}/${x}/${y}.png'
          attribution='Kartendaten: <a href=//openstreetmap.org/copyright>OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: <a href=//opentopomap.org>OpenTopoMap (CC-BY-SA)</a>'

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
