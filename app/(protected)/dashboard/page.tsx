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
    <div className="container py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-1 bg-primary rounded-full"></div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session.user.name}</h1>
        </div>
        <p className="text-muted-foreground ml-3">Choose an AI tool to get started with your farming analysis.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Farmers Assistant</CardTitle>
                <CardDescription>Chat with our AI assistant in your preferred Nigerian language</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Ask questions about farming techniques, crop diseases, market prices, and more.
            </p>
            <Link href="/farmers-assistant">
              <Button className="w-full group">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Farm Analyzer</CardTitle>
                <CardDescription>Analyze your farm's conditions for optimal crop selection</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Input your farm size, soil type, humidity, and other variables to get personalized recommendations.
            </p>
            <Link href="/farm-analyzer">
              <Button className="w-full group">
                Analyze Farm <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className=" border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Crop Analyzer</CardTitle>
                <CardDescription>Upload crop images for detailed analysis and predictions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Get information on nutritional value, growing methods, pest control, and more.
            </p>
            <Link href="/crop-analyzer">
              <Button className="w-full group">
                Analyze Crops <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Beaker className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Soil Analyzer</CardTitle>
                <CardDescription>Analyze soil conditions and get recommendations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Upload soil images or input soil data to get detailed analysis and improvement suggestions.
            </p>
            <Link href="/soil-analyzer">
              <Button className="w-full group">
                Analyze Soil <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
