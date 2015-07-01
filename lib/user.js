'use strict';

/**
 * Module dependencies.
 */

var Fingerprint = require('YouMeb/fingerprint');
var Cookie = require('./cookie');

/**
 * Global variables.
 */

var proto = User.prototype;

/**
 * Expose `User`.
 */

module.exports = User;

/**
 * 建立 User
 *
 * @param {Object} options
 */

function User(options) {
  if (!(this instanceof User)) {
    return new User(options);
  }
  options || (options = {});

  this._data = options.data || {};
  this._cookieName = options.cookieName || '_urad_cuid';
  this.cookie = Cookie();
  this._siteUID = options.siteUID;
  this._fingerprint = Fingerprint()
    .use('fetch')
    .use('plugins')
    .use('platform')
    .use('language')
    .use('cpuClass')
    .use('fontList')
    .use('userAgent')
    .use('indexedDB')
    .use('sendBeacon')
    .use('colorDepth')
    .use('doNotTrack')
    .use('localStorage')
    .use('timezoneOffset');

  if (options.canvas) {
    this._fingerprint.use('canvas');
  }
}

/**
 * 取得 fingerprint
 *
 * @return {String}
 * @api public
 */

proto.getFingerprint = function () {
  return this._fingerprint.get();
};

/**
 * 取得網站的使用者 id
 *
 * @return {String}
 * @api public
 */

proto.getSiteUID = function () {
  return this._siteUID;
};

/**
 * 設定網站的使用者 id
 *
 * @param {String} val
 * @api public
 */

proto.setSiteUID = function (val) {
  return this._siteUID = val;
};

/**
 * 取得 tracking 使用者 id
 *
 * @return {String}
 * @api public
 */

proto.getTrackingUID = function () {
  return this._trackingUID;
};

/**
 * 設定 tracking 使用者 id
 *
 * @param {String} val
 * @api public
 */

proto.setTrackingUID = function (val) {
  return this._trackingUID = val;
};

/**
 * 取得 cookie 使用者 id
 *
 * @return {String}
 * @api public
 */

proto.getCookieUID = function () {
  return this.cookie.get(this._cookieName);
};

/**
 * 設定 cookie 使用者 id
 *
 * @param {String} val
 * @api public
 */

proto.setCookieUID = function (val) {
  return this.cookie.set(this._cookieName, val);
};

/**
 * 設定 user 的資料(資料重複的話，就覆蓋掉)
 *
 * Example:
 *
 *     user.set(key, val)
 *     user.set('account', 'Win Wu');
 *
 * @param {String} key
 * @param {String} val
 * @api public
 */

proto.set = function (key, val) {
  this._data[key] = val;
};

/**
 * 取得 user 資料
 *
 * @param {String} key
 * @return {Mix}
 * @api public
 */

proto.get = function (key) {
  return this._data[key];
};

/**
 * 回傳使用者身分辨認之外的所有欄位資料
 *
 * @return {Object}
 * @api public
 */

proto.toJSON = function () {
  return this._data;
};
