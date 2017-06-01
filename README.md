# React Native WebView Messaging

## Installation

```sh
npm install react-native-webview-messaging
```

or with yarn

```sh
yarn add react-native-webview-messaging
```

## Usage

React Native view

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
        <TouchableHighlight onPress={this.sendBessageToWebView} underlayColor='transparent'>
          <Text>Send message to WebView</Text>
        </TouchableHighlight>
      </View>
    )
  }

  componentDidMount() {
    this.webview.messagesChannel.on('text', text => console.log(text));
    this.webview.messagesChannel.on('json', json => console.log(json));
  }

  sendMessageToWebView = () => {
    this.webview.sendJSON({
      payload: 'JSON from RN'
    });

    this.webview.send('plain text from RN');
  }
}
```

WebView JavaScript

```javascript
import RNMsgChannel from 'react-native-webview-messaging';

RNMsgChannel.on('text', text => console.log('text'));
RNMsgChannel.on('json', json => console.log('json'));

RNMsgChannel.send('plain text from WebView');
RNMsgChannel.sendJSON({
  payload: 'JSON from WebView'
});
```

## LICENSE

MIT
