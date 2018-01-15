import { WebView as NativeWebView } from 'react-native';
import { withMessaging } from './hoc';

export const WebView = withMessaging(NativeWebView);
