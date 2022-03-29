/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const babelOptions = require('./babel.config')

const mode = process.env.NODE_ENV || 'development'

const commonConfig = {
  mode,
  context: path.join(__dirname, 'lib'),
  entry: './index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'postal-address.js',
    library: 'PostalAddress',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /.(j|t)s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
    ],
  },
}

const webConfig = {
  ...commonConfig,
  target: 'web',
  output: {
    ...commonConfig.output,
    globalObject: 'self',
  },
  resolve: {
    ...commonConfig.resolve,
    alias: {
      'node-postal$': path.resolve(__dirname, 'lib/mocks/node-postal.js'),
    },
  },
}

const nodeConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    ...commonConfig.output,
    filename: 'postal-address.node.js',
    globalObject: 'this',
  },
  externals: {
    'node-postal': 'commonjs2 node-postal',
  },
  externalsPresets: { node: true },
}

module.exports = [webConfig, nodeConfig]
