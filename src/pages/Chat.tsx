import React, { useState, useCallback, useEffect } from 'react';
import OpenAI from 'openai';

const Chat = () => {
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState('');
    const [openai, setOpenai] = useState<OpenAI | null>(null);

    useEffect(() => {
        const key = process.env.REACT_APP_OPENAI_API_KEY;
        if (key) {
            setOpenai(new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true }));
        }
    }, []);

    //chunk object -stream
    // const handleSubmit = useCallback(
    //     async (e: React.FormEvent) => {
    //         e.preventDefault();
    //         if (!openai) return;

    //         let fullResponse = '';
    //         const stream = await openai.chat.completions.create({
    //             model: 'gpt-4o-mini',
    //             messages: [{ role: 'user', content: message }],
    //             stream: true,
    //         });
    //         for await (const chunk of stream) {
    //             const content = chunk.choices[0]?.delta?.content || '';
    //             fullResponse += content;
    //             setResponse(fullResponse); // 상태 업데이트
    //         }
    //     },
    //     [message, openai]
    // );

    //completion object
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!openai) return;

            const res = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: message }],
            });
            const content = res.choices[0]?.message?.content || '';
            setResponse(content); // 상태 업데이트
        },
        [message, openai]
    );

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
