const { routes } = require('./src/config/PageRoutes.js');



module.exports = {
  pluginOptions: {
    sitemap: {
      baseURL: process.env.BASE_URL || 'https://www.quantascan.io',
      routes,
    },
  },
  filenameHashing: true,
  productionSourceMap: false,
}