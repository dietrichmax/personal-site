import React from 'react';
import config from "@/lib/data/internal/SiteConfig"


const createManifest = () => 
`{
    "name": "${config.siteTitle}",
    "short_name": "${config.siteTitleShort}",
    "theme_color": "${config.themeColor}",
    "background_color": "${config.backgroundColor}",
    "start_url": "${config.homePath}",
    "display": "standalone",
    "orientation": "portrait",
    "icons": [
        {
          "src": "/logos/android/android-launchericon-192-192.png",
          "type": "image/png",
          "sizes": "192x192",
          "purpose": "any maskable"
        },
        {
          "src": "/logos/android/android-launchericon-192-192.png",
          "type": "image/png",
          "sizes": "384x384",
          "purpose": "any maskable"
        },
        {
          "src": "/logos/android/android-launchericon-512-512.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "any maskable"
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

