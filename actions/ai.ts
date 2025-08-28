"use server"
// Runtime: nodejs

import { db } from "@/lib/db"
import { getServerSession } from "@/auth"
import type { z } from "zod"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { FarmAnalyzerSchema, SoilAnalyzerSchema } from "@/schemas"

export async function savePrompt(
  type: "ASSISTANT" | "FARM_ANALYZER" | "CROP_ANALYZER" | "SOIL_ANALYZER",
  prompt: string,
  response: string,
) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type,
        prompt,
        response,
      },
    })

    return { success: "Prompt saved successfully!" }
  } catch (error) {
    return { error: "Failed to save prompt." }
  }
}

export async function getPromptCount() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const count = await db.prompt.count({
      where: { userId: session.user.id },
    })

    return { count }
  } catch (error) {
    return { error: "Failed to get prompt count." }
  }
}

export async function getAllPrompts() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const prompts = await db.prompt.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return { prompts }
  } catch (error) {
    return { error: "Failed to get prompts." }
  }
}

export async function getUserPrompts() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const prompts = await db.prompt.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return { prompts }
  } catch (error) {
    return { error: "Failed to get prompts." }
  }
}

export async function generateFarmersAssistantResponse(prompt: string, language: string, conversationHistory?: string) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    // If user is not admin, has used 3 or more prompts, and has no wallet balance
    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
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

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system: systemPrompt,
    })

    // Extract follow-up suggestions from the response
    const suggestionMatch = text.match(/FOLLOW_UP_SUGGESTIONS:\s*([\s\S]*)/i)
    let suggestions: string[] = []
    let mainResponse = text

    if (suggestionMatch) {
      const suggestionsText = suggestionMatch[1]
      suggestions = suggestionsText
        .split('\n')
        .filter(line => line.trim().match(/^\d+\./))
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .filter(suggestion => suggestion.length > 0)
      
      // Remove suggestions from main response
      mainResponse = text.replace(/FOLLOW_UP_SUGGESTIONS:[\s\S]*$/i, '').trim()
    }

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "ASSISTANT",
        prompt,
        response: mainResponse,
      },
    })

    return { text: mainResponse, suggestions }
  } catch (error) {
    return { error: "Failed to generate response." }
  }
}

export async function generateFarmAnalysis(values: z.infer<typeof FarmAnalyzerSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit (similar to above)
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    const prompt = `
     Analyze the following farm data and provide detailed recommendations:
     
     Farm Size: ${values.farmSize} hectares
     Soil Type: ${values.soilType}
     Humidity: ${values.humidity}%
     Moisture: ${values.moisture}%
     Temperature: ${values.temperature}°C
     Location: ${values.location}, Nigeria
     Additional Information: ${values.additionalInfo || "None provided"}
     
     Please provide a comprehensive analysis including:
     1. Suitable crops for this environment
     2. Recommended farming techniques
     3. Potential challenges and solutions
     4. Irrigation recommendations
     5. Fertilizer recommendations
     6. Seasonal considerations
   `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert agricultural analyst specializing in Nigerian farming conditions. Provide detailed, structured, and practical advice based on the farm data provided.",
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "FARM_ANALYZER",
        prompt: JSON.stringify(values),
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate farm analysis." }
  }
}

export async function generateSoilAnalysis(values: z.infer<typeof SoilAnalyzerSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit (similar to above)
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    const prompt = `
     Analyze the following soil data and provide detailed recommendations:
     
     Soil Type: ${values.soilType}
     pH Level: ${values.ph}
     Organic Matter: ${values.organicMatter}%
     Nitrogen Content: ${values.nitrogen} mg/kg
     Phosphorus Content: ${values.phosphorus} mg/kg
     Potassium Content: ${values.potassium} mg/kg
     Location: ${values.location}, Nigeria
     Additional Information: ${values.additionalInfo || "None provided"}
     
     Please provide a comprehensive analysis including:
     1. Soil quality assessment
     2. Suitable crops for this soil type
     3. Fertilizer recommendations
     4. Soil improvement strategies
     5. Potential issues and solutions
     6. Long-term soil management advice
   `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert soil scientist specializing in Nigerian agricultural soils. Provide detailed, structured, and practical advice based on the soil data provided.",
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "SOIL_ANALYZER",
        prompt: JSON.stringify(values),
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate soil analysis." }
  }
}

