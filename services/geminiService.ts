import { GoogleGenAI } from "@google/genai";
import { UserProfile, HealthResponse, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiHealthAdvice = async (profile: UserProfile): Promise<HealthResponse> => {
  // Calculate BMI for context
  let bmiInfo = "";
  if (profile.weight && profile.height) {
    const w = parseFloat(profile.weight);
    const h = parseFloat(profile.height) / 100; // convert to meters
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      bmiInfo = `Calculated BMI: ${bmi}.`;
    }
  }

  const prompt = `
    You are an expert Naturopathy Doctor and Holistic Health Consultant dedicated to helping underprivileged populations.
    
    User Profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Location: ${profile.location}
    - Medical Condition/Symptoms: ${profile.condition}
    - ${bmiInfo}
    - Preferred Language: ${profile.language}

    Task:
    Provide a comprehensive health consultation in ${profile.language}. 
    Focus specifically on well-established naturopathy medicines and home remedies that are very affordable and accessible.
    
    Structure your response clearly with these sections (translate headings to ${profile.language}):
    1. **Health Analysis**: Briefly explain the condition based on their age, demographic, and BMI (if applicable).
    2. **Affordable Naturopathy Remedies**: Suggest specific herbs, easy-to-make home remedies, or low-cost natural medicines. Explain how to use them.
    3. **Lifestyle & Diet**: Suggest simple lifestyle changes (yoga, diet, sleep) relevant to their condition.
    4. **Sourcing & Vendors**: Suggest where they can buy these ingredients cheaply in or near ${profile.location}. Mention generic medicine stores (like Jan Aushadhi in India if applicable), local herbal markets, or common grocery items.
    
    Tone: Empathetic, clear, and encouraging.
    IMPORTANT: You have access to Google Search. Use it to find REAL vendors or specific availability of herbs near the user's location if possible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    // Extract text
    const text = response.text || "No response generated. Please try again.";

    // Extract grounding chunks (sources)
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri,
          });
        }
      });
    }

    return {
      markdown: text,
      sources: sources,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get health advice. Please check your connection and try again.");
  }
};
