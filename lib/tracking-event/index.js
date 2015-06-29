'use strict';

/**
 * Module dependencies.
 */

var adapters = require('./adapters');

/**
 * Global variables.
 */

var proto = TrackingEvent.prototype;
var slice = Array.prototype.slice;

/**
 * Expose `TrackingEvent`.
 */

module.exports = TrackingEvent;

/**
 * 建立 TrackingEvent
 *
 * @param {String} eventType
 * @param {String} targetType
 * @param {Array} args
 */

function TrackingEvent(eventType, targetType, args) {
  if (!(this instanceof TrackingEvent)) {
    return new TrackingEvent(eventType, targetType, args);
  }
  this.args = slice.call(args);
  this.adapter = createAdapter(targetType, args);
  this.fullType = eventType;
  this.value = null;
}

/**
 * 取得 `.fullType` 第一個 `:` 後的名稱。
 * 假設 ``.fullType` 是 'ec:addProduct'，那 `.getType()` 會回傳 `'addProduct'`
 *
 * @return {String}
 * @api public
 */

proto.getType = function () {
  return this.fullType
    .split(':')
    .slice(1)
    .join(':')
    || this.fullType;
};

/**
 * 取得 `.fullType` 第一個 `:` 前的名稱。
 * 假設 ``.fullType` 是 'ec:addProduct'，那 `.getCategory()` 會回傳 `'ec'`
 *
 * @return {String}
 * @api public
 */

proto.getCategory = function () {
  return this.fullType
    .split(':')
    .shift()
    || null;
};

/**
 * 讓瀏覽器不要執行預設動作
 */

proto.preventDefault = function () {
  this.adapter.preventDefault();
  return this;
};

proto.finish = function () {
  return this.adapter.finish();
};

function createAdapter(type, args) {
  var Adapter = adapters[type]
    || adapters.default;
  return Adapter.apply(null, args);
}
