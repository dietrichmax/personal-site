/*const sharp = require('sharp');
const request = require('request');
const child_process = require('child_process');

function resizeImage(src, width, height) {
    //const formats = [".webp"]
    const path = `./public/images/resized/${src}`.replace("/uploads", "")


    const resizer = sharp()
        .resize(width, height)
        .toFile(`${path}`, (err, info) => { 
        console.log('err: ', err);
        console.log('info: ', info);
    }); 

    request(`${src.startsWith('/') ? "https://api.gis-netzwerk.com" : ''}${src}`).pipe(resizer);   
    return path
}
*/