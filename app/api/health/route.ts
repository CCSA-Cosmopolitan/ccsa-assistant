import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function GET() {
  try {
    console.log("🔍 Health check starting...");
    
    // Check environment variables
    const envChecks = {
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      DATABASE_URL: !!process.env.DATABASE_URL,
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      NODE_ENV: process.env.NODE_ENV
    }
    
    console.log("📊 Environment variables check:", envChecks);
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        status: "unhealthy",
        error: "Missing OPENAI_API_KEY",
        env: envChecks,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // Test OpenAI connection with a simple request
    console.log("🤖 Testing OpenAI connection...");
    const startTime = Date.now();
    
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: "Say 'Hello from OpenAI' - this is a health check.",
      system: "You are a health check assistant. Just respond with the requested message.",
    })
    
    const endTime = Date.now();
    console.log("✅ OpenAI test successful", { duration: `${endTime - startTime}ms`, response: text });

    return NextResponse.json({ 
      status: "healthy",
      openai: {
        connected: true,
        model: "gpt-4o",
        responseTime: `${endTime - startTime}ms`,
        testResponse: text
      },
      environment: envChecks,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("❌ Health check failed:", {
      message: error.message,
      name: error.name,
      code: error.code,
      status: error.status,
      type: error.type
    });
    
    return NextResponse.json({ 
      status: "unhealthy",
      error: {
        message: error.message,
        name: error.name,
        code: error.code,
        status: error.status,
        type: error.type
      },
      environment: {
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
        DATABASE_URL: !!process.env.DATABASE_URL,
        AUTH_SECRET: !!process.env.AUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
