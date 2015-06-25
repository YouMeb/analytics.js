'use strict';

/**
 * Module dependencies.
 */

var assert = require('component/assert');

/**
 * Expose `Initializer`.
 */

module.exports = Plugin;

/**
 * 檢查傳入物件是否是一個 plugin
 *
 * @param {Mix} plugin
 * @api public
 */

function Plugin(plugin) {
  assert(typeof plugin.init === 'function', error(plugin));
}

/**
 * 產生 error message
 *
 * @param {Mix} plugin
 * @return {String}
 * @api private
 */

function error(plugin) {
  return String(plugin) + ' is not a Plugin';
}
