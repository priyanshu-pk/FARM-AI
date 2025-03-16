"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import { useTranslation } from "@/contexts/translation-context"
import { useState } from "react"

export default function ResourcesPage() {
  const { t } = useTranslation()
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setCharHistory] = useState([
    {
      role: "ai",
      content: "Hello! I'm your AI farming assistant. How can I help you today?",
    },
    {
      role: "user",
      content: "My tomato plants have yellow leaves. What could be the issue?",
    },
    {
      role: "ai",
      content:
        "Yellow leaves on tomato plants could indicate several issues: nutrient deficiency (especially nitrogen), overwatering, or early blight. Could you share a photo of the leaves?",
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    // Add user message to chat
    setCharHistory([...chatHistory, { role: "user", content: chatMessage }])

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your description, it sounds like your crops might be experiencing nutrient deficiency. I recommend testing your soil pH and adding appropriate fertilizers.",
        "This could be related to the recent weather patterns in your region. Consider adjusting your irrigation schedule to compensate for the increased humidity.",
        "From what you've described, this appears to be a common issue with that crop variety. Many farmers in your area have reported success with crop rotation and organic pest management.",
        "I'd recommend checking for signs of pest infestation. Look for small holes in the leaves or stems, and consider applying an organic pesticide if needed.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      setCharHistory((prev) => [...prev, { role: "ai", content: randomResponse }])
    }, 1000)

    setChatMessage("")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">{t("resources-title")}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("resources-subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">{t("farming-guides")}</CardTitle>
                <CardDescription>Step-by-step instructions for various farming techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="border-b border-gray-100 pb-2">
                    <Link href="#" className="text-green-600 hover:text-green-700">
                      Sustainable Farming Practices
                    </Link>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <Link href="#" className="text-green-600 hover:text-green-700">
                      Water Conservation Techniques
                    </Link>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <Link href="#" className="text-green-600 hover:text-green-700">
                      Organic Pest Management
                    </Link>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <Link href="#" className="text-green-600 hover:text-green-700">
                      Soil Health Improvement
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-green-600 hover:text-green-700">
                      Crop Rotation Strategies
                    </Link>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                  View All Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">{t("educational-videos")}</CardTitle>
                <CardDescription>Visual learning resources in multiple languages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <a
                      href="https://www.youtube.com/watch?v=ykCXfjzfaco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-gray-100 h-32 rounded-md flex items-center justify-center mb-2 overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/ykCXfjzfaco/mqdefault.jpg"
                          alt="Modern Irrigation Systems"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="text-white h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="font-medium">Modern Irrigation Systems</h3>
                      <p className="text-sm text-gray-500">Available in 5 languages</p>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.youtube.com/watch?v=UGBZnMtO5kA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-gray-100 h-32 rounded-md flex items-center justify-center mb-2 overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/UGBZnMtO5kA/mqdefault.jpg"
                          alt="Fertilizer Application Techniques"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="text-white h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="font-medium">Fertilizer Application Techniques</h3>
                      <p className="text-sm text-gray-500">Available in 8 languages</p>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.youtube.com/watch?v=VH3t-2a9Ow4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-gray-100 h-32 rounded-md flex items-center justify-center mb-2 overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/VH3t-2a9Ow4/mqdefault.jpg"
                          alt="Organic Farming Practices"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="text-white h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="font-medium">Organic Farming Practices</h3>
                      <p className="text-sm text-gray-500">Available in 6 languages</p>
                    </a>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                  Browse Video Library
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">{t("ai-assistant")}</CardTitle>
                <CardDescription>Get real-time advice from our AI chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-md p-4 mb-4 h-48 overflow-y-auto">
                  {chatHistory.map((message, index) =>
                    message.role === "ai" ? (
                      <div key={index} className="flex gap-2 mb-3">
                        <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                          AI
                        </div>
                        <div className="bg-green-50 p-2 rounded-md text-sm">{message.content}</div>
                      </div>
                    ) : (
                      <div key={index} className="flex gap-2 mb-3 justify-end">
                        <div className="bg-blue-50 p-2 rounded-md text-sm">{message.content}</div>
                        <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-700 flex-shrink-0">
                          You
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Ask a farming question..."
                    className="flex-1"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Educational Resources</h2>
            <div className="bg-white rounded-lg border border-green-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4">Crop Management Techniques</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Soil Preparation</h4>
                    <p className="text-gray-600 mb-4">
                      Proper soil preparation is crucial for successful crop growth. It involves testing soil pH, adding
                      organic matter, and ensuring proper drainage. The ideal soil pH for most crops is between 6.0 and
                      7.0, though some crops prefer more acidic or alkaline conditions.
                    </p>
                    <p className="text-gray-600 mb-4">Steps for soil preparation:</p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                      <li>Test your soil to determine pH and nutrient levels</li>
                      <li>Remove weeds, rocks, and debris from the planting area</li>
                      <li>Add organic matter such as compost or well-rotted manure</li>
                      <li>Till the soil to a depth of 8-12 inches to break up compaction</li>
                      <li>Level the soil surface and create proper drainage channels if needed</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Irrigation Management</h4>
                    <p className="text-gray-600 mb-4">
                      Efficient irrigation is essential for maximizing crop yield while conserving water. Different
                      crops have different water requirements, and these needs change throughout the growing season.
                    </p>
                    <p className="text-gray-600 mb-4">Common irrigation methods include:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>
                        <strong>Drip Irrigation:</strong> Delivers water directly to the plant's root zone, minimizing
                        evaporation and runoff. Ideal for row crops and orchards.
                      </li>
                      <li>
                        <strong>Sprinkler Irrigation:</strong> Simulates rainfall by spraying water over the crops. Good
                        for larger areas but less water-efficient than drip systems.
                      </li>
                      <li>
                        <strong>Flood Irrigation:</strong> Involves flooding the field with water. Traditional but less
                        efficient method still used for certain crops like rice.
                      </li>
                      <li>
                        <strong>Subsurface Irrigation:</strong> Delivers water directly to the root zone through buried
                        drip lines or pipes. Highly efficient but more complex to install.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Pest and Disease Management</h4>
                    <p className="text-gray-600 mb-4">
                      Integrated Pest Management (IPM) is a sustainable approach that combines different management
                      strategies and practices to grow healthy crops while minimizing the use of pesticides.
                    </p>
                    <p className="text-gray-600 mb-4">Key components of IPM include:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>
                        <strong>Prevention:</strong> Using resistant varieties, crop rotation, and sanitation practices
                      </li>
                      <li>
                        <strong>Monitoring:</strong> Regular scouting for pests and diseases to detect problems early
                      </li>
                      <li>
                        <strong>Biological Control:</strong> Using beneficial insects, microbes, or other organisms to
                        control pests
                      </li>
                      <li>
                        <strong>Cultural Control:</strong> Modifying the growing environment to reduce pest
                        establishment and reproduction
                      </li>
                      <li>
                        <strong>Chemical Control:</strong> Using pesticides selectively and only when necessary
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">{t("farming-community")}</h2>
            <p className="text-gray-600 text-center mb-8">
              Connect with other farmers and agricultural experts to share knowledge and experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">{t("discussion-forums")}</h3>
                <p className="text-gray-600 mb-4">Join topic-based discussions with farmers from around the country.</p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Browse Forums
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">{t("expert-connect")}</h3>
                <p className="text-gray-600 mb-4">Schedule one-on-one consultations with agricultural experts.</p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Find an Expert
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">{t("success-stories")}</h3>
                <p className="text-gray-600 mb-4">
                  Read about how other farmers have improved their yields and profits.
                </p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Read Stories
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Need Personalized Assistance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our team of agricultural experts is available to provide personalized guidance for your specific farming
              needs.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">Request Expert Consultation</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

