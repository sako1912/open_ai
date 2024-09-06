import React from 'react';
import Chat from './pages/Chat';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>OpenAI Chat</h1>
            </header>
            <Chat />
        </div>
    );
};

export default App;
