import EventEmitter from 'events';
import { LIB_PREFIX, LIB_READY_KEY, Events } from '../shared/constants';

export class Remote extends EventEmitter {
  constructor(wv) {
    super();
    this.wv = wv;

    this.ready = new Promise(resolve => {
      this.once(Events.READY, () => {
        resolve(this);
      });
    });
  }

  send(string, fromWebview) {
    this.emit('text', string, fromWebview);
  }

  sendJSON(json, fromWebview) {
    this.emit('json', json, fromWebview);
  }

  emit(eventName, eventData, fromWebview) {
    if (fromWebview) {
      super.emit(eventName, eventData);
    } else {
      this.wv.injectJavaScript(`(function (global) {
        var LIB_PREFIX = ${JSON.stringify(LIB_PREFIX)};
        var LIB_READY_KEY = ${JSON.stringify(LIB_READY_KEY)};
        var eventName = ${JSON.stringify(eventName)};
        var eventData = ${JSON.stringify(eventData)};
        var READY_EVENT = ${JSON.stringify(Events.READY)};

        if (LIB_PREFIX in global) {
          global[LIB_PREFIX].emit(eventName, eventData, true);
        } else if (eventName === READY_EVENT) {
          global[LIB_READY_KEY] = true;
        }
      })(window)`);
    }
  }
}
