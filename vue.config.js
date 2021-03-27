require = require('esm')(module);
const {
  routes
} = require('./src/config/PageRoutes.vue');

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: 'https://www.quantascan.io',
      routes,
    }
  }
}