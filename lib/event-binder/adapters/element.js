'use strict';

var bindEvent = require('component/event').bind;
var unbindEvent = require('component/event').unbind;
var proto = ElementAdapter.prototype;

module.exports = ElementAdapter;

function ElementAdapter(el) {
  if (!(this instanceof ElementAdapter)) {
    return new ElementAdapter(el);
  }
  this.el = el;
}

proto.type = 'element';

proto.bind = function (event, fn) {
  bindEvent(this.el, event, fn);
};

proto.unbind = function (event, fn) {
  unbindEvent(this.el, event, fn);
};
