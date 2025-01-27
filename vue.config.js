require = require('esm')(module);
const {
  routes
} = './src/config/PageRoutes.vue';

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: process.env.BASE_URL || 'https://www.quantascan.io',
      routes,
    }
  },
  filenameHashing: true,
}