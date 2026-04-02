module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'umd',
        useBuiltIns: 'usage',
        targets: {
          browsers: 'baseline widely available',
          node: '20',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
