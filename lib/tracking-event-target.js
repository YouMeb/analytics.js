'use strict';

var bind = require('component/bind');
var Emitter = require('component/emitter');
var proto = TrackingEventTarget.prototype;

module.exports = TrackingEventTarget;

function TrackingEventTarget(target, event, valueGetter) {
  if (!(this instanceof TrackingEventTarget)) {
    return new TrackingEventTarget(target, event, valueGetter);
  }
  this.event = event;
  this.valueGetter = valueGetter || defaultValueGetter;
  this.callback = bind(this, this.callback);
  delegate(this, target);
}

Emitter(proto);

proto.callback = function () {
  var value = this.valueGetter.apply(this, arguments);
  this.emit('data', {
    event: this.event,
    value: value
  });
};

function delegate(trackEventTarget, target) {
  return delegateElement(trackEventTarget, target)
    || delegateEmitter(trackEventTarget, target);
}

function delegateElement(trackEventTarget, el) {
  if (isElement(el)) {
    el.addEventListener(trackEventTarget.event, trackEventTarget.callback);
    return true;
  }
}

function delegateEmitter(trackEventTarget, emitter) {
  if (isEmitter(emitter)) {
    emitter.on(trackEventTarget.event, trackEventTarget.callback);
    return true;
  }
}

function isElement(el) {
  return el instanceof Element;
}

function isEmitter(emitter) {
  return emitter
    && emitter.on
    && emitter.off
    && emitter.once;
}

function defaultValueGetter() {
  return arguments;
}
