import LeafletDemo from "./react-leaflet-demo"

class LeafletMap extends Component {

  componentDidMount(){
    //Only runs on Client, not on server render
    Map = require('react-leaflet').Map
    LeafletDemo = require('./react-leaflet-demo').default
    this.forceUpdate()
  }

  render () {
    return (
        <>                  
          {typeof window !== 'undefined' &&
              <LeafletDemo />                  
          }
      </>
    )
  }
}