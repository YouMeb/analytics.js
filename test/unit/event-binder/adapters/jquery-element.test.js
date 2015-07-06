'use strict';

var fireEvent = require('../../../fire-event');
var JQueryElementAdapter = require('../../../../lib/event-binder/adapters/jquery-element');

describe('JQueryElementAdapter', function () {
  describe('#bind', function () {
    it('should add a listener to jquery element for the event', function (cb) {
      var el = $('<div>');
      var adapter = JQueryElementAdapter(el);
      adapter.bind('click', function () {
        cb();
      });
      el.trigger('click');
    });

    it('should remove a listener to jquery element for the event', function (cb) {
      var el = $('<div>');
      var adapter = JQueryElementAdapter(el);
      var listener = function () {
        cb(new Error('Event listener should not be executed'));
      };
      adapter.bind('click', listener);
      adapter.unbind('click', listener);
      el.trigger('click');
      setTimeout(cb, 500);
    });
  });
});
