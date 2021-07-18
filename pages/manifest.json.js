import React from 'react';
import config from "@/lib/data/internal/SiteConfig"

const createManifest = () => 
`{
    "name": "${config.siteTitle}",
    "short_name": "${config.siteTitleShort}",
    "start_url": "${config.homePath}",
    "display": "standalone",
    "background_color": "${config.backgroundColor}",
    "theme_color": "${config.themeColor}",
    "icons": [
        {
            "src": "/logos/android-chrome-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "/logos/android-chrome-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ]
}`;

class Manifest extends React.Component {
  static async getInitialProps({ res }) {
    
    res.setHeader('Content-Type', 'text/json');
    res.write(createManifest());
    res.end();
  }
}

export default Manifest;

