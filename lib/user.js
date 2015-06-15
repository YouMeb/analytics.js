'use strict';

var cookie = require('component/cookie');
var Fingerprint = require('YouMeb/fingerprint');
var proto = User.prototype;

module.exports = User;

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

proto.fingerprint = function () {
  return this._fingerprint.get();
};

proto.siteUID = function () {
  return typeof this._siteUID === 'function'
    ? this._siteUID()
    : this._siteUID;
};

proto.trackUID = function () {
  return typeof this._trackUID === 'function'
    ? this._trackUID()
    : this._trackUID;
};

proto.cookieUID = function () {
  return cookie(this._cookieName);
};

proto.toString = function () {
  return [
    'fp:' + this.fingerprint(),
    'suid:' + this.siteUID(),
    'tuid:' + this.trackUID(),
    'cuid:' + this.cookieUID()
  ].join();
};
