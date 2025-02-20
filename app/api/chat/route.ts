

import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, language } = await req.json()

  const systemMessage = `You are an innovative agricultural AI assistant. Respond in ${language}. Provide helpful information about agricultural practices, crop management, and sustainable farming techniques.`

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages: [{ role: "system", content: systemMessage }, ...messages],
  })

  return result.toDataStreamResponse()
}




// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";
 
// export const maxDuration = 30;
 
// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const result = streamText({
//     model: openai("gpt-4o-mini"),
//     messages,
//   });
//   return result.toDataStreamResponse();
// }



// import { createOpenAI } from "@ai-sdk/openai";
// import { streamText } from "ai";

// const openai = createOpenAI({
//   baseURL: process.env["OPENAI_BASE_URL"] as string,
// });

// export const runtime = "edge";
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: openai("gpt-4o"),
//     messages,
//   });

//   return result.toDataStreamResponse();
// }
