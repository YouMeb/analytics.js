'use strict';

var User = require('../lib/user');

describe('User', function () {
  describe('with a function as siteUID', function () {
    describe('#siteUID', function () {
      it('should execute the function and get the result', function () {
        var user = User({
          siteUID: function () {
            return 'test';
          }
        });
        expect(user.getSiteUID()).to.equal('test');
      });
    });
  });

  describe('with siteUID', function () {
    describe('#siteUID', function () {
      it('should get the siteUID', function () {
        var user = User({
          siteUID: 'abc'
        });
        expect(user.getSiteUID()).to.equal('abc');
      });
    });
  });
});
