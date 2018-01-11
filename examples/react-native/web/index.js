import { connectToRemote } from 'react-native-webview-messaging/web';

const helloBtn = document.querySelector('#hello');
const jsonBtn = document.querySelector('#json');
const eventBtn = document.querySelector('#event');
const messagesContainer = document.querySelector('p');

(async () => {
  const remote = await connectToRemote();

  helloBtn.addEventListener('click', () => {
    remote.send('hello');
  });

  jsonBtn.addEventListener('click', () => {
    remote.sendJSON({
      payload: 'hello'
    });
  });

  eventBtn.addEventListener('click', () => {
    remote.emit('greetingFromWebview', {
      payload: 'hello'
    });
  });

  remote.on('text', text => {
    messagesContainer.innerHTML = `Received text from RN: ${text}`;
  });

  remote.on('json', text => {
    messagesContainer.innerHTML = `Received json from RN: ${JSON.stringify(text)}`;
  });

  remote.on('greetingFromRN', event => {
    messagesContainer.innerHTML = `Received "greetingFromRN" event: ${JSON.stringify(event)}`;
  });

})();
