import { Remote } from './Remote';
import { Events, LIB_PREFIX, LIB_READY_KEY } from '../shared/constants';

export async function connectToRemote() {
  const remote = new Remote();
  global[LIB_PREFIX] = remote;

  const ready = new Promise(resolve => {
    function done() {
      remote.emit(Events.READY);
      resolve(remote)
    }

    if (global[LIB_READY_KEY]) {
      done();
    } else {
      remote.once(Events.READY, done);
    }
  });

  return await ready;
}
