'use strict';

var EventBinder = require('../../../lib/event-binder');
var Adapter = require('./adapter');

describe('EventBinder', function () {
  describe('#bind', function () {
    it('should add a handler for the event', function (cb) {
      var adapter = Adapter();
      var binder = EventBinder(adapter);
      binder.bind('test', function () {
        cb();
      });
      adapter.fire('test');
    });

    it('should add a handler for the event and change event name', function (cb) {
      var adapter = Adapter();
      var binder = EventBinder(adapter);
      binder.bind('test', 'test2', function (event) {
        var err;
        try {
          expect(event.fullType).to.equal('test2');
        } catch (e) {
          err = e;
        }
        cb(err);
      });
      adapter.fire('test');
    });
  });

  describe('#bindOnce', function () {
    it('should add a one time handler for the event', function () {
      var adapter = Adapter();
      var binder = EventBinder(adapter);
      var handler = binder.bindOnce('test', function () {});

      // bind
      expect(adapter.called).to.have.length(1);
      expect(adapter.called[0].method).to.equal('bind');
      expect(adapter.called[0].event).to.equal('test');

      // fire
      adapter.fire('test');

      // unbind
      expect(adapter.called).to.have.length(2);
      expect(adapter.called[1].method).to.equal('unbind');
      expect(adapter.called[1].event).to.equal('test');
      expect(adapter.called[1].fn).to.equal(handler);
    });
  });

  describe('#unbind', function () {
    it('should remove a handler for the event', function () {
      var adapter = Adapter();
      var binder = EventBinder(adapter);
      var handler = function () {};
      binder.bind('test', handler);
      binder.unbind('test', handler);
      expect(adapter.called).to.have.length(2);
      expect(adapter.called[1]).to.eql({
        method: 'unbind',
        event: 'test',
        fn: handler
      });
    });
  });
});
