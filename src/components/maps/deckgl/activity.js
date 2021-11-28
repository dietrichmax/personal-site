import React from "react"
import styled from "styled-components"
import { StaticMap } from "react-map-gl"
import DeckGL from "@deck.gl/react"
import { WebMercatorViewport } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
const polyline = require("@mapbox/polyline")

const MapContainer = styled.div`
  position: relative;
  height: 500px;
`

export default function ActivitiesMap({ data }) {
  const geoPolyline = polyline.decode(data.details.summary_polyline)

  let coordinates = []
  geoPolyline.map((coordinate) => {
    coordinates.push([coordinate[1], coordinate[0], coordinate[2]])
  })

  let latitudes = []
  let longitudes = []

  coordinates.map((coordinate) => {
    longitudes.push(coordinate[0])
    latitudes.push(coordinate[1])
  })

  let maxLatitude = Math.max(...latitudes)
  let minLatitude = Math.min(...latitudes)
  let maxLongitude = Math.max(...longitudes)
  let minLongitude = Math.min(...longitudes)

  const center = [
    (maxLatitude + minLatitude) / 2,
    (maxLongitude + minLongitude) / 2,
  ]

  const INITIAL_VIEW_STATE = {
    latitude: center[0],
    longitude: center[1],
    zoom: 10,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  }

  const activityGeom = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: coordinates,
    },
  }

  const layers = [
    new GeoJsonLayer({
      id: "geojson",
      data: activityGeom,
      stroked: false,
      filled: false,
      lineWidthMinPixels: 1.5,
      parameters: {
        depthTest: false,
      },

      getLineColor: [161, 180, 236],
      getLineWidth: 1.5,

      pickable: true,
      //onHover: setHoverInfo,
    }),
  ]

  //console.log(data)

  return (
    <MapContainer>
      <DeckGL
        layers={layers}
        pickingRadius={5}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <StaticMap
          reuseMaps
          mapStyle={
            "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          }
          preventStyleDiffing={true}
        />

        {/*{renderTooltip({incidents, fatalities, year, hoverInfo})}*/}
      </DeckGL>
    </MapContainer>
  )
}
