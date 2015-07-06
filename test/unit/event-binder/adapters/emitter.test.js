'use strict';

var Emitter = require('component/emitter');
var fireEvent = require('../../../fire-event');
var EmitterAdapter = require('../../../../lib/event-binder/adapters/emitter');

describe('EmitterAdapter', function () {
  describe('#bind', function () {
    it('should add a handler to emitter for the event', function (cb) {
      var emitter = Emitter({});
      var adapter = EmitterAdapter(emitter);
      adapter.bind('test', function () {
        cb();
      });
      emitter.emit('test');
    });

    it('should remove a listener to dom element for the event', function (cb) {
      var emitter = Emitter({});
      var adapter = EmitterAdapter(emitter);
      var handler = function () {
        cb(new Error('Event listener should not be executed'));
      };
      adapter.bind('test', handler);
      adapter.unbind('test', handler);
      emitter.emit('test');
      setTimeout(function () {
        cb();
      }, 500);
    });
  });
});
