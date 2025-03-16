"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
]

// More comprehensive translations
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    "crop-recommendation": "Crop Recommendation",
    "drone-mapping": "Drone Mapping",
    weather: "Weather",
    resources: "Resources",
    market: "Market",
    contact: "Contact",
    login: "Login",
    register: "Register",

    // Hero section
    "hero-title": "AI-Powered Farming Solutions",
    "hero-subtitle":
      "Maximize your profits and minimize losses with our cutting-edge AI technology designed specifically for farmers.",
    "join-now": "Join Now",
    "learn-more": "Learn More",
    "farmers-joined": "Farmers Joined",
    "yield-increase": "Yield Increase",
    "cost-reduction": "Cost Reduction",
    "ai-models": "AI Models",

    // Main sections
    "our-solutions": "Our AI-Powered Solutions",
    "weather-insights": "Weather & Climate Insights",
    "smart-farming": "Smart Farming Assistance",
    "market-insights": "Market & Storage Insights",
    "government-schemes": "Government Schemes & Education",

    // Crop recommendation
    "crop-recommendation-title": "AI Crop Recommendation",
    "crop-recommendation-subtitle":
      "Our advanced AI analyzes your land details, local climate data, and market trends to recommend the most profitable crops for your farm.",
    "data-driven": "Data-Driven",
    "market-aware": "Market-Aware",
    personalized: "Personalized",
    "enter-land-details": "Enter Your Land Details",
    "provide-information": "Provide information about your land to get personalized crop recommendations",

    // Weather
    "weather-title": "Weather & Climate Alerts",
    "weather-subtitle":
      "Stay ahead with accurate weather forecasts and predictive insights to plan your farming activities effectively.",
    "search-location": "Search location...",
    forecast: "5-Day Forecast",
    "weather-details": "Weather Details",
    humidity: "Humidity",
    precipitation: "Precipitation",
    "wind-speed": "Wind Speed",
    "farming-recommendations": "Farming Recommendations",

    // Resources
    "resources-title": "Smart Farming Resources",
    "resources-subtitle":
      "Access our comprehensive knowledge hub with guides, videos, and AI-powered assistance for modern farming techniques.",
    "farming-guides": "Farming Guides",
    "educational-videos": "Educational Videos",
    "ai-assistant": "AI Farming Assistant",
    "farming-community": "Farming Community",
    "discussion-forums": "Discussion Forums",
    "expert-connect": "Expert Connect",
    "success-stories": "Success Stories",

    // Market
    "market-title": "Market & Storage Insights",
    "market-subtitle":
      "Access real-time crop pricing and find optimal storage facilities to maximize your profits and reduce post-harvest losses.",
    "crop-prices": "Crop Prices",
    "storage-facilities": "Storage Facilities",
    "price-predictions": "Price Predictions",
    "market-insights": "Market Insights",

    // Drone mapping
    "drone-mapping-title": "Drone-Based Land Mapping",
    "drone-mapping-subtitle":
      "Our advanced drone technology provides detailed aerial analysis of your farmland, helping you make data-driven decisions.",
    "how-it-works": "How It Works",
    "drone-survey": "Drone Survey",
    "data-processing": "Data Processing",
    "analysis-reporting": "Analysis & Reporting",

    // Login/Register
    "login-title": "Login to FarmAI",
    "login-subtitle": "Enter your credentials to access your account",
    email: "Email",
    password: "Password",
    "forgot-password": "Forgot password?",
    "dont-have-account": "Don't have an account?",
    "register-now": "Register now",
    "register-title": "Create an Account",
    "register-subtitle": "Join thousands of farmers using our AI-powered platform",
    "full-name": "Full Name",
    "confirm-password": "Confirm Password",
    "phone-number": "Phone Number",
    "already-have-account": "Already have an account?",
    "login-instead": "Login instead",
    cancel: "Cancel",

    // Footer
    "footer-description": "Empowering farmers with AI-driven solutions for sustainable and profitable agriculture.",
    "quick-links": "Quick Links",
    "about-us": "About Us",
    services: "Services",
    support: "Support",
    "help-center": "Help Center",
    faqs: "FAQs",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    "contact-us": "Contact Us",
    "all-rights-reserved": "All rights reserved.",
  },
  hi: {
    // Navigation
    home: "होम",
    "crop-recommendation": "फसल अनुशंसा",
    "drone-mapping": "ड्रोन मैपिंग",
    weather: "मौसम",
    resources: "संसाधन",
    market: "बाज़ार",
    contact: "संपर्क",
    login: "लॉगिन",
    register: "पंजीकरण",

    // Hero section
    "hero-title": "एआई-संचालित कृषि समाधान",
    "hero-subtitle":
      "हमारी अत्याधुनिक एआई तकनीक के साथ अपने लाभ को अधिकतम करें और नुकसान को कम करें जो विशेष रूप से किसानों के लिए डिज़ाइन की गई है।",
    "join-now": "अभी जुड़ें",
    "learn-more": "और जानें",
    "farmers-joined": "किसान जुड़े",
    "yield-increase": "उपज वृद्धि",
    "cost-reduction": "लागत में कमी",
    "ai-models": "एआई मॉडल",

    // Main sections
    "our-solutions": "हमारे एआई-संचालित समाधान",
    "weather-insights": "मौसम और जलवायु अंतर्दृष्टि",
    "smart-farming": "स्मार्ट खेती सहायता",
    "market-insights": "बाज़ार और भंडारण अंतर्दृष्टि",
    "government-schemes": "सरकारी योजनाएँ और शिक्षा",

    // Crop recommendation
    "crop-recommendation-title": "एआई फसल अनुशंसा",
    "crop-recommendation-subtitle":
      "हमारा उन्नत एआई आपके भूमि विवरण, स्थानीय जलवायु डेटा और बाजार रुझानों का विश्लेषण करके आपके खेत के लिए सबसे लाभदायक फसलों की सिफारिश करता है।",
    "data-driven": "डेटा-संचालित",
    "market-aware": "बाजार-जागरूक",
    personalized: "व्यक्तिगत",
    "enter-land-details": "अपने भूमि विवरण दर्ज करें",
    "provide-information": "व्यक्तिगत फसल सिफारिशें प्राप्त करने के लिए अपनी भूमि के बारे में जानकारी प्रदान करें",

    // Weather
    "weather-title": "मौसम और जलवायु अलर्ट",
    "weather-subtitle":
      "अपनी कृषि गतिविधियों की प्रभावी योजना बनाने के लिए सटीक मौसम पूर्वानुमान और भविष्यवाणी अंतर्दृष्टि के साथ आगे रहें।",
    "search-location": "स्थान खोजें...",
    forecast: "5-दिन का पूर्वानुमान",
    "weather-details": "मौसम विवरण",
    humidity: "आर्द्रता",
    precipitation: "वर्षा",
    "wind-speed": "हवा की गति",
    "farming-recommendations": "खेती की सिफारिशें",

    // Resources
    "resources-title": "स्मार्ट खेती संसाधन",
    "resources-subtitle": "आधुनिक खेती तकनीकों के लिए गाइड, वीडियो और एआई-संचालित सहायता के साथ हमारे व्यापक ज्ञान केंद्र तक पहुंचें।",
    "farming-guides": "खेती गाइड",
    "educational-videos": "शैक्षिक वीडियो",
    "ai-assistant": "एआई खेती सहायक",
    "farming-community": "कृषि समुदाय",
    "discussion-forums": "चर्चा मंच",
    "expert-connect": "विशेषज्ञ कनेक्ट",
    "success-stories": "सफलता की कहानियां",

    // Market
    "market-title": "बाज़ार और भंडारण अंतर्दृष्टि",
    "market-subtitle":
      "अपने लाभ को अधिकतम करने और फसल कटाई के बाद के नुकसान को कम करने के लिए रीयल-टाइम फसल मूल्य निर्धारण और इष्टतम भंडारण सुविधाओं तक पहुंचें।",
    "crop-prices": "फसल मूल्य",
    "storage-facilities": "भंडारण सुविधाएं",
    "price-predictions": "मूल्य भविष्यवाणियां",
    "market-insights": "बाजार अंतर्दृष्टि",

    // Drone mapping
    "drone-mapping-title": "ड्रोन-आधारित भूमि मानचित्रण",
    "drone-mapping-subtitle":
      "हमारी उन्नत ड्रोन तकनीक आपके खेत का विस्तृत हवाई विश्लेषण प्रदान करती है, जिससे आपको डेटा-संचालित निर्णय लेने में मदद मिलती है।",
    "how-it-works": "यह कैसे काम करता है",
    "drone-survey": "ड्रोन सर्वेक्षण",
    "data-processing": "डेटा प्रोसेसिंग",
    "analysis-reporting": "विश्लेषण और रिपोर्टिंग",

    // Login/Register
    "login-title": "FarmAI में लॉगिन करें",
    "login-subtitle": "अपने खाते तक पहुंचने के लिए अपने क्रेडेंशियल दर्ज करें",
    email: "ईमेल",
    password: "पासवर्ड",
    "forgot-password": "पासवर्ड भूल गए?",
    "dont-have-account": "खाता नहीं है?",
    "register-now": "अभी पंजीकरण करें",
    "register-title": "खाता बनाएं",
    "register-subtitle": "हमारे एआई-संचालित प्लेटफॉर्म का उपयोग करने वाले हजारों किसानों से जुड़ें",
    "full-name": "पूरा नाम",
    "confirm-password": "पासवर्ड की पुष्टि करें",
    "phone-number": "फोन नंबर",
    "already-have-account": "पहले से ही खाता है?",
    "login-instead": "इसके बजाय लॉगिन करें",
    cancel: "रद्द करें",

    // Footer
    "footer-description": "किसानों को टिकाऊ और लाभदायक कृषि के लिए एआई-संचालित समाधानों के साथ सशक्त बनाना।",
    "quick-links": "त्वरित लिंक",
    "about-us": "हमारे बारे में",
    services: "सेवाएं",
    support: "सहायता",
    "help-center": "सहायता केंद्र",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    terms: "सेवा की शर्तें",
    privacy: "गोपनीयता नीति",
    "contact-us": "संपर्क करें",
    "all-rights-reserved": "सर्वाधिकार सुरक्षित।",
  },
  // Add more languages as needed
}

type TranslationContextType = {
  language: string
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export const useTranslation = () => useContext(TranslationContext)

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
    // Add a data attribute to the html element for CSS selectors
    document.documentElement.setAttribute("data-language", language)
  }, [language])

  const t = (key: string): string => {
    if (!translations[language]) {
      return translations.en[key] || key
    }
    return translations[language][key] || translations.en[key] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

