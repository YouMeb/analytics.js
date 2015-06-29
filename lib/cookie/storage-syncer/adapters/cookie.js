'use strict';

/**
 * Module dependencies.
 */

var cookie = require('cookie');

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
}

/**
 * Adapter 名稱
 *
 * @api public
 */

proto.name = 'cookie';

/**
 * 取得資料
 *
 * @param {String} key
 * @api public
 */

proto.get = function (key) {
  return cookie(key);
};

/**
 * 設定資料
 *
 * @param {String} key
 * @param {Mix} val
 * @api public
 */

proto.set = function (key, val) {
  cookie(key, val);
};

/**
 * 刪除欄位
 *
 * @param {String} key
 * @api public
 */

proto.remove = function (key) {
  cookie(key, null);
};
