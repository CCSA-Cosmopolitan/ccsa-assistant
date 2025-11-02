import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Leaf, Sparkles, Star } from "lucide-react"

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for trying out CCSA FarmAI",
    price: "₦0",
    period: "forever",
    features: [
      "3 AI consultations per month",
      "Basic crop recommendations",
      "Community support",
      "Mobile app access",
      "Basic weather insights"
    ],
    cta: "Get Started",
    href: "/register",
    popular: false
  },
  {
    name: "Standard",
    description: "Ideal for small to medium farms",
    price: "₦5,000",
    period: "per month",
    features: [
      "Unlimited AI consultations",
      "Advanced crop & soil analysis",
      "Real-time weather alerts",
      "Pest & disease detection",
      "Yield optimization reports",
      "Email support",
      "Farm management tools"
    ],
    cta: "Start Trial",
    href: "/register",
    popular: true
  },
  {
    name: "Premium",
    description: "For large farms and commercial operations",
    price: "₦12,000",
    period: "per month",
    features: [
      "Everything in Standard",
      "Priority AI processing",
      "Custom farm insights",
      "Satellite imagery analysis",
      "Expert consultation calls",
      "24/7 priority support",
      "API access",
      "Multi-farm management"
    ],
    cta: "Contact Sales",
    href: "/register",
    popular: false
  }
]

export default function PricingPage() {
  return (
    <div className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <Star className="h-3 w-3 text-emerald-400" />
              Simple, transparent pricing
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Choose the right plan for
              <span className="text-emerald-400"> your farm</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Start with our free tier and scale as your farming operation grows. 
              All plans include our core AI-powered agricultural insights.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ring-1 transition-all hover:ring-white/20 ${
                  plan.popular
                    ? "bg-white/10 ring-emerald-400/30 scale-105"
                    : "bg-white/5 ring-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                    <p className="text-slate-400 mt-1">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                    <Link href={plan.href}>
                      <Button 
                        className={`w-full ${
                          plan.popular
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/20"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm">
              All plans include a 14-day free trial. No credit card required. Cancel anytime.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <span>✓ Money-back guarantee</span>
              <span>✓ Local Nigerian support</span>
              <span>✓ Mobile & web access</span>
              <span>✓ Regular feature updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-gradient-to-b from-white/10 to-transparent ring-1 ring-white/15 p-2">
            <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need a custom solution?
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                We offer enterprise solutions for large agricultural operations, cooperatives, 
                and government programs. Contact us to discuss your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                  Contact Sales
                </Button>
                <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/5 px-8 py-3">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
