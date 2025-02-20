'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API
});

export async function getDeepSeekAdvice(question: string, language: string) {
    const completion = await openai.chat.completions.create({
        messages: [
                      {
                        role: "system",
                        content: `You are an agricultural expert assistant. Provide detailed, practical advice for farming improvements in ${language}. Focus on sustainable practices and cost-effective solutions.`
                      },
                      
                      {
                        role: "user",
                        content: `Agricultural question: ${question}`
                      }
                    ],
      model: "deepseek-chat",
    });
  
    console.log(completion.choices[0].message.content);
  }
  



// export async function getDeepSeekAdvice(question: string, language: string) {
//   try {
//     const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "deepseek-chat",
//         messages: [
//           {
//             role: "system",
//             content: `You are an agricultural expert assistant. Provide detailed, practical advice for farming improvements in ${language}. Focus on sustainable practices and cost-effective solutions.`
//           },
          
//           {
//             role: "user",
//             content: `Agricultural question: ${question}`
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 1000,
//         top_p: 1
//       })
//     });

//     const result = await response.json();
//     console.log(result);
//     // return result.choices[0].message.content;
    
//   } catch (error) {
//     console.error('DeepSeek API Error:', error);
//     return "Sorry, I encountered an error processing your agricultural query. Please try again.";
//   }
// }