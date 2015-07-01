'use strict';

var CookieAdapter = require('./adapters/cookie');
var LocalStorageAdapter = require('./adapters/local-storage');
var Storage = require('./storage');
var StorageSyncer = require('./');

module.exports = function () {
  return StorageSyncer()
    .registerStorage(Storage(CookieAdapter()))
    .registerStorage(Storage(LocalStorageAdapter()));
};
