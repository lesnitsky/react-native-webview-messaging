import EventEmitter from 'events';

// package unique prefix for all messages
const UNIQUE_MESSAGE_PREFIX = "f251c210-e7c9-42fa-bae3-b9352ec3722a";


// create string from passed object
function createStringified(type, payload){
  return JSON.stringify({
    type,
    payload
  })
}

class RNMessagesChannel extends EventEmitter {
  sendJSON(json) {
    window.postMessage(UNIQUE_MESSAGE_PREFIX + createStringified("json", json));
  }

  send(string) {
    window.postMessage(UNIQUE_MESSAGE_PREFIX + createStringified("text", string));
  }

  emit(eventName, eventData, fromRN) {
    super.emit(eventName, eventData);

    if (fromRN) {
      return;
    }

    window.postMessage(UNIQUE_MESSAGE_PREFIX + JSON.stringify({
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
