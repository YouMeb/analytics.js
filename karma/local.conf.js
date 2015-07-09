var path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: [
      'mocha',
      'expect'
    ],

    browsers: [
      'Chrome',
      'ChromeCanary',
      'Safari',
      'Firefox',
      'Opera',
      'PhantomJS'
    ],

    files: [
      { pattern: '../lib/**/*.js', included: false },
      '../node_modules/json3/lib/json3.js',
      '../node_modules/jquery/dist/jquery.js',
      '../test/**/*.test.js'
    ],

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },

    preprocessors: {
      '../test/**/*.test.js': [ 'duo' ]
    },

    duo: {
      root: '..',
      plugins: [
        [ 'duo-istanbul' ]
      ]
    },

    reporters: [
      'progress',
      'coverage',
      'coveralls'
    ],

    coverageReporter: {
      type: 'lcov',
      dir: path.resolve(__dirname, '../coverage')
    }
  });
};
