'use strict';

var fireEvent = require('../../../fire-event');
var ElementAdapter = require('../../../../lib/event-binder/adapters/element');

describe('ElementAdapter', function () {
  describe('#bind', function () {
    it('should add a listener to dom element for the event', function (cb) {
      var el = document.createElement('div');
      var adapter = ElementAdapter(el);
      adapter.bind('click', function () {
        cb();
      });
      fireEvent(el, 'click');
    });

    it('should remove a listener to dom element for the event', function (cb) {
      var el = document.createElement('div');
      var adapter = ElementAdapter(el);
      var listener = function () {
        cb(new Error('Event listener should not be executed'));
      };
      adapter.bind('click', listener);
      adapter.unbind('click', listener);
      fireEvent(el, 'click');
      setTimeout(cb, 500);
    });
  });
});
