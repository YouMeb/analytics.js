'use strict';

var each = require('component/each');
var Emitter = require('component/emitter');
var fireEvent = require('../fire-event');
var Analytics = require('../../lib/analytics');
var options = {
  site: 'test',
  endpoint: 'http://localhost:3333'
};

describe('Analytics', function () {
  describe('#use', function () {
    describe('a object', function () {
      describe('without `init` property', function () {
        it('should throw', function () {
          var analytics = Analytics(options);
          expect(function () {
            analytics.use({});
          }).to.throwError();
        });
      });

      describe('with a non-function value as `init` property value', function () {
        it('should throw', function () {
          var analytics = Analytics(options);
          expect(function () {
            analytics.use({ init: {} });
          }).to.throwError();
        });
      });

      describe('with a function as `init` property value', function () {
        it('should push the object to `.plugins` array', function () {
          var analytics = Analytics(options);
          analytics.use({ init: function () {} });
          expect(analytics.plugins).to.have.length(1);
        });
      });
    });
  });

  describe('#track', function () {
    it('should emit `track` event', function (cb) {
      var analytics = Analytics(options);
      analytics._ready = true;
      analytics.on('track', function () {
        cb();
      });
      analytics.track('test', 'test');
    });

    it('should emit `track:[event type]` event', function (cb) {
      var analytics = Analytics(options);
      analytics._ready = true;
      analytics.on('track:test', function () {
        cb();
      });
      analytics.track('test', 'test');
    });

    describe('when analytics is not initialized', function () {
      it('should not be executed', function (cb) {
        var analytics = Analytics(options);
        var executed = false;
        analytics.on('track:test', function () {
          executed = true;
        });
        analytics.track('test', 'test');
        setTimeout(function () {
          var err;
          try {
            expect(executed).to.equal(false);
          } catch (e) {
            err = e;
          }
          cb(err);
        }, 500);
      });
    });
  });

  describe('#trackEvent', function () {
    describe('with Element', function () {
      var a;

      before(function () {
        a = document.createElement('a');
        document.body.appendChild(a);
      });

      after(function () {
        document.body.removeChild(a);
      });

      it('should work', function (cb) {
        var analytics = Analytics(options);
        analytics._ready = true;
        analytics.on('track:test', function () {
          cb();
        });
        analytics.trackEvent('test', a, 'click');
        fireEvent(a, 'click');
      });
    });

    describe('with EventEmitter', function () {
      it('should work', function (cb) {
        var emitter = Emitter({});
        var analytics = Analytics(options);
        analytics._ready = true;
        analytics.on('track:test', function () {
          cb();
        });
        analytics.trackEvent('test', emitter, 'click');
        emitter.emit('click');
      });
    });
  });

  describe('#trackLink', function () {
    describe('with single element', function (cb) {
      var a;

      before(function () {
        a = document.createElement('a');
        a.title = 'Google';
        document.body.appendChild(a);
      });

      after(function () {
        document.body.removeChild(a);
      });

      it('should work', function (cb) {
        var analytics = Analytics(options);
        analytics._ready = true;
        analytics.trackLink('test', a);
        analytics.on('track:test', function () {
          cb();
        });
        fireEvent(a, 'click');
      });

      it('should pass extra information of element to event handler', function (cb) {
        var analytics = Analytics(options);
        analytics._ready = true;
        analytics.trackLink('test', a);
        analytics.on('track:test', function (event) {
          var err;
          try {
            expect(event.value).to.eql({
              href: '',
              title: 'Google'
            });
          } catch (e) {
            err = e;
          }
          cb(err);
        });
        fireEvent(a, 'click');
      });
    });

    describe('with element list', function () {
      var a, b;
      var container;

      before(function () {
        var prevent = function (e) {
          e.preventDefault();
          return false;
        };

        container = document.createElement('div');

        a = document.createElement('a');
        a.title = 'Google';
        container.appendChild(a);

        b = document.createElement('b');
        b.title = 'Yahoo';
        container.appendChild(b);

        document.body.appendChild(container);
      });

      after(function () {
        document.body.removeChild(container);
      });

      it('should work', function (cb) {
        var counter = 0;
        var analytics = Analytics(options);
        analytics._ready = true;
        analytics.trackLink('test', container.children);
        analytics.on('track:test', function () {
          if (++counter === 2) {
            cb();
          }
        });
        fireEvent(a, 'click');
        fireEvent(b, 'click');
      });
    });
  });

  describe('#ready', function () {
    it('should execute all tracking actions which are executed before analytics is ready', function (cb) {
      var err;
      var counter = 0;
      var analytics = Analytics(options);
      var values = [
        { a: 'b' },
        { c: 'd' }
      ];

      each(values, function (value, index) {
        value.index = index;
        analytics.track('test', value);
      });

      analytics.track = function (event, value) {
        counter++;
        try {
          expect(value).to.eql(values[value.index]);
        } catch (e) {
          err = e;
        }
      };

      analytics.ready(function () {
        setTimeout(function () {
          try {
            expect(counter).to.equal(2);
          } catch (e) {
            err = e;
          }
          cb(err);
        }, 100);
      });

      analytics.init();
    });
  });
});
