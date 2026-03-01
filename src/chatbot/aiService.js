// src/chatbot/aiService.js

export const getAIResponse = async (message, imageUrl = null) => {
  try {
    const prompt = `
You are a strict first aid assistant.

Your job:
- ONLY respond to medical / health / first aid related queries or images
- If the user input (text or image) is NOT related to health, injury, symptoms, or medical conditions:

👉 Respond ONLY with this exact one line:
"This is not my field. Please upload relevant medical information."

Rules:
- Do NOT explain anything extra in that case
- Do NOT answer the question
- Do NOT add extra words

If the input IS medical-related:

Follow this format:

1. What I understand:
(1 short line)

2. Possible issue:
(1–2 simple points)

3. First aid steps:
(3–5 short bullet points)

4. When to see a doctor:
(2–3 short points)

5. Extra tips (optional):
(1–2 short points)

Important:
- Max 10 bullet points total
- Use very simple English
- No long paragraphs
- Suggest calling 108 if serious

Extra:
- If image is provided → first describe what you see briefly

User input:
${message}
`;

    let response;

    if (imageUrl) {
      response = await window.puter.ai.chat(prompt, imageUrl);
    } else {
      response = await window.puter.ai.chat(prompt);
    }

    const reply = response?.message?.content || "";

    return reply || "⚠️ No response";

  } catch (error) {
    console.error("Puter Error:", error);
    return "⚠️ AI not responding";
  }
};