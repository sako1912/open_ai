import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/chat', { message });
            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios 오류:', error.message);
                if (error.response) {
                    console.error('응답 데이터:', error.response.data);
                    console.error('응답 상태:', error.response.status);
                }
            } else {
                console.error('알 수 없는 오류:', error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            <div>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default Chat;
