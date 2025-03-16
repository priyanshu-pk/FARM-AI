"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type WeatherData = {
  day: string
  temp: number
  condition: "sunny" | "cloudy" | "rainy" | "windy"
  humidity: number
  precipitation: number
  wind: number
}

// Fallback mock data in case API fails
const mockWeatherData: WeatherData[] = [
  { day: "Today", temp: 28, condition: "sunny", humidity: 65, precipitation: 0, wind: 8 },
  { day: "Tomorrow", temp: 26, condition: "cloudy", humidity: 70, precipitation: 20, wind: 12 },
  { day: "Wednesday", temp: 24, condition: "rainy", humidity: 85, precipitation: 60, wind: 15 },
  { day: "Thursday", temp: 25, condition: "windy", humidity: 60, precipitation: 10, wind: 25 },
  { day: "Friday", temp: 27, condition: "sunny", humidity: 55, precipitation: 0, wind: 10 },
]

// Helper to get the day name from date
const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

// Map WMO weather codes to our condition types
// https://open-meteo.com/en/docs/weather-api
const mapWeatherCode = (code: number): "sunny" | "cloudy" | "rainy" | "windy" => {
  // Clear sky or mainly clear
  if (code === 0 || code === 1) return "sunny";
  // Partly cloudy, cloudy, very cloudy
  if (code === 2 || code === 3) return "cloudy";
  // Fog, depositing rime fog
  if (code >= 45 && code <= 48) return "cloudy";
  // Drizzle or rain
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rainy";
  // Snow, snow grains, snow showers
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "cloudy";
  // Thunderstorm
  if (code >= 95 && code <= 99) return "rainy";
  
  return "cloudy";
};

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-8 w-8 text-amber-500" />
    case "cloudy":
      return <Cloud className="h-8 w-8 text-gray-500" />
    case "rainy":
      return <CloudRain className="h-8 w-8 text-blue-500" />
    case "windy":
      return <Wind className="h-8 w-8 text-cyan-500" />
    default:
      return <Sun className="h-8 w-8 text-amber-500" />
  }
}

export default function WeatherWidget() {
  const [location, setLocation] = useState("New Delhi, India")
  const [searchLocation, setSearchLocation] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData[]>(mockWeatherData)
  const [selectedDay, setSelectedDay] = useState("Today")
  const [isLoading, setIsLoading] = useState(false)
  const [coordinates, setCoordinates] = useState({ latitude: 28.6139, longitude: 77.2090 }) // Default: New Delhi

  // Geocode a location name to coordinates
  const geocodeLocation = async (locationName: string): Promise<{latitude: number, longitude: number} | null> => {
    try {
      // Using Open-Meteo Geocoding API
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return {
          latitude: data.results[0].latitude,
          longitude: data.results[0].longitude
        };
      }
      return null;
    } catch (error) {
      console.error("Error geocoding location:", error);
      return null;
    }
  };

  // Fetch weather data from Open-Meteo API
  const fetchWeatherData = async (loc: string) => {
    setIsLoading(true);
    try {
      // Step 1: Geocode the location to get coordinates
      const coords = await geocodeLocation(loc);
      
      if (coords) {
        setCoordinates(coords);
        
        // Step 2: Fetch weather data using the coordinates
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?` +
          `latitude=${coords.latitude}&longitude=${coords.longitude}` +
          `&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,precipitation_probability_max,wind_speed_10m_max,weather_code` +
          `&timezone=auto&forecast_days=5`
        );
        
        const data = await response.json();
        
        if (data.daily) {
          // Transform API data to our format
          const transformedData: WeatherData[] = data.daily.time.map((date: string, index: number) => {
            const weatherCode = data.daily.weather_code[index];
            return {
              day: getDayName(date),
              temp: Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2),
              condition: mapWeatherCode(weatherCode),
              humidity: data.daily.relative_humidity_2m_max[index],
              precipitation: data.daily.precipitation_probability_max[index],
              wind: Math.round(data.daily.wind_speed_10m_max[index])
            };
          });
          
          setWeatherData(transformedData);
          setLocation(loc);
        } else {
          throw new Error("Invalid weather data format");
        }
      } else {
        throw new Error("Could not geocode location");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Fallback to mock data
      setWeatherData(mockWeatherData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation)
      setSearchLocation("")
    }
  }

  const selectedDayData = weatherData.find((data) => data.day === selectedDay) || weatherData[0]

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <form onSubmit={handleLocationSearch} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
          <Button type="submit" className="bg-white text-blue-500 hover:bg-white/90" disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </form>
        <h3 className="text-xl font-bold mb-4">{location}</h3>
        <div className="flex items-center gap-4">
          {getWeatherIcon(selectedDayData.condition)}
          <div>
            <div className="text-4xl font-bold">{selectedDayData.temp}°C</div>
            <div className="capitalize">{selectedDayData.condition}</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="forecast" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
            <TabsTrigger value="details">Weather Details</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="forecast" className="p-6">
          <div className="grid grid-cols-5 gap-2">
            {weatherData.map((data) => (
              <div
                key={data.day}
                className={`text-center p-2 rounded-lg cursor-pointer ${
                  selectedDay === data.day ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDay(data.day)}
              >
                <div className="text-sm font-medium">{data.day}</div>
                <div className="my-2 flex justify-center">{getWeatherIcon(data.condition)}</div>
                <div className="text-lg font-bold">{data.temp}°C</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Humidity</div>
                  <div className="text-lg font-bold">{selectedDayData.humidity}%</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Precipitation</div>
                  <div className="text-lg font-bold">{selectedDayData.precipitation}%</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Wind Speed</div>
                  <div className="text-lg font-bold">{selectedDayData.wind} km/h</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Farming Recommendations</h4>
            <p className="text-gray-600">
              {selectedDayData.condition === "sunny" &&
                "Ideal conditions for harvesting. Consider irrigation in the evening."}
              {selectedDayData.condition === "cloudy" &&
                "Good conditions for field work and planting. Monitor humidity levels."}
              {selectedDayData.condition === "rainy" && "Postpone spraying and harvesting. Check drainage systems."}
              {selectedDayData.condition === "windy" &&
                "Avoid spraying pesticides. Secure any loose structures or coverings."}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-blue-700">
            <span className="font-medium">AI Prediction:</span> {selectedDayData.precipitation > 30 ? "Rainfall expected. Consider adjusting your farming schedule." : "Weather conditions look favorable for field work."}
          </div>
          <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded">
            View Detailed Forecast
          </button>
        </div>
      </div>
    </div>
  )
}

