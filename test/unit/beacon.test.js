'use strict';

var each = require('component/each');
var Beacon = require('../../lib/beacon');

describe('Beacon', function () {
  describe('#getURL', function () {
    it('should get endpoint', function () {
      var endpoint = 'http://localhost';
      var url = Beacon()
        .endpoint(endpoint)
        .getURL();
      expect(url).to.equal(endpoint);
    });

    it('should get a url with query string', function () {
      var endpoint = 'http://localhost';
      var url = Beacon()
        .endpoint(endpoint)
        .set('a', 'b')
        .set('c', 'd')
        .set('e', [ 'f', 'g' ])
        .getURL();
      var query = extractQuery(url);
      expect(query).to.eql({
        a: 's%3Ab',
        c: 's%3Ad',
        e: 'j%3A%5B%22f%22%2C%22g%22%5D'
      });
    });

    it('should get a url without empty parameter', function () {
      var endpoint = 'http://localhost';
      var url = Beacon()
        .endpoint(endpoint)
        .set('a', undefined)
        .getURL();
      var query = extractQuery(url);
      expect(query).to.eql({});
    });
  });

  describe('#get', function () {
    it('should get an empty parameter', function () {
      expect(Beacon().get('test')).to.be.undefined;
    });

    it('should get an exist parameter', function () {
      var val = Beacon()
        .set('a', 'b')
        .get('a');
      expect(val).to.equal('b');
    });
  });

  describe('#set', function () {
    it('should be able to set a parameter', function () {
      var val = Beacon()
        .set('a', 'b')
        .get('a');
      expect(val).to.equal('b');
    });
  });
});

function extractQuery(url) {
  var query = {};
  var a = document.createElement('a');
  a.href = url;
  var parts = a.search.substr(1).split('&');
  each(parts, function (keyval) {
    if (keyval) {
      var parsed = keyval.split('=');
      var key = parsed.shift();
      var val = parsed.join('=');
      query[key] = val;
    }
  });
  return query;
}
