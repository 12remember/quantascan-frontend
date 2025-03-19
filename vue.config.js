const packageJson = require('./package.json');
const { routes } = require('./src/config/PageRoutes.js');

module.exports = {
  transpileDependencies: [], 

  pluginOptions: {
    sitemap: {
      baseURL: process.env.BASE_URL || 'https://quantascan.io',
      routes,
    },
  },

  filenameHashing: true,
  productionSourceMap: false,

  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['process.env'].VUE_APP_VERSION = JSON.stringify(packageJson.version);
      return args;
    });
  },
  configureWebpack: {
    optimization: {
      usedExports: true, // Enables tree shaking
    },
  },
};
