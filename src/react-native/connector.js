import { resolveRemote } from './remote-resolver';
import { Events } from '../shared/constants';

export async function connectToRemote(webview) {
  const remote = resolveRemote(webview);
  remote.emit(Events.READY);

  return await remote.ready
}
