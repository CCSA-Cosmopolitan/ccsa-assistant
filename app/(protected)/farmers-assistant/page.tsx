"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, RefreshCw, MessageSquare } from "lucide-react"
import { generateFarmersAssistantResponse } from "@/actions/ai"
import { Markdown } from "@/components/ui/markdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
}

export default function FarmersAssistantPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [language, setLanguage] = useState("english")
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [lastActivity, setLastActivity] = useState<string | null>(null)

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedConversation = localStorage.getItem('farmers-assistant-conversation')
    if (savedConversation) {
      try {
        const parsed = JSON.parse(savedConversation)
        setMessages(parsed.messages || [])
        setCurrentSuggestions(parsed.suggestions || [])
        if (parsed.timestamp) {
          const lastDate = new Date(parsed.timestamp)
          setLastActivity(lastDate.toLocaleDateString() + ' at ' + lastDate.toLocaleTimeString())
        }
      } catch (error) {
        console.error('Failed to load conversation:', error)
      }
    }
  }, [])

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const timestamp = Date.now()
      localStorage.setItem('farmers-assistant-conversation', JSON.stringify({
        messages,
        suggestions: currentSuggestions,
        timestamp
      }))
      const lastDate = new Date(timestamp)
      setLastActivity(lastDate.toLocaleDateString() + ' at ' + lastDate.toLocaleTimeString())
    }
  }, [messages, currentSuggestions])

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion)
  }

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
    setCurrentSuggestions([]) // Clear current suggestions when user sends a message
    setIsLoading(true)
    setPrompt("")

    try {
      // Create conversation history for context (last 6 messages to avoid token limits)
      const recentMessages = messages.slice(-6)
      const conversationHistory = recentMessages.length > 0 
        ? recentMessages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")
        : undefined

      const result = await generateFarmersAssistantResponse(prompt, language, conversationHistory)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      const assistantMessage: Message = { 
        role: "assistant", 
        content: result.text || "",
        suggestions: result.suggestions || []
      }
      setMessages((prev) => [...prev, assistantMessage])
      setCurrentSuggestions(result.suggestions || [])
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
    setCurrentSuggestions([])
    setLastActivity(null)
    localStorage.removeItem('farmers-assistant-conversation')
    toast({
      title: "Conversation Reset",
      description: "Your conversation history has been cleared.",
    })
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
                <CardTitle className="flex items-center gap-2">
                  Conversation
                  {messages.length > 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {Math.ceil(messages.length / 2)} exchanges
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Our AI assistant can answer questions about farming in Nigeria and remembers your conversation.
                  {lastActivity && (
                    <span className="block text-xs text-muted-foreground/70 mt-1">
                      Last active: {lastActivity}
                    </span>
                  )}
                </CardDescription>
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Start a conversation</h3>
                    <p className="text-sm text-muted-foreground">Ask any farming related question to get started.</p>
                    
                    {/* Initial suggested questions */}
                    <div className="mt-6">
                      <p className="text-sm text-muted-foreground mb-3">Try asking about:</p>
                      <div className="grid gap-2 max-w-md">
                        {[
                          "What are the best crops to plant during rainy season in Nigeria?",
                          "How can I prevent pests from attacking my tomato plants?",
                          "What fertilizers work best for cassava farming?",
                          "When is the best time to harvest maize?"
                        ].map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="text-left h-auto p-3 whitespace-normal"
                            onClick={() => handleSuggestionClick(question)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{question}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
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
                            <div className="space-y-4">
                              <Markdown
                                content={message.content}
                                // @ts-ignore
                                className={message.role === "user" ? "text-primary-foreground" : ""}
                              />
                              {/* Display follow-up suggestions */}
                              {message.suggestions && message.suggestions.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-border/50">
                                  <p className="text-sm text-muted-foreground mb-2">💡 You might also want to ask:</p>
                                  <div className="space-y-1">
                                    {message.suggestions.map((suggestion, suggestionIndex) => (
                                      <Button
                                        key={suggestionIndex}
                                        variant="ghost"
                                        size="sm"
                                        className="text-left h-auto p-2 whitespace-normal w-full justify-start text-xs"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                      >
                                        <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                                        {suggestion}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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
            {/* Current suggestions display */}
            {currentSuggestions.length > 0 && !isLoading && (
              <div className="w-full mb-4">
                <div className="bg-accent/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-muted-foreground mb-2">💡 Quick follow-ups:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        className="text-xs h-auto py-1 px-2"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.length > 60 ? `${suggestion.substring(0, 60)}...` : suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
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