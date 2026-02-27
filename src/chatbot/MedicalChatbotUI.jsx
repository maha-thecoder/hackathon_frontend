import React, { useState } from "react";
import "./MedicalChatbotUI.css";
import { getAIResponse } from "./aiService";

export default function MedicalChatbotUI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMsg = {
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await getAIResponse(message);

      const botMsg = {
        text: reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Something went wrong", sender: "bot" },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        🩺 AI First Aid Assistant
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-row ${msg.sender}`}>
            <div className="chat-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-row bot">
            <div className="chat-bubble">Doctor is typing...</div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          className="chat-input"
          type="text"
          placeholder="Describe symptoms..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          className="icon-btn send-btn"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "📤"}
        </button>
      </div>

      <div className="chat-footer">
        This AI gives first aid guidance only. Consult a doctor if serious.
      </div>

    </div>
  );
}