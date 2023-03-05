import React, { useState, useRef, useEffect } from "react"
import "ol/ol.css"
import Map from "ol/Map"
import TileLayer from "ol/layer/Tile"
import View from "ol/View"
import XYZ from "ol/source/XYZ"
import OSM from "ol/source/OSM"
import { transform } from "ol/proj"

function LiveMap({ data }) {
  const [map, setMap] = useState()
  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://maps.mxd.codes/locations/{z}/{x}/{y}.png",
            attributions:
              '&copy; <a href="https://mxd.codes/">Max Dietrich</a>',
          }),
          zIndex: 1,
        }),
        new TileLayer({
          source: new XYZ({
            attributions:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            maxZoom: 20,
          }),
          zIndex: 0,
        }),
      ],
      view: new View({
        center: transform(
          [data.slice(-1)[0].lon, data.slice(-1)[0].lat],
          "EPSG:4326",
          "EPSG:3857"
        ),
        zoom: 13,
        maxZoom: 13,
      }),
    })
    setMap(initialMap)
  }, [])

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      ref={mapElement}
      className="map-container"
    />
  )
}

export default LiveMap
