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

    handleWebViewMessage = (event) => {
      handleWebViewMessage(this, event);

      if (this.props.onMessage) {
        this.props.onMessage(event);
      }
    }
  }
}
