import React from 'react';
import { render } from 'react-dom';
import { connectToRemote } from 'react-native-webview-messaging/web';

class App extends React.Component {
  state = {
    connected: false,
    connecting: false,
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        { this.state.connecting ? <p>Waiting response from RN...</p> : null }
        { this.state.connected ?
          <p>Connected to RN 🎉</p> :
          !this.state.connecting ?
            <button onClick={this.connect}>Connect to RN</button> :
            null
        }
      </div>
    );
  }

  connect = () => {
    this.setState({ connecting: true });

    connectToRemote()
      .then(remote => {
        this.remote = remote;

        this.setState({
          connected: true,
          connecting: false,
        });
      })
      .catch(err => console.log(err));
  }
}

render(<App />, document.querySelector('#reactRoot'));
