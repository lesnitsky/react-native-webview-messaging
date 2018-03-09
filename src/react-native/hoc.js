import React from 'react';

import { handleWebViewMessage } from './handler';
import { register, destroy, resolveRemote } from './remote-resolver';
import { Events } from '../shared/constants';

const patchPostMessageFunction = () => {
  var originalPostMessage = window.postMessage;
  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = () => {
    return String(Object.hasOwnProperty).replace(
      'hasOwnProperty',
      'postMessage'
    );
  };
  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode =
  '(' + String(patchPostMessageFunction) + ')();';

export const withMessaging = (WebView) => {
  return class WebViewWithMessaging extends React.PureComponent {
    render() {
      return (
        <WebView
          {...this.props}
          injectedJavaScript={patchPostMessageJsCode}
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
