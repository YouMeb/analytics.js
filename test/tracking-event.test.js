'use strict';

var TrackingEvent = require('../lib/tracking-event');

describe('TrackingEvent', function () {
  describe('with category', function () {
    describe('#getType', function () {
      it('should get a substring of `.fulltype` after the first occurrence of a colon', function () {
        var event = TrackingEvent('ec:product:add');
        expect(event.getType()).to.equal('product:add');
      });
    });

    describe('#getCategory', function () {
      it('should get a substring of `.fulltype` before the first occurrence of a colon', function () {
        var event = TrackingEvent('ec:product:add');
        expect(event.getCategory()).to.equal('ec');
      });
    });
  });

  describe('without category', function () {
    describe('#getType', function () {
      it('should get `.fulltype`', function () {
        var event = TrackingEvent('test');
        expect(event.getType()).to.equal('test');
      });
    });
  });
});
