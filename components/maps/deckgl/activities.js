import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components'
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import {TripsLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';


const MapContainer = styled.div`
    position: relative;
    height: 250px;
`



const INITIAL_VIEW_STATE = {
  latitude: 47.65,
  longitude: 7,
  zoom: 4.5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};


function getSize(type) {
  if (type.search('major') >= 0) {
    return 100;
  }
  if (type.search('small') >= 0) {
    return 30;
  }
  return 60;
}

/*function getTooltip({object}) {
  return (
    object &&
    `\
  ${object.country || object.abbrev || ''}
  ${object.name.indexOf('0x') >= 0 ? '' : object.name}`
  );
}*/

export default function ActivitiesMap({
  data,
  getWidth = 3,
}) {
  const layers = [
    new TripsLayer({
      id: 'trips',
      data,
      getPath: d => d,
      getColor: [253, 128, 93],
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength: 180,
      shadowEnabled: false
    }),
  ];

    //console.log(data)


  return (
    <MapContainer>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        pickingRadius={5}
        //getTooltip={getTooltip}
      >
        <StaticMap reuseMaps mapStyle='https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json' preventStyleDiffing={true} />
      </DeckGL>
    </MapContainer>
  );
}
