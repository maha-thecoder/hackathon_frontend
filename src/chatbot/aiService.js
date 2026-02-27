// src/chatbot/aiService.js

export const getAIResponse = async (message) => {
  try {
    const res = await fetch("http://localhost:4000/api/v1/hackathon/ai-bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    return data.reply;

  } catch (error) {
    console.error("Frontend Error:", error);
    return "⚠️ Unable to connect to AI server";
  }
};