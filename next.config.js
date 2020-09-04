// next.config.js
const withPlugins = require('next-compose-plugins');
const isProd = process.env.NODE_ENV === "production";
const withOptimizedImages = require('next-optimized-images');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)$/,
});

module.exports = withPlugins([
  [withMDX, {
    /* config for withMDX */
    pageExtensions: ['js', 'mdx', 'md'],
  }],
  [withOptimizedImages, {
    /* config for next-optimized-images */
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
    limit: 8192,
    optimize: true,
  }],
  [withPWA, {
    /* config for withPWA */
    pwa: {
      disable: !isProd,
      dest: "public"
    },
  }],
  
  // your config for other plugins or the general next.js here...
]);
