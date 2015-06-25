'use strict';

var adapters = require('./adapters');
var proto = TrackingEvent.prototype;
var slice = Array.prototype.slice;

module.exports = TrackingEvent;

function TrackingEvent(eventType, targetType, args) {
  if (!(this instanceof TrackingEvent)) {
    return new TrackingEvent(eventType, targetType, args);
  }
  this.args = slice.call(args);
  this.adapter = createAdapter(targetType, args);
  this.fullType = eventType;
  this.value = null;
}

proto.getType = function () {
  return this.fullType
    .split(':')
    .slice(1)
    .join(':')
    || this.fullType;
};

proto.getCategory = function () {
  return this.fullType
    .split(':')
    .shift()
    || null;
};

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
