'use strict';

var proto = EmitterAdapter.prototype;

module.exports = EmitterAdapter;

function EmitterAdapter(emitter) {
  if (!(this instanceof EmitterAdapter)) {
    return new EmitterAdapter(emitter);
  }
  this.emitter = emitter;
}

proto.type = 'emitter';

proto.bind = function (event, fn) {
  this.emitter.on(event, fn);
};

proto.unbind = function (event, fn) {
  this.emitter.off(event, fn);
};
