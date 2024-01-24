// import logo from './logo.svg';
import './App.css';
import './normal.css'
import { useState } from 'react';
import ChatMessage from './components/ChatMessage';

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How Can I Help You?"
  },{
    user: "me",
    message: "I want to use Chatgpt today"
  }]);

  function clearChat(){
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
    setInput("");
    setChatLog(chatLogNew)
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
  }

  return (
    <div className="App">
    <aside className="sidemenu">
      <div className="side-menu-button" onClick={clearChat}>
        <span>+</span>
        New Chat
      </div>
    </aside>
    <section className="chatbox">
    <div className="chat-log">
      {chatLog.map((message, index) => (
        <ChatMessage key={index} message={message}/>
      ))}
    </div>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input rows="1" 
                className="chat-input-textarea" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onplaceholder="What's on your mind">
            </input>
        </form>
      </div>
    </section>
      
    </div>
  );
}

export default App;
