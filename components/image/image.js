import styled from 'styled-components';
import media from 'styled-media-query';
const fs = require('fs');
const request = require('request');


const Image = styled.img`
`

const downloadImage = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', e => reject(e));
      }),
  );




export default function ImageComponent({ src }) {

    
    /*DownloadImage(src, 'public/images/google.png', function(){
        console.log('done');
    });*/

    return (
        <Image
            src={src}
        >

        </Image>
    )
}
