// MarkerPopupMap.js
import React, { useEffect } from "react"
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import Overlay from "ol/Overlay"
import { fromLonLat } from "ol/proj"

const MarkerPopupMap = () => {
  useEffect(() => {
    // Initialize the map with a marker and popup
    const marker = new Overlay({
      position: fromLonLat([0, 0]),
      positioning: "center-center",
      element: document.getElementById("marker"),
      stopEvent: false,
    })

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      overlays: [marker],
    })

    // Show popup when marker is clicked
    map.on("click", (event) => {
      marker.setPosition(event.coordinate)
    })
  }, [])

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div id="marker" className="marker"></div>
    </div>
  )
}

export default MarkerPopupMap
