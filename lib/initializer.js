'use strict';

var debug = require('visionmedia/debug')('analytics.js:Initializer');
var Plugin = require('./plugin');
var proto = Initializer.prototype;

module.exports = Initializer;

function Initializer(analytics) {
  if (!(this instanceof Initializer)) {
    return new Initializer(analytics);
  }
  this.analytics = analytics;
}

proto.initAll = function (plugins, cb) {
  // 傳統方式處理異步問題
  // 雖然這邊使用 Promise 會漂亮些，但是必須使用 polyfil
  // 而且專案內並沒有很多異步動作處理
  var count = plugins.length;

  var initcb = function () {
    if (!--count) {
      cb();
    }
  };

  plugins.forEach(function (plugin) {
    this.init(plugin, initcb);
  }.bind(this));

  return this;
};

proto.init = function (plugin, cb) {
  Plugin(plugin);

  debug('init %s', plugin.name);

  plugin.init(this.analytics, function (err) {
    err && debug('error %s', err.stack);
    cb();
  });

  return this;
};
