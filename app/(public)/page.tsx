import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Leaf, Zap, BarChart3, MessageSquare, Bot, ImageUp, FlaskRound, Target, Activity, Shield, Sparkles, PlayCircle, MapPin, Languages, ShieldCheck, Droplets, FlaskConical, Sprout, CheckCircle2, Map, Beaker, Tractor, ThermometerSun } from "lucide-react"
import Image from "next/image"
import logoGreen from '@/public/green-cosmo.png'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0E13] text-slate-200 selection:bg-emerald-500/30 selection:text-slate-50">
      {/* Backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(16,185,129,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(99,102,241,0.12),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_90%,rgba(14,165,233,0.10),transparent_60%)]"></div>
      </div>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 pt-8 md:pt-12">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 xl:col-span-7">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
                  <span className="font-medium">New</span>
                  <span className="text-slate-400">AI‑Powered Farming Solutions</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-white">
                  CCSA FarmAI
                </h1>
                <p className="mt-3 text-lg text-slate-300">
                  AI built on real soil chemistry across Nigerian locations—helping you maximize yields, reduce costs, and farm sustainably with up to
                  <span className="text-emerald-400 font-semibold"> 99% accuracy</span>.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-5 py-3 text-sm font-semibold hover:bg-slate-100 transition-colors">
                    <Sparkles className="h-4 w-4" />
                    Request Access
                  </Link>
                  <a href="#features" className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-slate-200 ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition-colors">
                    <PlayCircle className="h-4 w-4" />
                    Learn More
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-[12px] ring-1 ring-white/10">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-slate-300">Location‑aware soil chemistry</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-[12px] ring-1 ring-white/10">
                    <Languages className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-slate-300">Yorùbá, Igbo, Hausa &amp; Pidgin</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-[12px] ring-1 ring-white/10">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-slate-300">Privacy‑first</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 xl:col-span-5">
                {/* Dashboard preview card */}
                <div className="relative rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2">
                  <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
                        <p className="text-[13px] text-slate-300">Farm AI Dashboard</p>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-slate-400">
                        <Droplets className="h-4 w-4" />
                        <span>Rainfall: 12mm</span>
                        <span className="text-slate-600">|</span>
                        <span>UV: Moderate</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Droplets className="h-4 w-4 text-emerald-400" />
                            <span className="text-[12px]">Soil Moisture</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold tracking-tight text-white">22%</p>
                          <p className="text-[11px] text-emerald-300/80">Optimal</p>
                        </div>
                        <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-2 text-slate-300">
                            <FlaskConical className="h-4 w-4 text-emerald-400" />
                            <span className="text-[12px]">Soil pH</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold tracking-tight text-white">6.4</p>
                          <p className="text-[11px] text-slate-400">Balanced</p>
                        </div>
                        <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Sprout className="h-4 w-4 text-emerald-400" />
                            <span className="text-[12px]">NDVI</span>
                          </div>
                          <p className="mt-1 text-lg font-semibold tracking-tight text-white">0.73</p>
                          <p className="text-[11px] text-emerald-300/80">Healthy</p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-semibold tracking-tight text-white">Yield Forecast</h3>
                            <p className="text-[12px] text-slate-400">Next 12 weeks (maize, Kaduna)</p>
                          </div>
                          <div className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 ring-1 ring-emerald-500/20">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            <span className="text-[12px] text-emerald-300">99% model confidence</span>
                          </div>
                        </div>
                        <div className="mt-3 overflow-hidden rounded-md bg-[#0C131A] ring-1 ring-white/5">
                          <div className="p-2">
                            <div className="relative h-20 w-full flex items-center justify-center">
                              <div className="text-[11px] text-slate-400">Yield chart visualization</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-white/5 px-3 py-2">
                            <div className="text-[12px] text-slate-400">Soil &amp; weather co‑variates tuned by region</div>
                            <div className="inline-flex items-center gap-1 text-[12px] text-slate-300">
                              <Map className="h-4 w-4 text-emerald-400" />
                              <span>Kaduna North</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <Link href="/farmers-assistant" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-400 text-slate-900 px-4 py-2 text-sm font-semibold transition-colors">
                          <Bot className="h-4 w-4" />
                          Ask the AI Assistant
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link href="/crop-analyzer" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 ring-1 ring-white/10 px-4 py-2 text-sm font-medium transition-colors">
                          <ImageUp className="h-4 w-4" />
                          Upload Crop Image
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[12px] text-slate-400">
                  Data sources: soil chemistry panels, micro‑climate models, satellite vegetation indices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl tracking-tight font-semibold text-white">AI‑Powered Farming Solutions</h2>
                <p className="mt-2 text-slate-300">Our suite of AI tools helps you make data‑driven decisions for your farm.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[12px] text-slate-400">
                <Activity className="h-4 w-4 text-emerald-400" />
                <span>Real‑time insights</span>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Farmers Assistant */}
              <div className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                    <Bot className="h-4.5 w-4.5 text-emerald-400" />
                  </div>
                  <span className="text-[11px] text-emerald-300/90">Assistant</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Farmers Assistant</h3>
                <p className="mt-1.5 text-sm text-slate-300">AI chatbot with Nigerian language support to answer all your farming questions.</p>
                <div className="mt-3 inline-flex flex-wrap gap-1">
                  <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-white/10">Yorùbá</span>
                  <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-white/10">Igbo</span>
                  <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-white/10">Hausa</span>
                  <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-white/10">Pidgin</span>
                </div>
                <Link href="/farmers-assistant" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200">
                  Try Assistant
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Farm Analyzer */}
              <div className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                    <Tractor className="h-4.5 w-4.5 text-emerald-400" />
                  </div>
                  <span className="text-[11px] text-emerald-300/90">Planner</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Farm Analyzer</h3>
                <p className="mt-1.5 text-sm text-slate-300">Analyze farm size, soil type, humidity, and other variables for better planning.</p>
                <ul className="mt-3 space-y-1.5 text-[13px] text-slate-300">
                  <li className="inline-flex items-center gap-2"><Map className="h-4 w-4 text-emerald-400" /> Geo‑boundaries &amp; area</li>
                  <li className="inline-flex items-center gap-2"><Droplets className="h-4 w-4 text-emerald-400" /> Moisture &amp; irrigation windows</li>
                  <li className="inline-flex items-center gap-2"><ThermometerSun className="h-4 w-4 text-emerald-400" /> Micro‑climate risk</li>
                </ul>
              </div>

              {/* Crop Analyzer */}
              <div className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                    <ImageUp className="h-4.5 w-4.5 text-emerald-400" />
                  </div>
                  <span className="text-[11px] text-emerald-300/90">Vision</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Crop Analyzer</h3>
                <p className="mt-1.5 text-sm text-slate-300">Upload crop images for detailed analysis of nutritional value and growing methods.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 h-16 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 h-16 flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <Link href="/crop-analyzer" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200">
                  Analyze a Photo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Soil Analyzer */}
              <div className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                    <FlaskRound className="h-4.5 w-4.5 text-emerald-400" />
                  </div>
                  <span className="text-[11px] text-emerald-300/90">Chemistry</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Soil Analyzer</h3>
                <p className="mt-1.5 text-sm text-slate-300">Get detailed soil analysis and recommendations for optimal crop selection.</p>
                <ul className="mt-3 space-y-1.5 text-[13px] text-slate-300">
                  <li className="inline-flex items-center gap-2"><Beaker className="h-4 w-4 text-emerald-400" /> N‑P‑K &amp; micronutrients</li>
                  <li className="inline-flex items-center gap-2"><BarChart3 className="h-4 w-4 text-emerald-400" /> Amendment recommendations</li>
                  <li className="inline-flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-400" /> Crop compatibility</li>
                </ul>
              </div>
            </div>

            {/* Coming soon */}
            <div className="mt-6 rounded-xl bg-white/5 ring-1 ring-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-400"></span>
                  <h4 className="text-base font-semibold tracking-tight text-white">Coming soon</h4>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 ring-1 ring-white/10 text-slate-300">
                    <Activity className="h-4 w-4 text-indigo-300" /> Livestock Doctor
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 ring-1 ring-white/10 text-slate-300">
                    <Target className="h-4 w-4 text-indigo-300" /> Poultry Suite
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 ring-1 ring-white/10 text-slate-300">
                    <Zap className="h-4 w-4 text-indigo-300" /> Pest &amp; Disease Vision
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value props */}
        <section id="about" className="relative mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition-colors">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Target className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Built for Nigerian Agriculture</h3>
                <p className="mt-2 text-sm text-slate-300">Fine‑tuned on local datasets—from soil chemistry to regional climate and crop practices—to deliver accurate, context‑aware guidance.</p>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition-colors">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Activity className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Decisions, Not Dashboards</h3>
                <p className="mt-2 text-sm text-slate-300">Clear recommendations on when to plant, irrigate, fertilize, and harvest—grounded in your farm's data.</p>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition-colors">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">Private and Secure</h3>
                <p className="mt-2 text-sm text-slate-300">Your farm data stays protected, encrypted in transit and at rest. You control what's shared.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl bg-gradient-to-b from-white/10 to-transparent ring-1 ring-white/15 p-2">
              <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">Start with CCSA FarmAI today</h3>
                  <p className="mt-1.5 text-slate-300">AI-powered farming solutions for Nigerian farmers. Maximize yields, reduce costs, and farm sustainably.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 transition-colors">
                    <Sparkles className="h-4 w-4" />
                    Request Access
                  </Link>
                  <a href="#features" className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-200 ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition-colors">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer id="contact" className="relative mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8 rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md ring-1 ring-white/10 bg-white/5">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[13px] uppercase tracking-[0.18em] text-slate-400">Center for</span>
                  <span className="text-[15px] tracking-tight font-semibold text-white">Climate‑Smart Agriculture</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300 max-w-md">
                CCSA FarmAI combines cutting‑edge artificial intelligence with agricultural expertise to help Nigerian farmers maximize yields, reduce costs, and farm sustainably.
              </p>
              
              {/* Product Features Icons */}
              <div className="mt-6 grid grid-cols-4 gap-4 text-sm text-slate-400">
                <div className="flex flex-col items-center space-y-1">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px]">AI Assistant</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px]">Farm Analysis</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Leaf className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px]">Crop Analysis</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px]">Soil Analysis</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-white">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Dashboard</Link></li>
                {/* <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li> */}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-white">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between py-6 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} Center for Climate‑Smart Agriculture. All rights reserved.</p>
            <div className="mt-3 md:mt-0 inline-flex items-center gap-3">
              <a href="#" className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors">
                X
              </a>
              <a href="#" className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
