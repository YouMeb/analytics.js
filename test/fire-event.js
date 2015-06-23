'use strict';

module.exports = function (el, eventType){
  if( document.createEvent ) {
    var event = document.createEvent('MouseEvents');
    event.initEvent(eventType, true, false);
    el.dispatchEvent(event);
  } else if(document.createEventObject) {
    var event = document.createEventObject();
    el.fireEvent('on' + eventType, event);
  }
};
