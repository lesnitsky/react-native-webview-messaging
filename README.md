# React Native WebView Messaging

> This package is used in RN app as a glue for WebGL component rendered inside WebView. If you have any issues with usage/installation just [submit an issue](https://github.com/R1ZZU/react-native-webview-messaging/issues). I'd appreciate your feedback :smirk:
---

* [Installation](#installation)
* [Usage](#usage)
  - [React Native View](#react-native-view)
  - [WebView](#webview)

## Installation

```sh
npm install react-native-webview-messaging
```

or with yarn

```sh
yarn add react-native-webview-messaging
```

## Usage

### React Native view

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';
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

RNMsgChannel.emit('custom-event-from-webview', { payload: 'Custom event from WebView' })
```

## LICENSE

MIT
