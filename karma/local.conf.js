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
