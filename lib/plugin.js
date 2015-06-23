'use strict';

var assert = require('component/assert');

module.exports = Plugin;

function Plugin(plugin) {
  assert(typeof plugin.init === 'function', error(plugin));
}

function error(plugin) {
  return String(plugin) + ' is not a Plugin';
}
