'use strict';

var proto = ElementAdapter.prototype;

module.exports = ElementAdapter;

function ElementAdapter(event) {
  if (!(this instanceof ElementAdapter)) {
    return new ElementAdapter(event);
  }
  this.default = true;
  this.event = event;
}

proto.preventDefault = function () {
  this.default = false;
};

proto.finish = function () {
  if (!this.default) {
    this.default = false;
    this.event.preventDefault();
  }
};

proto.getReturnValue = function () {
  return this.default
    ? undefined
    : false;
};
