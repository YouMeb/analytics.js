'use strict';

var assert = require('component/assert');
var User = require('./user');
var Beacon = require('./beacon');
var TrackEventTarget = require('./track-event-target');
var proto = Analytics.prototype;

module.exports = Analytics;

function Analytics(options) {
  if (!(this instanceof Analytics)) {
    return new Analytics(options);
  }
  this.options = options || {};
  assert(this.site(), '`site` is a required option.');
  this.user = User(options);
}

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

proto.track = function (event, value, cb) {
  Beacon()
    .endpoint(this.endpoint())
    .set('user', this.user.toString())
    .set('event', event)
    .set('data', value)
    .send(cb);
  return this;
}

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
