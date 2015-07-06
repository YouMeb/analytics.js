'use strict';

var ElementAdapter = require('../../../../lib/tracking-event/adapters/element');

describe('ElementAdapter', function () {
  describe('when browser default behavior is prevented', function () {
    describe('#getReturnValue', function () {
      it('should get `false`', function () {
        var event = EventMock();
        var adapter = ElementAdapter(event);
        adapter.preventDefault();
        expect(adapter.getReturnValue()).to.equal(false);
      });
    });

    describe('#finish', function () {
      it('should call `preventDefault` method of dom event', function () {
        var event = EventMock();
        var adapter = ElementAdapter(event);
        adapter.preventDefault();
        adapter.finish();
        expect(event.called).to.have.length(1);
        expect(event.called[0]).to.equal('preventDefault');
      });
    });
  });
});

function EventMock() {
  var called = [];
  return {
    called: called,
    preventDefault: function () {
      called.push('preventDefault');
    }
  };
}
