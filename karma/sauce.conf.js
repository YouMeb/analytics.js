module.exports = function (config) {
  var customLaunchers = singleRun({
    sl_chrome_26: {
      base: 'SauceLabs',
      browserName: 'chrome',
      recordVideo: true,
      platform: 'Windows 7',
      version: '26.0'
    },
    sl_firefox_4: {
      base: 'SauceLabs',
      browserName: 'firefox',
      recordVideo: true,
      plarform: 'Windows 7',
      version: '4.0'
    },
    sl_ios_safari_71: {
      base: 'SauceLabs',
      browserName: 'iphone',
      recordVideo: true,
      platform: 'OS X 10.10',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      recordVideo: true,
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      recordVideo: true,
      platform: 'Windows 7',
      version: '10'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      recordVideo: true,
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      recordVideo: true,
      platform: 'Windows 7',
      version: '8'
    }
  });

  config.set({
    frameworks: [
      'mocha',
      'expect'
    ],

    sauceLabs: {
      testName: 'analytics.js unit test'
    },

    captureTimeout: 120000,

    browserDisconnectTimeout: 60000,

    browserNoActivityTimeout: 60000,

    customLaunchers: customLaunchers,

    browsers: Object.keys(customLaunchers),

    reporters: ['dots', 'saucelabs'],

    singleRun: true,

    files: [
      '../node_modules/json3/lib/json3.js',
      '../node_modules/jquery/dist/jquery.js',
      '../build/test/index.js'
    ],

    reporters: [
      'coverage',
      'coveralls'
    ],

    coverageReporter: {
      type: 'lcov',
      dir: '../coverage'
    }
  });
};

function singleRun(browsers) {
  var newBrowsers = {};
  var browserName = process.env.T_BROWSER;
  var browserNameRe = new RegExp(browserName, 'i');

  if (browserName) {
    Object.keys(browsers).forEach(function (key) {
      if (browserNameRe.test(key)) {
        newBrowsers[key] = browsers[key];
      }
    });
    return newBrowsers;
  }

  return browsers;
}
