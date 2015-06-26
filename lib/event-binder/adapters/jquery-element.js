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
 *
 * @param {jQuery} el
 */

function JQueryElementAdapter(el) {
  if (!(this instanceof JQueryElementAdapter)) {
    return new JQueryElementAdapter(el);
  }
  this.el = el;
}

proto.type = 'jquery-element';

/**
 * 綁定事件
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.bind = function (event, fn) {
  this.el.on(event, fn);
};

/**
 * 解除事件綁定
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.unbind = function (event, fn) {
  this.el.off(event, fn);
};
