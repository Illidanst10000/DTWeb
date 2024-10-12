import React, { useState, useEffect } from 'react';
import {observer} from "mobx-react-lite";
import chatStore from "../http/chat-store";


const ChatRoom = observer(() => {
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        chatStore.connect();
    }, []);

    const sendMessage = () => {
        chatStore.sendMessage(message);
        setMessage('');
    };

    const joinRoom = () => {
        chatStore.joinRoom(room);
    };

    return (
        <div>
            <div>
                <h3>Connection Status: {chatStore.connected ? 'Connected' : 'Disconnected'}</h3>
            </div>
            <div>
                <input
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room name"
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
            <ul>
                {chatStore.messages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
});

export default ChatRoom;
