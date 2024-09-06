import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // 환경 변수 로드

const app = express();
const port = 5000;

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error: unknown) {
        console.error('Error in /api/chat:', error);
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).send(error.message);
        } else if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('알 수 없는 오류가 발생했습니다.');
        }
    }
});

app.get('/test', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hello' }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.send('OpenAI API가 정상적으로 동작합니다.');
    } catch (error: unknown) {
        console.error('Error in /test:', error);
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).send(`OpenAI API 오류: ${error.message}`);
        } else if (error instanceof Error) {
            res.status(500).send(`서버 오류: ${error.message}`);
        } else {
            res.status(500).send('알 수 없는 오류가 발생했습니다.');
        }
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
