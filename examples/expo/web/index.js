import RNMessageChannel from 'react-native-webview-messaging';

const helloBtn = document.querySelector('#hello');
const jsonBtn = document.querySelector('#json');
const eventBtn = document.querySelector('#event');
const messagesContainer = document.querySelector('p');

helloBtn.addEventListener('click', () => {
  RNMessageChannel.send('hello');
});

jsonBtn.addEventListener('click', () => {
  RNMessageChannel.sendJSON({
    payload: 'hello'
  });
});

eventBtn.addEventListener('click', () => {
  RNMessageChannel.emit('greetingFromWebview', {
    payload: 'hello'
  });
});

RNMessageChannel.on('text', text => {
  messagesContainer.innerHTML = `Received text from RN: ${text}`;
});

RNMessageChannel.on('json', text => {
  messagesContainer.innerHTML = `Received json from RN: ${JSON.stringify(text)}`;
});

RNMessageChannel.on('greetingFromRN', event => {
  messagesContainer.innerHTML = `Received "greetingFromRN" event: ${JSON.stringify(event)}`;
});
