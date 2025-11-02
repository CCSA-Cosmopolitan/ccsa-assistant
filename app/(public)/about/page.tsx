import React from 'react'
import { Leaf, Target, Users, Award, BarChart3, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <div className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="grid h-12 w-12 place-items-center rounded-lg ring-1 ring-white/10 bg-white/5">
                <Leaf className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-[13px] uppercase tracking-[0.18em] text-slate-400">About</span>
                <span className="text-[20px] tracking-tight font-semibold text-white">CCSA FarmAI</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Empowering Nigerian farmers with 
              <span className="text-emerald-400"> AI‑driven agriculture</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're building the future of farming in Nigeria, combining cutting‑edge artificial intelligence 
              with deep agricultural expertise to help farmers maximize yields and farm sustainably.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <Target className="h-3 w-3 text-emerald-400" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Climate‑smart agriculture for a sustainable future
              </h2>
              <p className="text-lg text-slate-300">
                Our mission is to democratize access to advanced agricultural technology, making AI‑powered 
                farming insights available to every Nigerian farmer, regardless of farm size or technical expertise.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">10,000+</div>
                  <div className="text-sm text-slate-400">Farmers Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">25%</div>
                  <div className="text-sm text-slate-400">Average Yield Increase</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
                <BarChart3 className="h-8 w-8 text-emerald-400" />
                <h3 className="font-semibold text-white">Data‑Driven Insights</h3>
                <p className="text-sm text-slate-300">Advanced analytics for optimal farming decisions</p>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
                <MapPin className="h-8 w-8 text-emerald-400" />
                <h3 className="font-semibold text-white">Local Expertise</h3>
                <p className="text-sm text-slate-300">Tailored to Nigerian climate and soil conditions</p>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
                <Users className="h-8 w-8 text-emerald-400" />
                <h3 className="font-semibold text-white">Community Support</h3>
                <p className="text-sm text-slate-300">Connecting farmers across Nigeria</p>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 space-y-3">
                <Award className="h-8 w-8 text-emerald-400" />
                <h3 className="font-semibold text-white">Proven Results</h3>
                <p className="text-sm text-slate-300">Measurable improvements in productivity</p>
              </div>
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
                Ready to transform your farming?
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of Nigerian farmers who are already using AI to increase yields, 
                reduce costs, and farm more sustainably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/5 px-8 py-3">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage