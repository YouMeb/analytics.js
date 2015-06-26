'use strict';

/**
 * Global variables.
 */

var proto = DefaultAdapter.prototype;

/**
 * Expose `DefaultAdapter`.
 */

module.exports = DefaultAdapter;

/**
 * 建立 DefaultAdapter
 */

function DefaultAdapter() {
  if (!(this instanceof DefaultAdapter)) {
    return new DefaultAdapter();
  }
}

/**
 * 避免執行預設動作
 *
 * @api public
 */

proto.preventDefault = function () {};

/**
 * 在 event handler 最後執行
 *
 * @api public
 */

proto.finish = function () {};

/**
 * 取得 event handler 的回傳資料
 *
 * @return {Mix}
 * @api public
 */

proto.getReturnValue = function () {};
