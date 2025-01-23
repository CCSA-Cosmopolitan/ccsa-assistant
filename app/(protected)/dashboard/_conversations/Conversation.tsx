"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { ConversationSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Conversation = () => {
    const form = useForm<z.infer<typeof ConversationSchema>>({
      resolver: zodResolver(ConversationSchema),
      defaultValues: {
        prompt: "",
        language: ''
      }
    })
    const isLoading = form.formState.isSubmitting

    const onSubmit = (values: z.infer<typeof ConversationSchema>) => {
      console.log(values)
    }

    return (
      <div className='w-full rounded-xl p-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
         <div className=" w-full text-center flex flex-col items-center justify-center">
         <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=' bg-green-50'>
                      <SelectItem className=' hover:bg-green-300' value="Hausa">Hausa</SelectItem>
                      <SelectItem className=' hover:bg-green-300' value="Yoruba">Yoruba</SelectItem>
                      <SelectItem className=' hover:bg-green-300' value="Igbo">Igbo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
         </div>
       <div className=" relative rounded-lg border  border-emerald-400 p-2  flex w-full ">
       <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className='w-full'>
                  {/* <FormLabel>Prompt</FormLabel> */}
                  <FormControl className='w-full'>
                    <Textarea className=' bg-transparent w-full border-none shadow-none' placeholder="Enter your prompt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className=' bg-green-800 absolute right-2 bottom-2 p-1 px-3' disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </Button>
       </div>
          </form>
        </Form>
      </div>
    )
}

export default Conversation

// "use client"
// import React from 'react'
// import { useForm } from "react-hook-form"
// import * as z from 'zod'
// import { ConversationSchema } from './constants'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// const Conversation = () => {
//     const form = useForm<z.infer<typeof ConversationSchema>>({
//       resolver: zodResolver(ConversationSchema),
//       defaultValues: {
//         prompt: "",
//         language: 'english'
//       }
//     })

//     const isLoading = form.formState.isSubmitting

//     const onSubmit = (values: z.infer<typeof ConversationSchema>) => {
//       console.log(values)
//     }

//     return (
//       <div className='w-full bg-white p-5 rounded-md shadow-md'>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="language"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Language</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your prompt" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="prompt"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Prompt</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter language" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" disabled={isLoading}>
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     )
// }

// export default Conversation