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
    library: {
      name: 'PostalAddress',
      type: 'umd',
    },
    globalObject: 'this',
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
  },
}

const nodeConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    ...commonConfig.output,
    filename: 'postal-address.node.js',
  },
  externalsPresets: { node: true },
}

module.exports = [webConfig, nodeConfig]
