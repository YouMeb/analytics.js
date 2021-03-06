'use strict';

/**
 * Module dependencies.
 */

var bind = require('component/bind');
var utils = require('./utils');
var TrackingEvent = require('../tracking-event');
var ElementAdapter = require('./adapters/element');
var EmitterAdapter = require('./adapters/emitter');
var JQueryElementAdapter = require('./adapters/jquery-element');

/**
 * Global variables.
 */

var proto = EventBinder.prototype;

/**
 * Expose `EventBinder`.
 */

module.exports = EventBinder;

/**
 * 建立 EventBinder
 *
 * @param {Adapter} adapter
 */

function EventBinder(adapter) {
  if (!(this instanceof EventBinder)) {
    return new EventBinder(adapter);
  }
  this.adapter = adapter;
}

/**
 * 建立 EventBinder
 *
 * @param {Element|jQuery|EventEmitter} target
 * @return {EventBinder}
 */

EventBinder.create = function (target) {
  var adapter = createAdapter(target);
  return EventBinder(adapter);
};

/**
 * 讓外部的 event handler 可直接拿到 TrackingEvent，而不是原始的 DOM Event 或其他資料
 *
 * @param {String} analyticsEvent
 * @param {Function} fn
 * @api private
 */

proto.wrapEventHandler = function (analyticsEvent, fn) {
  var type = this.adapter.type;
  return function () {
    var event = TrackingEvent.create(analyticsEvent, type, arguments);
    fn(event);
    event.finish();
    return event.getReturnValue();
  };
};

/**
 * 綁定事件
 *
 * @param {String} event
 * @param {String} analyticsEvent
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

proto.bind = function (event, analyticsEvent, fn) {
  if (typeof analyticsEvent === 'function') {
    fn = analyticsEvent;
    analyticsEvent = null;
  }

  analyticsEvent || (analyticsEvent = event);
  fn = this.wrapEventHandler(analyticsEvent, fn);

  this.adapter.bind(event, fn);

  return fn;
};

/**
 * 綁定事件，第一次觸發後解除綁定
 *
 * @param {String} event
 * @param {String} analyticsEvent
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

proto.bindOnce = function (event, analyticsEvent, fn) {
  if (typeof analyticsEvent === 'function') {
    fn = analyticsEvent;
    analyticsEvent = null;
  }

  analyticsEvent || (analyticsEvent = event);

  var wrapper = this.wrapEventHandler(analyticsEvent, bind(this, function () {
    this.unbind(event, wrapper);
    fn.apply(null, arguments);
  }));

  this.adapter.bind(event, wrapper);

  return wrapper;
};

/**
 * 解除綁定事件。`bind`、`bindOnce` 會回傳新 `function`，`unbind` 的時候需要使用這個新 `function`。
 *
 *     var handler = binder.bind('test', function () {
 *       // ...
 *     });
 *
 *     binder.unbind('test', handler);
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.unbind = function (event, fn) {
  this.adapter.unbind(event, fn);
  return this;
};

/**
 * 建立 adapter
 *
 * @param {Mix} target
 * @return {Adapter}
 * @api private
 */

function createAdapter(target) {
  var adapter = createElementAdapter(target)
    || createJQueryElementAdapter(target)
    || createEmitterAdapter(target);

  if (!adapter) {
    throw new Error('Unsupported type: ' + String(target));
  }

  return adapter;
}

/**
 * 建立 ElementAdapter
 *
 * @return {ElementAdapter}
 * @api private
 */

function createElementAdapter(el) {
  if (utils.isElement(el)) {
    return ElementAdapter(el);
  }
}

/**
 * 建立 JQueryElementAdapter
 *
 * @return {JQueryElementAdapter}
 * @api private
 */

function createJQueryElementAdapter(el) {
  if (utils.isJQueryElement(el)) {
    return JQueryElementAdapter(el);
  }
}

/**
 * 建立 EmitterAdapter
 *
 * @return {EmitterAdapter}
 * @api private
 */

function createEmitterAdapter(emitter) {
  if (utils.isEmitter(emitter)) {
    return EmitterAdapter(emitter);
  }
}
