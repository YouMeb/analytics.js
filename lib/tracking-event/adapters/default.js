'use strict';

var proto = DefaultAdapter.prototype;

module.exports = DefaultAdapter;

function DefaultAdapter() {
  if (!(this instanceof DefaultAdapter)) {
    return new DefaultAdapter();
  }
}

proto.preventDefault = function () {};
proto.finish = function () {};
proto.getReturnValue = function () {};
