import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let stompClient = null;

export const connect = () => {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = over(socket);
  stompClient.connect({}, () => {
    console.log('✅ Connected to WebSocket');
    stompClient.subscribe('/topic/messages', (message) => {
      console.log('📩 Message from server:', JSON.parse(message.body));
    });
  }, (error) => {
    console.error('❌ WebSocket connection error:', error);
  });
};

export const sendMessage = (msg) => {
  if (stompClient) {
    stompClient.send('/app/send', {}, JSON.stringify({ text: msg }));
  }
};
