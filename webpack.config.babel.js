import path from 'path';
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import FailPlugin from 'webpack-fail-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
//import autoprefixer from 'autoprefixer';

const moduleName = 'localIdentName=[name]__[local]___[hash:base64:5]';
const vendor = [
  'babel-polyfill',
  'classnames',
  'cookies-js',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-helmet',
  'react-router'
];

const commonLoaders = [
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

const preLoaders = [
  {
    test: /\.jsx?$/,
    loaders: ['eslint-loader'],
    exclude: /node_modules/
  }
];

export default [
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
		},
    plugins: [
      new webpack.IgnorePlugin(/webpack-ignore/),
      //new webpack.DefinePlugin({
      //  'process.env': mapValues(env, JSON.stringify)
      //}),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new webpack.NamedModulesPlugin(),
      new ChunkManifestPlugin({
        filename: `chunk-manifest.json`,
        manifestVariable: '__WEBPACK_MANIFEST__'
      }),
      new StatsWriterPlugin({
        filename: `rev-manifest.json`,
        transform: (data) => JSON.stringify(data.assetsByChunkName)
      }),
      FailPlugin,
      //new ExtractTextPlugin('[name]-[contenthash:8].css'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }),
      new WebpackMd5Hash(),
      // gzip source keeping the .js|css extension
      new CompressionPlugin({
        asset: '[file]',
        algorithm: 'gzip',
        test: /\.(js|css)$/
      }),
    ],
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
