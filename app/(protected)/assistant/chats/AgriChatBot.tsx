"use client"
import { useState } from "react"
import type React from "react"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function AgriChatbot() {
  const [language, setLanguage] = useState("en")
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: { language },
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e, { body: { language } })
  }

  return (
    <div className="flex flex-col h-full w-full mx-auto">
       
      <ScrollArea className="h-full p-4 flex-col flex mx-auto w-full rounded-lg mb-4">
        <article className="prose prose-slate">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === "user" ? " text-green-800" : " text-gray-800 shadow"
              }`}
            >
              {message.role === "user" ? (
                <p className="text-sm">{message.content}</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // @ts-ignore
                    code({ node, inline, className, children, ...props }: { node: any, inline: boolean, className: string, children: React.ReactNode }) {
                      const match = /language-(\w+)/.exec(className || "")
                      return !inline && match ? (
                        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        </article>

      </ScrollArea>

      <div className=" flex flex-col items-center justify-center w-full max-w-xl mx-auto">
      <div className="mb-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select Language">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>

            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hausa">Hausa</SelectItem>
            <SelectItem value="yoruba">Yoruba</SelectItem>
            <SelectItem value="igbo">igbo</SelectItem>
            <SelectItem value="english">English</SelectItem>
            {/* Add more languages as needed */}
          </SelectContent>
        </Select>
      </div>
      <form onSubmit={onSubmit} className="flex border-2 w-full rounded-md border-green-800/40 px-1 py-1 gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about agricultural practices..."
          className="flex-grow border-0 outline-none border-transparent h-[50px] text-start rounded-full"
        />
        <Button className=" bg-green-800/40 flex self-end  text-green-900 px-2 py-2 shadow-sm" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </Button>
      </form>
      </div>
    </div>
  )
}



// "use client"
// import { useState } from "react"
// import type React from "react"

// import { useChat } from "ai/react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export default function AgriChatbot() {
//   const [language, setLanguage] = useState("en")
//   const { messages, input, handleInputChange, handleSubmit } = useChat({
//     api: "/api/chat",
//     body: { language },
//   })

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     handleSubmit(e, { body: { language } })
//   }

//   return (
//     <div className="flex flex-col w-full max-w-md mx-auto">
     
//       <ScrollArea className="h-[600px] p-4 border rounded-lg mb-4">
//         {messages.map((message, index) => (
//           <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
//             <span
//               className={`inline-block p-2 rounded-lg ${
//                 message.role === "user" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {message.content}
//             </span>
//           </div>
//         ))}
//       </ScrollArea>
//       <form onSubmit={onSubmit} className="flex gap-2">
//         <Input
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Ask about agricultural practices..."
//           className="flex-grow"
//         />
//         <Button type="submit">Send</Button>
//       </form>
//     </div>
//   )
// }



// // "use client"
// // import { useChat } from "ai/react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { ScrollArea } from "@/components/ui/scroll-area"

// // export default function AgriChatbot() {
// //   const { messages, input, handleInputChange, handleSubmit } = useChat()

// //   return (
// //     <div className="flex flex-col w-full max-w-md mx-auto">
// //       <ScrollArea className="h-[600px] p-4 border rounded-lg mb-4">
// //         {messages.map((message, index) => (
// //           <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
// //             <span
// //               className={`inline-block p-2 rounded-lg ${
// //                 message.role === "user" ? " text-green-800 " : " text-gray-800"
// //               }`}
// //             >
// //               {message.content}
// //             </span>
// //           </div>
// //         ))}
// //       </ScrollArea>
// //       <form onSubmit={handleSubmit} className="flex gap-2">
// //         <Input
// //           value={input}
// //           onChange={handleInputChange}
// //           placeholder="Ask about agricultural practices..."
// //           className="flex-grow"
// //         />
// //         <Button type="submit">Send</Button>
// //       </form>
// //     </div>
// //   )
// // }

