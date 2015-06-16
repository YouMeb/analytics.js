'use strict';

var assert = require('component/assert');

module.exports = Plugin;

function Plugin(plugin) {
  assert(plugin.init, error(plugin));
}

function error(plugin) {
  return String(plugin) + ' is not a Plugin';
}
