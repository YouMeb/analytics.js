'use strict';

var Emitter = require('component/emitter');
var proto = Adapter.prototype;

module.exports = Adapter;

function Adapter() {
  if (!(this instanceof Adapter)) {
    return new Adapter();
  }
  this.called = [];
  this._emitter = Emitter({});
}

proto.type = 'mock';

proto.bind = function (event, fn) {
  this.called.push({
    method: 'bind',
    event: event,
    fn: fn
  });
  this._emitter.on(event, fn);
};

proto.unbind = function (event, fn) {
  this.called.push({
    method: 'unbind',
    event: event,
    fn: fn
  });
  this._emitter.off(event, fn);
};

proto.fire = function (event) {
  this._emitter.emit(event);
};
