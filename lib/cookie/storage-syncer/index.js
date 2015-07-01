'use strict';

/**
 * Module dependencies.
 */

var each = require('component/each');
var getKeys = require('YouMeb/object-keys');
var debug = require('visionmedia/debug')('analytics.js:Cookie:StorageSyncer');

/**
 * Global variables.
 */

var proto = StorageSyncer.prototype;

/**
 * Expose `StorageSyncer`.
 */

module.exports = StorageSyncer;

/**
 * 建立 StorageSyncer
 */

function StorageSyncer() {
  if (!(this instanceof StorageSyncer)) {
    return new StorageSyncer();
  }
  this.storages = {};
}

/**
 * 加入可使用的 storage
 *
 * @param {Storage} storage
 * @api public
 */

proto.registerStorage = function (storage) {
  if (storage.isSupported()) {
    debug('register ' + storage.getName());
    storage.init();
    this.storages[storage.getName()] = storage;
  }
  return this;
};

/**
 * 同步所有 storage 內特定欄位的資料
 *
 * @param {String} field
 * @param {String} mainStorageName
 * @api public
 */

proto.syncAll = function (field, mainStorageName) {
  var storages = this.storages;
  var mainAdapter = storages[mainStorageName] || storages.cookie;
  var value = mainAdapter.get(field);
  var keys = getKeys(storages);

  each(keys, function (key) {
    debug('sync ' + key);
    var adapter = storages[key];
    if (value) {
      adapter.set(field, value);
    } else {
      adapter.remove();
    }
  });
};

/**
 * 恢復特定欄位資料
 *
 * @param {String} field
 * @param {Sreing} mainStorageName
 * @api public
 */

proto.restore = function (field, mainStorageName) {
  var storages = this.storages;
  var keys = getKeys(storages);
  var mainAdapter = storages[mainStorageName] || storages.cookie;
  var value = mainAdapter.get(field);

  if (!value) {
    each(keys, function (key) {
      var adapter = storages[key];
      value = adapter.get(field) || value;
    });
  }

  debug('restore ' + value);
  mainAdapter.set(field, value);
};
