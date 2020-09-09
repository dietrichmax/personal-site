import Head from 'next/head'
import config, { dateFormat } from "../../data/SiteConfig";

const SEO = ({ 
  title,
  description,
  image,
  slug,
  date,
  lang,
  postSEO

}) => {

  title = title ? title : config.siteTitle
  description  = description ? description : config.siteDescription
  slug = slug ? slug : config.siteUrl
  lang = lang ? lang : config.defaultLang
  image = image ? `${config.apiUrl}${image}` : config.siteLogo
  date = date ? date : new Date()


  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt
    }
  ];
  if (postSEO) {
    const ogType = "article"
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": slug,
              name: title,
              image: image,
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: slug,
        name: title,
        alternateName: config.siteTitleAlt,
        headline: title,
        datePublished: date,
        dateModifed: date,
        mainEntityOfPage: slug,
        image: {
          "@type": "ImageObject",
          url: image,
        },
        description,
        author: config.userName,
        datePublished: date,
        dateModified: date,
        publisher: config.siteTitle,

      }
    );
  } else {
    const ogType = "website"
  }

  return (
    <Head>
      {/* General tags */}
      <title>{title} | {config.siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={slug} /> 
      <meta property="og:type" content={ogType} />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={description} />
      <meta property="og:site_name" content="Proper Noun" />
      <meta property="og:image" content={`${image}`} /> 
      <meta property="og:locale" content={lang} /> 

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

