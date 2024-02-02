import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const Map = () => {
  const mapStyles = {
    width: "100%",
    height: "300px",
  }
  const layer = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  )

  const mapParams = {
    center: [0, 0],
    zoom: 0,
    layers: [layer],
  }

  // This useEffect hook runs when the component is first mounted,
  // similar to componentDidMount() lifecycle method of class-based
  // components:
  useEffect(() => {
    L.map("map", mapParams)
  }, [])

  return (
    <div>
      <div id="map" style={mapStyles} />
    </div>
  )
}

export default Map