export async function generateCropAnalysis(imageDataUrl: string, analysisType = "general") {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit (similar to above)
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    // Use OpenAI Vision API to analyze the actual uploaded image

    // Customize system prompt and user message based on analysis type
    let systemPrompt = "You are an expert agricultural analyst specializing in Nigerian crops and plants. Analyze the image provided and give detailed, structured, and practical information."
    let userMessage = ""

    switch (analysisType) {
      case "disease":
        userMessage = `Analyze this crop/plant image and focus on disease detection. Please provide a comprehensive analysis including:
         1. Identification of any diseases or pests present
         2. Severity assessment
         3. Potential causes
         4. Treatment recommendations
         5. Preventive measures
         6. Long-term management strategies`
        break
      case "identification":
        userMessage = `Analyze this crop/plant image and focus on identification and anatomy. Please provide a comprehensive analysis including:
         1. Detailed identification of the plant species and variety
         2. Anatomical features and structure
         3. Growth stage assessment
         4. Taxonomic classification
         5. Related species and varieties
         6. Historical and cultural significance in Nigeria`
        break
      case "planting":
        userMessage = `Analyze this crop/plant image and focus on planting methods and care. Please provide a comprehensive analysis including:
         1. Optimal planting methods for this crop
         2. Soil preparation requirements
         3. Spacing and depth recommendations
         4. Watering and fertilization needs
         5. Climate and seasonal considerations
         6. Common challenges and solutions during planting`
        break
      case "harvest":
        userMessage = `Analyze this crop/plant image and focus on harvest timing and methods. Please provide a comprehensive analysis including:
         1. Signs of harvest readiness
         2. Optimal timing for maximum yield and quality
         3. Recommended harvesting techniques
         4. Post-harvest handling and storage
         5. Potential issues during harvest
         6. Value addition opportunities`
        break
      case "nutrition":
        userMessage = `Analyze this crop/plant image and focus on nutritional value and uses. Please provide a comprehensive analysis including:
         1. Nutritional composition and benefits
         2. Culinary uses and preparation methods
         3. Traditional and modern recipes in Nigerian cuisine
         4. Medicinal properties and traditional uses
         5. Processing and preservation methods
         6. Market value and economic importance`
        break
      default:
        userMessage = `Analyze this crop/plant image and provide detailed information including:
         1. Identification of the crop/plant
         2. Nutritional value
         3. Growing conditions and methods
         4. Potential diseases and pest control
         5. Harvesting and storage recommendations
         6. Market value and economic importance in Nigeria`
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userMessage,
            },
            {
              type: "image",
              image: imageDataUrl,
            },
          ],
        },
      ],
      system: systemPrompt,
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id, 
        type: "CROP_ANALYZER",
        prompt: `${analysisType}: Image analysis request`,
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate crop analysis." }
  }
}


// import { getServerSession } from "next-auth"
// import { db } from "@/lib/db"
// import { generateText } from "@/lib/openai"
// import { openai } from "@/lib/openai"

// // Update the generateCropAnalysis function in ai.ts

// export async function generateCropAnalysis(imageDescription: string, analysisType = "general") {
//   const session = await getServerSession()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     // Check if user has reached free tier limit (similar to above)
//     const promptCount = await db.prompt.count({
//       where: { userId: session.user.id },
//     })

//     const user = await db.user.findUnique({
//       where: { id: session.user.id },
//     })

//     if (!user) {
//       return { error: "User not found!" }
//     }

//     if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
//       return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
//     }

//     // Customize prompt based on analysis type
//     let analysisPrompt = ""

//     switch (analysisType) {
//       case "disease":
//         analysisPrompt = `
//           Analyze the following crop/plant image and focus on disease detection:
          
//           The image shows: ${imageDescription}
          
//           Please provide a comprehensive analysis including:
//           1. Identification of any diseases or pests present
//           2. Severity assessment
//           3. Potential causes
//           4. Treatment recommendations
//           5. Preventive measures
//           6. Long-term management strategies
//         `
//         break
//       case "identification":
//         analysisPrompt = `
//           Analyze the following crop/plant image and focus on identification and anatomy:
          
//           The image shows: ${imageDescription}
          
//           Please provide a comprehensive analysis including:
//           1. Detailed identification of the plant species and variety
//           2. Anatomical features and structure
//           3. Growth stage assessment
//           4. Taxonomic classification
//           5. Related species and varieties
//           6. Historical and cultural significance in Nigeria
//         `
//         break
//       case "planting":
//         analysisPrompt = `
//           Analyze the following crop/plant image and focus on planting methods and care:
          
//           The image shows: ${imageDescription}
          
//           Please provide a comprehensive analysis including:
//           1. Optimal planting methods for this crop
//           2. Soil preparation requirements
//           3. Spacing and depth recommendations
//           4. Watering and fertilization needs
//           5. Climate and seasonal considerations
//           6. Common challenges and solutions during planting
//         `
//         break
//       case "harvest":
//         analysisPrompt = `
//           Analyze the following crop/plant image and focus on harvest timing and methods:
          
//           The image shows: ${imageDescription}
          
//           Please provide a comprehensive analysis including:
//           1. Signs of harvest readiness
//           2. Optimal timing for maximum yield and quality
//           3. Recommended harvesting techniques
//           4. Post-harvest handling and storage
//           5. Potential issues during harvest
//           6. Value addition opportunities
//         `
//         break
//       case "nutrition":
//         analysisPrompt = `
//           Analyze the following crop/plant image and focus on nutritional value and uses:
          
//           The image shows: ${imageDescription}
          
//           Please provide a comprehensive analysis including:
//           1. Nutritional composition and benefits
//           2. Culinary uses and preparation methods
//           3. Traditional and modern recipes in Nigerian cuisine
//           4. Medicinal properties and traditional uses
//           5. Processing and preservation methods
//           6. Market value and economic importance
//         `
//         break
//       default:
//         analysisPrompt = `
//           Analyze the following crop/plant image and provide detailed information:
          
//           The image shows: ${imageDescription}
          
//           Please provide a comprehensive analysis including:
//           1. Identification of the crop/plant
//           2. Nutritional value
//           3. Growing conditions and methods
//           4. Potential diseases and pest control
//           5. Harvesting and storage recommendations
//           6. Market value and economic importance in Nigeria
//         `
//     }

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt: analysisPrompt,
//       system:
//         "You are an expert agricultural analyst specializing in Nigerian crops and plants. Provide detailed, structured, and practical information based on the crop image described.",
//     })

//     // Save prompt to database
//     await db.prompt.create({
//       data: {
//         userId: session.user.id,
//         type: "CROP_ANALYZER",
//         prompt: `${analysisType}: ${imageDescription}`,
//         response: text,
//       },
//     })

//     return { text }
//   } catch (error) {
//     return { error: "Failed to generate crop analysis." }
//   }
// }
