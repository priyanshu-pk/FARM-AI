"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getGeminiResponse } from "@/app/actions/gemini-actions"
import { Send, Loader2, X, MessageSquare, MinusCircle } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Client-side fallback responses if server actions fail completely
const clientFallbackResponses = [
  "Based on traditional farming wisdom, rotating crops helps maintain soil fertility and reduces pest problems.",
  "For organic pest management, neem oil extract is effective against many common pests while being safe for beneficial insects.",
  "Water management is crucial - consider collecting rainwater during monsoon season for use during dry periods.",
  "Traditional Indian companion planting techniques, like growing marigolds with vegetables, can reduce pest issues naturally.",
  "Mulching with locally available materials can help conserve soil moisture and reduce weed growth.",
  "Consider indigenous seed varieties that are well-adapted to local climate conditions and often more resistant to regional pests.",
  "For small-scale farming, vermicomposting provides excellent organic fertilizer with minimal investment.",
  "I recommend checking with your local agricultural extension office for specific advice tailored to your region's soil and climate conditions."
];

// Add specific short responses for quick feedback
const quickResponses = {
  "fertilizer": "Organic fertilizers like vermicompost are excellent for Indian soils. For most crops, a combination of compost and vermicompost provides balanced nutrition without chemical dependency.",
  "pest": "Neem oil spray is effective against most pests. Mix 20ml neem oil with a few drops of soap and 1L water. Apply every 7-10 days early morning or evening for best results.",
  "water": "Efficient water management is critical. Consider drip irrigation which can save up to 70% water compared to flood irrigation and directly targets plant roots.",
  "crop": "Selecting appropriate crops for your region's climate is crucial. Consider local varieties that have adapted to your specific conditions for better resilience.",
  "soil": "Understanding your soil type helps choose appropriate crops and amendments. Sandy soils need more organic matter, while clayey soils benefit from sand addition for better drainage.",
  "monsoon": "Prepare for monsoon by creating proper drainage channels, raised beds, and selecting water-resistant crop varieties like rice that thrive in high moisture.",
  "organic": "Organic farming improves soil health long-term. Start with proper crop rotation, green manuring, and integrating livestock for a sustainable farming system.",
  "weather": "Monitor weather forecasts regularly. Consider installing a simple rain gauge and thermometer on your farm to track local conditions that may differ from broader forecasts."
};

// Get a random response from the fallback list
const getRandomFallbackResponse = () => {
  const randomIndex = Math.floor(Math.random() * clientFallbackResponses.length);
  return clientFallbackResponses[randomIndex];
};

// Get a quick response based on keywords in the query
const getQuickResponse = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  for (const [keyword, response] of Object.entries(quickResponses)) {
    if (lowercaseQuery.includes(keyword)) {
      return response;
    }
  }
  return null;
};

export default function AapkaSathiChatbot() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "नमस्ते! मैं आपका साथी हूँ, आपका कृषि सहायक। मैं फसल प्रबंधन, मौसम, कीट नियंत्रण, और अन्य कृषि संबंधित प्रश्नों में आपकी सहायता कर सकता हूँ। आप मुझसे क्या पूछना चाहेंगे?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiFailCount, setApiFailCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Reset fail count when the chatbot is closed and reopened
  useEffect(() => {
    if (isOpen) {
      setApiFailCount(0)
    }
  }, [isOpen])

  // Cleanup abortController on unmount
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort()
      }
    }
  }, [abortController])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userInput = input.trim();
    
    // Add user message
    const userMessage = { role: "user" as const, content: userInput }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Abort previous request if it exists
    if (abortController) {
      abortController.abort()
    }

    // Create new abort controller for this request
    const newAbortController = new AbortController()
    setAbortController(newAbortController)

    // Check for a quick response based on keywords and immediately show it
    // while API call is happening in the background
    const quickResponse = getQuickResponse(userInput);
    let usedQuickResponse = false;

    if (quickResponse) {
      setTimeout(() => {
        // If we're still loading (API hasn't returned yet)
        if (isLoading) {
          setMessages((prev) => [...prev, { 
            role: "assistant", 
            content: quickResponse 
          }]);
          usedQuickResponse = true;
          setIsLoading(false);
          // Still continue with API call in background
        }
      }, 800); // Show quick response after a short delay for natural feeling
    }

    try {
      // Set a timeout to prevent waiting too long - increased to 8 seconds for Llama API
      const timeoutId = setTimeout(() => {
        if (abortController === newAbortController) {
          newAbortController.abort();
          throw new Error("Request timed out");
        }
      }, 8000);

      const response = await getGeminiResponse(userInput);
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);

      // If we've already shown a quick response, don't update the messages
      if (!usedQuickResponse) {
        if (response.success) {
          setMessages((prev) => [...prev, { role: "assistant", content: response.data || "" }])
          // Reset fail count on success
          setApiFailCount(0)
        } else {
          // Increment fail count and use fallback
          setApiFailCount(prev => prev + 1)
          throw new Error("API returned error")
        }
      }
    } catch (error) {
      console.error("Error getting response:", error)
      
      // If we didn't already use a quick response, use fallback
      if (!usedQuickResponse) {
        // Use client-side fallback
        const fallbackResponse = getRandomFallbackResponse()
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ])
      }

      // Increment fail count
      setApiFailCount(prev => prev + 1)
    } finally {
      setIsLoading(false)
      setAbortController(null)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-green-600 hover:bg-green-700 shadow-lg z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "w-72" : "w-80 sm:w-96 md:w-[450px]"}`}
    >
      <Card className="border-green-200 shadow-xl">
        <CardHeader className="bg-green-600 text-white rounded-t-lg py-3 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">
              {isMinimized ? "आपका साथी" : "आपका साथी (Your Companion)"}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-green-700 rounded-full p-0"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-green-700 rounded-full p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <CardDescription className="text-green-50 mt-1">
              Ask me anything about farming and agriculture
            </CardDescription>
          )}
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-4 max-h-[400px] overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-green-600 text-white"
                          : "bg-white border border-green-100 text-gray-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-white border border-green-100">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                        <p className="text-sm text-gray-500">Processing your question...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-3 border-t">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  placeholder="Type your farming question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

