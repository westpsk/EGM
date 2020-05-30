module.exports = {
  port: 8001,
  hash: true,
  source: {
    components: './components',
    docs: './docs',
  },
  themeConfig: {
    typeOrder: {
      General: 0,
      Layout: 1,
    },
  },
  webpackConfig(config) {
    return config;
  },
};
