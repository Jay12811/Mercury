import { GoogleGenAI } from "@google/genai";
import { Message, SessionSettings } from "../types";
import { MERCURY_SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export async function getMercuryResponse(history: Message[], settings: SessionSettings) {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const sessionContext = `
USER CONTEXT:
- Delegated Country: ${settings.country}
- Committee: ${settings.committee}
- Topic/Agenda: ${settings.agenda}
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: MERCURY_SYSTEM_PROMPT + "\n\n" + sessionContext,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm here, Delegate. What's the situation?";
  } catch (error) {
    console.error("Mercury Logic Error:", error);
    return "The systems are a bit jammed, but don't panic. Stay calm and stick to your ROP. Try again in a second.";
  }
}
