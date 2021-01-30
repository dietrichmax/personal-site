// next.config.js
const withPlugins = require('next-compose-plugins');
const mdx = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)$/,
});
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const isProd = process.env.NODE_ENV === "production";

// redirects
const redirects = {async redirects() {
  return [
    {
      source: '/articles/gis-firmen-gis-dienstleister-verzeichnis',
      destination: '/articles/',
      permanent: true
    },
  ]
}}

module.exports = withPlugins([
  [mdx],
  redirects,
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  }),
  {images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [50, 368, 1920 ],
    domains: ['api.mxd.codes'],
  }},
  {i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  }},
]);
