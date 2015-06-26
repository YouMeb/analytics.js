'use strict';

/**
 * Global variables.
 */

var proto = ElementAdapter.prototype;

/**
 * Expose `ElementAdapter`.
 */

module.exports = ElementAdapter;

/**
 * 建立 ElementAdapter
 */

function ElementAdapter(event) {
  if (!(this instanceof ElementAdapter)) {
    return new ElementAdapter(event);
  }
  this.default = true;
  this.event = event;
}

/**
 * 避免執行預設動作
 *
 * @api public
 */

proto.preventDefault = function () {
  this.default = false;
};

/**
 * 在 event handler 最後執行，實際執行 DOM Event 的 preventDefault
 *
 * @api public
 */

proto.finish = function () {
  if (!this.default) {
    this.default = false;
    this.event.preventDefault();
  }
};

/**
 * 取得 event handler 的回傳資料
 *
 * @return {Mix}
 * @api public
 */

proto.getReturnValue = function () {
  return this.default
    ? undefined
    : false;
};
