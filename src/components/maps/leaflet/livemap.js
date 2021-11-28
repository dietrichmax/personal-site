import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Circle, Polyline } from "react-leaflet"
import { getLocationData } from "src/data/external/cms"

const Map = (data) => {
  const [locations, setLocations] = useState([])

  const bounds = []

  const getVel = (vel) => {
    if (vel == 0 && vel < 1) {
      return 0.1
    } else if (vel > 1 && vel < 15) {
      return 0.2
    } else if (vel > 15 && vel < 30) {
      return 0.4
    } else if (vel > 30 && vel < 50) {
      return 0.6
    } else if (vel > 50 && vel < 60) {
      return 0.8
    } else if (vel > 60 && vel < 70) {
      return 0.9
    } else if (vel > 70) {
      return 1
    }
  }

  const limeOptions = { color: "lime" }
  /*useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/locations?_limit=1000&_sort=id:desc`)
      const json = setLocations(await res.json())
      console.log(json)
    }
    getData()
  }, []);*/

  return (
    <MapContainer
      style={{ height: "700px", width: "100%" }}
      bounds={bounds}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {data
        ? data.data.map((position, i) => {
            bounds.push([position.lat, position.lon])
            return (
              <Circle
                center={[position.lat, position.lon]}
                radius={2}
                color="#c85517"
                fillOpacity={getVel(position.vel)}
                weight={0}
              />
            )
          })
        : null}
    </MapContainer>
  )
}

export default Map
