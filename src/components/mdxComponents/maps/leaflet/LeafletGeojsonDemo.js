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
    center: [52, 4],
    zoom: 4,
    layers: [layer],
  }

  // This useEffect hook runs when the component is first mounted,
  // similar to componentDidMount() lifecycle method of class-based
  // components:
  useEffect(() => {
    const map = L.map("map-geojson", mapParams)
    L.geoJSON(getGeoJson()).addTo(map)
  }, [])

  return (
    <div>
      <div id="map-geojson" style={mapStyles} />
    </div>
  )
}

export default Map

function getGeoJson() {
  return {
    type: "GeometryCollection",
    geometries: [
      {
        type: "Polygon",
        coordinates: [
          [
            [6.000000248663241, 56.000000155530984],
            [7.000000192318055, 56.000000155530984],
            [8.000000135973096, 56.000000155530984],
            [9.000000247266257, 56.000000155530984],
            [10.000000190921071, 56.000000155530984],
            [11.000000134576112, 56.000000155530984],
            [12.000000245869273, 56.000000155530984],
            [12.000000245869273, 55.000000211876],
            [12.000000245869273, 54.00000010058284],
            [12.000000245869273, 53.00000015692797],
            [12.000000245869273, 52.00000021327298],
            [12.000000245869273, 51.00000010197982],
            [12.000000245869273, 50.00000015832478],
            [12.000000245869273, 49.00000004703179],
            [12.000000245869273, 48.000000103376806],
            [11.000000134576112, 48.000000103376806],
            [10.000000190921071, 48.000000103376806],
            [9.000000247266257, 48.000000103376806],
            [8.000000135973096, 48.000000103376806],
            [7.000000192318055, 48.000000103376806],
            [6.000000248663241, 48.000000103376806],
            [6.000000248663241, 49.00000004703179],
            [6.000000248663241, 50.00000015832478],
            [6.000000248663241, 51.00000010197982],
            [6.000000248663241, 52.00000021327298],
            [6.000000248663241, 53.00000015692797],
            [6.000000248663241, 54.00000010058284],
            [6.000000248663241, 55.000000211876],
            [6.000000248663241, 56.000000155530984],
          ],
        ],
      },
    ],
  }
}
