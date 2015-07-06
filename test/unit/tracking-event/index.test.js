'use strict';

var Adapter = require('./adapter');
var TrackingEvent = require('../../../lib/tracking-event');

describe('TrackingEvent', function () {
  describe('.fullType', function () {
    it('should exists', function () {
      var adapter = Adapter();
      var event = TrackingEvent('ec:addProduct', [], adapter);
      expect(event.fullType).to.equal('ec:addProduct');
    });
  });

  describe('#getType', function () {
    it('should get the characters of `.fullType` after the first colon', function () {
      var adapter = Adapter();
      var event = TrackingEvent('ec:addProduct', [], adapter);
      expect(event.getType()).to.equal('addProduct');
    });
  });

  describe('#getCategory', function () {
    it('should get the characters of `.fullType` before the first colon', function () {
      var adapter = Adapter();
      var event = TrackingEvent('ec:addProduct', [], adapter);
      expect(event.getCategory()).to.equal('ec');
    });
  });

  describe('#preventDefault()', function () {
    it('should work', function () {
      var adapter = Adapter();
      var event = TrackingEvent('ec:addProduct', [], adapter);
      event.preventDefault();
      expect(adapter.called).to.have.length(1);
      expect(adapter.called[0].method).to.equal('preventDefault');
    });
  });

  describe('#finish()', function () {
    it('should work', function () {
      var adapter = Adapter();
      var event = TrackingEvent('ec:addProduct', [], adapter);
      event.finish();
      expect(adapter.called).to.have.length(1);
      expect(adapter.called[0].method).to.equal('finish');
    });
  });

  describe('#getReturnValue()', function () {
    it('should work', function () {
      var adapter = Adapter();
      var event = TrackingEvent('ec:addProduct', [], adapter);
      adapter.setReturnValue(123);
      expect(event.getReturnValue()).to.equal(123);
    });
  });
});
