// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Make sure we target current Node for tests
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
};
