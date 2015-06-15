'use strict';

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

proto.set = function (key, value) {
  this._data[key] = value;
  return this;
};

proto.paramters = function () {
  var data = this._data;
  return Object
    .keys(data)
    .map(function (key) {
      return Paramter(key, data[key]);
    });
};

proto.getURL = function () {
  var query = this.paramters()
    .map(Paramter.toString)
    .join('&');
  return this._endpoint + '?' + query;
};

proto.send = function (cb) {
  var img = document.createElement('img');
  img.onload = cb || function () {};
  img.onerror = cb || function () {};
  img.src = this.getURL();
  return this;
};
