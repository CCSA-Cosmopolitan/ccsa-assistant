import { getServerSession } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Leaf, MessageSquare, Wallet } from "lucide-react"
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
        <p className="text-muted-foreground ml-3">Here's an overview of your farming insights and tools.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prompts Used</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/3</div>
            <p className="text-xs text-muted-foreground">Free tier limit reached</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{session.user.walletBalance || 0}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/wallet" className="text-primary hover:underline">
                Add funds
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farm Analyses</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No analyses performed yet</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Analyses</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <Leaf className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No analyses performed yet</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        <Card className="gradient-card border-border/40 shadow-sm transition-all hover:shadow-card-hover">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Crop Analyzer</CardTitle>
                <CardDescription>Upload crop images for detailed analysis</CardDescription>
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
      </div>

      <div className="mt-8">
        <Card className="border-border/40 shadow-sm overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-brand-blue"></div>
          <CardHeader>
            <CardTitle>Upgrade Your Account</CardTitle>
            <CardDescription>
              You've reached your free tier limit. Upgrade to continue using our AI tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 rounded-lg border p-4 transition-all hover:shadow-md">
                <h3 className="mb-2 font-semibold">Standard Plan</h3>
                <p className="text-2xl font-bold">
                  ₦5,000<span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Unlimited AI prompts
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Advanced farm analysis
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Email support
                  </li>
                </ul>
                <Button className="mt-4 w-full">Subscribe</Button>
              </div>
              <div className="flex-1 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-all hover:shadow-md">
                <div className="absolute right-4 top-4 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
                <h3 className="mb-2 font-semibold">Premium Plan</h3>
                <p className="text-2xl font-bold">
                  ₦12,000<span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Everything in Standard
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    Priority processing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                    24/7 priority support
                  </li>
                </ul>
                <Button className="mt-4 w-full">Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
