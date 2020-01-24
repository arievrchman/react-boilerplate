const presets = [
  [
    '@babel/preset-env',
    {
      // debug: true,
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        node: 'current',
      },
    },
  ],
  '@babel/preset-react',
];

const plugins = ['@babel/plugin-proposal-class-properties'];

module.exports = {
  presets,
  plugins,
};
