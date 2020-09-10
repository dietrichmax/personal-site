const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("./public/sitemap.xml");
const request = https.get("https://api.gis-netzwerk.com/sitemap.xml", function(response) {
  response.pipe(file);
});