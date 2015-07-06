'use strict';

var Cookie = require('../../lib/cookie');

describe('Cookie', function () {
  beforeEach(function () {
    deleteAllCookies();
    if (window.localStorage) {
      localStorage.clear();
    }
  });

  describe('#set', function () {
    it('should set a cookie', function () {
      var cookie = Cookie();
      cookie.set('test', 'abc');
      expect(cookie.get('test')).to.equal('abc');
    });

    if (window.localStorage) {
      it('should set a localStorage item', function () {
        var cookie = Cookie();
        cookie.set('ls', 'abc');
        var item = localStorage.getItem('_urad');
        var data = JSON.parse(item);
        expect(data.ls).to.equal('abc');
      });
    }
  });

  describe('#get', function () {
    it('should get a empty cookie', function () {
      var cookie = Cookie();
      expect(cookie.get('test')).to.equal(undefined);
    });

    if (window.localStorage) {
      describe('when cookie is missing', function () {
        it('should restore cookie and return the value', function () {
          localStorage.setItem('_urad', JSON.stringify({
            a: 'b'
          }));
          var cookie = Cookie();
          expect(cookie.get('a')).to.equal('b');
          expect(document.cookie).to.equal('a=b');
        });
      });
    }
  });
});

function deleteAllCookies() {
  var i;
  var cookies = document.cookie.split(';');

  for (i = 0; i < cookies.length; i += 1) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
