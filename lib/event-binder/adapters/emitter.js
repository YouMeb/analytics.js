'use strict';

/**
 * Global variables.
 */

var proto = EmitterAdapter.prototype;

/**
 * Expose `EmitterAdapter`.
 */

module.exports = EmitterAdapter;

/**
 * 建立 EmitterAdapter
 *
 * @param {EventEmitter} emitter
 */

function EmitterAdapter(emitter) {
  if (!(this instanceof EmitterAdapter)) {
    return new EmitterAdapter(emitter);
  }
  this.emitter = emitter;
}

proto.type = 'emitter';

/**
 * 綁定事件
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.bind = function (event, fn) {
  this.emitter.on(event, fn);
};

/**
 * 解除事件綁定
 *
 * @param {String} event
 * @param {Function} fn
 * @api public
 */

proto.unbind = function (event, fn) {
  this.emitter.off(event, fn);
};
