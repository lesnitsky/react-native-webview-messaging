import EventEmitter from 'events';
import { LIB_PREFIX } from '../shared/constants';

export class Remote extends EventEmitter {
  constructor(wv) {
    super();
    this.wv = wv;
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
        var LIB_READY_KEY = LIB_PREFIX + "RN_READY";

        if (LIB_PREFIX in global) {
          global[LIB_PREFIX].emit(${JSON.stringify(
            eventName
          )}, ${JSON.stringify(eventData)}, true);
        } else {
          global[LIB_PREFIX + "RN_READY"] = true;
        }
      })(window)`);
    }
  }
}
