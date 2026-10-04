export async function handleChat(req, res, next) {
  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const response = await fetch(`${process.env.ANTHROPIC_BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ANTHROPIC_AUTH_TOKEN}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.URL || "https://aibot-server.vercel.app",
      },
      body: JSON.stringify({
        model: model || process.env.ANTHROPIC_MODEL,
        max_tokens: 1024,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(JSON.stringify(data));

    res.json({ reply: data.content[0].text });
  } catch (err) {
    next(err);
  }
}

import { GoogleGenAI } from "@google/genai";

export async function handleChatv1(req, res, next) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages array is required",
      });
    }

    const prompt = messages
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: model ?? "gemini-3.8-flash",
      contents: prompt,
    });
     console.log("model", model);
     console.log("response", response);
    res.json({
      message: response.text,
    });
  } catch (err) {
    next(err);
  }
}