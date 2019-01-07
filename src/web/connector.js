import { Remote } from './remote';
import { Events, LIB_PREFIX, LIB_READY_KEY } from '../shared/constants';

export async function connectToRemote() {
  const remote = new Remote();
  global[LIB_PREFIX] = remote;

  if (global[LIB_READY_KEY]) {
    remote.emit(Events.READY, null, true);
  }

  remote.emit(Events.READY);

  return await remote.ready;
}
