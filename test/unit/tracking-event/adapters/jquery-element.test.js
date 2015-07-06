'use strict';

var JQueryElementAdapter = require('../../../../lib/tracking-event/adapters/element');

describe('JQueryElementAdapter', function () {
  describe('when browser default behavior is prevented', function () {
    describe('#getReturnValue', function () {
      it('should get `false`', function () {
        var adapter = JQueryElementAdapter();
        adapter.preventDefault();
        expect(adapter.getReturnValue()).to.equal(false);
      });
    });
  });
});
