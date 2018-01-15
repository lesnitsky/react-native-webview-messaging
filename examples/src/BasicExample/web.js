import React from 'react';
import { render } from 'react-dom';
import { connectToRemote } from 'react-native-webview-messaging/web';

class App extends React.Component {
  state = {
    message: null,
  }

  async componentDidMount() {
    const remote = await connectToRemote();
    this.remote = remote;

    this.remote.on('text', text => {
      this.setState({ message: `Received text from RN: ${text}` });
    });

    this.remote.on('json', text => {
      this.setState({ message: `Received json from RN: ${JSON.stringify(text)}` });
    });

    this.remote.on('greetingFromRN', event => {
      this.setState({ message: `Received "greetingFromRN" event: ${JSON.stringify(event)}` });
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <button onClick={this.sendText}>Send text to RN</button>
        </div>

        <div>
          <button onClick={this.sendJSON}>Send JSON to RN</button>
        </div>

        <div>
          <button onClick={this.emitEvent}>Emit greeting event to RN</button>
        </div>

        <p>{ this.state.message ? this.state.message : null }</p>
      </div>
    );
  }

  sendText = () => {
    this.remote.send('hello');
  }

  sendJSON = () => {
    this.remote.sendJSON({
      payload: 'hello'
    });
  }

  emitEvent = () => {
    this.remote.emit('greetingFromWebview', {
      payload: 'hello'
    });
  }
}

render(<App />, document.querySelector('#reactRoot'));
