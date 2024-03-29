// next.config.js

// https://nextjs.org/docs/advanced-features/security-headers
const ContentSecurityPolicy = `
    default-src 'self' *.mxd.codes;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.mxd.codes;
    child-src *.mxd.codes;
    style-src 'self' 'unsafe-inline' *.googleapis.com *.mxd.codes;
    img-src * blob: data: *.mxd.codes;
    media-src 'self' *.mxd.codes;
    connect-src * *.mxd.codes;
    font-src 'self' *.mxd.codes;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  images: {
    //loader: "custom",
    //loaderFile: "./src/utils/loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**mxd.codes",
        port: "",
      },
      {
        protocol: "http",
        hostname: "**185.216.176.76",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "**unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**webmention.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**openweathermap.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**cloudimg.io",
        port: "",
      },
    ],
    deviceSizes: [350, 400, 500, 670, 800, 900, 1000, 1300],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 420],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/articles/a-guide-to-location-tracking-and-visualization-with-own-tracks-node-js-postgre-sql-geo-server-map-proxy-nginx-and-open-layers",
        destination: "/articles/constant-location-tracking-with-owntracks-strapi-and-visualizing-data-with-deckgl",
        permanent: true,
      },
      {
        source: "/articles/ci-cd-for-nextjs-with-github-actions",
        destination: "/articles/docker-ci-cd-for-nextjs-with-github-actions",
        permanent: true,
      },
      {
        source: "/software/gis-software/liste-gis-software",
        destination:
          "/articles/gis-software-options-free-open-source-and-proprietary",
        permanent: true,
      },
      {
        source: "/fernerkundung-satellitenbilder-downloaden",
        destination: "/articles/satellite-imagery-download-high-resolution",
        permanent: true,
      },
      {
        source: "/geodaten/fernerkundung-satellitenbilder-downloaden",
        destination: "/articles/satellite-imagery-download-high-resolution",
        permanent: true,
      },
      {
        source: "/skalieren-und-zuschneiden-von-bildern-mit-python",
        destination: "/articles/scaling-and-cropping-images-using-python",
        permanent: true,
      },
      {
        source: "/gis-vs-cad-der-unterschied-zwischen-gis-und-cad",
        destination: "/articles/gis-vs-cad-the-difference-between-gis-and-cad",
        permanent: true,
      },
      {
        source: "/articles/geographie-gis-blogs",
        destination: "/articles/geography-and-gis-blogs",
        permanent: true,
      },
      {
        source: "/en/gis/gis-voluntary-work",
        destination:
          "/articles/gis-volunteering-make-the-world-a-better-place-with-gis",
        permanent: true,
      },
      {
        source: "/nuetzliche-links/liste-gis-software",
        destination:
          "/articles/gis-software-options-free-open-source-and-proprietary",
        permanent: true,
      },
      {
        source: "/gis-und-geo-datenbank-managementsystem-optionen",
        destination: "/articles/gis-and-geo-database-management-system-options",
        permanent: true,
      },
      {
        source: "/articles/syntax-highlighting-mit-prism-und-next-js",
        destination: "/articles/syntax-highlighting-with-prism-and-next-js",
        permanent: true,
      },
      {
        source: "/gis/py-qgis-layer-bilder-exportieren",
        destination: "/blog/pyqgis-layer-bilder-exportieren",
        permanent: true,
      },
      {
        source: "/gis/pyqgis-layer-bilder-exportieren",
        destination: "/blog/pyqgis-layer-bilder-exportieren",
        permanent: true,
      },
      {
        source: "/py-qgis-layer-als-bilder-exportieren",
        destination: "/blog/pyqgis-layer-bilder-exportieren",
        permanent: true,
      },
      {
        source: "/gis/react-leaft-erste-schritte",
        destination: "/blog/erste-schritte-react-und-leaflet",
        permanent: true,
      },
      {
        source: "/gis/extraktion-hohl-vollformen-raster-dgm",
        destination:
          "/blog/extraktion-von-hohl-und-vollformen-aus-einem-raster-dgm",
        permanent: true,
      },
      {
        source: "/gis/was-ist-gis",
        destination: "/blog/was-ist-gis-geoinformationssystem",
        permanent: true,
      },
      {
        source: "/gis/openlayers-web-map",
        destination: "/blog/openlayers-web-map",
        permanent: true,
      },
      {
        source: "/gis/geoportal-deutschland",
        destination: "/blog/geoportal-deutschland-geoportale-bundeslaender",
        permanent: true,
      },
      {
        source: "/gis/geodaten-konvertierung",
        destination: "/blog/geodaten-konvertierung",
        permanent: true,
      },
      {
        source: "/gis/hochaufloesende-satellitenbilder-downloaden",
        destination: "/blog/hochaufloesende-satellitenbilder-downloaden",
        permanent: true,
      },
      {
        source: "/gis/fernerkundung-bildklassifikation",
        destination: "/blog/fernerkundung-und-bildklassifikation",
        permanent: true,
      },
      {
        source: "/gis/openstreetmap-daten-downloaden",
        destination: "/blog/openstreetmap-daten-shapefiles-downloaden",
        permanent: true,
      },
      {
        source: "/gis/qgis-kostenlos-lernen",
        destination: "/blog/qgis-kostenlos-lernen",
        permanent: true,
      },
      {
        source: "/gis/gis-software-kategorien",
        destination: "/blog/gis-software-kategorien",
        permanent: true,
      },
      {
        source: "/gis/open-source-gis-anwendungen",
        destination: "/blog/open-source-web-gis-anwendungen",
        permanent: true,
      },
      {
        source: "/gis/fme-lizenz-kostenlos",
        destination: "/blog/fme-lizenz-kostenlos-fuer-den-privaten-gebrauch",
        permanent: true,
      },
      {
        source: "/gis/gis-podcasts",
        destination: "/blog/geo-gis-podcasts",
        permanent: true,
      },
      {
        source: "/gis/srtm-download",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/gis/was-ist-ein-shapefile-shp-dbf-shx",
        destination: "/blog/was-ist-ein-shapefile-shp-dbf-und-shx",
        permanent: true,
      },
      {
        source: "/gis/geo-datenbank-optionen",
        destination: "/blog/gis-geo-datenbank-managementsystem-optionen",
        permanent: true,
      },
      {
        source: "/gis/utm-transformationstool",
        destination: "/blog/gk-utm-koordinaten-umrechnen-transformationstool",
        permanent: true,
      },
      {
        source: "/gis/gis-und-ar",
        destination: "/blog/gis-augmented-reality-ar",
        permanent: true,
      },
      {
        source: "/gis/gis-freiwilligenarbeit",
        destination: "/blog/gis-freiwilligenarbeit",
        permanent: true,
      },
      {
        source: "/gis/gehalt-in-der-gis-branche",
        destination: "/blog/gehalt-und-jobs-in-der-gis-branche",
        permanent: true,
      },
      {
        source: "/gis/gis-influencer",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/gis/postgis-qgis",
        destination:
          "/blog/postgre-sql-mit-post-gis-installieren-und-in-qgis-einrichten",
        permanent: true,
      },
      {
        source: "/gis/web-feature-service",
        destination: "/blog/web-feature-service-open-source-wfs",
        permanent: true,
      },
      {
        source: "/gis/wms-wmts",
        destination: "/blog/wms-web-map-service-wmts",
        permanent: true,
      },
      {
        source: "/gis/gis-blogs",
        destination: "/blog/geographie-gis-blogs",
        permanent: true,
      },
      {
        source: "/gis/welche-gis-anwendungen-gibt-es",
        destination: "/blog/gis-anwendungen-welche-gis-anwendungen-gibt-es",
        permanent: true,
      },
      {
        source: "/gis/gis-jobboersen",
        destination:
          "/blog/gis-jobboersen-auf-der-suche-nach-einem-neuen-gis-job",
        permanent: true,
      },
      {
        source: "/gis/unterschied-cad-gis",
        destination: "/blog/gis-vs-cad-unterschied-zwischen-gis-cad",
        permanent: true,
      },
      {
        source: "/gis/autocad-shapefile-export",
        destination: "/blog/auto-cad-map-3d-shapefile-export",
        permanent: true,
      },
      {
        source: "/gis/gis-dienstleister",
        destination: "/blog/gis-firmen-gis-dienstleister-verzeichnis",
        permanent: true,
      },
      {
        source: "/gis/unigis-professional-weiterbildung",
        destination: "/blog/unigis-weiterbildung-geoinformatik",
        permanent: true,
      },
      {
        source: "/gis/geodaten-deutschland-download",
        destination: "/blog/geodaten-deutschland-online-download-kostenlos",
        permanent: true,
      },
      {
        source: "/gis/gis-software-optionen",
        destination:
          "/blog/gis-software-optionen-open-source-kostenlos-kostenpflichtig",
        permanent: true,
      },
      {
        source: "/gis/geodatenmanager-weiterbildung",
        destination:
          "/blog/geodatenmanager-weiterbildung-universitaet-tuebingen",
        permanent: true,
      },
      {
        source: "/gis/was-sind-geodaten",
        destination: "/blog/geodaten-was-sind-geodaten",
        permanent: true,
      },
      {
        source: "/web-development/mailchimp-newsletter-sign-up-form-gatsbyjs",
        destination: "/blog/mailchimp-newsletter-gatsby-js",
        permanent: true,
      },
      {
        source: "/web-development/gatsby-aws-codebuild-codepipeline",
        destination: "/blog/gatsbyjs-codebuild-ci-cd-pipeline",
        permanent: true,
      },
      {
        source: "/web-development/statische-website-aws-cloudfront",
        destination:
          "/blog/statische-webseite-mit-eigener-domain-aws-s3-und-cloud-front-hosten",
        permanent: true,
      },
      {
        source: "/web-development/gatsby-buddy",
        destination: "/blog/gatsby-cli-automatisierung-mit-git-hub-und-buddy",
        permanent: true,
      },
      {
        source: "/web-development/bildbearbeitung-mit-python-zuschneiden",
        destination: "/blog/skalieren-und-zuschneiden-von-bildern-mit-python",
        permanent: true,
      },
      {
        source: "/web-development/gatsby-analytics-reporting-api-seitenaufrufe",
        destination:
          "/blog/seitenaufrufe-mit-gatsby-und-google-analytics-reporting-api-anzeigen",
        permanent: true,
      },
      {
        source: "/web-development/migration-wordpress-gatsby",
        destination: "/blog/migration-wordpress-gatsby",
        permanent: true,
      },
      {
        source: "/en/web-development/gatsby-google-ad-manager-adsense",
        destination:
          "/blog/integrate-google-ad-manager-with-adsense-in-your-gatsby-site",
        permanent: true,
      },
      {
        source:
          "/en/web-development/build-deploy-gatsby-google-cloud-build-firebase",
        destination:
          "/blog/build-and-deploy-your-gatsby-site-with-google-cloud-build-to-firebase",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
      {
        source: "/blog/themen/:slug",
        destination: "/articles/topics/:slug",
        permanent: true,
      },
      {
        source: "/articles/was-ist-gis-geoinformationssystem",
        destination: "/articles/what-is-gis-geographic-information-system",
        permanent: true,
      },
      {
        source: "/articles/geodaten-was-sind-geodaten",
        destination: "/articles/geodata-what-are-geodata",
        permanent: true,
      },
      {
        source:
          "/articles/gis-software-optionen-open-source-kostenlos-kostenpflichtig",
        destination:
          "/articles/gis-software-options-free-open-source-and-proprietary",
        permanent: true,
      },
      {
        source: "/articles/hochaufloesende-satellitenbilder-downloaden",
        destination: "/articles/satellite-imagery-download-high-resolution",
        permanent: true,
      },
      {
        source: "/articles/gis-vs-cad-unterschied-zwischen-gis-cad",
        destination: "/articles/gis-vs-cad-the-difference-between-gis-and-cad",
        permanent: true,
      },
      {
        source: "/articles/gis-freiwilligenarbeit",
        destination:
          "/articles/gis-volunteering-make-the-world-a-better-place-with-gis",
        permanent: true,
      },
      {
        source: "/articles/gis-anwendungen-welche-gis-anwendungen-gibt-es",
        destination:
          "/articles/gis-applications-which-gis-applications-are-there",
        permanent: true,
      },
      {
        source: "/articles/gis-geo-datenbank-managementsystem-optionen",
        destination: "/articles/gis-and-geo-database-management-system-options",
        permanent: true,
      },
      {
        source: "/articles/geo-gis-podcasts",
        destination: "/articles/geo-and-gis-podcasts-to-stay-up-to-date",
        permanent: true,
      },
      {
        source: "/articles/was-ist-ein-shapefile-shp-dbf-und-shx",
        destination: "/articles/what-is-a-shapefile-shp-dbf-and-shx",
        permanent: true,
      },
      {
        source: "/articles/openstreetmap-daten-shapefiles-downloaden",
        destination: "/articles/download-open-street-map-data-as-shapefiles",
        permanent: true,
      },
      {
        source: "/articles/open-source-web-gis-anwendungen",
        destination: "/articles/open-source-web-gis-applications",
        permanent: true,
      },
      {
        source: "/articles/fme-lizenz-kostenlos-fuer-den-privaten-gebrauch",
        destination: "/articles/free-fme-licence-for-private-use",
        permanent: true,
      },
      {
        source: "/articles/openlayers-web-map",
        destination: "/articles/how-to-create-a-web-map-with-open-layers",
        permanent: true,
      },
      {
        source: "/articles/fernerkundung-und-bildklassifikation",
        destination: "/articles/remote-sensing-and-image-classification",
        permanent: true,
      },
      {
        source: "/articles/erste-schritte-react-und-leaflet",
        destination: "/articles/first-steps-with-leaflet-and-react",
        permanent: true,
      },
      {
        source:
          "/articles/statische-webseite-mit-eigener-domain-aws-s3-und-cloud-front-hosten",
        destination:
          "/articles/host-a-static-website-with-your-own-domain-aws-s3-and-cloud-front",
        permanent: true,
      },
      {
        source: "/articles/pyqgis-layer-bilder-exportieren",
        destination: "/articles/export-qgis-layers-as-images-with-py-qgis",
        permanent: true,
      },
      {
        source:
          "/articles/integrate-google-ad-manager-with-adsense-in-your-gatsby-site",
        destination: "/articles/using-google-adsense-with-gatsby-js",
        permanent: true,
      },
      {
        source: "/articles/mailchimp-newsletter-gatsby-js",
        destination:
          "/articles/how-to-create-a-mailchimp-newsletter-sign-up-form-for-your-gatsby-site",
        permanent: true,
      },
      {
        source: "/articles/geodaten-deutschland-online-download-kostenlos",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/articles/gk-utm-koordinaten-umrechnen-transformationstool",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/articles/geodata-what-are-geodata",
        destination: "/articles/what-are-geodata",
        permanent: true,
      },
      {
        source: "/en/web-development/gatsby-js-google-adsense",
        destination: "/articles/using-google-adsense-with-gatsby-js",
        permanent: true,
      },
      {
        source: "/articles/gehalt-und-jobs-in-der-gis-branche",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/articles/gis-software-kategorien",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/articles/skalieren-und-zuschneiden-von-bildern-mit-python",
        destination: "/articles/scaling-and-cropping-images-using-python",
        permanent: true,
      },
      {
        source: "/articles/gis-firmen-gis-dienstleister-verzeichnis",
        destination: "/articles/",
        permanent: true,
      },
      {
        source: "/fernerkundung-satellitenbilder-downloaden/",
        destination: "/articles/satellite-imagery-download-high-resolution",
        permanent: true,
      },
      {
        source: "/fernerkundung-satellitenbilder-downloaden",
        destination: "/articles/satellite-imagery-download-high-resolution",
        permanent: true,
      },
      {
        source:
          "/articles/how-to-create-web-maps-with-leaflet-react-and-functional-components-1",
        destination:
          "/articles/how-to-create-web-maps-with-leaflet-react-and-functional-components",
        permanent: true,
      },
      {
        source: "/stellenmarkt",
        destination: "/",
        permanent: true,
      },
      {
        source: "/leaflet-maps",
        destination:
          "/articles/how-to-create-web-maps-with-leaflet-react-and-functional-components",
        permanent: true,
      },
      {
        source: "/en/privacy-policy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/stats",
        permanent: true,
      },
      {
        source:
          "/articles/how-to-create-a-cookie-banner-for-your-react-application",
        destination:
          "/articles/how-to-create-a-custom-cookie-banner-for-your-react-application",
        permanent: true,
      },
      {
        source: "/articles/first-steps-with-react-leaflet",
        destination: "/articles/first-steps-with-leaflet-and-react",
        permanent: true,
      },
      {
        source:
          "/articles/how-to-use-next-js-image-component-for-images-in-react-markdown-with-strapi",
        destination:
          "/articles/how-to-get-widths-and-heights-of-images-from-strapi-by-the-image-url-for-next-js",
        permanent: true,
      },

      /* Social Redirects */
      {
        source: "/twitter",
        destination: "https://twitter.com/mxdietrich",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/_maxdietrich/",
        permanent: true,
      },
      {
        source: "/xing",
        destination: "https://www.xing.com/profile/Max_Dietrich7/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/dietrichmax",
        permanent: true,
      },
      {
        source: "/strava",
        destination: "https://www.strava.com/athletes/80974572",
        permanent: true,
      },
      {
        source: "/komoot",
        destination: "https://www.komoot.de/user/1824127161375",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/maxdiet/",
        permanent: true,
      },
      {
        source: "/indieweb",
        destination: "https://indieweb.org/User:Mxd.codes",
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
