import { Remote } from './remote';
import { Events } from '../shared/constants';

const webviewRemotes = new WeakMap();

export function register(webview) {
  const remote = new Remote(webview.originalWebview);
  webviewRemotes.set(webview.originalWebview, remote);
}

export function destroy(webview) {
  webviewRemotes.delete(webview.originalWebview);
}

export function resolveRemote(webview) {
  const remote = webviewRemotes.get(webview.originalWebview);
  return remote;
}
