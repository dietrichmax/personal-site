import React, { useState } from 'react';
import {StaticMap, LinearInterpolator, WebMercatorViewport} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import styled from 'styled-components'

const MapContainer = styled.div`
    position: relative;
    height: 600px;
`


export default function Livemap({
  data,
}) {
    const [viewport, setViewport] = useState({
        longitude: data.slice(-1)[0].lon,
        latitude: data.slice(-1)[0].lat,
        zoom: 12,
        bearing: 0,
        pitch: 0,
    });


    const layers = [
        new ScatterplotLayer({
          id: 'scatter-plot',
          data,
          opacity: 0.1,
          stroked: false,
          filled: true,
          radiusScale: 3,
          radiusMinPixels: 0.65,
          getPosition: d => [d.lon, d.lat, d.alt],
          getFillColor: [200, 85, 23],
        })
    ];

    
    
    return (
        <MapContainer>
            <DeckGL layers={layers} initialViewState={viewport} controller={true}>
                <StaticMap 
                    reuseMaps 
                    mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" 
                    preventStyleDiffing={true} 
    
                />
            </DeckGL>
        </MapContainer>
  )
}
