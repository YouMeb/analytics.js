'use strict';

var bind = require('component/bind');
var utils = require('./utils');
var TrackingEvent = require('../tracking-event');
var ElementAdapter = require('./adapters/element');
var EmitterAdapter = require('./adapters/emitter');
var JQueryElementAdapter = require('./adapters/jquery-element');
var proto = EventBinder.prototype;

module.exports = EventBinder;

function EventBinder(target) {
  if (!(this instanceof EventBinder)) {
    return new EventBinder(target);
  }
  this.adapter = createAdapter(target);
}

proto.wrapEventHandler = function (analyticsEvent, fn) {
  var type = this.adapter.type;
  return function () {
    var event = TrackingEvent(analyticsEvent, type, arguments);
    fn(event);
  };
};

proto.bind = function (event, analyticsEvent, fn) {
  if (typeof analyticsEvent === 'function') {
    analyticsEvent = fn;
    analyticsEvent = null;
  }

  analyticsEvent || (analyticsEvent = event);

  this.adapter.bind(event, this.wrapEventHandler(analyticsEvent, fn));

  return this;
};

proto.bindOnce = function (event, analyticsEvent, fn) {
  if (typeof analyticsEvent === 'function') {
    analyticsEvent = fn;
    analyticsEvent = null;
  }

  analyticsEvent || (analyticsEvent = event);

  var wrapper = this.wrapEventHandler(analyticsEvent, bind(this, function () {
    this.unbind(event, wrapper);
    fn.apply(null, arguments);
  }));

  this.adapter.bind(event, wrapper);

  return this;
};

proto.unbind = function (event, fn) {
  this.adapter.unbind(event, fn);
  return this;
};

function createAdapter(target) {
  var adapter = createElementAdapter(target)
    || createJQueryElementAdapter(target)
    || createEmitterAdapter(target);

  if (!adapter) {
    throw new Error('Unsupported type: ' + String(target));
  }

  return adapter;
}

function createElementAdapter(el) {
  if (utils.isElement(el)) {
    return ElementAdapter(el);
  }
}

function createJQueryElementAdapter(el) {
  if (utils.isJQueryElement(el)) {
    return JQueryElementAdapter(el);
  }
}

function createEmitterAdapter(emitter) {
  if (utils.isEmitter(emitter)) {
    return EmitterAdapter(emitter);
  }
}
