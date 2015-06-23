'use strict';

var map = require('component/map');
var bind = require('component/bind');
var debug = require('visionmedia/debug')('analytics.js:Beacon');
var Paramter = require('./paramter');
var proto = Beacon.prototype;

module.exports = Beacon;

function Beacon(data) {
  if (!(this instanceof Beacon)) {
    return new Beacon(data);
  }
  this._data = data || {};
  this._endpoint = null;
}

proto.endpoint = function (endpoint) {
  this._endpoint = endpoint;
  return this;
};

proto.get = function (key) {
  return this._data[key];
};

proto.set = function (key, value) {
  this._data[key] = value;
  return this;
};

// 因為需要支援 ie7 所以 不能使用 Object.keys
proto.paramters = function () {
  var data = this._data;
  var paramters = [];
  var prop;

  for (prop in data) {
    if (data.hasOwnProperty(prop)) {
      paramters.push(Paramter(prop, data[prop]));
    }
  }

  return paramters;
};

proto.getURL = function () {
  var query = this.paramters();
  query = map(query, Paramter.toString);
  query = query.join('&');
  return ''
    + (this._endpoint || '')
    + (query ? '?' + query : '');
};

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
