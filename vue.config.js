require = require('esm')(module);
const {
  routes
} = './src/config/PageRoutes.vue';

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: 'https://www.quantascan.io',
      routes,
    }
  }
}