import { makeAutoObservable } from 'mobx';
import { io, Socket } from 'socket.io-client';

class ChatStore {
    socket: Socket | null = null;
    messages: string[] = [];
    room: string | null = null;
    connected: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    connect() {
        this.socket = io('http://localhost:5000');

        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            this.connected = true;
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
            this.connected = false;
        });

        this.socket.on('newMessage', (message: string) => {
            console.log('New message:', message);
            this.messages.push(message);
        });

        this.socket.on('userJoined', (message: string) => {
            console.log(message);
        });

        this.socket.on('userConnected', (message: string) => {
            console.log(message);
        });

        this.socket.on('userDisconnected', (message: string) => {
            console.log(message);
        });
    }

    joinRoom(room: string) {
        if (this.socket) {
            this.room = room;
            console.log(`Joining room: ${room}`);
            this.socket.emit('joinRoom', room);
        }
    }

    sendMessage(message: string) {
        if (this.socket && this.room) {
            console.log(`Sending message to room ${this.room}: ${message}`);
            this.socket.emit('sendMessage', { room: this.room, message });
        }
    }
}

export default new ChatStore();
