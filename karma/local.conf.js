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
      '../node_modules/json3/lib/json3.js',
      '../node_modules/jquery/dist/jquery.js',
      '../build/test/index.js'
    ],

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    }
  });
};
