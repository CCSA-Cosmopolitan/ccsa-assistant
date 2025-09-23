"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FileText,
  Code,
  Users,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Download,
  PlayCircle
} from "lucide-react"

export default function DocumentationPage() {
  const guides = [
    {
      title: "Getting Started",
      description: "Learn the basics of CCSA FarmAI and set up your account",
      icon: PlayCircle,
      href: "/docs/getting-started",
      difficulty: "Beginner",
      time: "10 min read"
    },
    {
      title: "Crop Analysis Guide",
      description: "How to use AI-powered crop disease detection and yield prediction",
      icon: FileText,
      href: "/docs/crop-analysis",
      difficulty: "Intermediate",
      time: "15 min read"
    },
    {
      title: "Farm Management",
      description: "Manage your farm data, track activities, and optimize operations",
      icon: Users,
      href: "/docs/farm-management",
      difficulty: "Intermediate",
      time: "20 min read"
    },
    {
      title: "API Integration",
      description: "Integrate CCSA FarmAI with your existing farming systems",
      icon: Code,
      href: "/docs/api-integration",
      difficulty: "Advanced",
      time: "25 min read"
    }
  ]

  const resources = [
    {
      title: "API Reference",
      description: "Complete API documentation for developers",
      icon: Code,
      href: "/docs/api-reference",
      type: "Technical"
    },
    {
      title: "Best Practices",
      description: "Learn farming best practices enhanced by AI",
      icon: Shield,
      href: "/docs/best-practices",
      type: "Guide"
    },
    {
      title: "Troubleshooting",
      description: "Common issues and their solutions",
      icon: Zap,
      href: "/docs/troubleshooting",
      type: "Support"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      icon: PlayCircle,
      href: "/docs/videos",
      type: "Video"
    }
  ]

  const faqs = [
    {
      question: "How accurate is the crop disease detection?",
      answer: "Our AI models achieve 95%+ accuracy in detecting common crop diseases, trained on extensive datasets from Nigerian farms."
    },
    {
      question: "Can I integrate CCSA FarmAI with my existing farm management software?",
      answer: "Yes, we provide REST APIs and webhooks for seamless integration with popular farm management platforms."
    },
    {
      question: "What crops are supported?",
      answer: "We currently support major Nigerian crops including maize, cassava, rice, yam, and various vegetables, with more being added regularly."
    },
    {
      question: "Is my farm data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and comply with Nigerian data protection regulations. Your data never leaves our secure servers."
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
              <BookOpen className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Documentation
            </h1>
          </div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about using CCSA FarmAI effectively. From getting started to advanced integrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Quick Start */}
        <div className="mb-16">
          <Card className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-emerald-400" />
                Quick Start Guide
              </CardTitle>
              <CardDescription className="text-slate-400">
                Get up and running with CCSA FarmAI in under 5 minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-400">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Create Account</h3>
                  <p className="text-slate-400 text-sm">Sign up and verify your email address</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-400">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Farm Data</h3>
                  <p className="text-slate-400 text-sm">Add your farm location and crop information</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-400">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Start Analyzing</h3>
                  <p className="text-slate-400 text-sm">Use AI tools to optimize your farming</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Guides */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">User Guides</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Step-by-step guides to help you make the most of CCSA FarmAI's features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <guide.icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{guide.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {guide.difficulty}
                          </Badge>
                          <span className="text-xs text-slate-400">{guide.time}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 mb-4">
                    {guide.description}
                  </CardDescription>
                  <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 p-0 h-auto">
                    Read Guide →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Resources</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Additional resources to support your farming journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <resource.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                    {resource.type}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-400 mb-4">
                    {resource.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                    View Resource
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="mb-16">
          <Card className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Download className="h-6 w-6 text-emerald-400" />
                Downloads & Tools
              </CardTitle>
              <CardDescription className="text-slate-400">
                Download mobile apps, API clients, and other useful tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-slate-700/50 rounded-lg">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mobile App</h3>
                  <p className="text-slate-400 text-sm mb-4">Take CCSA FarmAI with you in the field</p>
                  <Button variant="outline" size="sm" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                    Download APK
                  </Button>
                </div>
                <div className="text-center p-6 border border-slate-700/50 rounded-lg">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">API Client</h3>
                  <p className="text-slate-400 text-sm mb-4">Python SDK for easy integration</p>
                  <Button variant="outline" size="sm" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                    pip install
                  </Button>
                </div>
                <div className="text-center p-6 border border-slate-700/50 rounded-lg">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
                  <p className="text-slate-400 text-sm mb-4">Offline PDF documentation</p>
                  <Button variant="outline" size="sm" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Quick answers to common questions about CCSA FarmAI
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="text-center">
          <Card className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Need More Help?</h3>
              <p className="text-slate-400 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                    View Features
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