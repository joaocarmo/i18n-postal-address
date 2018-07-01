module.exports = {
  context: __dirname + '/lib',
  entry: './postal-address.js',
  output: {
    path: __dirname + '/dist',
    filename: 'postal-address.js',
    library: 'PostalAddress',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  }
};
