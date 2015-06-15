'use strict';

var proto = Paramter.prototype;

module.exports = Paramter;

function Paramter(key, value) {
  if (!(this instanceof Paramter)) {
    return new Paramter(key, value);
  }
  this._key = key;
  this._value = value;
}

proto.key = function () {
  return this._key;
};

proto.value = function () {
  return typeof this._value === 'object'
    ? 'j:' + JSON.stringify(this._value)
    : 's:' + String(this._value);
};

proto.toString = function () {
  var key = encodeURIComponent(this.key());
  var value = encodeURIComponent(this.value());
  return key + '=' + value;
};

Paramter.toString = function (paramter) {
  return paramter.toString();
};
