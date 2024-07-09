import React, { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        message: input,
      });
      const botMessage = { text: response.data.response, user: false };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "An error occurred. Please try again later.",
        user: false,
      };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col h-96 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg ${
                msg.user
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
