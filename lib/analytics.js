'use strict';

/**
 * Module dependencies.
 */

var bind = require('component/bind');
var each = require('component/each');
var assert = require('component/assert');
var Emitter = require('component/emitter');
var debug = require('visionmedia/debug')('analytics.js:Analytics');
var User = require('./user');
var Beacon = require('./beacon');
var Plugin = require('./plugin');
var plugins = require('./plugins');
var Initializer = require('./initializer');
var EventBinder = require('./event-binder');
var TrackingEvent = require('./tracking-event');

/**
 * Global variables.
 */

var proto = Analytics.prototype;

/**
 * Expose `Analytics`.
 */

module.exports = Analytics;

/**
 * 建立 Analytics
 *
 * 設定選項：
 *
 * - `site`: 必填，site id
 * - `endpoint`: 預設是 `http://webtracking.urad.com.tw`
 *
 * @param {Object} options
 */

function Analytics(options) {
  if (!(this instanceof Analytics)) {
    return new Analytics(options);
  }
  this._ready = false;
  this._waiting = [];
  this.plugins = [];
  this.options = options || {};
  assert(this.site(), '`site` is a required option.');
  this.user = User(options);
  this.debug(this.get('debug'));
}

Emitter(proto);

/**
 * 取得 site id
 *
 * @return {String}
 * @api public
 */

proto.site = function () {
  var site = this.get('site')
    || this.get('siteID')
    || null;
  return site && String(site);
};

/**
 * 取得一個網址，追蹤資料將會被傳送到那邊
 *
 * @return {String}
 * @api public
 */

proto.endpoint = function () {
  return this.get('endpoint')
    || 'http://webtracking.urad.com.tw';
};

/**
 * 取得設定資料
 *
 * @param {String} key
 * @return {Mix}
 * @api private
 */

proto.get = function (key) {
  return this.options[key];
};

/**
 * 使用 plugin
 *
 * @param {Plugin|String} plugin 可以是一個 plugin 物件或內建 plugin 名稱
 * @api public
 */

proto.use = function (plugin, options) {
  if (typeof plugin === 'string') {
    assert(plugins[plugin], 'plugin not found: ' + plugin);
    plugin = plugins[plugin](options);
  }
  assert(!this._ready);
  Plugin(plugin);
  debug('use %s', plugin.name);
  this.plugins.push(plugin);
  return this;
};

/**
 * 傳送追蹤事件/資料
 *
 * @param {String} event
 * @param {Mix} value
 * @param {Function} cb 可選的 callback function
 * @api public
 */

proto.track = function (event, value, cb) {
  if (!this._ready) {
    this._waiting.push(arguments);
    return this;
  }

  if (typeof value === 'function') {
    cb = value;
    value = null;
  }

  if (!(event instanceof TrackingEvent)) {
    event = TrackingEvent(event, null, []);
    event.value = value;
  }

  debug('track %s', event.fullType);

  this.emit('track', event);
  this.emit('track:' + event.fullType, event);

  Beacon()
    .endpoint(this.endpoint())
    .set('site', this.site())
    .set('fingerprint', this.user.getFingerprint())
    .set('sid', this.user.getSiteUID())
    .set('tid', this.user.getTrackingUID())
    .set('cid', this.user.getCookieUID())
    .set('event', event.fullType)
    .set('data', event.value)
    .send(cb);

  return this;
};

/**
 * 追蹤事件
 *
 * @param {String} analyticsEvent 追蹤用的事件名稱
 * @param {HTMLElement|jQuery|EventEmitter} target
 * @param {String} targetEvent target 指派的事件名稱
 * @param {Function} cb 可選的 callback function
 * @api public
 */

proto.trackEvent = function (analyticsEvent, target, targetEvent, valueGatter, cb) {
  var eventBinder = EventBinder(target);
  var track = bind(this, 'track');

  eventBinder.bind(targetEvent, analyticsEvent, function (event) {
    event.value = valueGatter
      ? valueGatter(event)
      : event.args;
    track(event, cb);
  });

  return this;
};

/**
 * 追蹤連結點擊事件，helper function
 *
 * @param {String} analyticsEvent 追蹤用的事件名稱
 * @param {HTMLElement|HTMLCollection}
 * @api public
 */

proto.trackLink = function (analyticsEvent, links) {
  if (links && typeof links.length !== 'number') {
    links = [links];
  }

  var getter = function (event) {
    var domEvent = event.args[0];
    var el = domEvent.srcElement
      || domEvent.currentTarget;
    event.preventDefault();
    return {
      href: el.getAttribute('href') || '',
      title: el.getAttribute('title') || ''
    };
  };

  var redirect = function (beacon) {
    var data = beacon.get('data');
    data.href && (window.location.href = data.href);
  };

  each(links || [], bind(this, function (link) {
    this.trackEvent(analyticsEvent, link, 'click', getter, redirect);
  }));

  return this;
};

/**
 * 追蹤 pageview 事件，helper function
 *
 * @param {String} pageName
 * @param {Function} cb 可選的 callback function
 * @api public
 */

proto.page = function (pageName, cb) {
  this.track('pageview', {
    page: pageName,
    referrer: document.referrer || null,
    title: document.title,
    url: window.location.href
  }, cb);
  return this;
};

/**
 * 初始化所有 plugin
 *
 * @param {Function} cb 可選的 callback function
 * @api public
 */

proto.init = function (cb) {
  debug('init');
  Initializer(this).initAll(this.plugins, bind(this, function () {
    each(this._waiting, bind(this, function (args) {
      this.track.apply(this, args);
    }));
    this._waiting = [];
    this._ready = true;
    debug('ready');
    this.emit('ready');
    cb && cb();
  }));
  return this;
};

/**
 * 啟用/停用 debug 工具
 *
 * @param {Boolean} enable
 * @api public
 */

proto.debug = function (enable) {
  require('visionmedia/debug').enable(enable ? 'analytics.js:*' : null);
  return this;
};

/**
 * 等待 plugin 初始化完成後的 ready 事件
 *
 * @param {Function} fn
 * @api public
 */

proto.ready = function (fn) {
  if (this._ready) {
    fn();
  } else {
    this.on('ready', fn);
  }
  return this;
};
