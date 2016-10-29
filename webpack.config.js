var path = require('path');
var moduleName = 'localIdentName=[name]__[local]___[hash:base64:5]';
var vendor = [
  'babel-polyfill',
  'classnames',
  'cookies-js',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-helmet',
  'react-router'
];

//    'webpack/hot/dev-server',
//    'webpack-dev-server/client?http://localhost:3000',

var config = {
  entry: {
    server: './src/server/index.js',
    client: './src/client/index.js',
    vendor
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.css?$/,
        loader: `style!css-loader?modules&importLoaders=1&${moduleName}`,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loader: `style!css-loader?modules&importLoaders=1&${moduleName}!sass-loader`
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config;
