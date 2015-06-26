'use strict';

/**
 * Module dependencies.
 */

var bind = require('component/bind');
var each = require('component/each');
var debug = require('visionmedia/debug')('analytics.js:Initializer');
var Plugin = require('./plugin');

/**
 * Global variables.
 */

var proto = Initializer.prototype;

/**
 * Expose `Initializer`.
 */

module.exports = Initializer;

/**
 * 建立 Initializer
 *
 * @param {Object} options
 */

function Initializer(analytics) {
  if (!(this instanceof Initializer)) {
    return new Initializer(analytics);
  }
  this.analytics = analytics;
}

/**
 * 初始化所有傳入的 plugin
 *
 * @param {Array} plugins
 * @paran {Function} cb
 * @api public
 */

proto.initAll = function (plugins, cb) {
  // 傳統方式處理異步問題
  // 雖然這邊使用 Promise 會漂亮些，但是必須使用 polyfill
  // 而且專案內並沒有很多異步動作處理
  var count = plugins.length;

  var initcb = function () {
    // 每個 callback 只能呼叫一次
    var called = false;
    return function () {
      if (!called) {
        called = true;
        if (!--count) {
          cb();
        }
      }
    };
  };

  if (count) {
    each(plugins, bind(this, function (plugin) {
      this.init(plugin, initcb());
    }));
  } else {
    cb();
  }

  return this;
};

/**
 * 初始化傳入的 plugin
 *
 * @param {Plugin} plugin
 * @paran {Function} cb
 * @api public
 */

proto.init = function (plugin, cb) {
  Plugin(plugin);

  debug('init %s', plugin.name);

  setTimeout(function () {
    plugin.abort && plugin.abort();
    cb(new Error('timeout'));
  }, 2000);

  plugin.init(this.analytics, function (err) {
    err && debug('error %s', err.stack);
    cb();
  });

  return this;
};
