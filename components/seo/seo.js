import React, { useState, useEffect } from "react"
import Head from "next/head"
import config, { dateFormat } from "@/lib/data/internal/SiteConfig";

const SEO = ({ 
  title,
  description,
  image,
  slug,
  date,
  ogType,
  articleSchema,
  articleData,
  jsonld
}) => {
  
  const [data, setData] = useState("")
  
  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://api.mxd.codes/cv', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
  }, []);

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
      alternateName: config.siteTitleAlt,  
      "image": {
        "@type": "ImageObject",
        "url": `${config.siteUrl}${config.siteLogo}`,
      },
      /*"potentialAction": {
        "@type": "SearchAction",
        "target": `https://www.ecosia.org/search?q=site:${config.domain}+{search_term_string}`,
        "query-input": "required name=search_term_string"
      },*/
    },
  ]
    
  const author = [
    {
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
        "addressLocality": "Rosenheim",
        "addressRegion": "BY",
        "addressCountry": "Germany"
      },
      "email": config.socials.mail,
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "University of Salzburg",
          "sameAs": "https://en.wikipedia.org/wiki/University_of_Salzburg"
        }
      ],
      "jobTitle": !data ? "loading" : data.timeline[0].role,
      "worksFor": [
        {
          "@type": "Organization",
          "name": !data ? "loading" : data.timeline[0].company,
        }
      ],
      "sameAs" : [ 
        config.socials.twitter,
        config.socials.linkedin,
        config.socials.github,
        config.socials.instagram,
        config.socials.mail,
      ],
      "knowsAbout": [
        !data ? "loading" : data.skills[0].skillName.map((skill) => {
          skill.name
        }),
        !data ? "loading" : data.skills[1].skillName.map((skill) => {
          skill.name
        }),
      ],  
    }
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
        "height": 450,
        "width": 1300
      },
      "description": description,
      "datePublished": articleData.published_at,
      "dateModified": articleData.updated_at,
      "dateCreated": articleData.created_at,
      "keywords": "",
      "author": author,
      "publisher": author,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id":  slug
      },  
    })
  } 
   
  const breadcrumbList = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Books",
          "item": "https://example.com/books"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Science Fiction",
          "item": "https://example.com/books/sciencefiction"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Award Winners"
        }
      ]
    }
  ]
  
  const contact = [
    {
      "@context":"http://schema.org",
      "@type":"ItemList",
      "itemListElement":[
        {
          "@type":"SiteNavigationElement",
          "position":1,
          "name": "Home",
          "description": "Homes Desc.",
          "url":"http://www.example.com/"
        },
        {
          "@type":"SiteNavigationElement",
          "position":2,
          "name": "Tours",
          "description": "Tours desc.",
          "url":"http://www.example.com/tours/"
        }
      ]
    }
  ]
  
  schemaOrgJSONLD.push({jsonld})
  
  console.log(schemaOrgJSONLD)
  
  return (
    <Head>
    {/* META TAGS */}
      {/* General tags */}
      <title>{title ? `${title} • Max Dietrich - Geodata-Manager` : `Max Dietrich - Geodata-Manager`}</title>
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

