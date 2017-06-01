import EventEmitter from 'events';

class RNMessageChannel extends EventEmitter {
  sendJSON(json) {
    window.postMessage(JSON.stringify({
      type: 'json',
      payload: JSON.stringify(json),
    }));
  }

  send(string) {
    window.postMessage(JSON.stringify({
      type: 'text',
      payload: string,
    }));
  }
}

window.RNMessageChannel = new RNMessageChannel();
