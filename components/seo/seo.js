import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import { useStaticQuery, graphql } from 'gatsby';




function SEO({ postNode, postPath, postSEO }) {
    let title;
    let description;
    let image
    let postURL;
    let date;
    let lang;
    
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      {/*({ image } = postMeta);

      
        const { listImages } = useStaticQuery(
        graphql`
          query {
            listImages: allFile {
              edges {
                node {
                  childImageSharp {
                    fixed(width: 400) {
                      src
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
          }
        `,
      );
      const imgName = image ? image.split('/')[3] : false;
      
      const postImg = imgName
        ? listImages.edges.find(img => {
              return img.node.childImageSharp.fixed.src.includes(imgName);
          })
        : false;
        console.log(postImg.node.childImageSharp.fixed.src)*/}
      image = postMeta.image;

      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
      lang = postURL.includes("/en/") ? "en" : "de";
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
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
                "@id": postURL,
                name: title,
                image: image,
              }
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url: postURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
          headline: title,
          datePublished: date,
          dateModifed: date,
          mainEntityOfPage: postURL,
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
      
      <Helmet
        htmlAttributes={{
          lang,
        }}>
        {/* General tags */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="image" content={image} />


        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : blogURL} />
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





