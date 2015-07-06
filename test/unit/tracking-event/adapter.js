'use strict';

var proto = Adapter.prototype;

module.exports = Adapter;

function Adapter() {
  if (!(this instanceof Adapter)) {
    return new Adapter();
  }
  this.called = [];
}

proto.preventDefault = function () {
  this.called.push({
    method: 'preventDefault',
    args: arguments
  });
};

proto.finish = function () {
  this.called.push({
    method: 'finish',
    args: arguments
  });
};

proto.getReturnValue = function () {
  this.called.push({
    method: 'getReturnValue',
    args: arguments
  });
  return this._returnValue;
};

proto.setReturnValue = function (val) {
  this._returnValue = val;
};
