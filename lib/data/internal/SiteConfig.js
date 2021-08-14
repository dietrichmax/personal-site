
const config = {
  siteTitle: "Max Dietrich - GeoData-Manager", // Site title.
  siteTitleShort: "mxd.codes", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Max Dietrich", // Alternative site title for SEO.
  siteSubtitle: "Geodata-Manager",
  siteDescription: "Hi, I'm Max. I currently work as a Geodata Manager at RIWA at where I'm doing Data Migrations. Beside that I ride my mountain bike in the alps, code and design my website and publish new content whenever i can.", // Website description used for RSS feeds/meta description tag.
  siteLogo: "/logos/firefox/firefox-marketplace-512-512.jpg", // Logo used for SEO and manifest.
  siteUrl: "https://mxd.codes", // Domain of your website.
  domain: "mxd.codes",
  homePath: "/", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteRss: "/feed.xml", // Path to the RSS file.
  dateFormat: "dd MMMM yyy 'at' HH:mm O", // Date format for display.
  copyright: "Creative Commons Attribution-ShareAlike 3.0", // Copyright string for the footer of the website and RSS feed
  themeColor: "#111936", // Used for setting manifest and progress theme colors.
  backgroundColor: "#fff", // Used for setting manifest background color.
  loading: "Loading data...",
  fallbackImg: "https://source.unsplash.com/1300x450/?web,tech",
  socials: { // socials
    github: "/github",
    twitter: "/twitter",
    linkedin: "/linkedin",
    slack: "/slack",
    instagram: "/instagram",
    strava: "/strava",
    //komoot: "/komoot",
    //mastodon: "https://fosstodon.org/@mxd",
    //xing: "https://www.xing.com/profile/Max_Dietrich7/",
    //reddit: "https://www.reddit.com/user/DaTurboD",
    mail: "mailto:mail@mxd.codes",
  },
};

module.exports = config;
