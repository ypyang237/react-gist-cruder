var path = require('path');

module.exports = {
  entry: './home_page/home_page.js',
  output: {
    filename: 'browser-bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};
