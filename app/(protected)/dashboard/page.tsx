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
    <div className="container py-6 md:py-10 px-4 md:px-6">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 md:h-8 w-1 bg-primary rounded-full"></div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, {session.user.name}</h1>
        </div>
        <p className="text-muted-foreground ml-3 text-sm md:text-base">Choose an AI tool to get started with your farming analysis.</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader className="pb-3 md:pb-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-4 md:h-5 w-4 md:w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">Farmers Assistant</CardTitle>
                <CardDescription className="text-xs md:text-sm">Chat with our AI assistant in your preferred Nigerian language</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
              Ask questions about farming techniques, crop diseases, market prices, and more.
            </p>
            <Link href="/farmers-assistant">
              <Button className="w-full group text-sm">
                Start Chatting <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader className="pb-3 md:pb-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart3 className="h-4 md:h-5 w-4 md:w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">Farm Analyzer</CardTitle>
                <CardDescription className="text-xs md:text-sm">Analyze your farm's conditions for optimal crop selection</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
              Input your farm size, soil type, humidity, and other variables to get personalized recommendations.
            </p>
            <Link href="/farm-analyzer">
              <Button className="w-full group text-sm">
                Analyze Farm <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className=" border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader className="pb-3 md:pb-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Leaf className="h-4 md:h-5 w-4 md:w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">Crop Analyzer</CardTitle>
                <CardDescription className="text-xs md:text-sm">Upload crop images for detailed analysis and predictions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
              Get information on nutritional value, growing methods, pest control, and more.
            </p>
            <Link href="/crop-analyzer">
              <Button className="w-full group text-sm">
                Analyze Crops <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader className="pb-3 md:pb-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Beaker className="h-4 md:h-5 w-4 md:w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">Soil Analyzer</CardTitle>
                <CardDescription className="text-xs md:text-sm">Analyze soil conditions and get recommendations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
              Upload soil images or input soil data to get detailed analysis and improvement suggestions.
            </p>
            <Link href="/soil-analyzer">
              <Button className="w-full group text-sm">
                Analyze Soil <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
