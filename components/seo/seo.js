import Head from "next/head"
import config, { dateFormat } from "../../lib/data/SiteConfig";

const SEO = ({ 
  title,
  description,
  image,
  slug,
  date,
  ogType,
  postSEO
}) => {

  title = title ? title : config.siteTitle
  description  = description ? description.replace(/(<([^>]+)>)/gi, "") : config.siteDescription
  slug = slug ? `${config.siteUrl}/${slug}` : config.siteUrl
  image = image ? `${image.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""}${image}` : `${config.siteUrl}${config.siteLogo}`
  date = date ? date : new Date()
  ogType = ogType ? ogType : "website"
  
  let schemaOrgJSONLD = []

  if (postSEO) {
      schemaOrgJSONLD = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id":  `${config.siteUrl}`
        },  
        "headline": title,
        "image": [
          image,
         ],
        "datePublished": date,
        "dateModified": date,
        "author": {
          "@type": "Person",
          "name": config.siteTitle,
          "nationality": "German",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rosenheim",
            "addressRegion": "BY",
            "addressCountry": "Germany"
          },
          "alumniOf": [
            {
             "@type": "CollegeOrUniversity",
             "name": "University of Salzburg",
             "sameAs": "https://en.wikipedia.org/wiki/University_of_Salzburg"
            }
          ],
          "gender": "Male",
          "jobTitle": "GeoData Manager",
          "worksFor": [
            {
              "@type": "Organization",
              "name": "RIWA GmbH Gesellschaft für Geoinformationen",
              "sameAs": [
                "http://www.riwa-gis.de/",
                "http://www.riwa.de/"
              ]
            }
          ],
          "nationality": "German",
          "url": config.siteUrl,
          "sameAs" : [ 
            config.socials.twitter,
            config.socials.linkedin,
            config.socials.github,
            config.socials.instagram,
          ],
          "knowsAbout": [
            "GIS",
            "Web-Development",
            "Technical drawing"
          ],
        },
        "publisher": {
          "@type": "Organization",
          "name": config.siteTitle,
          "logo": {
            "@type": "ImageObject",
            "url": config.siteLogo
          }
        }  
    }
  } else { 
      schemaOrgJSONLD = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: config.siteUrl,
        name: config.siteTitle,
        alternateName: config.siteTitleAlt
      }
   } 

  return (
    <Head>
    {/* META TAGS */}
      {/* General tags */}
      <title>{title} - {config.siteTitle}</title>
      <link rel="canonical" href={slug} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Android */}
      <meta name="theme-color" content={config.themeColor} />
      {/*<meta name="mobile-web-app-capable" content="yes" />*/}

      {/* iOS */}
      <meta name="apple-mobile-web-app-title" content={config.siteTitle} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Windows */}
      <meta name="msapplication-navbutton-color" content={config.themeColor} />
      <meta name="msapplication-TileColor" content={config.themeColor} />
      <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" /> 

      {/* Pinned Sites */}
      <meta name="application-name" content={config.siteTitle} />
      <meta name="msapplication-tooltip" content={config.siteTitle} />
      <meta name="msapplication-starturl" content="/" />

      {/* Tap highlighting */}
      <meta name="msapplication-tap-highlight" content="no" />

      {/* UC Mobile Browser */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />

      {/* Disable night mode for this page */}
      <meta name="nightmode" content="enable/disable" />

      {/* Fitscreen 
      <meta name="viewport" content="uc-fitscreen=yes"/>*/}

      {/* Layout mode */}
      <meta name="layoutmode" content="fitscreen/standard" />

      {/* imagemode - show image even in text only mode */}
      <meta name="imagemode" content="force" />

      {/* Orientation */}
      <meta name="screen-orientation" content="portrait" />

    {/* META TAGS */}
      {/*Main Link Tags  */}
      <link href="/firefox/firefox-general-16-16.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/firefox/firefox-general-32-32.png" rel="icon" type="image/png" sizes="32x32" />
      <link href="/firefox/firefox-general-48-48.png" rel="icon" type="image/png" sizes="48x48" />

      {/*iOS  */}
      <link href="touch-icon-iphone.png" rel="apple-touch-icon" />
      {/*<link href="touch-icon-ipad.png" rel="apple-touch-icon" sizes="76x76" />*/}
      <link href="/windows/windows-squarelogo-120-120.png" rel="apple-touch-icon" sizes="120x120" />
      {/*<link href="touch-icon-ipad-retina.png" rel="apple-touch-icon" sizes="152x152" />*/}

      {/*Startup Image  */}
      {/*<link href="touch-icon-start-up-320x480.png" rel="apple-touch-startup-image" />*/}

      {/*Pinned Tab  */}
      {/*<link href="path/to/icon.svg" rel="mask-icon" size="any" color="red" />*/}

      {/*Android  */}
      <link href="/android/android-launchericon-192-192.png" rel="icon" sizes="192x192" />
      <link href="/chrome/installprocess-128-128.png" rel="icon" sizes="128x128" />

      {/*Others */}
      <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />

      {/*UC Browser  */}
      {/*<link href="images/icon-52x52.png" rel="apple-touch-icon-precomposed" sizes="57x57" />*/}
      <link href="/android/android-launchericon-72-72.png" rel="apple-touch-icon" sizes="72x72" />

      {/*Manifest.json  */}
      <link href="/manifest.json" rel="manifest" />

      {/* Schema.org tags */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}/>

      {/* OpenGraph tags */}
      <meta property="og:url" content={slug} /> 
      <meta property="og:type" content={ogType} />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={`${image}`} /> 

      {/* Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={config.socials.twitter} />
      <meta name="twitter:creator" content={config.socials.twitter} />

      {/* ME */}
      <link href={config.socials.mail} rel="me" />
      <link href={config.socials.twitter} rel="me" />
      <link href={config.socials.xing} rel="me" />
      <link href={config.socials.linkedin} rel="me" />
      <link href={config.socials.github} rel="me" />
      <link href={config.socials.instagram} rel="me" />
      <link href={config.socials.reddit} rel="me" />
    </Head>
  )
}


export default SEO

