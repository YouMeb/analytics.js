'use strict';

var proto = TrackingEvent.prototype;

module.exports = TrackingEvent;

function TrackingEvent(fulltype, value) {
  if (!(this instanceof TrackingEvent)) {
    return new TrackingEvent(fulltype, value);
  }
  this.fulltype = fulltype;
  this.value = value;
}

proto.getType = function () {
  return this.fulltype
    .split(':')
    .slice(1)
    .join(':');
};

proto.getCategory = function () {
  return this.fulltype
    .split(':')
    .shift();
};
