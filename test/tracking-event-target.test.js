'use strict';

var Emitter = require('component/emitter');
var TrackingEventTarget = require('../lib/tracking-event-target');

describe('TrackingEventTarget', function () {
  describe('with Element', function () {
    var a;

    before(function () {
      a = document.createElement('a');
      document.body.appendChild(a);
    });

    after(function () {
      a.parentElement.removeChild(a);
    });

    it('should emit `data` event', function (cb) {
      var target = TrackingEventTarget(a, 'click');
      target.once('data', function () {
        cb();
      });
      fireEvent(a, 'click');
    });
  });

  describe('with EventEmitter', function () {
    it('should emit `data` event', function (cb) {
      var emitter = Emitter({});
      var target = TrackingEventTarget(emitter, 'test');
      target.once('data', function () {
        cb();
      });
      emitter.emit('test');
    });
  });
});

function fireEvent(el, eventType){
  if( document.createEvent ) {
    var event = document.createEvent('MouseEvents');
    event.initEvent(eventType, true, false);
    el.dispatchEvent(event);
  } else if(document.createEventObject) {
    var event = document.createEventObject();
    el.fireEvent('on' + eventType, event);
  }
}
