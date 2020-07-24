
const config = {
  siteTitle: "GIS-Netzwerk", // Site title.
  siteTitleShort: "GIS-Netzwerk", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "GIS-Netzwerk", // Alternative site title for SEO.
  siteLogo: "static/logos/GIS-Netzwerk-Logo.png", // Logo used for SEO and manifest.
  siteUrl: "https://gis-netzwerk.com/", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "GIS-Netzwerk ist eine Informationsplattform für GIS, Geodaten und Web-Development.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD.MM.YYYY", // Date format for display.
  userName: "Max Dietrich", // Username to display in the author segment.
  userEmail: "max.dietrich@gis-netzwerk.com", // Email used for RSS feed's author segment
  userTwitter: "@GISNetzwerk", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Rosenheim", // User location to display in the author segment.
  userAvatar: "", // User avatar to display in the author segment.
  userDescription:
    "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Instagram",
      url: "https://twitter.com/GISNetzwerk",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/GISNetzwerk",
    },
    {
      label: "Email",
      url: "mailto:max.dietrich@gis-netzwerk.com",
    }
  ],
  copyright: "Creative Commons Attribution-ShareAlike 3.0", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#f2f2f2", // Used for setting manifest and progress theme colors.
  backgroundColor: "#f2f2f2" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
