import { getServerSession } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Leaf, MessageSquare, Beaker } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0A0E13] text-slate-200">
      {/* Backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(16,185,129,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_10%,rgba(99,102,241,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_90%,rgba(14,165,233,0.06),transparent_60%)]"></div>
      </div>

      <div className="container py-6  px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center text-center gap-2 mb-2">
            {/* <div className="h-6 md:h-8 w-1 bg-emerald-400 rounded-full"></div> */}
          <div className=" w-full flex text-center items-center justify-center gap-2 flex-col">
              <span className=" border bg-slate-800/50 text-sm border-green-900 px-4 py-1 rounded-full">Welcome back</span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{session.user.name}</h1>
          </div>
          </div>
          <p className="text-slate-400 ml-3 text-center text-sm md:text-base">Choose an AI tool to get started with your farming analysis.</p>
        </div>

        <div className="grid gap-4 md:gap-6  max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2 hover:bg-gradient-to-b hover:from-white/15 hover:to-transparent transition-colors">
            <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-4 md:p-6 h-full">
              <div className="flex items-center flex-col text-center gap-2 mb-3 md:mb-6">
                <div className="rounded-full bg-emerald-500/20 p-2">
                  {/* <MessageSquare className="h-4 md:h-5 w-4 md:w-5 text-emerald-400" /> */}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Farmers Assistant</h3>
                  <p className="text-xs md:text-sm text-slate-400">Chat with our AI assistant in your preferred Nigerian language</p>
                </div>
              </div>
              {/* <p className="mb-3 md:mb-4 text-xs md:text-sm text-slate-300">
                Ask questions about farming techniques, crop diseases, market prices, and more.
              </p> */}
              <Link href="/farmers-assistant">
                <Button className="w-full group text-sm bg-white text-slate-900 hover:bg-slate-100">
                  Start Chatting <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2 hover:bg-gradient-to-b hover:from-white/15 hover:to-transparent transition-colors">
            <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-4 md:p-6 h-full">
              <div className="flex flex-col text-center items-center gap-2 mb-3 md:mb-6">
                <div className="rounded-full bg-emerald-500/20 p-2">
                  {/* <BarChart3 className="h-4 md:h-5 w-4 md:w-5 text-emerald-400" /> */}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Farm Analyzer</h3>
                  <p className="text-xs md:text-sm text-slate-400">Analyze your farm's conditions for optimal crop selection</p>
                </div>
              </div>
              {/* <p className="mb-3 md:mb-4 text-xs md:text-sm text-slate-300">
                Input your farm size, soil type, humidity, and other variables to get personalized recommendations.
              </p> */}
              <Link href="/farm-analyzer">
                <Button className="w-full group text-sm bg-white text-slate-900 hover:bg-slate-100">
                  Analyze Farm <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2 hover:bg-gradient-to-b hover:from-white/15 hover:to-transparent transition-colors">
            <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-4 md:p-6 h-full">
              <div className="flex items-center flex-col text-center gap-2 mb-3 md:mb-6">
                <div className="rounded-full bg-emerald-500/20 p-2">
                  {/* <Leaf className="h-4 md:h-5 w-4 md:w-5 text-emerald-400" /> */}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Crop Analyzer</h3>
                  <p className="text-xs md:text-sm text-slate-400">Upload crop images for detailed analysis and predictions</p>
                </div>
              </div>
              {/* <p className="mb-3 md:mb-4 text-xs md:text-sm text-slate-300">
                Get information on nutritional value, growing methods, pest control, and more.
              </p> */}
              <Link href="/crop-analyzer">
                <Button className="w-full group text-sm bg-white text-slate-900 hover:bg-slate-100">
                  Analyze Crops <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl ring-1 ring-white/15 bg-gradient-to-b from-white/10 to-transparent p-2 hover:bg-gradient-to-b hover:from-white/15 hover:to-transparent transition-colors">
            <div className="rounded-xl bg-[#0B1117] ring-1 ring-white/10 p-4 md:p-6 h-full">
              <div className="flex flex-col text-center items-center gap-2 mb-3 md:mb-6">
                <div className="rounded-full bg-emerald-500/20 p-2">
                  {/* <Beaker className="h-4 md:h-5 w-4 md:w-5 text-emerald-400" /> */}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Soil Analyzer</h3>
                  <p className="text-xs md:text-sm text-slate-400">Analyze soil conditions and get detailed analysis and improvement suggestions</p>
                </div>
              </div>
              {/* <p className="mb-3 md:mb-4 text-xs md:text-sm text-slate-300">
                Upload soil images or input soil data to get detailed analysis and improvement suggestions.
              </p> */}
              <Link href="/soil-analyzer">
                <Button className="w-full group text-sm bg-white text-slate-900 hover:bg-slate-100">
                  Analyze Soil <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
