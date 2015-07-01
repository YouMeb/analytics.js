'use strict';

/**
 * Global variables.
 */

var proto = JQueryElementAdapter.prototype;

/**
 * Expose `JQueryElementAdapter`.
 */

module.exports = JQueryElementAdapter;

/**
 * 建立 JQueryElementAdapter
 */

function JQueryElementAdapter() {
  if (!(this instanceof JQueryElementAdapter)) {
    return new JQueryElementAdapter();
  }
  this.default_ = true;
}

/**
 * 避免執行預設動作
 *
 * @api public
 */

proto.preventDefault = function () {
  this.default_ = false;
};

/**
 * 在 event handler 最後執行
 *
 * @api public
 */

proto.finish = function () {
  // do nothing
};

/**
 * 取得 event handler 的回傳資料
 *
 * @return {Mix}
 * @api public
 */

proto.getReturnValue = function () {
  return this.default_
    ? undefined
    : false;
};
