import EventEmitter from 'events';
import React, { Component } from 'react';
import { WebView as NativeWebView } from 'react-native';

import registerRNMessageChannel from './dist/injected';

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

  _refWebView = (webview) => {
    this.webview = webview;
  }

  onMessage = (event) => {
    const { data } = event.nativeEvent;
    const parsedMsg = JSON.parse(data);

    switch (parsedMsg.type) {
      case 'json':
        this.messagesChannel.emit('json', JSON.parse(parsedMsg.payload));
        break;
      case 'text':
        this.messagesChannel.emit('text', parsedMsg.payload);
        break;
      case 'event':
        this.messagesChannel.emit(parsedMsg.meta.eventName, parsedMsg.oayload);
        break;
    }
  }

  componentDidMount() {
    this.webview.injectJavaScript(registerRNMessageChannel);
  }

  send(string) {
    this.webview.injectJavaScript(`(function (global) {
      global.RNMessageChannel.emit('text', ${string});
    })(window)`);
  }

  sendJSON(json) {
    this.webview.injectJavaScript(`(function (global) {
      global.RNMessageChannel.emit('json', ${JSON.stringify(json)});
    })(window)`);
  }

  emit(eventName, eventData) {
    this.webview.injectJavaScript(`(function (global) {
      global.RNMessageChannel.emit(${eventName}, ${JSON.stringify(eventData)});
    })(window)`);
  }
}
