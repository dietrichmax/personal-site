// VectorLayerMap.js
import { useEffect } from "react"
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import GeoJSON from "ol/format/GeoJSON"

const VectorLayerMap = () => {
  useEffect(() => {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    })

    const map = new Map({
      target: "vectorLayerMap",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })
  }, [])

  return (
    <div
      id="vectorLayerMap"
      style={{ position: "relative", width: "100%", height: "400px" }}
    ></div>
  )
}

export default VectorLayerMap

const geojsonObject = {
  type: "Feature",
  geometry: {
    type: "MultiLineString",
    coordinates: [
      [
        [-1e6, -7.5e5],
        [-1e6, 7.5e5],
      ],
      [
        [1e6, -7.5e5],
        [1e6, 7.5e5],
      ],
      [
        [-7.5e5, -1e6],
        [7.5e5, -1e6],
      ],
      [
        [-7.5e5, 1e6],
        [7.5e5, 1e6],
      ],
    ],
  },
}
