const path = require('path')
const babelOptions = require('./babel.config')

const { NODE_ENV } = process.env

const mode = NODE_ENV || 'development'

module.exports = {
  context: path.join(__dirname, 'lib'),
  entry: './postal-address.js',
  mode,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'postal-address.js',
    library: 'PostalAddress',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
    ],
  },
}
