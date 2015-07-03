'use strict';

/**
 * Module dependencies.
 */

var map = require('component/map');
var bind = require('component/bind');
var filter = require('YouMeb/filter');
var debug = require('visionmedia/debug')('analytics.js:Beacon');
var Paramter = require('./parameter');

/**
 * Global variables.
 */

var proto = Beacon.prototype;

/**
 * Expose `Beacon`.
 */

module.exports = Beacon;

/**
 * 建立 Beacon
 *
 * @param {Object} data
 */

function Beacon(data) {
  if (!(this instanceof Beacon)) {
    return new Beacon(data);
  }
  this._data = data || {};
  this._endpoint = null;
}

/**
 * 設定資料傳送位置
 *
 * @param {String} endpoint
 * @api public
 */

proto.endpoint = function (endpoint) {
  this._endpoint = endpoint;
  return this;
};

/**
 * 取得將要送出的特定欄位資料
 *
 * @param {String} key
 * @return {Mix}
 * @api public
 */

proto.get = function (key) {
  return this._data[key];
};

/**
 * 設定要傳送的特定欄位的資料
 *
 * @param {String} String
 * @param {Mix} value
 * @api public
 */

proto.set = function (key, value) {
  this._data[key] = value;
  return this;
};

/**
 * 將所有要傳送的資料轉成 parameter
 *
 * @return {Array}
 * @api private
 */

proto.parameters = function () {
  var data = this._data;
  var parameters = [];
  var prop;

  for (prop in data) {
    if (data.hasOwnProperty(prop)) {
      parameters.push(Paramter(prop, data[prop]));
    }
  }

  return parameters;
};

/**
 * 取得最後要發送請求的 url
 *
 * @return {String}
 * @api private
 */

proto.getURL = function () {
  var query = this.parameters();
  query = filter(query, Paramter.isNotEmpty);
  query = map(query, Paramter.toString);
  query = query.join('&');
  return ''
    + (this._endpoint || '')
    + (query ? '?' + query : '');
};

/**
 * 送出資料
 *
 * @param {Function} cb
 */

proto.send = function (cb) {
  var img = document.createElement('img');
  cb = cb || function () {};
  cb = bind(null, cb, this);
  img.onload = cb;
  img.onerror = cb;
  img.src = this.getURL();
  debug('send %s', img.src);
  return this;
};
