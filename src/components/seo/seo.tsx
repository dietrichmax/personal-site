import { useState, useEffect } from "react"
import Head from "next/head"
import { config } from "@/src/data/internal/SiteConfig"
import { fetchGET } from "@/src/utils/fetcher"

interface SEO {
  title: string
  description: string
  image?: string
  slug: string
  ogType?: any
  articleSchema?: boolean
  aboutSchema?: boolean
  articleData?: any
  jsonld?: any
}

const SEO = ({
  title,
  description,
  image,
  slug,
  ogType,
  articleSchema,
  aboutSchema,
  articleData,
  jsonld,
}: SEO) => {
  description = description
    ? description.replace(/(<([^>]+)>)/gi, "")
    : config.siteDescription
  slug = slug ? `${config.siteUrl}/${slug}` : config.siteUrl
  image = image
    ? `${
        image.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
      }${image}`
    : `${config.siteUrl}${config.siteLogo}`
  ogType = ogType ? ogType : "website"

  const author = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Max Dietrich",
    "nationality": "German",
    "url": config.siteUrl,
    "image": {
      "@type": "ImageObject",
      "url": config.siteLogo,
    },
    "gender": "Male",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Wasserburg am Inn",
      "addressRegion": "BY",
      "addressCountry": "Germany",
    },
    "email": config.socials.mail,
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "University of Salzburg",
        "sameAs": "https://en.wikipedia.org/wiki/University_of_Salzburg",
      },
    ],
    "sameAs": [
      config.socials.twitter,
      config.socials.linkedin,
      config.socials.github,
      config.socials.instagram,
      config.socials.mail,
    ],
  }

  let schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": config.siteTitle,
      "description": description,
      "url": config.siteUrl,
      "alternateName": config.siteTitleAlt,
      "image": {
        "@type": "ImageObject",
        "url": `${config.siteUrl}${config.siteLogo}`,
      },
      "author": author,
      /*"potentialAction": {
        "@type": "SearchAction",
        "target": `https://www.ecosia.org/search?q=site:${config.domain}+{search_term_string}`,
        "query-input": "required name=search_term_string"
      },*/
    },
  ]

  if (articleSchema) {
    schemaOrgJSONLD.push({
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "name": articleData.title,
      "headline": articleData.title,
      "url": slug,
      "image": {
        "@type": "ImageObject",
        "url": image,
        "height": "450",
        "width": "1300",
      },
      "description": description,
      "datePublished": articleData.published_at,
      "dateModified": articleData.updated_at,
      "dateCreated": articleData.created_at,
      "author": author,
      "publisher": author,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": slug,
      },
    })
  }
  if (jsonld) {
    schemaOrgJSONLD.push(jsonld)
  }
  if (aboutSchema) {
    schemaOrgJSONLD.push(author)
  }

  return (
    <Head>
      {/* META TAGS */}
      {/* General tags */}
      <title>
        {title ? `${title} • ${config.siteTitleAlt}` : config.siteTitleAlt}
      </title>
      <link rel="canonical" href={slug} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Schema.org tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgJSONLD),
        }}
      />

      {/* OpenGraph tags */}
      <meta property="og:url" content={slug} />
      <meta property="og:type" content={ogType} />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
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
