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

  const locations = new TileLayer({
    source: new XYZ({
      url: "http://192.168.50.121/hot/{z}/{x}/{y}.png",
      attributions: '&copy; <a href="https://mxd.codes/">Max Dietrich</a>',
    }),
    zIndex: 1,
  })

  /*const osm = new TileLayer({
    source: new XYZ({
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }),
    zIndex: 0,
  })*/

  const aerial = new TileLayer({
    source: new XYZ({
      attributions:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      maxZoom: 20,
    }),
  })

  const initialMap = new Map({
    target: mapElement.current,
    layers: [locations, aerial],
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

  useEffect(() => {
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
