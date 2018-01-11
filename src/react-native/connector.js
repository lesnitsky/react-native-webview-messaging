import { resolveRemote } from './remote-resolver';

export async function connectToRemote(webview) {
  const remote = resolveRemote(webview);

  const p = new Promise(resolve => {
    remote.once(Events.READY, resolve);
  });

  return p;
}
