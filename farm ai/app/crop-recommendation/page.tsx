import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CropRecommendationForm from "@/components/crop-recommendation-form"

export default function CropRecommendationPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">AI Crop Recommendation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced AI analyzes your land details, local climate data, and market trends to recommend the most
              profitable crops for your farm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-700 text-lg">Data-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Recommendations based on soil analysis, climate patterns, and historical yield data.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-700 text-lg">Market-Aware</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Considers current and projected market prices to maximize your profit potential.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-700 text-lg">Personalized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tailored to your specific land characteristics and farming capabilities.
                </p>
              </CardContent>
            </Card>
          </div>

          <CropRecommendationForm />

          <div className="mt-12 bg-white rounded-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mb-3">
                  1
                </div>
                <h3 className="font-medium text-green-700 mb-2">Input Your Data</h3>
                <p className="text-gray-600 text-sm">Provide details about your land, soil type, and location.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mb-3">
                  2
                </div>
                <h3 className="font-medium text-green-700 mb-2">AI Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Our AI processes your data along with climate and market information.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mb-3">
                  3
                </div>
                <h3 className="font-medium text-green-700 mb-2">Get Recommendations</h3>
                <p className="text-gray-600 text-sm">
                  Receive personalized crop suggestions with expected yield and profit estimates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

