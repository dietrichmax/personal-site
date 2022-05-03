import React from "react"
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
//import "../components/Leaflet/map.scss";
import hash from 'object-hash';

class OnlineKoordinaten extends React.Component {    
    constructor() {
    super();
    this.state = {
      markers: [[51.8, 9.0]],
      center: [51.8, 9.0],
      zoom: 5,
      color: '#3f51b5',
      weight: 5,
      opacity: 0.65,
    };
  }

    render() {

        const Style = {
          color: this.state.color,
          weight: this.state.weight,
          opacity: this.state.opacity,
        };

      return (
        <div className="react-leaflet-demo-container">
              {typeof window !== 'undefined' &&
                  <Map 
                  center={this.state.center} 
                  zoom={this.state.zoom} 
                  >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  <GeoJSON key={hash(getGeoJson())} data={getGeoJson()} style={Style}/>
                  {this.state.markers.map((position) => 
                  <Marker 
                    position={position}
                  >
                    <Popup>
                    <pre>{position}</pre>
                    </Popup>
                  </Marker>
                  )}
                </Map>
              }
      </div>
    );
  }
}

export default OnlineKoordinaten;

function getGeoJson() {
  return {
    "type":"GeometryCollection", "geometries": [
      {"type":"Polygon","coordinates":[[[6.000000248663241,56.000000155530984],[7.000000192318055,56.000000155530984],[8.000000135973096,56.000000155530984],[9.000000247266257,56.000000155530984],[10.000000190921071,56.000000155530984],[11.000000134576112,56.000000155530984],[12.000000245869273,56.000000155530984],[12.000000245869273,55.000000211876],[12.000000245869273,54.00000010058284],[12.000000245869273,53.00000015692797],[12.000000245869273,52.00000021327298],[12.000000245869273,51.00000010197982],[12.000000245869273,50.00000015832478],[12.000000245869273,49.00000004703179],[12.000000245869273,48.000000103376806],[11.000000134576112,48.000000103376806],[10.000000190921071,48.000000103376806],[9.000000247266257,48.000000103376806],[8.000000135973096,48.000000103376806],[7.000000192318055,48.000000103376806],[6.000000248663241,48.000000103376806],[6.000000248663241,49.00000004703179],[6.000000248663241,50.00000015832478],[6.000000248663241,51.00000010197982],[6.000000248663241,52.00000021327298],[6.000000248663241,53.00000015692797],[6.000000248663241,54.00000010058284],[6.000000248663241,55.000000211876],[6.000000248663241,56.000000155530984]]]}
      ]
  }
}