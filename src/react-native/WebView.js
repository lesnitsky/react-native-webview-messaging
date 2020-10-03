import { WebView as NativeWebView } from 'react-native-webview';
import { withMessaging } from './hoc';

export const WebView = withMessaging(NativeWebView);
