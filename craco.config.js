const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      const { appSrc } = paths;
      webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, {
        '@': appSrc,
        components: path.resolve(appSrc, 'components'),
      });
      return webpackConfig;
    },
  },
};
