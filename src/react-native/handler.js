import { LIB_PREFIX } from '../shared/constants';
import { resolveRemote } from './remote-resolver';

export function handleWebViewMessage(webview, event) {
  const { data } = event.nativeEvent;

  if (data.indexOf(LIB_PREFIX) !== 0) {
    return;
  }

  const jsonString = data.replace(LIB_PREFIX, '');
  const message = JSON.parse(jsonString);

  const remote = resolveRemote(webview);

  switch (message.type) {
    case 'json':
      remote.emit('json', message.payload, true);
      break;
    case 'text':
      remote.emit('text', message.payload, true);
      break;
    case 'event':
      remote.emit(message.meta.eventName, message.payload, true);
      break;
  }
}
