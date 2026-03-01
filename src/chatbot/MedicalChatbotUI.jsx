import React, { useState, useRef, useEffect } from "react";
import "./MedicalChatbotUI.css";
import { getAIResponse } from "./aiService";

export default function MedicalChatbotUI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [language, setLanguage] = useState("en-IN");

  const [listening, setListening] = useState(false);

  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // 🎤 SPEECH RECOGNITION SETUP
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  // 🎤 START/STOP MIC
  const handleVoice = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // 🔊 TEXT TO SPEECH
  const speakText = (text, index) => {
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    utterance.onend = () => {
      setSpeakingIndex(null);
    };

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // 💬 SEND TEXT
  const handleSend = async () => {
    if (!message.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { text: message, sender: "user" },
    ]);

    setLoading(true);

    try {
      const reply = await getAIResponse(message);

      setMessages((prev) => [
        ...prev,
        { text: reply, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Something went wrong", sender: "bot" },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  // 📷 IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sarekart");

    setLoading(true);

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmgitvkke/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { image: data.secure_url, sender: "user" },
      ]);

      const reply = await getAIResponse(
        "Analyze this image and give first aid advice",
        data.secure_url
      );

      setMessages((prev) => [
        ...prev,
        { text: reply, sender: "bot" },
      ]);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <div className="ai-header">
        🩺 AI First Aid Assistant

        {/* 🌐 LANGUAGE */}
        <select
          className="lang-dropdown"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-IN">English</option>
          <option value="te-IN">Telugu</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

      <div className="ai-chat">
        {messages.length === 0 && (
          <div className="welcome">
            <h2>How can I help you today?</h2>
            <p>Describe symptoms or upload image</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.sender}`}>
            <div className="bubble">
              {msg.text && (
                <>
                  <p>{msg.text}</p>

                  {msg.sender === "bot" && (
                    <button
                      className="speak-btn"
                      onClick={() => speakText(msg.text, index)}
                    >
                      {speakingIndex === index
                        ? "⏹️ Stop"
                        : "🔊 Read aloud"}
                    </button>
                  )}
                </>
              )}

              {msg.image && (
                <img src={msg.image} alt="uploaded" width="150" />
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg bot">
            <div className="bubble loading-text">
              Analysing<span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="ai-input-area">
        {/* hidden file */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* ➕ */}
        <button
          className="plus-btn"
          onClick={() => fileInputRef.current.click()}
        >
          +
        </button>

        {/* 🎤 */}
        <button className="mic-btn" onClick={handleVoice}>
          {listening ? "🛑" : "🎤"}
        </button>

        {/* text */}
        <input
          type="text"
          placeholder="Ask about symptoms..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* send */}
        <button
          onClick={handleSend}
          disabled={loading}
          className="send-btn"
        >
          ➤
        </button>
      </div>
    </div>
  );
}