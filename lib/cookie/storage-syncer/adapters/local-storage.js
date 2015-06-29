'use strict';

/**
 * Global variables.
 */

var proto = LocalStorage.prototype;
var itemName = '_urad';

/**
 * Expose `LocalStorage`.
 */

module.exports = LocalStorage;

/**
 * 建立 LocalStorage
 */

function LocalStorage(options) {
  if (!(this instanceof LocalStorage)) {
    return new LocalStorage(options);
  }
  options || (options = {});
  this.itemName = options.itemName || itemName;
  this.data = JSON.parse(localStorage.getItem(this.itemName) || '{}');
}

/**
 * Adapter 名稱
 *
 * @api public
 */

proto.name = 'localStorage';

/**
 * 取得資料
 *
 * @param {String} key
 * @api public
 */

proto.get = function (key) {
  return this.data[key];
};

/**
 * 設定資料
 *
 * @param {String} key
 * @param {Mix} val
 * @api public
 */

proto.set = function (key, val) {
  this.data[key] = String(val);
  this.save();
};

/**
 * 刪除欄位
 *
 * @param {String} key
 * @api public
 */

proto.remove = function (key) {
  try {
    delete this.data[key];
  } catch (e) {
    this.data[key] = undefined;
  }
  this.save();
};

/**
 * 儲存變更
 *
 * @api private
 */

proto.save = function () {
  var data = JSON.stringify(this.data);
  localStorage.setItem(this.itemName, data);
};
