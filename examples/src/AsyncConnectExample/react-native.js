import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { connectToRemote, WebView } from 'react-native-webview-messaging';

export class AsyncConnectExample extends React.Component {
  static title = 'Async connect';

  constructor() {
    super();

    this.state = {
      connected: false,
      connecting: false,
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, borderBottomWidth: 1, padding: 20 }}>
          { this.state.connecting ? <Text style={styles.text}>Waiting response from WebView...</Text> : null }
          { this.state.connected ?
            <Text style={styles.text}>Connected to WebView 🎉</Text> :
            !this.state.connecting ?
              <Button
                title='Connect to WebView'
                onPress={this.connect}
              /> :
              null
          }
        </View>
        <WebView
          source={require('../../dist/AsyncConnectExample.html')}
          style={{ flex: 1 }}
          ref={this._refWebView}
        />
      </View>
    );
  }

  _refWebView = (webview) => {
    this.webview = webview;
  }

  connect = () => {
    this.setState({ connecting: true });

    connectToRemote(this.webview)
      .then(remote => {
        this.remote = remote;
        this.setState({
          connected: true,
          connecting: false,
        });
      })
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
