import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function DroneMappingPage() {
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
            <h1 className="text-3xl font-bold text-green-800 mb-4">Drone-Based Land Mapping</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced drone technology provides detailed aerial analysis of your farmland, helping you make
              data-driven decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">How It Works</h2>
              <p className="text-gray-600 mb-6">
                Our drones capture high-resolution imagery of your farmland, which is then analyzed using advanced AI
                algorithms to provide insights on soil health, crop conditions, and more.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-700 font-bold">1</div>
                  <div>
                    <h3 className="font-medium text-green-800">Drone Survey</h3>
                    <p className="text-gray-600">
                      Our trained operators fly drones over your farmland to capture detailed imagery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-700 font-bold">2</div>
                  <div>
                    <h3 className="font-medium text-green-800">Data Processing</h3>
                    <p className="text-gray-600">
                      The captured imagery is processed using our AI algorithms to extract valuable insights.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-700 font-bold">3</div>
                  <div>
                    <h3 className="font-medium text-green-800">Analysis & Reporting</h3>
                    <p className="text-gray-600">
                      You receive detailed reports with actionable insights about your farmland.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-green-600 hover:bg-green-700">Schedule a Drone Survey</Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Drone mapping farmland"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Soil Health Analysis</CardTitle>
                <CardDescription>Identify soil nutrient levels and deficiencies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our drones use multispectral imaging to analyze soil health, identifying areas with nutrient
                  deficiencies or excess.
                </p>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Soil health map"
                  className="w-full h-40 object-cover rounded-md"
                />
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Crop Health Monitoring</CardTitle>
                <CardDescription>Early detection of crop stress and disease</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Identify areas of crop stress, disease, or pest infestation before they become visible to the naked
                  eye.
                </p>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Crop health visualization"
                  className="w-full h-40 object-cover rounded-md"
                />
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Water Management</CardTitle>
                <CardDescription>Optimize irrigation and identify drainage issues</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Detect areas with excess water or drought stress to optimize irrigation and improve drainage systems.
                </p>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Water management map"
                  className="w-full h-40 object-cover rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          <div className="bg-green-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Benefits of Drone Mapping</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">Precision Farming</h3>
                <p className="text-gray-600">Apply inputs only where needed, reducing waste and costs.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">Early Problem Detection</h3>
                <p className="text-gray-600">Identify issues before they become visible to the naked eye.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">Time Savings</h3>
                <p className="text-gray-600">Survey large areas quickly compared to manual inspection.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-green-700 mb-2">Data-Driven Decisions</h3>
                <p className="text-gray-600">Make farming decisions based on accurate, real-time data.</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to Map Your Farm?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our drone mapping services are available across multiple regions. Schedule a survey today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">Schedule a Survey</Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                View Sample Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

