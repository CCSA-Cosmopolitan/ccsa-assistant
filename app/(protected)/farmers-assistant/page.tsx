"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, RefreshCw, MessageSquare, Sun, Moon } from "lucide-react"
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
  const { theme, setTheme } = useTheme()
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
    <div className="flex h-screen w-full  flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight">Farmers Assistant</h1>
          {messages.length > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {Math.ceil(messages.length / 2)} exchanges
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hausa">Hausa</SelectItem>
              <SelectItem value="yoruba">Yoruba</SelectItem>
              <SelectItem value="igbo">Igbo</SelectItem>
              <SelectItem value="pidgin">Nigerian Pidgin</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          {/* Reset Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset} 
            title="Reset conversation"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-3xl">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center px-4 py-12">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground">
                      Welcome to Farmers Assistant
                    </h2>
                    <p className="text-muted-foreground">
                      Ask me anything about farming in Nigeria
                    </p>
                  </div>
                  
                  {/* Starter Questions */}
                  <div className="grid gap-2 max-w-md mx-auto">
                    {[
                      "What are the best crops for rainy season?",
                      "How do I prevent tomato pests?",
                      "Best fertilizers for cassava?",
                      "When to harvest maize?"
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
            ) : (
              <div className="space-y-6 p-4">
                {messages.map((message, index) => (
                  <div key={index} className="group">
                    <div className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`flex flex-col space-y-2 ${message.role === "user" ? "items-end" : "items-start"} max-w-[75%]`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.role === "user" 
                              ? "bg-primary text-primary-foreground ml-12" 
                              : "bg-muted/50 border border-border/40"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <Markdown
                              content={message.content}
                              className="prose-sm max-w-none"
                            />
                          ) : (
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          )}
                        </div>
                        
                        {/* Follow-up suggestions - only show for the latest message */}
                        {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && index === messages.length - 1 && (
                          <div className="space-y-2 w-full mt-3">
                            <p className="text-xs text-muted-foreground">💡 Continue the conversation:</p>
                            <div className="grid gap-1">
                              {message.suggestions.slice(0, 3).map((suggestion, suggestionIndex) => (
                                <Button
                                  key={suggestionIndex}
                                  variant="outline"
                                  size="sm"
                                  className="text-left h-auto p-3 whitespace-normal w-full justify-start text-sm hover:bg-accent border-border/40"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                          <AvatarImage src={session?.user?.image || ""} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                            {session?.user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/40 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl">
          {/* Current suggestions */}
          {currentSuggestions.length > 0 && !isLoading && (
            <div className="mb-3">
              <div className="bg-accent/20 rounded-xl p-3 border border-border/40">
                <p className="text-xs text-muted-foreground mb-2 font-medium">💡 Quick follow-ups:</p>
                <div className="flex flex-wrap gap-2">
                  {currentSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      className="text-xs h-auto py-1.5 px-3 hover:bg-secondary/80 rounded-lg"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.length > 45 ? `${suggestion.substring(0, 45)}...` : suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Input form */}
          <div className="flex items-end gap-3 bg-background rounded-xl border border-border/40 p-3 shadow-sm">
            <div className="flex-1">
              <Textarea
                placeholder="Ask me anything about farming..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[20px] max-h-[160px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-muted-foreground/60"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
            </div>
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !prompt.trim()}
              className="h-9 w-9 rounded-lg"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}