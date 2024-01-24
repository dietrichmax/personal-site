import React, { useState, useRef, useEffect } from "react"
import "ol/ol.css"
import Map from "ol/Map"
import TileLayer from "ol/layer/Tile"
import View from "ol/View"
import XYZ from "ol/source/XYZ"
import { transform, get as getProjection } from "ol/proj"
import WMTSTileGrid from "ol/tilegrid/WMTS.js"
import WMTS from "ol/source/WMTS.js"
import TileWMS from "ol/source/TileWMS.js"
import OSM from "ol/source/OSM.js"
import { getTopLeft, getWidth } from "ol/extent.js"

function LiveMap() {
  const [map, setMap] = useState()
  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

  const projection = getProjection("EPSG:3857")
  const projectionExtent = projection.getExtent()
  const size = getWidth(projectionExtent) / 256
  const resolutions = new Array(19)
  const matrixIds = new Array(19)
  for (let z = 0; z < 19; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z)
    matrixIds[z] = z
  }

  const locData = new TileLayer({
    opacity: 0.9,
    preload: Infinity,
    source: new WMTS({
      attributions: '&copy; <a href="https://mxd.codes/">Max Dietrich</a>',
      url: "https://geodata.mxd.codes/locations/service?",
      layer: "locations",
      matrixSet: "webmercator",
      format: "image/png",
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: "default",
      wrapX: true,
    }),
  })

  const aerial = new TileLayer({
    opacity: 0.9,
    preload: Infinity,
    source: new WMTS({
      attributions:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      url: "https://geodata.mxd.codes/arcgisaerial/service?",
      layer: "arcgisaerial",
      matrixSet: "webmercator",
      format: "image/png",
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: "default",
      wrapX: true,
    }),
  })

  const center = transform([12.2311016, 48.0619802], "EPSG:4326", "EPSG:3857")

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [aerial, locData],
      view: new View({
        center: center,
        zoom: 16,
        maxZoom: 16,
      }),
    })
    setMap(initialMap)
  }, [])

  return (
    <div
      style={{ height: "300px", width: "100%" }}
      ref={mapElement}
      className="map-container"
    />
  )
}

export default LiveMap
