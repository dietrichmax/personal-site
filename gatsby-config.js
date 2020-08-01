require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteAddress = new URL("https://gis-netzwerk.com/")
const urljoin = require("url-join");
const config = require("./data/SiteConfig");

const dynamicPlugins = []

if (
  process.env.CLIENT_EMAIL &&
  process.env.PRIVATE_KEY &&
  process.env.GA_VIEW_ID
) {
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 3)
  dynamicPlugins.push(
    {
      resolve: `gatsby-plugin-guess-js`,
      options: {
        GAViewID: process.env.GA_VIEW_ID,
        jwt: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
        period: {
          startDate,
          endDate: new Date(),
        },
      }
    },
    {
      resolve: `gatsby-source-google-analytics-reporting-api`,
      options: {
        email: process.env.CLIENT_EMAIL,
        key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        viewId: process.env.GA_VIEW_ID,
        startDate: `2009-01-01`,
      }
    }
  )
}

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    author: config.userName,
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    logo: `${urljoin(config.siteUrl,config.pathPrefix)}static/logos/GIS-Netzwerk-Logo.png`,
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/static/logos/logo-square-512.png`,
      copyright: config.copyright
    }
  },
  mapping: {
    //map author to author.yaml
    "Mdx.frontmatter.author": "AuthorYaml",
    "Mdx.frontmatter.category": "CategoryYaml",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    "gatsby-plugin-preact",
    "netlify-plugin-gatsby-cache",
    `gatsby-plugin-sass`,  
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 710,
              withWebp: true,
              quality: 75,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              removeAccents: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
        ],
      },
    },
    {  
      resolve: "gatsby-plugin-use-dark-mode",  
      options: {  
        classNameDark: "dark-mode",  
        classNameLight: "light-mode",  
        storageKey: "darkMode",  
        minify: true,  
      },  
    },  
    /*{ 
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, 
        purgeOnly: ['leaflet/dist/leaflet.css', 'react-leaflet']
      }
    },*/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/logos/`,
        name: `logos`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: `assets`,
      },
    }, 


    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: `data`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/translations`,
        name: `translations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/Headermenu`,
        name: `Headermenu`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/Footermenu`,
        name: `Footermenu`,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://gis-netzwerk.com`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: false, // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: "https://gis-netzwerk.us20.list-manage.com/subscribe/post?u=098dd2c3187e7002e77fc5e31&amp;id=46a8747b7e"
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_ID,
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-vitals',
      options: {
        // The Google Analytics property ID; the reporting code won't be generated without it
        trackingId: process.env.GA_ID,
        // An array with metrics you want to track and send to analytics
        metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
        // Event Category (optional) { string }, default 'Web Vitals'
        eventCategory: 'Performance',
        // Include Web Vitals tracking in development
        // Defaults to false meaning Vitals will only be tracked in production.
        includeInDevelopment: false,
        // Prints metrics in the console when true
        debug: false,
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor
      }
    },
    "gatsby-plugin-catch-links",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            }
          })
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        start_url: "/",
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "standalone",
        cache_busting_mode: `name`, // `query`(default), `name`, or `none`
        icon: "src/gis-netzwerk_favicon.png",
        icons: [
          {
            src: `/logos/logo_square_48.png`,
            sizes: `48x48`,
            type: `image/png`,
            purpose: "any maskable"
          },
          {
            src: `/logos/logo_square_192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: "any maskable"
          },
          {
            src: `/logos/logo_square_512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: "any maskable"
          }
        ], // Add or remove icon sizes as desired   
      }
    },
    "gatsby-plugin-offline", 
    {
      resolve: "gatsby-plugin-feed-mdx",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMdx = ref.query.allMdx;
          ret.generator = config.siteTitle;
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allMdx.edges.map(edge => ({
                categories: edge.node.frontmatter.categories,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [
                  { "content:encoded": edge.node.html },
                  { author: config.userEmail }
                ]
              }))
            },
            query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {
                  frontmatter: {
                    page: {ne: true}
                  }
                }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      image {
                        childImageSharp {
                          fluid {
                            src
                          }
                        }
                      }
                      date
                      category {
                        id
                      }
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss
          }
        ]
      }
    }
  ].concat(dynamicPlugins),
};
