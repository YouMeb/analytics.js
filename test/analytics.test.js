'use strict';

var Emitter = require('component/emitter');
var fireEvent = require('./fire-event');
var Analytics = require('../lib/analytics');
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
      analytics.on('track', function () {
        cb();
      });
      analytics.track('test', 'test');
    });

    it('should emit `track:[event type]` event', function (cb) {
      var analytics = Analytics(options);
      analytics.on('track:test', function () {
        cb();
      });
      analytics.track('test', 'test');
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
        a.parentElement.removeChild(a);
      });

      it('should work', function (cb) {
        var analytics = Analytics(options);
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
        a.parentElement.removeChild(a);
      });

      it('should work', function (cb) {
        var analytics = Analytics(options);
        analytics.trackLink('test', a);
        analytics.on('track:test', function () {
          cb();
        });
        fireEvent(a, 'click');
      });

      it('should pass extra information of element to event handler', function (cb) {
        var analytics = Analytics(options);
        analytics.trackLink('test', a);
        analytics.on('track:test', function (event) {
          var err;
          try {
            expect(event.value).to.eql({
              href: null,
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
        container.parentElement.removeChild(container);
      });

      it('should work', function (cb) {
        var counter = 0;
        var analytics = Analytics(options);
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
});
