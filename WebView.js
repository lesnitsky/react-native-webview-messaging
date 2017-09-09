import EventEmitter from "events";
import React, { Component } from "react";
import { WebView as NativeWebView } from "react-native";

// package unique prefix for all messages
const UNIQUE_MESSAGE_PREFIX = "f251c210-e7c9-42fa-bae3-b9352ec3722a";

export class WebView extends Component {
  constructor(props) {
    super(props);
    this.messagesChannel = new EventEmitter();
  }

  render() {
    return (
      <NativeWebView
        {...this.props}
        onMessage={this.onMessage}
        ref={this._refWebView}
      />
    );
  }

  _refWebView = webview => {
    this.webview = webview;
  };

  onMessage = event => {
    const { data } = event.nativeEvent;

    if (data.indexOf(UNIQUE_MESSAGE_PREFIX) !== 0) {
      return; // that's not something that was received from rn messages channel
    }
    
    // remove the unique identifier so that only the user's original message 
    // remains
    const jsonString = data.replace(UNIQUE_MESSAGE_PREFIX, '');

    // parse original message into an object
    const parsedMsg = JSON.parse(jsonString);

    switch (parsedMsg.type) {
      case "json":
        this.messagesChannel.emit("json", parsedMsg.payload);
        break;
      case "text":
        this.messagesChannel.emit("text", parsedMsg.payload);
        break;
      case "event":
        this.messagesChannel.emit(parsedMsg.meta.eventName, parsedMsg.payload);
        break;
    }
  };

  send(string) {
    this.webview.injectJavaScript(`(function (global) {
      global.RNMessagesChannel && global.RNMessagesChannel.emit('text', ${JSON.stringify(
        string
      )}, true);
    })(window)`);
  }

  sendJSON(json) {
    this.webview.injectJavaScript(`(function (global) {
      global.RNMessagesChannel && global.RNMessagesChannel.emit('json', ${JSON.stringify(
        json
      )}, true);
    })(window)`);
  }

  emit(eventName, eventData) {
    this.webview.injectJavaScript(`(function (global) {
      global.RNMessagesChannel && global.RNMessagesChannel.emit(${JSON.stringify(
        eventName
      )}, ${JSON.stringify(eventData)}, true);
    })(window)`);
  }
}
