"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, RefreshCw } from "lucide-react"
import { generateFarmersAssistantResponse } from "@/actions/ai"
import { Markdown } from "@/components/ui/markdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function FarmersAssistantPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [language, setLanguage] = useState("english")
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a question or prompt",
        variant: "destructive",
      })
      return
    }

    const userMessage: Message = { role: "user", content: prompt }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setPrompt("")

    try {
      // Create conversation history for context
      const conversationHistory = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")

      const result = await generateFarmersAssistantResponse(prompt, language)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      const assistantMessage: Message = { role: "assistant", content: result.text || "" }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([])
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Farmers Assistant</h1>
        <p className="text-muted-foreground">
          Chat with our AI assistant about farming techniques, crop diseases, and more.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="flex flex-col h-[80vh]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Conversation</CardTitle>
                <CardDescription>Our AI assistant can answer questions about farming in Nigeria.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hausa">Hausa</SelectItem>
                    <SelectItem value="yoruba">Yoruba</SelectItem>
                    <SelectItem value="igbo">Igbo</SelectItem>
                    <SelectItem value="pidgin">Nigerian Pidgin</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleReset} title="Reset conversation">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center p-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Start a conversation</h3>
                    <p className="text-sm text-muted-foreground">Ask any farming related question to get started.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8">
                          {message.role === "user" ? (
                            <>
                              <AvatarImage src={session?.user?.image || ""} />
                              <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/ai-avatar.png" />
                              <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-4 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <Markdown
                              content={message.content}
                              // @ts-ignore
                              className={message.role === "user" ? "text-primary-foreground" : ""}
                            />
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Textarea
                placeholder="Type your message here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 min-h-[60px] max-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button type="submit" size="icon" disabled={isLoading || !prompt.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}