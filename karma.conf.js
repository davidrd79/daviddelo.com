var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "./node_modules/phantomjs-polyfill/bind-polyfill.js",
      "packages/**/test/*.test.js"
    ],
    preprocessors: {
      "packages/**/test/*.test.js": ["webpack"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
		  noInfo: true
    },
    webpackServer: {
      noInfo: true
    },
    plugins: [
		  'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
	  ],
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
}
