// Please install OpenAI SDK first: `npm install openai`

'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API
});


export async function getAgriculturalAdvice(question: string) {
  try {
    const response = await openai.completions.create({
      model: "davinci:ft-your-org:agri-assistant-2024-01-01",
      prompt: `Agricultural question: ${question}\nExpert advice:`,
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error('AI Error:', error);
    return "Sorry, I encountered an error. Please try again.";
  }
}


async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();