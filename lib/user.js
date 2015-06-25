'use strict';

/**
 * Module dependencies.
 */

var cookie = require('component/cookie');
var Fingerprint = require('YouMeb/fingerprint');

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
  this._cookieName = options.cookieName || '_urad_cuid';
  this._siteUID = options.siteUID;
  this._fingerprint = Fingerprint()
    .use('fetch')
    .use('canvas')
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
}

/**
 * 取得 fingerprint
 *
 * @return {String}
 * @api public
 */

proto.fingerprint = function () {
  return this._fingerprint.get();
};

/**
 * 取得網站的使用者 id
 *
 * @return {String}
 * @api public
 */

proto.siteUID = function () {
  return typeof this._siteUID === 'function'
    ? this._siteUID()
    : this._siteUID;
};

/**
 * 取得 tracking 使用者 id
 *
 * @param {String} val
 * @return {String}
 * @api public
 */

proto.trackingUID = function (val) {
  // setter
  if (val) {
    this._trackingUID = val;
    return this;
  }

  // getter
  return this._trackingUID;
};

/**
 * 取得 cookie 使用者 id
 *
 * @param {String} val
 * @return {String}
 * @api public
 */

proto.cookieUID = function (val) {
  // setter
  if (val) {
    cookie(this._cookieName, val);
    return this;
  }

  // getter
  return cookie(this._cookieName);
};

/**
 * 將所有辨識使用者的資料轉成一個字串，方便資料傳遞
 *
 * @return {String}
 * @api public
 */

proto.toString = function () {
  return [
    'fp:' + this.fingerprint(),
    'suid:' + this.siteUID(),
    'tuid:' + this.trackingUID(),
    'cuid:' + this.cookieUID()
  ].join();
};
