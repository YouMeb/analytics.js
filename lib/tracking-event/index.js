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
 * @param {Array} args
 * @param {Adapter} adapter
 */

function TrackingEvent(eventType, args, adapter) {
  if (!(this instanceof TrackingEvent)) {
    return new TrackingEvent(eventType, args, adapter);
  }
  this.args = slice.call(args);
  this.adapter = adapter;
  this.fullType = eventType;
  this.value = null;
}

/**
 * 建立 TrackingEvent
 *
 * @param {String} eventType
 * @param {String} targetType
 * @param {Array} args
 * @return {TrackingEvent}
 * @api public
 */

TrackingEvent.create = function (eventType, targetType, args) {
  var adapter = createAdapter(targetType, args);
  return TrackingEvent(eventType, args, adapter);
};

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
 *
 * @api public
 */

proto.preventDefault = function () {
  this.adapter.preventDefault();
  return this;
};

/**
 * event handler 完後執行
 *
 * @api public
 */

proto.finish = function () {
  return this.adapter.finish();
};

/**
 * 取得 event handler 的回傳資料
 *
 * @return {Mix}
 * @api public
 */

proto.getReturnValue = function () {
  return this.adapter.getReturnValue();
};

/**
 * 建立 adapter
 *
 * @param {String} type
 * @param {Array} args
 * @return {Adapter}
 * @api private
 */

function createAdapter(type, args) {
  var Adapter = adapters[type]
    || adapters.default_;
  return Adapter.apply(null, args);
}
