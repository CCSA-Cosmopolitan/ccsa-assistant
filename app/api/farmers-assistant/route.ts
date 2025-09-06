import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/auth"
import { db } from "@/lib/db"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Increase the timeout for this API route to 30 seconds
export const maxDuration = 30

export async function POST(request: NextRequest) {
  console.log("🌾 Starting farmers assistant API request", {
    timestamp: new Date().toISOString(),
    url: request.url
  });

  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      console.error("❌ Unauthorized: No user session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ User authenticated", { userId: session.user.id, userRole: session.user.role });

    const body = await request.json()
    const { prompt, language = "english", conversationHistory } = body

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 })
    }

    console.log("📝 Request details", {
      promptLength: prompt.length,
      language,
      hasHistory: !!conversationHistory,
      userId: session.user.id
    });

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY environment variable");
      return NextResponse.json({ error: "Server configuration error: Missing API key" }, { status: 500 })
    }

    // Check if user has reached free tier limit
    console.log("🔍 Checking user prompt count...");
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      console.error("❌ User not found in database", { userId: session.user.id });
      return NextResponse.json({ error: "User not found!" }, { status: 404 })
    }

    console.log("✅ User found", { 
      userId: user.id, 
      promptCount, 
      walletBalance: user.walletBalance,
      userRole: session.user.role 
    });

    // If user is not admin, has used 3 or more prompts, and has no wallet balance
    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      console.warn("⚠️ User reached free tier limit", { promptCount, walletBalance: user.walletBalance });
      return NextResponse.json({ 
        error: "You've reached your free tier limit. Please upgrade your account to continue." 
      }, { status: 403 })
    }

    // Prepare system prompt based on selected language and conversation context
    let systemPrompt = `You are a helpful farming assistant with expertise in Nigerian agriculture. You provide practical, actionable advice for farmers.

${conversationHistory ? `Previous conversation context:\n${conversationHistory}\n\n` : ''}

Guidelines:
1. Be conversational and remember what was discussed before
2. Reference previous topics when relevant
3. Provide detailed, practical advice
4. Ask clarifying questions when needed
5. Suggest related topics the farmer might find helpful
6. Always end your response with 2-3 suggested follow-up questions wrapped in a "FOLLOW_UP_SUGGESTIONS:" section

Format your follow-up suggestions exactly like this at the end:
FOLLOW_UP_SUGGESTIONS:
1. [Relevant follow-up question 1]
2. [Relevant follow-up question 2]
3. [Relevant follow-up question 3]`

    if (language !== "english") {
      systemPrompt += ` Please respond in ${language}.`
    }

    console.log("🤖 Calling OpenAI API...", {
      model: "gpt-4o",
      promptLength: prompt.length,
      systemPromptLength: systemPrompt.length,
      language,
      timestamp: new Date().toISOString()
    });

    const startTime = Date.now();

    // Add timeout handling for OpenAI call
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI request timeout after 25 seconds')), 25000)
    })

    const aiPromise = generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system: systemPrompt,
      maxTokens: 2000, // Limit tokens to reduce processing time
    })

    const { text } = await Promise.race([aiPromise, timeoutPromise]) as any
    const endTime = Date.now();

    console.log("✅ OpenAI response received", {
      responseLength: text.length,
      duration: `${endTime - startTime}ms`,
      timestamp: new Date().toISOString()
    });

    // Extract follow-up suggestions from the response
    const suggestionMatch = text.match(/FOLLOW_UP_SUGGESTIONS:\s*([\s\S]*)/i)
    let suggestions: string[] = []
    let mainResponse = text

    if (suggestionMatch) {
      const suggestionsText = suggestionMatch[1]
      suggestions = suggestionsText
        .split('\n')
        .filter((line: string) => line.trim().match(/^\d+\./))
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
        .filter((suggestion: string) => suggestion.length > 0)
      
      // Remove suggestions from main response
      mainResponse = text.replace(/FOLLOW_UP_SUGGESTIONS:[\s\S]*$/i, '').trim()
      
      console.log("✅ Extracted suggestions", { suggestionsCount: suggestions.length });
    } else {
      console.log("ℹ️ No follow-up suggestions found in response");
    }

    // Save prompt to database
    console.log("💾 Saving to database...");
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "ASSISTANT",
        prompt,
        response: mainResponse,
      },
    })
    console.log("✅ Response saved to database successfully");

    return NextResponse.json({ 
      text: mainResponse, 
      suggestions,
      duration: endTime - startTime 
    })

  } catch (error: any) {
    console.error("❌ Farmers assistant API error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      code: error.code,
      status: error.status,
      type: error.type,
      timestamp: new Date().toISOString()
    });
    
    // Handle specific errors
    if (error.message?.includes('timeout')) {
      return NextResponse.json({ 
        error: "The request took too long to process. Please try with a shorter or simpler query." 
      }, { status: 408 })
    }
    if (error.message?.includes('API key')) {
      return NextResponse.json({ error: "Invalid API key configuration. Please contact support." }, { status: 500 })
    }
    if (error.message?.includes('rate limit') || error.status === 429) {
      return NextResponse.json({ error: "API rate limit exceeded. Please try again in a few moments." }, { status: 429 })
    }
    if (error.message?.includes('network') || error.code === 'ENOTFOUND') {
      return NextResponse.json({ error: "Network error. Please check your internet connection and try again." }, { status: 503 })
    }
    if (error.status === 500 || error.status === 502 || error.status === 503) {
      return NextResponse.json({ error: "AI service temporarily unavailable. Please try again later." }, { status: 503 })
    }
    if (error.status === 401) {
      return NextResponse.json({ error: "Authentication failed. Please contact support." }, { status: 401 })
    }
    
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}