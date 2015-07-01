'use strict';

/**
 * Global variables.
 */

var proto = Parameter.prototype;

/**
 * Expose `Parameter`.
 */

module.exports = Parameter;

/**
 * 建立 Parameter
 *
 * @param {String} key
 * @param {Mix} value
 */

function Parameter(key, value) {
  if (!(this instanceof Parameter)) {
    return new Parameter(key, value);
  }
  this._key = key;
  this._value = value;
}

/**
 * 取得 key
 *
 * @return {String}
 * @api public
 */

proto.key = function () {
  return this._key;
};

/**
 * 取得 value
 *
 * @return {Mix}
 * @api public
 */

proto.value = function () {
  return typeof this._value === 'object'
    ? 'j:' + JSON.stringify(this._value)
    : 's:' + String(this._value);
};

/**
 * 將 key, value 合併成一個字串
 *
 * @return {String}
 * @api public
 */

proto.toString = function () {
  var key = encodeURIComponent(this.key());
  var value = encodeURIComponent(this.value());
  return key + '=' + value;
};

/**
 * 將 parameter 轉成字串
 *
 * @return {String}
 * @api public
 */

Parameter.toString = function (parameter) {
  return parameter.toString();
};
