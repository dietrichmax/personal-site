import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import { useStaticQuery, graphql } from 'gatsby';


  const SEO = ({
    postNode,
    postPath,
    postSEO,
    lang,
    props,
    
  }) => {
    let title;
    let description;
    let image
    let slug;
    let date;
    
    slug = urljoin(config.siteUrl, config.pathPrefix, postPath);

    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;

      image = "https://gis-netzwerk.com" + data.imageSharp.fluid.src;

      
    } else {

      const pageMeta = postNode.frontmatter ? postNode.frontmatter : null;
      title = pageMeta.title ? pageMeta.title : config.siteTitle;
      description = pageMeta.description ? pageMeta.description : config.siteDescription;
      image = "https://gis-netzwerk.com" + props.data.imageSharp.fluid.src;
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



export const query = graphql`
  {
    imageSharp(fluid: {originalName: {eq: "GIS-Netzwerk-Logo_1080.png"}}) {
      fluid(maxWidth: 1920, maxHeight: 1080) {
        src
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
  }
`

