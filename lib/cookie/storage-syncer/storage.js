'use strict';

/**
 * Global variables.
 */

var proto = Storage.prototype;

/**
 * Expose `Storage`.
 */

module.exports = Storage;

/**
 * 建立 Storage
 */

function Storage(adapter) {
  if (!(this instanceof Storage)) {
    return new Storage(adapter);
  }
  this.adapter = adapter;
}

/**
 * 取得 storage 名稱
 *
 * @return {String}
 * @api public
 */

proto.getName = function () {
  return this.adapter.name;
};

/**
 * 取得資料
 *
 * @param {String} key
 * @return {String}
 * @api public
 */

proto.get = delegate('adapter', 'get');

/**
 * 寫入資料
 *
 * @param {String} key
 * @param {Mix} val
 * @api public
 */

proto.set = delegate('adapter', 'set');

/**
 * 移除欄位
 *
 * @param {String} key
 * @api public
 */

proto.remove = delegate('adapter', 'remove');

/**
 * 方便調用自己 propety 的 method 的 helper
 *
 * @param {String} propName
 * @param {String} methodName
 * @api private
 */

function delegate(propName, methodName) {
  return function () {
    var obj = this[propName];
    var method = obj[methodName];
    return method.apply(obj, arguments);
  };
}
