import * as z from 'zod'

export const ChatSchema = z.object({
    prompt: z.string().min(1, {
        message: "Please provide a prompt"
    }),
    language: z.string()
})