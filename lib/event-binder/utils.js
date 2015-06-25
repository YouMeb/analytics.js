'use strict';

exports.isElement = function (el) {
  return typeof el === 'object'
    // document.ELEMENT_NODE
    && el.nodeType === 1
    && typeof el.style === 'object'
    && typeof el.ownerDocument === 'object';
};

exports.isJQueryElement = function (el) {
  return window.jQuery
    && el instanceof window.jQuery;
};

exports.isEmitter = function (emitter) {
  return emitter
    && emitter.on
    && emitter.off
    && emitter.once;
};
