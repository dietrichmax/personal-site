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
  description  = description ? description : config.siteDescription
  slug = slug ? slug : ""
  image = image ? `${image.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""}${image}` : `${config.siteUrl}${config.siteLogo}`
  date = date ? date : new Date()
  ogType = ogType ? ogType : "website"
  


  let schemaOrgJSONLD = []
  
  if (postSEO) {
      schemaOrgJSONLD = {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "image": [
          image,
         ],
        "datePublished": date,
        "dateModified": date
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
      {/* General tags */}
      <title>{title} - {config.siteTitleShort}</title>
      <link rel="canonical" href={`${config.siteUrl}/${slug}`} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
      {/*<html lang="en" />*/}
      
      <link rel="manifest" href="/manifest.json" />
      <link href="/logos/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/logos/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/logos/android-chrome-192x192.png"/>
      <meta name="theme-color" content="#0a1924"/>
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD.replace(/&quot;/g,'"'))} 
      </script>

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


      </Head>
      )
}


export default SEO

