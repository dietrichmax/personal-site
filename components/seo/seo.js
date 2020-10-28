import Head from 'next/head'
import config, { dateFormat } from '../../lib/data/SiteConfig';

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
  slug = slug ? slug : config.siteUrl
  image = image ? `${image.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${image}` : `${config.siteUrl}${config.siteLogo}`
  date = date ? date : new Date()
  ogType = ogType ? ogType : 'website'
  


  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt
    }
  ];
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': slug,
              name: title,
              image: image,
            }
          }
        ]
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: slug,
        name: title,
        alternateName: config.siteTitleAlt,
        headline: title,
        datePublished: date,
        dateModifed: date,
        mainEntityOfPage: slug,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
        author: config.userName,
        datePublished: date,
        dateModified: date,
        publisher: config.siteTitle,

      }
    );
  } 

  return (
    <Head>
      {/* General tags */}
      <title>{title} - {config.siteTitleShort}</title>
      <link rel='canonical' href={`${config.siteUrl}/${slug}`} />
      <meta name='description' content={description} />
      <meta name='image' content={image} />
      <html lang='en' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='apple-touch-icon' href='/logos/android-chrome-192x192.png'/>
      {/* Schema.org tags */}
      <script type='application/ld+json'>
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property='og:url' content={slug} /> 
      <meta property='og:type' content={ogType} />
      <meta name='og:title' property='og:title' content={title} />
      <meta name='og:description' property='og:description' content={description} />
      <meta property='og:site_name' content={title} />
      <meta property='og:image' content={`${image}`} /> 

      {/* Twitter Card tags */}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={config.socials.twitter} />
      <meta name='twitter:creator' content={config.socials.twitter} />


      </Head>
      )
}


export default SEO

