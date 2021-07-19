import Head from "next/head"
import config, { dateFormat } from "../../lib/data/internal/SiteConfig";

const SEO = ({ 
  title,
  description,
  image,
  slug,
  date,
  ogType,
  postSchema,
  aboutSchema
}) => {

  description  = description ? description.replace(/(<([^>]+)>)/gi, "") : config.siteDescription
  slug = slug ? `${config.siteUrl}/${slug}` : config.siteUrl
  image = image ? `${image.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""}${image}` : `${config.siteUrl}${config.siteLogo}`
  date = date ? date : new Date()
  ogType = ogType ? ogType : "website"
  
  let schemaOrgJSONLD = [
    { 
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: config.siteUrl,
        name: config.siteTitle,
        alternateName: config.siteTitleAlt
      },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": config.siteUrl,
      "logo": config.siteLogo,
    }
  ]

  if (postSchema) {
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
  }

  if (aboutSchema) {
    schemaOrgJSONLD = {
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
    }
} 

  return (
    <Head>
    {/* META TAGS */}
      {/* General tags */}
      <title>{title ? `${title} - ${config.siteTitle}` : config.siteTitle}</title>
      <link rel="canonical" href={slug} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

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

    </Head>
  )
}


export default SEO

