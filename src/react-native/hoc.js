import { handleWebViewMessage } from './handler';
import { register, destroy } from './remote-resolver';

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
      register(this.wv);
    }

    componentWillUnmount() {
      destroy(this.wv);
    }

    refWebView = (wv) => {
      this.wv = wv;
    }

    handleWebViewMessage = (event) => {
      handleWebViewMessage(this.wv, event);
    }
  }
}
