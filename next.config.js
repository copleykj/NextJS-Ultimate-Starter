module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, options) => {
    config.experiments = {
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },
};
