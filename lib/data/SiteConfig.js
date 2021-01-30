
const config = {
  siteTitle: "mxd.codes", // Site title.
  siteTitleShort: "mxd.codes", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "mxd.codes", // Alternative site title for SEO.
  siteDescription: "mxd.codes is my personal website about gis and web-development", // Website description used for RSS feeds/meta description tag.
  siteLogo: "/logos/logo_square_512.png", // Logo used for SEO and manifest.
  siteUrl: "https://mxd.codes", // Domain of your website.
  homePath: "/", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteRss: "/rss.xml", // Path to the RSS file.
  dateFormat: "dd-MM-yyyy", // Date format for display.
  copyright: "Creative Commons Attribution-ShareAlike 3.0", // Copyright string for the footer of the website and RSS feed
  themeColor: "#0a1924", // Used for setting manifest and progress theme colors.
  backgroundColor: "#eaeaea", // Used for setting manifest background color.
  loading: "Loading Data...",
  socials: { // socials
    github: "https://github.com/DaTurboD/",
    twitter: "https://twitter.com/mxdietrich",
    linkedin: "https://www.linkedin.com/in/maxdiet/",
    instagram: "https://www.instagram.com/_maxdietrich/"
  },
};

module.exports = config;
