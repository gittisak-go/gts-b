import { supabase } from './supabaseClient';
import { generateLocalResponse } from './localLLMService';

// Function to upload file to Supabase Storage
export const uploadDocument = async (file) => {
  if (!supabase) throw new Error("Supabase client not initialized. Check API keys.");
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { data, error } = await supabase.storage
      .from('knowledge-base') // You need to create this bucket in Supabase
      .upload(filePath, file);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// Function to call Local LLM
export const callLocalLLM = async (message, context = '') => {
  try {
    const messages = [
      { role: "system", content: `You are a helpful assistant. Use this context to answer: ${context}` },
      { role: "user", content: message }
    ];
    return await generateLocalResponse(messages);
  } catch (error) {
    console.error('Local LLM Error:', error);
    return "Error generating local response: " + error.message;
  }
};

// Function to call Gemini API
export const callGeminiAPI = async (apiKey, message, context = '') => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Context: ${context}\n\nUser: ${message}\n\nAssistant:`
          }]
        }]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "ขออภัย ระบบ AI ขัดข้องชั่วคราว (" + error.message + ")";
  }
};

// Function to call OpenAI API
export const callOpenAIAPI = async (apiKey, model, message, context = '') => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: `You are a helpful assistant. Use this context to answer: ${context}` },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "ขออภัย ระบบ AI ขัดข้องชั่วคราว (" + error.message + ")";
  }
};
