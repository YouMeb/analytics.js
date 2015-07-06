'use strict';

var fireEvent = require('../../../fire-event');
var ElementAdapter = require('../../../../lib/event-binder/adapters/element');

describe('ElementAdapter', function () {
  var container = document.createElement('div');

  before(function () {
    document.body.appendChild(container);
  });

  after(function () {
    document.body.removeChild(container);
  });

  describe('#bind', function () {
    it('should add a listener to dom element for the event', function (cb) {
      var el = document.createElement('div');
      var adapter = ElementAdapter(el);
      container.appendChild(el);
      adapter.bind('click', function () {
        cb();
      });
      fireEvent(el, 'click');
    });

    it('should remove a listener to dom element for the event', function (cb) {
      var el = document.createElement('div');
      var adapter = ElementAdapter(el);
      container.appendChild(el);
      var listener = function () {
        cb(new Error('Event listener should not be executed'));
      };
      adapter.bind('click', listener);
      adapter.unbind('click', listener);
      fireEvent(el, 'click');
      setTimeout(function () {
        cb();
      }, 500);
    });
  });
});
