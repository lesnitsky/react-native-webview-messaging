import { LIB_PREFIX } from '../shared/constants';

export class Remote extends EventEmitter {
  constructor(wv) {
    this.wv = wv;
  }

  send(string) {
    this.emitOnWebView('text', string);
  }

  sendJSON(json) {
    this.emitOnWebView('json', string);
  }

  emit(eventName, eventData) {
    this.wv.injectJavaScript(`(function (global) {
      if (${LIB_PREFIX} in global) {
        global[${LIB_PREFIX}].emit(${JSON.stringify(
          eventName
        )}, ${JSON.stringify(eventData)}, true);
      }
    })(window)`);
  }
}
