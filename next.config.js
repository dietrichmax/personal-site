// next.config.js
const withPlugins = require('next-compose-plugins');
const isProd = process.env.NODE_ENV === "production";
const withOptimizedImages = require('next-optimized-images');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)$/,
});

module.exports = withPlugins([
  [withMDX, {
    /* config for withMDX */
    pageExtensions: ['js', 'mdx', 'md'],
  }],
  [withOptimizedImages, {
    /* config for next-optimized-images */
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
    limit: 8192,
    optimize: true,
  }],
  [withPWA, {
    /* config for withPWA */
    pwa: {
      disable: !isProd,
      dest: "public"
    },
  }],
  /* Redirects */
  async redirects() {
    return [
      {
        source: 'https://gis-netzwerk.com/gis/pyqgis-layer-bilder-exportieren/',
        destination: '/pyqgis-layer-bilder-exportieren',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/react-leaft-erste-schritte/',
        destination: '/erste-schritte-react-und-leaflet',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/extraktion-hohl-vollformen-raster-dgm/',
        destination: '/extraktion-von-hohl-und-vollformen-aus-einem-raster-dgm',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/was-ist-gis/',
        destination: '/was-ist-gis-geoinformationssystem',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/openlayers-web-map/',
        destination: '/openlayers-web-map',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/geoportal-deutschland/',
        destination: '/geoportal-deutschland-geoportale-bundeslaender',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/geodaten-konvertierung/',
        destination: '/geodaten-konvertierung',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/hochaufloesende-satellitenbilder-downloaden/',
        destination: '/hochaufloesende-satellitenbilder-downloaden',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/fernerkundung-bildklassifikation/',
        destination: '/fernerkundung-und-bildklassifikation',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/openstreetmap-daten-downloaden/',
        destination: '/openstreetmap-daten-shapefiles-downloaden',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/qgis-kostenlos-lernen/',
        destination: '/qgis-kostenlos-lernen',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-software-kategorien/',
        destination: '/gis-software-kategorien',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/open-source-gis-anwendungen/',
        destination: '/open-source-web-gis-anwendungen',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/fme-lizenz-kostenlos/',
        destination: '/fme-lizenz-kostenlos-fuer-den-privaten-gebrauch',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-podcasts/',
        destination: '/geo-gis-podcasts',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/srtm-download/',
        destination: '/einfacher-download-fuer-30-meter-srtm-tiles',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/was-ist-ein-shapefile-shp-dbf-shx/',
        destination: '/was-ist-ein-shapefile-shp-dbf-und-shx',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/geo-datenbank-optionen/',
        destination: '/gis-geo-datenbank-managementsystem-optionen',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/utm-transformationstool/',
        destination: '/gk-utm-koordinaten-umrechnen-transformationstool',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-und-ar/',
        destination: '/gis-augmented-reality-ar',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-freiwilligenarbeit/',
        destination: '/gis-freiwilligenarbeit',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gehalt-in-der-gis-branche/',
        destination: '/gehalt-und-jobs-in-der-gis-branche',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-influencer/',
        destination: '/die-bekanntesten-geospatial-und-gis-influencers',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/postgis-qgis/',
        destination: '/postgre-sql-mit-post-gis-installieren-und-in-qgis-einrichten',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/web-feature-service/',
        destination: '/web-feature-service-open-source-wfs',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/wms-wmts/',
        destination: '/wms-web-map-service-wmts',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-blogs/',
        destination: '/geographie-gis-blogs',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/welche-gis-anwendungen-gibt-es/',
        destination: '/gis-anwendungen-welche-gis-anwendungen-gibt-es',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-jobboersen/',
        destination: '/gis-jobboersen-auf-der-suche-nach-einem-neuen-gis-job',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/unterschied-cad-gis/',
        destination: '/gis-vs-cad-unterschied-zwischen-gis-cad',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/autocad-shapefile-export/',
        destination: '/auto-cad-map-3d-shapefile-export',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-dienstleister/',
        destination: '/gis-firmen-gis-dienstleister-verzeichnis',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/unigis-professional-weiterbildung/',
        destination: '/unigis-weiterbildung-geoinformatik',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/geodaten-deutschland-download/',
        destination: '/geodaten-deutschland-online-download-kostenlos',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/gis-software-optionen/',
        destination: '/gis-software-optionen-open-source-kostenlos-kostenpflichtig',
        permanent: true
      },
      {
        source: https://gis-netzwerk.com/gis/geodatenmanager-weiterbildung/',
        destination: '/geodatenmanager-weiterbildung-universitaet-tuebingen',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/gis/was-sind-geodaten/',
        destination: '/geodaten-was-sind-geodaten',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/mailchimp-newsletter-sign-up-form-gatsbyjs/',
        destination: '/mailchimp-newsletter-gatsby-js',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/gatsby-aws-codebuild-codepipeline/',
        destination: '/gatsbyjs-codebuild-ci-cd-pipeline',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/gatsby-js-google-adsense/',
        destination: '/google-adsense-auf-einer-gatsby-js-seite-integrieren',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/statische-website-aws-cloudfront/',
        destination: '/statische-webseite-mit-eigener-domain-aws-s3-und-cloud-front-hosten',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/gatsby-buddy/',
        destination: '/gatsby-cli-automatisierung-mit-git-hub-und-buddy',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/bildbearbeitung-mit-python-zuschneiden/',
        destination: '/skalieren-und-zuschneiden-von-bildern-mit-python',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/gatsby-analytics-reporting-api-seitenaufrufe/',
        destination: '/seitenaufrufe-mit-gatsby-und-google-analytics-reporting-api-anzeigen',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/web-development/migration-wordpress-gatsby/',
        destination: '/migration-wordpress-gatsby',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/en/web-development/gatsby-google-ad-manager-adsense/',
        destination: '/integrate-google-ad-manager-with-adsense-in-your-gatsby-site',
        permanent: true
      },
      {
        source: 'https://gis-netzwerk.com/en/web-development/build-deploy-gatsby-google-cloud-build-firebase/',
        destination: '/build-and-deploy-your-gatsby-site-with-google-cloud-build-to-firebase',
        permanent: true
      },
    ]
  }
  // your config for other plugins or the general next.js here...
]);
