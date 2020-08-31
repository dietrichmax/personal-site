// next.config.js
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
  limit: 8192,
  optimize: true,
  // your config for other plugins or the general next.js here...
});