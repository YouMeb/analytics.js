'use strict';

/**
 * Module dependencies.
 */

var cookie = require('component/cookie');
var debug = require('visionmedia/debug')('analytics.js:Cookie');
var createStorageSyncer = require('./storage-syncer/factory');

/**
 * Global variables.
 */

var proto = Cookie.prototype;

/**
 * Expose `Cookie`.
 */

module.exports = Cookie;

/**
 * 建立 Cookie
 */

function Cookie() {
  if (!(this instanceof Cookie)) {
    return new Cookie();
  }
  this.storageSyncer = createStorageSyncer();
}

/**
 * 取得 cookie 資料
 *
 * @param {String} key
 * @api public
 */

proto.get = function (key) {
  debug('get ' + key);
  this.storageSyncer.syncAll(key, 'cookie');
  return cookie(key);
};

/**
 * 設定 cookie 資料
 *
 * @param {String} key
 * @param {Mix} val
 * @api public
 */

proto.set = function (key, val) {
  debug('set %s %s', key, val);
  this.storageSyncer.restore(key, 'cookie');
  cookie(key, val);
  return this;
};
