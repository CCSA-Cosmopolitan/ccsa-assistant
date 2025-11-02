"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Loader2, ArrowRight, Mail, Users, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RequestAccessPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email address is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Access requested successfully!",
          description: "We'll notify you when CCSA FarmAI is ready for launch.",
        })
      } else {
        setError(data.message || "Something went wrong")
        toast({
          title: "Request Failed",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Request access error:", error)
      setError("Something went wrong. Please try again.")
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(16,185,129,0.12),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(99,102,241,0.12),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_90%,rgba(14,165,233,0.10),transparent_60%)]"></div>
        </div>
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-20 blur-sm"></div>
                <div className="relative rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                CCSA FarmAI
              </span>
            </Link>
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Check your email!</h2>
            <p className="mt-2 text-slate-400">
              We've received your request for early access to CCSA FarmAI
            </p>
          </div>
          <Card className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-slate-300">
                  Thank you for your interest in CCSA FarmAI! We're currently in private beta and will notify you as soon as we open up access.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>Expected launch: Q1 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center">
            <p className="text-slate-400">
              Already have access?{" "}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-slate-500 mt-4">
              © 2024 CCSA FarmAI. Built for Nigerian farmers.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(16,185,129,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(99,102,241,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_90%,rgba(14,165,233,0.10),transparent_60%)]"></div>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-20 blur-sm"></div>
              <div className="relative rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              CCSA FarmAI
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white">Request Early Access</h2>
          <p className="mt-2 text-slate-400">
            Join the waitlist for exclusive early access to CCSA FarmAI
          </p>
        </div>

        <Card className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Join the Waitlist</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Be among the first Nigerian farmers to experience AI-powered farming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
                  placeholder="Enter your email address"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Requesting access...
                  </>
                ) : (
                  <>
                    Request Early Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="space-y-3 mb-6">
                <p className="text-sm text-slate-400 font-medium">What you'll get:</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <Users className="h-4 w-4 text-emerald-400" />
                    <span>Exclusive early access before public launch</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <span>Direct updates on new features and improvements</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span>Priority support and feedback opportunities</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-slate-400">
                  Already have access?{" "}
                  <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            © 2024 CCSA FarmAI. Built for Nigerian farmers.
          </p>
        </div>
      </div>
    </div>
  )
}
