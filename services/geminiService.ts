import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { BlogPostRequest } from '../types';

const modelName = 'gemini-2.5-flash-preview-04-17';

// Helper function to get API key (easier to mock in tests)
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

// Helper function to create AI instance (easier to mock in tests)
const createAiInstance = (apiKey: string): GoogleGenAI => {
  return new GoogleGenAI({ apiKey });
};

export const generateBlogPost = async (request: BlogPostRequest): Promise<string> => {
  const API_KEY = getApiKey();
  
  if (!API_KEY) {
    throw new Error("API Key for Gemini is not configured. Please set the API_KEY environment variable.");
  }

  let systemInstruction = `You are an expert blog post writer. Your goal is to generate high-quality blog content based on user specifications.`;

  if (request.persona && request.persona.trim() !== "") {
    systemInstruction += `\nEmbody the following persona when writing: "${request.persona.trim()}".`;
  }

  systemInstruction += `
Adhere strictly to the requested tone, style, length, and target audience.
The blog post should be well-structured with clear paragraphs. If appropriate for the content and style, use headings (e.g., ## Heading) or bullet points for readability.
Begin the blog post directly without any preambles like "Here's your blog post:", "Certainly, here is the blog post you requested:", or similar introductory phrases.
Output only the blog post content itself. Do not include any of your own meta-commentary or self-correction notes.
Ensure the length is approximately ${request.length} words.
`;

  const userPrompt = `
Generate a blog post with the following characteristics:
Topic: "${request.topic}"
Tone: "${request.tone}"
Style: "${request.style}"
Target Audience: "${request.audience}"
Approximate Length: "${request.length} words"
`;

  try {
    const ai = createAiInstance(API_KEY);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, 
        topP: 0.95,
        topK: 40,
      }
    });
    
    const text = response.text;
    if (!text) {
      throw new Error('Received an empty response from the AI. Please try again or adjust your prompt.');
    }
    return text.trim();

  } catch (error) {
    // Check if it's our own empty response error first
    if (error instanceof Error && error.message === 'Received an empty response from the AI. Please try again or adjust your prompt.') {
      throw error;
    }
    
    console.error("Error generating blog post with Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            throw new Error("The Gemini API key is invalid. Please check your configuration.");
        }
         if (error.message.includes("quota")) {
            throw new Error("You have exceeded your Gemini API quota. Please check your usage or upgrade your plan.");
        }
    }
    // It's better to throw a more specific error or the original error if it's already informative.
    // For this example, a generic message is kept, but in a real app, more detailed error handling based on error types/codes from Gemini API would be better.
    throw new Error('Failed to generate blog post. The AI service might be temporarily unavailable or the request could not be processed. Check console for more details.');
  }
};

// Display warning if API key is not set (only at module load for development feedback)
if (!getApiKey()) {
  console.warn("Gemini API Key (process.env.API_KEY) is not set. API calls will likely fail.");
}