module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ];
  return {
    presets,
  };
};
