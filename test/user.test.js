'use strict';

var User = require('../lib/user');

describe('User', function () {
  describe('#getSiteUID', function () {
    it('should get website user id', function () {
      var user = User();
      user.setSiteUID('test');
      expect(user.getSiteUID()).to.equal('test');
    });
  });

  describe('#setSiteUID', function () {
    it('should set website user id', function () {
      var user = User();
      user.setSiteUID('test');
      expect(user.getSiteUID()).to.equal('test');
    });
  });

  describe('#getTrackingUID', function () {
    it('should get tracking user id', function () {
      var user = User();
      user.setTrackingUID('test');
      expect(user.getTrackingUID()).to.equal('test');
    });
  });

  describe('#setTrackingUID', function () {
    it('should set tracking user id', function () {
      var user = User();
      user.setTrackingUID('test');
      expect(user.getTrackingUID()).to.equal('test');
    });
  });

  describe('#getCookieUID', function () {
    it('should get cookie user id', function () {
      var user = User();
      user.setCookieUID('test');
      expect(user.getCookieUID()).to.equal('test');
    });
  });

  describe('#getCookieUID', function () {
    it('should set cookie user id', function () {
      var user = User();
      user.getCookieUID('test');
      expect(user.getCookieUID()).to.equal('test');
    });
  });

  describe('#toJSON', function () {
    it('should get user data without user ids', function () {
      var user = User();
      user.setSiteUID('test');
      user.setCookieUID('test');
      user.setTrackingUID('test');
      user.set('a', 'b');
      user.set('c', 'd');
      expect(user.toJSON()).to.eql({
        a: 'b',
        c: 'd'
      });
    });
  });
});
