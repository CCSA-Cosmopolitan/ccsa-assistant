"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Leaf } from "lucide-react"
import { useSession } from "next-auth/react"
import { getCountryByName, getCurrencySymbol } from "@/lib/countries"
import { getUserCountry } from "@/actions/location"

interface PricingPlan {
  name: string
  description: string
  price: number
  features: string[]
  popular?: boolean
}

export default function PricingPage() {
  const { data: session } = useSession()
  const [currency, setCurrency] = useState("NGN")
  const [currencySymbol, setCurrencySymbol] = useState("₦")
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        // If user is logged in, use their stored country
        if (session?.user?.country) {
          const country = getCountryByName(session.user.country)
          setCurrency(country.currency)
          setCurrencySymbol(getCurrencySymbol(country.currency))
          generatePlans(country.currency)
          setIsLoading(false)
          return
        }

        // Otherwise, try to detect country by IP
        const result = await getUserCountry()

        if (result.country) {
          const country = getCountryByName(result.country)
          setCurrency(country.currency)
          setCurrencySymbol(getCurrencySymbol(country.currency))
          generatePlans(country.currency)
        } else {
          // Default to NGN if detection fails
          setCurrency("NGN")
          setCurrencySymbol("₦")
          generatePlans("NGN")
        }
      } catch (error) {
        console.error("Error fetching user country:", error)
        // Default to NGN if detection fails
        setCurrency("NGN")
        setCurrencySymbol("₦")
        generatePlans("NGN")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserCountry()
  }, [session])

  const generatePlans = (currency: string) => {
    // Exchange rates (simplified)
    const rates: Record<string, number> = {
      NGN: 1,
      USD: 0.00067, // 1 NGN = 0.00067 USD
      GBP: 0.00053, // 1 NGN = 0.00053 GBP
      EUR: 0.00062, // 1 NGN = 0.00062 EUR
      // Add more currencies as needed
    }

    const rate = rates[currency] || rates.USD

    // Base prices in NGN
    const basePlans: PricingPlan[] = [
      {
        name: "Free",
        description: "Basic access to AI features",
        price: 0,
        features: ["3 AI prompts per month", "Basic farm analysis", "Community support"],
      },
      {
        name: "Standard",
        description: "For serious farmers",
        price: 5000,
        features: ["Unlimited AI prompts", "Advanced farm analysis", "Crop and soil analysis", "Email support"],
        popular: true,
      },
      {
        name: "Premium",
        description: "For professional farmers",
        price: 12000,
        features: [
          "Everything in Standard",
          "Priority processing",
          "Personalized recommendations",
          "24/7 priority support",
        ],
      },
    ]

    // Convert prices to selected currency
    const convertedPlans = basePlans.map((plan) => ({
      ...plan,
      price: plan.price === 0 ? 0 : Math.round(plan.price * rate),
    }))

    setPlans(convertedPlans)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
            >
              About Us
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start with our free tier and upgrade as your needs grow
                </p>
              </div>

              {!isLoading && <div className="text-sm text-muted-foreground">Prices shown in {currency}</div>}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`flex flex-col ${
                      plan.popular
                        ? "border-primary/30 bg-primary/5 shadow-md relative overflow-hidden"
                        : "border-border/40 shadow-sm transition-all hover:shadow-md"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-4">
                        <span className="text-4xl font-bold">
                          {plan.price === 0 ? "Free" : `${currencySymbol}${plan.price.toLocaleString()}`}
                        </span>
                        {plan.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                      </div>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href={session ? "/wallet" : "/register"} className="w-full">
                        <Button className="w-full">{plan.price === 0 ? "Get Started" : "Subscribe"}</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-secondary/30">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CCSA FarmAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
