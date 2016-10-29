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

var commonLoaders = [
  {
    test: /\.jsx?$/,
    loaders: ['babel'],
    exclude: /node_modules/
  },
	{
    test: /\.png$/,
    loader: 'url-loader'
  },
	{
    test: /\.jpg$/,
    loader: 'file-loader'
  },
];

var preLoaders = [
  {
    test: /\.jsx?$/,
    loaders: ['eslint-loader'],
    exclude: /node_modules/
  }
];

module.exports = [
  {
		name: 'client',
    entry: {
      client: './src/client/index.js',
      vendor
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[chunkhash:8].js',
      chunkFilename: '[name]-[chunkhash:8].js'
    },
    module: {
      preLoaders: preLoaders,
			loaders: commonLoaders.concat([
        {
          test: /\.css?$/,
          loader: `style!css-loader?modules&importLoaders=1&${moduleName}`,
          include: __dirname
        },
        {
          test: /\.scss$/,
          loader: `style!css-loader?modules&importLoaders=1&${moduleName}!sass-loader`
        }
      ])
		}
  },
  {
    name: 'server',
    entry: './src/server/index.js',
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js',
      libraryTarget: 'commonjs2'
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      preLoaders: preLoaders,
			loaders: commonLoaders
		}
  }
];
