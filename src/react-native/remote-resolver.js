import { Remote } from './remote';
import { Events } from '../shared/constants';

const webviewRemotes = new WeakMap();

export function register(webview) {
  const remote = new Remote(webview);
  webviewRemotes.set(webview, remote);
}

export function destroy(webview) {
  webviewRemotes.delete(webview);
}

export function resolveRemote(webview) {
  return webviewRemotes.get(webview);
}
