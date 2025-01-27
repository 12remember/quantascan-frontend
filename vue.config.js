require = require('esm')(module);
const {
  routes
} = './src/config/PageRoutes.vue';

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: process.env.BASE_URL || 'https://www.quantascan.io',
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  filenameHashing: true, // Enable hashed filenames
  productionSourceMap: false, // Optional: Disable source maps for smaller builds
};