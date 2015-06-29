'use strict';

/**
 * Module dependencies.
 */

var bindEvent = require('component/event').bind;
var unbindEvent = require('component/event').unbind;

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
 *
 * @param {Element} el
 */

function ElementAdapter(el) {
  if (!(this instanceof ElementAdapter)) {
    return new ElementAdapter(el);
  }
  this.el = el;
}

proto.type = 'element';

/**
 * 綁定事件
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.bind = function (event, fn) {
  bindEvent(this.el, event, fn);
};

/**
 * 解除事件綁定
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.unbind = function (event, fn) {
  unbindEvent(this.el, event, fn);
};
