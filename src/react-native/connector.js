import { resolveRemote } from './remote-resolver';
import { Events } from '../shared/constants';

export async function connectToRemote(webview) {
  const remote = resolveRemote(webview);

  const p = new Promise(resolve => {
    remote.once(Events.READY, () => resolve(remote));
  });

  return p;
}
