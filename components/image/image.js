

export default function Img({ width, height, hash, ext }) {
    
    return (
        <Img src={`/api/image/w=${width}&h=${height}/https%3A%2F%2Fapi.gis-netzwerk.com%2Fuploads%2F${hash}${ext}`} webp/>
    )
  }