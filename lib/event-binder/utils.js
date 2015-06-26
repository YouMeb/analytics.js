'use strict';

/**
 * 檢查傳入的物件是不是 HTMLElement
 *
 * @param {Mix} el
 * @return {Boolean}
 * @api public
 */

exports.isElement = function (el) {
  return typeof el === 'object'
    // document.ELEMENT_NODE
    && el.nodeType === 1
    && typeof el.style === 'object'
    && typeof el.ownerDocument === 'object';
};

/**
 * 檢查傳入的物件是不是 jQuery element
 *
 * @param {Mix} el
 * @return {Boolean}
 * @api public
 */

exports.isJQueryElement = function (el) {
  return window.jQuery
    && el instanceof window.jQuery;
};

/**
 * 檢查傳入的物件是不是 EventEmitter
 *
 * @param {Mix} el
 * @return {Boolean}
 * @api public
 */

exports.isEmitter = function (emitter) {
  return emitter
    && emitter.on
    && emitter.off
    && emitter.once;
};
