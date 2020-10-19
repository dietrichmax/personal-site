// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const offline = require("next-offline");
const mdx = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)$/,
});

// redirects
const redirects = {async redirects() {
  return [
    {
      source: '/blog/:slug',
      destination: '/articles/:slug',
      permanent: true
    },
    {
      source: '/blog/themen/:slug',
      destination: '/articles/topics/:slug',
      permanent: true
    },
  ]
}};


module.exports = withPlugins([
  [optimizedImages, {
    /* config for next-optimized-images */
  }],
  [offline],
  [mdx],
  [redirects],
  // more config
]);