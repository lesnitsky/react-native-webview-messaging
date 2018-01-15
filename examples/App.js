import React from 'react';
import { Text, View, Button } from 'react-native';
import { connectToRemote, withMessaging, WebView } from 'react-native-webview-messaging';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: null
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, borderBottomWidth: 1, padding: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>
              {this.state.message}
            </Text>
          </View>

          <View>
            <Button
              title='Send text to WebView'
              onPress={this.sendHelloToWebView}
            />
            <Button
              title='Send json to WebView'
              onPress={this.sendJsonToWebView}
            />
            <Button
              title='Emit greeting event to WebView'
              onPress={this.emitGreetingEventToWebView}
            />
          </View>
        </View>
        <WebView
          source={require('./dist/index.html')}
          style={{ flex: 1 }}
          ref={this._refWebView}
        />
      </View>
    );
  }

  _refWebView = (webview) => {
    this.webview = webview;
  }

  componentDidMount() {
    connectToRemote(this.webview)
      .then(remote => {
        this.remote = remote;
        this.bindListeners();
      })
      .catch(console.log);
  }

  bindListeners() {
    this.remote.on('text', text => this.setState({
      message: `Recevied text from webview: ${text}`
    }));

    this.remote.on('json', json => this.setState({
      message: `Received json from webview: ${JSON.stringify(json)}`
    }));

    this.remote.on('greetingFromWebview', event => this.setState({
      message: `Received "greetingFromWebview" event: ${JSON.stringify(event)}`
    }));
  }

  sendHelloToWebView = () => {
    this.remote.send('hello');
  }

  sendJsonToWebView = () => {
    this.remote.sendJSON({ payload: 'hello' });
  }

  emitGreetingEventToWebView = () => {
    this.remote.emit('greetingFromRN', { payload: 'hello' });
  }
}
