'use strict';

var assert = require('component/assert');
var Emitter = require('component/emitter');
var debug = require('visionmedia/debug')('analytics.js:Analytics');
var User = require('./user');
var Beacon = require('./beacon');
var Plugin = require('./plugin');
var Initializer = require('./initializer');
var TrackEventTarget = require('./track-event-target');
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

proto.use = function (plugin) {
  assert(!this._ready);
  Plugin(plugin);
  debug('use %s', plugin.name);
  this.plugins.push(plugin);
  return this;
};

proto.track = function (event, value, cb) {
  debug('track %s', event);

  this.emit('track', event, value);
  this.emit('track:' + event, value);

  Beacon()
    .endpoint(this.endpoint())
    .set('user', this.user.toString())
    .set('event', event)
    .set('data', value)
    .send(cb);

  return this;
};

proto.trackEvent = function (event, target, targetEvent, valueGatter, cb) {
  target = TrackEventTarget(target, targetEvent, valueGatter);
  target.on('data', function (data) {
    this.track(event, data, cb);
  }.bind(this));
  return this;
};

proto.trackLink = function (event, links) {
  if (links && typeof links.length !== 'number') {
    links = [links];
  }

  var getter = function (e) {
    e.preventDefault();
    return {
      href: e.target.getAttribute('href'),
      title: e.target.getAttribute('title')
    };
  };

  var redirect = function (beacon) {
    var data = beacon.get('data');
    window.location.href = data.value.href;
  };

  (links || []).forEach(function (link) {
    this.trackEvent(event, link, 'click', getter, redirect);
  }.bind(this));

  return this;
};

proto.init = function (cb) {
  debug('init');
  Initializer(this).initAll(this.plugins, function () {
    this._ready = true;
    debug('ready');
    this.emit('ready');
    cb && cb();
  }.bind(this));
  return this;
};

proto.debug = function (enable) {
  require('visionmedia/debug').enable(enable ? 'analytics.js:*' : null);
  return this;
};

proto.ready = fucntion (fn) {
  if (this._ready) {
    fn();
  } else {
    this.on('ready', fn);
  }
  return this;
};