import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import { useStaticQuery, graphql } from 'gatsby';
import useTranslations from '../useTranslations';


  const SEO = ({
    postNode,
    postPath,
    postSEO,
    lang,
    
  }) => {
    let title;
    let description;
    let image
    let slug;
    let date;
    
    const { defaultDescription } = useTranslations();
    slug = postPath ? urljoin(config.siteUrl, config.pathPrefix, slug) :  urljoin(config.siteUrl, config.pathPrefix);
    lang = lang ? lang : "DE"
    
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;

      image = "https://gis-netzwerk.com" + postMeta.image.childImageSharp.fluid.src;

      
    } else {
      if (postNode) {
        const pageMeta = postNode.frontmatter
        title = pageMeta.title
        description = pageMeta.description
      } else {
        title = config.siteTitle;
        description = defaultDescription;
      }
      image = config.siteLogo;
      const data = useStaticQuery(graphql`
          {
            imageSharp(fixed: {originalName: {eq: "GIS-Netzwerk-Logo.png"}}) {
              fixed(width: 1920) {
                src
                ...GatsbyImageSharpFixed_withWebp_noBase64
              }
            }
          }
      `)
      image = "https://gis-netzwerk.com" + data.imageSharp.fixed.src;
    }

    const blogURL = urljoin(config.siteUrl, config.pathPrefix);


    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
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
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
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
    }
    return (
      
      <Helmet>
          <title>{`${title} | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}${slug}`} />

        <html lang={lang}/>
        
        {/* General tags */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="image" content={image} />


        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={slug} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : config.userName}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
};


export default SEO;


