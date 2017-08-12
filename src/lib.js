import EventEmitter from 'events';

class RNMessagesChannel extends EventEmitter {
  sendJSON(json) {
    window.postMessage(JSON.stringify({
      type: 'json',
      payload: json,
    }));
  }

  send(string) {
    window.postMessage(JSON.stringify({
      type: 'text',
      payload: string,
    }));
  }

  emit(eventName, eventData, fromRN) {
    super.emit(eventName, eventData);

    if (fromRN) {
      return;
    }

    window.postMessage(JSON.stringify({
      type: 'event',
      meta: {
        eventName
      },
      payload: eventData
    }));
  }
}

window.RNMessagesChannel = new RNMessagesChannel();

module.exports = window.RNMessagesChannel;
