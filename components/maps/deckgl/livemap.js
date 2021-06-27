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
        longitude: 12.1115692,
        latitude: 47.829808,
        zoom: 11,
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
          radiusMinPixels: 0.25,
          getPosition: d => [d.lon, d.lat, 0 /*d.alt*/],
          getFillColor: [200, 85, 23],
        })
    ];

    
    
    return (
        <MapContainer>
            <DeckGL layers={layers} initialViewState={viewport} controller={true}>
                <StaticMap 
                    reuseMaps 
                    mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json" 
                    preventStyleDiffing={true} 
                    attributionControl={false}
                />
            </DeckGL>
        </MapContainer>
  )
}