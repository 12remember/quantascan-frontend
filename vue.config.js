const { routes } = require('./src/config/PageRoutes.vue');

module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: process.env.BASE_URL || 'https://www.quantascan.io',
      routes,
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  filenameHashing: true,
  productionSourceMap: false,
};