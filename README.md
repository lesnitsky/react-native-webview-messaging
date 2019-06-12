# React Native WebView Messaging

React Native WebView extension with 2-way event-based communication API

> Support me

![GitHub stars](https://img.shields.io/github/stars/lesnitsky/react-native-webview-messaging.svg?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/lesnitsky_a.svg?label=Follow%20me&style=social)

:warning: this is v2 branch which is not yet stable. Check out [v1 branch](https://github.com/R1ZZU/react-native-webview-messaging/tree/v1) for v1 docs

## Installation

```sh
npm install react-native-webview-messaging@next
```

## Examples

[Examples](https://github.com/R1ZZU/react-native-webview-messaging/tree/master/examples)

## Usage

### React Native

```javascript
import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { connectToRemote, WebView } from 'react-native-webview-messaging';

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

  async componentDidMount() {
    this.remote = await connectToRemote(this.webview);

    this.remote.on('text', text => console.log(text));
    this.remote.on('json', json => console.log(json));
    this.remote.on('custom-event-from-webview', eventData => console.log(eventData));
  }

  sendMessageToWebView = () => {
    this.remote.sendJSON({
      payload: 'JSON from RN'
    });

    this.remote.send('plain text from RN');

    this.remote.emit('custom-event-from-rn', { payload: 'Custom event from RN' });
  }
}
```

### Web

```javascript
import { connectToRemote } from 'react-native-webview-messaging/web';

connectToRemote()
  .then(remote => {
    remote.on('text', text => console.log(text));
    remote.on('json', json => console.log(json));
    remote.on('custom-event-from-rn', data => console.log(data));

    remote.send('plain text from WebView');
    remote.sendJSON({
      payload: 'JSON from WebView'
    });

    remote.emit('custom-event-from-webview', { payload: 'Custom event from WebView' });
  });
```

## LICENSE

MIT

## Support me

![GitHub stars](https://img.shields.io/github/stars/lesnitsky/react-native-webview-messaging.svg?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/lesnitsky_a.svg?label=Follow%20me&style=social)
