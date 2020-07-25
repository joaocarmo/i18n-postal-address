module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: 'umd',
        corejs: '3.6',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
}
