# React Native WebView Messaging

React Native WebView extension with 2-way event-based communication API

> :fire: check out early release of [v2](https://github.com/R1ZZU/react-native-webview-messaging)

![Demo](http://i.imgur.com/BPKQpLf.gif)

* [Installation](#installation)
* [Roadmap](#roadmap)
* Usage
  - [React Native View](#react-native-view)
  - [WebView](#webview)
* [API Docs](#api-docs)
  - [WebView](#webview)
    - [send(text: String)](#webviewsendtext-string)
    - [sendJSON(json: Object)](#webviewsendjsonjson-object)
    - [emit(eventName: String, [eventData: Object])](#webviewemiteventname-string-eventdata-object)
    - [messagesChannel: EventEmitter](#messageschannel-eventemitter)
  - [RNMessagesChannel](#rnmessageschannel)
    - [send(text: String)](#rnmessageschannelsendtext-string)
    - [sendJSON(json: Object)](#rnmessageschannelsendjsonjson-object)
    - [emit(eventName: String, [eventData: Object])](#rnmessageschannelemiteventname-string-eventdata-object)

## Installation

```sh
npm install react-native-webview-messaging
```

## Roadmap

* channel for redux actions
* enhanced dev environment

## Examples

* [Expo SDK](https://github.com/R1ZZU/react-native-webview-messaging/tree/v1/examples/expo)
* [React Native](https://github.com/R1ZZU/react-native-webview-messaging/tree/v1/examples/react-native)

### React Native view

```javascript
import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { WebView } from 'react-native-webview-messaging/WebView';

export class ExampleView extends Component {
  render() {
    return (
      <View>
        <WebView
          ref={ webview => { this.webview = webview; }}
          source={ require('./some-page.html') }
        />
        <TouchableHighlight onPress={this.sendMessageToWebView} underlayColor='transparent'>
          <Text>Send message to WebView</Text>
        </TouchableHighlight>
      </View>
    )
  }

  componentDidMount() {
    this.webview.messagesChannel.on('text', text => console.log(text));
    this.webview.messagesChannel.on('json', json => console.log(json));
    this.webview.messagesChannel.on('custom-event-from-webview', eventData => console.log(eventData));
  }

  sendMessageToWebView = () => {
    this.webview.sendJSON({
      payload: 'JSON from RN'
    });

    this.webview.send('plain text from RN');

    this.webview.emit('custom-event-from-rn', { payload: 'Custom event from RN' });
  }
}
```

### WebView

```javascript
import RNMsgChannel from 'react-native-webview-messaging';

RNMsgChannel.on('text', text => console.log(text));
RNMsgChannel.on('json', json => console.log(json));
RNMsgChannel.on('custom-event-from-rn', data => console.log(data));

RNMsgChannel.send('plain text from WebView');
RNMsgChannel.sendJSON({
  payload: 'JSON from WebView'
});

RNMsgChannel.emit('custom-event-from-webview', { payload: 'Custom event from WebView' });
```

## API Docs
## WebView

extends WebView from `react-native`

### Import
```javascript
// es6 modules
import { WebView } from 'react-native-webview-messaging/WebView';
// commonJS
const { WebView } = require('react-native-webview-messaging/WebView');
```

### WebView#send(text: String)
Emits `'text'` event on `RNMessagesChannel` inside WebView

### WebView#sendJSON(json: Object)
Emits `'json'` event on `RNMessagesChannel` inside WebView

### WebView#emit(eventName: String, [eventData: Object])
Emits custom event on `RNMessagesChannel` inside WebView

### messagesChannel: EventEmitter
Emits events sent from WebView

* `'text'` - emitted when `RNMessagesChannel#send(text: String)` is called in WebView
* `'json'` - emitted when `RNMessagesChannel#sendJSON(json: Object)` is called in WebView
* you can also emit custom events with `RNMessagesChannel#emit(eventName: String, [eventData: Object])` method

---

## RNMessagesChannel
extends `EventEmitter`

Emits events sent from RN app

* `'text'` - emitted when `WebView#send(text: String)` is called in RN app
* `'json'` - emitted when `WebView#sendJSON(json: Object)` is called in RN app
* you can also emit custom events with `WebView#emit(eventName: String, [eventData: Object])` method

### RNMessagesChannel#send(text: String)
Emits `'text'` event to `WebView#messagesChannel` in RN app

### RNMessagesChannel#sendJSON(json: Object)
Emits `'json'` event to `WebView#messagesChannel` in RN app

### RNMessagesChannel#emit(eventName: String, [eventData: Object])
Emits custom event to `WebView#messagesChannel` in RN app

### Import
```javascript
// es6 modules
import RNMessagesChannel from 'react-native-webview-messaging';
// commonJS
const RNMessagesChannel = require('react-native-webview-messaging');
```

## LICENSE

MIT
