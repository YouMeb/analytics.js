'use strict';

var proto = JQueryElementAdapter.prototype;

module.exports = JQueryElementAdapter;

function JQueryElementAdapter(el) {
  if (!(this instanceof JQueryElementAdapter)) {
    return new JQueryElementAdapter(el);
  }
  this.el = el;
}

proto.type = 'jquery-element';

proto.bind = function (event, fn) {
  this.el.on(event, fn);
};

proto.unbind = function (event, fn) {
  this.el.off(event, fn);
};
