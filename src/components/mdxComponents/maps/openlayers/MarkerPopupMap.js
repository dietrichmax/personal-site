// MarkerPopupMap.js
import { useEffect } from "react"
import Point from "ol/geom/Point.js"
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import { OGCMapTile, Vector as VectorSource } from "ol/source.js"
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js"
import Overlay from "ol/Overlay"
import { toLonLat } from "ol/proj.js"
import { toStringHDMS } from "ol/coordinate.js"
import Feature from "ol/Feature.js"

const MarkerPopupMap = () => {
  const iconFeature = new Feature({
    geometry: new Point([0, 0]),
    name: "Null Island",
    population: 4000,
    rainfall: 500,
  })

  const vectorSource = new VectorSource({
    features: [iconFeature],
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })

  const rasterLayer = new TileLayer({
    source: new OGCMapTile({
      url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
      crossOrigin: "",
    }),
  })

  const container = document.getElementById("popup")
  const content = document.getElementById("popup-content")
  const overlay = new Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  })

  useEffect(() => {
    const map = new Map({
      layers: [rasterLayer, vectorLayer],
      target: "markerpopupmap",
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      overlays: [overlay],
    })

    /**
     * Add a click handler to the map to render the popup.
     */
    map.on("singleclick", function (evt) {
      const coordinate = evt.coordinate
      const hdms = toStringHDMS(toLonLat(coordinate))

      content.innerHTML = "<p>You clicked here:</p><code>" + hdms + "</code>"
      overlay.setPosition(coordinate)
    })

    return () => map.setTarget(null)
  }, [])

  return (
    <div>
      <div id="markerpopupmap" style={{ width: "100%", height: "400px" }} />
      <div id="popup" className="ol-popup" style={{ backgroundColor: "#fff" }}>
        <div id="popup-content"></div>
      </div>
    </div>
  )
}

export default MarkerPopupMap
