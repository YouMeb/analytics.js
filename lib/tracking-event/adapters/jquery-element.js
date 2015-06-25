'use strict';

var proto = JQueryElementAdapter.prototype;

module.exports = JQueryElementAdapter;

function JQueryElementAdapter() {
  if (!(this instanceof JQueryElementAdapter)) {
    return new JQueryElementAdapter();
  }
  this.default = true;
}

proto.preventDefault = function () {
  this.default = false;
};

proto.finish = function () {
  // do nothing
};

proto.getReturnValue = function () {
  return this.default
    ? undefined
    : false;
};
