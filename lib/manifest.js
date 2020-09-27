const fs = require('fs');
const config = require('../data/SiteConfig');

const path = "../public/manifest.json"

const manifestContent = JSON.stringify( {
    "name": config.siteTitle,
    "short_name": config.siteTitleShort,
    "start_url": config.homePath,
    "display": "standalone",
    "background_color": config.backgroundColor,
    "theme_color": config.themeColor,
    "orientation": "portrait-primary",
    "icons": [
    {
        "src": "/favicon-16x16.png",
        "type": "image/png",
        "sizes": "16x16"
    },
    {
        "src": "/favicon-32x32.png",
        "type": "image/png",
        "sizes": "32x32"
    },
    {
        "src": "/logo_square_48.png",
        "type": "image/png",
        "sizes": "48x48"
    },
    {
        "src": "/mstile-150x150.png",
        "type": "image/png",
        "sizes": "150x150"
    },
    {
        "src": "/android-chrome-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
    },
    {
        "src": "/logo_square_512.png",
        "type": "image/png",
        "sizes": "512x512"
    }
    ]
})

fs.readFile(path, "utf8", function (err, data) {
    fs.writeFile(path, manifestContent, function(err, result) {
        if(err) console.log("error", err);
    });
});
