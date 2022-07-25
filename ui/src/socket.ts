import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000', {
    transports: ['websocket']
});

socket.on('disconnect', () => {
    console.log('Server has been disconnected');
});

export default socket;
