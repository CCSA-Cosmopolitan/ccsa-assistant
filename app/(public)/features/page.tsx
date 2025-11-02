"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Camera,
  BarChart3,
  Cloud,
  Smartphone,
  Shield,
  Zap,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Heart,
  Stethoscope,
  Thermometer,
  Activity,
  Pill,
  Syringe
} from "lucide-react"

export default function FeaturesPage() {
  const currentFeatures = [
    {
      icon: Camera,
      title: "AI Crop Disease Detection",
      description: "Upload photos of your crops and get instant disease diagnosis with treatment recommendations.",
      benefits: ["95%+ accuracy", "Supports 50+ crop diseases", "Treatment recommendations", "Works offline"],
      category: "AI Analysis"
    },
    {
      icon: BarChart3,
      title: "Yield Prediction",
      description: "Predict crop yields based on weather patterns, soil conditions, and historical data.",
      benefits: ["Weather integration", "Soil analysis", "Historical trends", "Risk assessment"],
      category: "Analytics"
    },
    {
      icon: Cloud,
      title: "Weather Forecasting",
      description: "Get accurate weather forecasts and farming recommendations based on local conditions.",
      benefits: ["7-day forecasts", "Pest alerts", "Irrigation timing", "Local accuracy"],
      category: "Weather"
    },
    {
      icon: MapPin,
      title: "Farm Mapping",
      description: "Create detailed maps of your farm with GPS coordinates and field boundaries.",
      benefits: ["GPS mapping", "Field boundaries", "Area calculation", "Multi-field support"],
      category: "Management"
    },
    {
      icon: Calendar,
      title: "Farming Calendar",
      description: "Plan your farming activities with AI-powered scheduling and reminders.",
      benefits: ["Activity planning", "Smart reminders", "Seasonal guidance", "Progress tracking"],
      category: "Planning"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Get real-time market prices and trends for better selling decisions.",
      benefits: ["Live prices", "Price trends", "Market insights", "Export guidance"],
      category: "Business"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Access all features on-the-go with our native mobile applications.",
      benefits: ["Offline mode", "Camera integration", "Push notifications", "Easy sharing"],
      category: "Mobile"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Your farm data is protected with enterprise-grade security and privacy.",
      benefits: ["End-to-end encryption", "Local storage", "Privacy controls", "Regular backups"],
      category: "Security"
    }
  ]

  const upcomingFeatures = [
    {
      icon: Heart,
      title: "Livestock Doctor",
      description: "AI-powered veterinary assistant for livestock health monitoring and disease prevention.",
      timeline: "Q1 2025",
      status: "In Development",
      details: [
        "Symptom analysis for cattle, goats, and poultry",
        "Vaccination scheduling and reminders",
        "Feed optimization recommendations",
        "Health record management",
        "Emergency veterinary contacts"
      ]
    },
    {
      icon: Stethoscope,
      title: "Soil Health Monitoring",
      description: "Advanced soil analysis with nutrient deficiency detection and amendment recommendations.",
      timeline: "Q2 2025",
      status: "Planning",
      details: [
        "pH level monitoring",
        "Nutrient analysis (NPK)",
        "Organic matter content",
        "Soil texture classification",
        "Amendment recommendations"
      ]
    },
    {
      icon: Activity,
      title: "IoT Sensor Integration",
      description: "Connect smart sensors for real-time monitoring of soil moisture, temperature, and humidity.",
      timeline: "Q3 2025",
      status: "Research",
      details: [
        "Automated irrigation control",
        "Climate-controlled storage",
        "Pest detection sensors",
        "Yield monitoring devices",
        "Energy-efficient farming"
      ]
    },
    {
      icon: Pill,
      title: "Smart Pest Control",
      description: "AI-driven pest identification and eco-friendly control recommendations.",
      timeline: "Q4 2025",
      status: "Research",
      details: [
        "Pest species identification",
        "Biological control methods",
        "Integrated pest management",
        "Chemical alternatives",
        "Environmental impact assessment"
      ]
    }
  ]

  const testimonials = [
    {
      name: "Ahmadu Bello",
      location: "Kano State",
      crop: "Maize Farmer",
      rating: 5,
      text: "CCSA FarmAI helped me identify maize streak virus early, saving my entire harvest. The treatment recommendations were spot-on!"
    },
    {
      name: "Fatima Ibrahim",
      location: "Kaduna State",
      crop: "Cassava Farmer",
      rating: 5,
      text: "The yield prediction feature helped me plan my sales better. I increased my profits by 30% this season."
    },
    {
      name: "John Okafor",
      location: "Anambra State",
      crop: "Rice Farmer",
      rating: 5,
      text: "Weather forecasts are incredibly accurate. I can now plan my irrigation and harvesting schedules perfectly."
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A0E13]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(16,185,129,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(99,102,241,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_90%,rgba(14,165,233,0.10),transparent_60%)]"></div>
      </div>

      {/* Header */}
      <div className="relative py-24 px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Powerful <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Features</span>
            </h1>
          </div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover how CCSA FarmAI revolutionizes farming with cutting-edge AI technology designed specifically for Nigerian farmers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Current Features */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Current Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Powerful tools that are already helping thousands of Nigerian farmers optimize their operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentFeatures.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <Badge variant="secondary" className="text-xs w-fit mb-2">
                    {feature.category}
                  </Badge>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 mb-4">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Exciting new features we're developing to make farming even smarter and more profitable
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-7 w-7 text-emerald-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-400">
                            {feature.status}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {feature.timeline}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 mb-6">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white">What's Included:</h4>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What Farmers Say</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Real stories from Nigerian farmers who are already using CCSA FarmAI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-slate-400 italic">
                    "{testimonial.text}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-slate-400 text-sm">{testimonial.location}</p>
                      <p className="text-emerald-400 text-sm">{testimonial.crop}</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mb-20">
          <Card className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-4">Why Choose CCSA FarmAI?</CardTitle>
              <CardDescription className="text-slate-400 max-w-2xl mx-auto">
                See how we compare to traditional farming methods and other solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Traditional Methods</h3>
                  <ul className="text-slate-400 text-sm space-y-2">
                    <li>• Manual disease identification</li>
                    <li>• Weather guesswork</li>
                    <li>• Limited market access</li>
                    <li>• Paper-based records</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Other Solutions</h3>
                  <ul className="text-slate-400 text-sm space-y-2">
                    <li>• Generic global tools</li>
                    <li>• Not Nigeria-specific</li>
                    <li>• Expensive subscriptions</li>
                    <li>• Complex interfaces</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">CCSA FarmAI</h3>
                  <ul className="text-slate-400 text-sm space-y-2">
                    <li>• AI-powered accuracy</li>
                    <li>• Nigeria-focused data</li>
                    <li>• Affordable & accessible</li>
                    <li>• Farmer-friendly design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Farming?</h3>
              <p className="text-slate-400 mb-6">
                Join thousands of Nigerian farmers who are already using CCSA FarmAI to increase yields and reduce losses.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Request Early Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}