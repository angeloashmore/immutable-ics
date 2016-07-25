const path = require('path')

module.exports = {
  devtool: 'source-map',

  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    path: 'build',
    filename: 'immutable-ics.js',
    library: 'immutable-ics',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      }
    ]
  }
}
