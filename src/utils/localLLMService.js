import { CreateMLCEngine } from "@mlc-ai/web-llm";

let engine = null;
let currentModelId = null;

export const availableLocalModels = [
  {
    id: "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC",
    name: "TinyLlama 1.1B (Very Fast, ~600MB)",
    description: "Best for older devices. Very fast but less smart."
  },
  {
    id: "gemma-2b-it-q4f16_1-MLC",
    name: "Gemma 2B (Balanced, ~1.4GB)",
    description: "Google's lightweight model. Good balance of speed and smarts."
  },
  {
    id: "Phi-3-mini-4k-instruct-q4f16_1-MLC",
    name: "Phi-3 Mini (Smartest, ~2.3GB)",
    description: "Microsoft's high capability small model. Requires decent GPU."
  }
];

export const initLocalLLM = async (modelId, onProgress) => {
  if (engine && currentModelId === modelId) {
    return engine;
  }

  try {
    // If engine exists but model changed, we might need to reload or create new engine
    // For simplicity, we'll create a new engine instance if the model changes
    engine = await CreateMLCEngine(
      modelId,
      { initProgressCallback: onProgress }
    );
    currentModelId = modelId;
    return engine;
  } catch (error) {
    console.error("Failed to initialize Local LLM:", error);
    throw error;
  }
};

export const generateLocalResponse = async (messages) => {
  if (!engine) {
    throw new Error("Engine not initialized. Call initLocalLLM first.");
  }

  try {
    const response = await engine.chat.completions.create({
      messages,
      temperature: 0.7,
      stream: false, // For simplicity in this version, we'll use non-streaming first
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Local LLM Generation Error:", error);
    throw error;
  }
};
