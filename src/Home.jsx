import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleEnterChat = () => {
        if (nickname.trim()) {
            navigate('/chat', {
                state: { nickname }
            })
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5">Chat EMOT</h1>
            <div className="input-group mb-3 mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu Nickname..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleEnterChat}>Ingresar</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
