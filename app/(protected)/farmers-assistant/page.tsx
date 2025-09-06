"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, RefreshCw, MessageSquare, History, Plus, Trash2 } from "lucide-react"
import { Markdown } from "@/components/ui/markdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AiPageHeader } from "@/components/ai-page-header"

type Message = {
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
}

type ChatHistory = {
  id: string
  title: string
  messages: Message[]
  suggestions: string[]
  timestamp: number
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
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  // Load chat history from localStorage on mount
  useEffect(() => {
    // Migrate old single conversation format to new history format
    const oldConversation = localStorage.getItem('farmers-assistant-conversation')
    if (oldConversation) {
      try {
        const parsed = JSON.parse(oldConversation)
        if (parsed.messages && parsed.messages.length > 0) {
          const migratedChat: ChatHistory = {
            id: 'migrated-' + Date.now(),
            title: generateChatTitle(parsed.messages.find((m: Message) => m.role === 'user')?.content || 'Previous Chat'),
            messages: parsed.messages,
            suggestions: parsed.suggestions || [],
            timestamp: Date.now()
          }
          setChatHistory([migratedChat])
          localStorage.removeItem('farmers-assistant-conversation') // Remove old format
        }
      } catch (error) {
        console.error('Failed to migrate old conversation:', error)
      }
    }

    // Load existing chat history
    const savedHistory = localStorage.getItem('farmers-assistant-history')
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory)
        setChatHistory(prev => prev.length > 0 ? prev : (parsed || []))
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }
  }, [])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('farmers-assistant-history', JSON.stringify(chatHistory))
    }
  }, [chatHistory])

  // Generate chat title from first message
  const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.trim().split(' ')
    return words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '')
  }

  // Create new chat
  const createNewChat = () => {
    if (messages.length > 0) {
      // Save current chat to history before creating new one
      const chatId = currentChatId || Date.now().toString()
      const title = generateChatTitle(messages.find(m => m.role === 'user')?.content || 'New Chat')
      
      const newChat: ChatHistory = {
        id: chatId,
        title,
        messages: [...messages],
        suggestions: [...currentSuggestions],
        timestamp: Date.now()
      }

      setChatHistory(prev => {
        const existing = prev.find(chat => chat.id === chatId)
        if (existing) {
          return prev.map(chat => chat.id === chatId ? newChat : chat)
        }
        return [newChat, ...prev]
      })
    }

    // Reset to new chat
    setMessages([])
    setCurrentSuggestions([])
    setCurrentChatId(null)
  }

  // Load a specific chat from history
  const loadChat = (chat: ChatHistory) => {
    setMessages(chat.messages)
    setCurrentSuggestions(chat.suggestions)
    setCurrentChatId(chat.id)
    setShowHistory(false)
  }

  // Delete a chat from history
  const deleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId) {
      setMessages([])
      setCurrentSuggestions([])
      setCurrentChatId(null)
    }
  }

  // Save current chat when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const chatId = currentChatId || Date.now().toString()
      if (!currentChatId) {
        setCurrentChatId(chatId)
      }

      const title = generateChatTitle(messages.find(m => m.role === 'user')?.content || 'New Chat')
      
      const updatedChat: ChatHistory = {
        id: chatId,
        title,
        messages: [...messages],
        suggestions: [...currentSuggestions],
        timestamp: Date.now()
      }

      setChatHistory(prev => {
        const existing = prev.find(chat => chat.id === chatId)
        if (existing) {
          return prev.map(chat => chat.id === chatId ? updatedChat : chat)
        }
        return [updatedChat, ...prev]
      })
    }
  }, [messages, currentSuggestions, currentChatId])

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

      console.log("🚀 Sending request to AI API...", {
        promptLength: prompt.length,
        language,
        hasHistory: !!conversationHistory,
        timestamp: new Date().toISOString()
      });

      // Call the API route instead of server action
      const response = await fetch('/api/farmers-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          language,
          conversationHistory
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      console.log("📥 Received response from AI API:", {
        hasError: !!result.error,
        hasText: !!result.text,
        hasSuggestions: !!result.suggestions,
        suggestionsCount: result.suggestions?.length || 0,
        duration: result.duration
      });

      if (result.error) {
        console.error("❌ AI Error:", result.error);
        toast({
          title: "AI Response Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (!result.text) {
        console.error("❌ Empty response from AI");
        toast({
          title: "Empty Response",
          description: "Received an empty response from AI. Please try again.",
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
      
      console.log("✅ Message added to conversation successfully");
    } catch (error: any) {
      console.error("❌ Frontend error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      
      let errorMessage = "Failed to generate response. Please try again."
      
      // Handle specific error types
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again."
      } else if (error.message.includes('timeout') || error.message.includes('took too long')) {
        errorMessage = "Request timed out. Please try again with a shorter message."
      } else if (error.message.includes('JSON')) {
        errorMessage = "Server response error. Please try again."
      } else if (error.message.includes('HTTP 408')) {
        errorMessage = "Request timeout. Please try with a shorter or simpler query."
      } else if (error.message.includes('HTTP 429')) {
        errorMessage = "Too many requests. Please wait a moment and try again."
      } else if (error.message.includes('HTTP 503')) {
        errorMessage = "AI service temporarily unavailable. Please try again later."
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    createNewChat()
    toast({
      title: "New Chat Started",
      description: "Previous conversation saved to history.",
    })
  }

  return (
    <div className="flex h-screen w-full">
      {/* Chat History Sidebar */}
      <div className={`${showHistory ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-border/40 bg-background/50`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Chat History</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={createNewChat}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-lg p-3 cursor-pointer transition-colors hover:bg-accent/50 ${
                    currentChatId === chat.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => loadChat(chat)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{chat.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil(chat.messages.length / 2)} exchanges
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteChat(chat.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {chatHistory.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No chat history yet
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <AiPageHeader 
          title="Farmers Assistant"
          description="Chat with our AI assistant in your preferred Nigerian language"
          language={language}
          onLanguageChange={setLanguage}
        />

        {/* Additional header info */}
        <div className="px-6 py-2 border-b border-border/20 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="h-6 px-2 text-xs"
              >
                <History className="h-3 w-3 mr-1" />
                History
              </Button>
              {messages.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {Math.ceil(messages.length / 2)} exchanges
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={createNewChat} 
                title="Start new chat"
                className="h-6 px-2 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                New Chat
              </Button>
              {messages.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset} 
                  title="Reset current chat"
                  className="h-6 px-2 text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
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
                        {/* {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && index === messages.length - 1 && (
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
                        )} */}
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
    </div>
  )
}