import EventEmitter from 'events';
import { LIB_PREFIX } from '../shared/constants';

function stringify(type, payload){
  return LIB_PREFIX + JSON.stringify({
    type,
    payload
  })
}

export class Remote extends EventEmitter {
  sendJSON(json) {
    window.postMessage(stringify('json', json));
  }

  send(string) {
    window.postMessage(stringify('text', string));
  }

  emit(eventName, eventData, fromRN) {
    super.emit(eventName, eventData);

    if (fromRN) {
      return;
    }

    window.postMessage(stringify({
      type: 'event',
      meta: {
        eventName
      },
      payload: eventData
    }));
  }
}
