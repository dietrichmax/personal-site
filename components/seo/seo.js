import Head from 'next/head'
import config from "../../data/SiteConfig";

export default function SEO(meta, postSEO) {

  const { title, description, slug, author, coverImage ,lang, date} = meta
  

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: config.siteUrl,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
    }
  ];
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": `https://gis-netzwerk.com${slug}`,
              name: title,
              image: coverImage,
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: slug,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        datePublished: date,
        dateModifed: date,
        mainEntityOfPage: `https://gis-netzwerk.com${slug}`,
        image: {
          "@type": "ImageObject",
          url: coverImage,
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
      <title>{`${title} | ${config.siteTitle}`}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="image" content={coverImage} />
      <html lang={lang}/>
      <link rel="canonical" href={`https://gis-netzwerk.com${slug}`} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={slug} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={coverImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {/*<meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : config.userName}
      />*/}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={coverImage} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="theme-color" content={config.themeColor} />
      
    </Head>
  )
}
