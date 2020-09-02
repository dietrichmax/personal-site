// next.config.js
const withPlugins = require('next-compose-plugins');

const withOptimizedImages = require('next-optimized-images');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)$/,
});

module.exports = withPlugins([withMDX, withOptimizedImages], {
  
  /* config for withMDX */
  pageExtensions: ['js', 'mdx', 'md'],
  
  /* config for next-optimized-images */
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
  limit: 8192,
  optimize: true,
  
  // your config for other plugins or the general next.js here...
});
