"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search, MessageSquare, Leaf, BarChart3 } from "lucide-react"
import { getUserPrompts } from "@/actions/ai"
import { Markdown } from "@/components/ui/markdown"
import { format } from "date-fns"

type Prompt = {
  id: string
  type: "ASSISTANT" | "FARM_ANALYZER" | "CROP_ANALYZER" | "SOIL_ANALYZER"
  prompt: string
  response: string
  createdAt: string
}

export default function PromptsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const result = await getUserPrompts()

        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          })
          return
        }

        if (result.prompts) {
          setPrompts(result.prompts)
          setFilteredPrompts(result.prompts)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch prompts history",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrompts()
  }, [toast])

  useEffect(() => {
    // Filter prompts based on search query and active tab
    let filtered = prompts

    if (searchQuery) {
      filtered = filtered.filter(
        (prompt) =>
          prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.response.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((prompt) => {
        switch (activeTab) {
          case "assistant":
            return prompt.type === "ASSISTANT"
          case "farm":
            return prompt.type === "FARM_ANALYZER"
          case "crop":
            return prompt.type === "CROP_ANALYZER"
          case "soil":
            return prompt.type === "SOIL_ANALYZER"
          default:
            return true
        }
      })
    }

    setFilteredPrompts(filtered)
  }, [searchQuery, activeTab, prompts])

  const getPromptIcon = (type: string) => {
    switch (type) {
      case "ASSISTANT":
        return <MessageSquare className="h-4 w-4" />
      case "FARM_ANALYZER":
        return <BarChart3 className="h-4 w-4" />
      case "CROP_ANALYZER":
        return <Leaf className="h-4 w-4" />
      case "SOIL_ANALYZER":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPromptTypeName = (type: string) => {
    switch (type) {
      case "ASSISTANT":
        return "Farmers Assistant"
      case "FARM_ANALYZER":
        return "Farm Analyzer"
      case "CROP_ANALYZER":
        return "Crop Analyzer"
      case "SOIL_ANALYZER":
        return "Soil Analyzer"
      default:
        return type
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Prompts History</h1>
        <p className="text-muted-foreground">View your past interactions with our AI assistants.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
            <TabsTrigger value="farm">Farm</TabsTrigger>
            <TabsTrigger value="crop">Crop</TabsTrigger>
            <TabsTrigger value="soil">Soil</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredPrompts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <p className="text-center text-muted-foreground">
              {searchQuery || activeTab !== "all"
                ? "No prompts match your search criteria."
                : "You haven't used any AI assistants yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">{getPromptIcon(prompt.type)}</div>
                    <div>
                      <CardTitle className="text-base">{getPromptTypeName(prompt.type)}</CardTitle>
                      <CardDescription>{format(new Date(prompt.createdAt), "PPpp")}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Prompt:</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="whitespace-pre-wrap">{prompt.prompt}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">AI Response:</h3>
                  <Markdown content={prompt.response} revealImmediately />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
