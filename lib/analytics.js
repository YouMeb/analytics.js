'use strict';

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
var proto = Analytics.prototype;

module.exports = Analytics;

function Analytics(options) {
  if (!(this instanceof Analytics)) {
    return new Analytics(options);
  }
  this._ready = false;
  this.plugins = [];
  this.options = options || {};
  assert(this.site(), '`site` is a required option.');
  this.user = User(options);
  this.debug(this.get('debug'));
}

Emitter(proto);

proto.site = function () {
  return this.get('site')
    || this.get('siteID')
    || null;
};

proto.endpoint = function () {
  return this.get('endpoint')
    || 'http://webtracking.urad.com.tw';
};

proto.get = function (key) {
  return this.options[key];
};

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

proto.track = function (event, value, cb) {
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
    .set('user', this.user.toString())
    .set('event', event.fullType)
    .set('data', event.value)
    .send(cb);

  return this;
};

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

proto.trackLink = function (analyticsEvent, links) {
  if (links && typeof links.length !== 'number') {
    links = [links];
  }

  var getter = function (event) {
    var el = event.args[0].target;
    event.preventDefault();
    return {
      href: el.getAttribute('href'),
      title: el.getAttribute('title')
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

proto.page = function (pageName, cb) {
  this.track('pageview', {
    page: pageName,
    referrer: document.referrer || null,
    title: document.title,
    url: window.location.href
  }, cb);
  return this;
};

proto.init = function (cb) {
  debug('init');
  Initializer(this).initAll(this.plugins, bind(this, function () {
    this._ready = true;
    debug('ready');
    this.emit('ready');
    cb && cb();
  }));
  return this;
};

proto.debug = function (enable) {
  require('visionmedia/debug').enable(enable ? 'analytics.js:*' : null);
  return this;
};

proto.ready = function (fn) {
  if (this._ready) {
    fn();
  } else {
    this.on('ready', fn);
  }
  return this;
};
