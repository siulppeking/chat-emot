import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io(import.meta.env.VITE_BASE_URL);

function Chat() {
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userCount, setUserCount] = useState(0);
    const nickname = location.state?.nickname || 'Anonymous';

    if (!location.state || !location.state.nickname) {
        return (
            <div className="container">
                <div className='alert alert-warning mt-3'>Nickname invalido. Por favor vaya a la pagina de inicio.</div>
            </div>
        );
    }

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('userCount', (count) => {
            setUserCount(count);
        });

        return () => {
            socket.off('message');
            socket.off('userCount');
        };
    }, []);

    const sendMessage = () => {
        if (input) {
            socket.emit('message', { nickname, text: input });
            setInput('');
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5">Chat EMOT</h1>
            <h4>Usuarios conectados: <span className='text-success'>{userCount}</span> </h4>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    {messages.map((msg, index) => (
                        <div key={index} className="card-text">
                            <strong>{msg.nickname}: </strong>{msg.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
