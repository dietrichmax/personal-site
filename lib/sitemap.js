const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("./public/sitemap.xml");
const request = https.get(`${process.env.API_URL}/sitemap.xml`, function(response) {
  response.pipe(file);
});