"use server"

// Llama API implementation (replacing Gemini)
const LLAMA_API_KEY = "2c3a2220-7202-43ef-9b45-ea7e53da9f2f";
const LLAMA_API_URL = "https://api.llama.cloud/v1/chat/completions";

// Function to get a response from Llama API
export async function getGeminiResponse(prompt: string) {
  try {
    // Prepare the request payload for Llama
    const payload = {
      model: "llama-3-8b-chat",
      messages: [
        {
          role: "system",
          content: "You are 'Aapka Sathi', an agricultural assistant specializing in Indian farming practices. Provide concise, practical advice tailored to Indian conditions. Focus on sustainable farming, crop management, pest control, and climate adaptation. Keep responses brief and actionable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 256
    };

    // Call the Llama API
    const response = await fetch(LLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LLAMA_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error status: ${response.status}, body: ${errorText}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    return { success: true, data: text };
  } catch (error) {
    console.error(`Error calling Llama API:`, error);
    // Fall back to local response system
    return useFallbackResponse(prompt);
  }
}

// Provide a fallback response when the API fails
function useFallbackResponse(prompt: string) {
  const lowercasePrompt = prompt.toLowerCase()
  
  // Set of common farming questions and their responses
  if (lowercasePrompt.includes("crop") && lowercasePrompt.includes("rotate")) {
    return {
      success: true,
      data: "Crop rotation is crucial for soil health. For Indian farming, try a three-year rotation with cereals, legumes, and vegetables. This helps break pest cycles and maintains soil nutrients naturally."
    }
  } else if (lowercasePrompt.includes("pest") || lowercasePrompt.includes("insect")) {
    return {
      success: true,
      data: "For sustainable pest management, try neem oil spray (mix 5ml neem oil with 1L water), or introduce natural predators like ladybugs. Check your crops early morning when pests are most visible."
    }
  } else if (lowercasePrompt.includes("irrigation") || lowercasePrompt.includes("water")) {
    return {
      success: true,
      data: "In Indian conditions, drip irrigation can save up to 80% water compared to flood irrigation. Consider collecting rainwater during monsoon season. For most crops, water early morning to reduce evaporation."
    }
  } else if (lowercasePrompt.includes("fertilizer") || lowercasePrompt.includes("organic")) {
    return {
      success: true,
      data: "Try vermicomposting with local earthworms. Mix crop residues, cow dung and kitchen waste in 3:1:1 ratio. Cover and keep moist for 45-60 days. This creates nutrient-rich organic fertilizer suitable for most crops."
    }
  } else if (lowercasePrompt.includes("weather") || lowercasePrompt.includes("rain") || lowercasePrompt.includes("monsoon")) {
    return {
      success: true,
      data: "Weather-resilient farming is becoming essential. Consider raised beds in flood-prone areas, and drought-resistant varieties like bajra in dry regions. Agroforestry can also provide microclimate benefits for your crops."
    }
  } else if (lowercasePrompt.includes("soil") || lowercasePrompt.includes("ph")) {
    return {
      success: true,
      data: "You can test soil pH using simple kits available at agricultural centers. Most crops grow best in slightly acidic to neutral soil (pH 6-7). For acidic soils, add agricultural lime; for alkaline soils, add organic matter like compost."
    }
  } else {
    return {
      success: true,
      data: "As your farming companion, I can help with questions about crop management, pest control, irrigation, and sustainable farming practices. Could you provide more details about your specific farming situation so I can give you more tailored advice?"
    }
  }
}

