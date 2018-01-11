import { LIB_PREFIX } from '../constants';
import { getRemote } from './remote-resolver';

export function handleWebviewMessage(webview, event) {
  const { data } = event.nativeEvent;

  if (data.indexOf(LIB_PREFIX) !== 0) {
    return;
  }

  const jsonString = data.replace(LIB_PREFIX, '');
  const message = JSON.parse(jsonString);

  const remote = getRemote(webview);

  switch (message.type) {
    case 'json':
      remote.emit('json', message.payload);
      break;
    case 'text':
      remote.emit('text', message.payload);
      break;
    case 'event':
      remote.emit(message.meta.eventName, message.payload);
      break;
  }
}
