
const config = {
  siteTitle: "GIS-Netzwerk", // Site title.
  siteTitleShort: "GIS-Netzwerk", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "GIS-Netzwerk", // Alternative site title for SEO.
  siteLogo: "static/logos/GIS-Netzwerk-Logo.png", // Logo used for SEO and manifest.
  siteUrl: "https://gis-netzwerk.com", // Domain of your website without pathPrefix.
  homePath: "/", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "GIS-Netzwerk ist eine Informationsplattform für Geoinformatik, GIS, Geodaten und Web-Development.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  dateFormat: "dd.MM.yyyy", // Date format for display.
  copyright: "Creative Commons Attribution-ShareAlike 3.0", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#f2f2f2", // Used for setting manifest and progress theme colors.
  backgroundColor: "#f2f2f2", // Used for setting manifest background color.
  loading: "Lade Daten...",
  socials: { // socials
    twitter: "https://twitter.com/GISNetzwerk",
    github: "https://github.com/DaTurboD/GIS-Netzwerk",
    linkedin: "https://www.linkedin.com/in/maxdiet/",
    instagram: "https://www.instagram.com/_maxdietrich/"
  },
};

module.exports = config;
