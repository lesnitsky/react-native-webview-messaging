import { Remote } from './Remote';
import { Events } from '../shared/constants';

export async function connectToRemote() {
  const r = new Remote();
  global[LIB_PREFIX] = r;

  r.emit(Events.READY);

  return r;
}
