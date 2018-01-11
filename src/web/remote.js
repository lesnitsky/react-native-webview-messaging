import EventEmitter from 'events';
import { LIB_PREFIX } from '../shared/constants';

function stringify(type, payload, meta) {
  return LIB_PREFIX + JSON.stringify({
    type,
    payload,
    meta,
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
    if (fromRN) {
      super.emit(eventName, eventData);
      return;
    }

    window.postMessage(stringify('event', eventData, { eventName }));
  }
}
