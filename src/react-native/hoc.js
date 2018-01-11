import React from 'react';

import { handleWebViewMessage } from './handler';
import { register, destroy, resolveRemote } from './remote-resolver';
import { Events } from '../shared/constants';

export const withMessaging = (WebView) => {
  return class WebViewWithMessaging extends React.PureComponent {
    render() {
      return (
        <WebView
          {...this.props}
          onMessage={this.handleWebViewMessage}
          onLoad={this.emitReady}
          ref={this.refWebView}
        />
      );
    }

    componentDidMount() {
      register(this);
    }

    componentWillUnmount() {
      destroy(this);
    }

    refWebView = (wv) => {
      this.originalWebview = wv;
    }

    emitReady = (...args) => {
      const remote = resolveRemote(this);
      remote.emit(Events.READY);

      if (this.props.onLoad) {
        this.props.onLoad(...args);
      }
    }

    handleWebViewMessage = (event) => {
      handleWebViewMessage(this, event);

      if (this.props.onMessage) {
        this.props.onMessage(event);
      }
    }
  }
}
