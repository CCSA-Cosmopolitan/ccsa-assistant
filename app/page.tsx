"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FloatingElements from "@/components/FloatingElements"
// import FloatingElements from "./components/FloatingElements"
import homePattern from '@/public/home-pattern.jpg'
import logo from '@/public/logo.jpeg'

const welcomeText = `
Welcome to Farmer's Assistant AI! With expertise spanning over 20 PhDs in various agricultural fields and an IQ of 1000, 
I'm here to provide you with top-notch assistance for all your farming needs. 
Let's cultivate success together!
`

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted", { email, password })
  }

  return (
    <div
     
    className="min-h-screen grid  md:grid-cols-3 sm:grid-cols-1 bg-gradient-to-br  animate-gradient-x relative">
      <FloatingElements />
      <div
      //  style={{
      //   backgroundImage: `url(${homePattern.src})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
      className="lg:col-span-2 md:col-span-2 sm:col-span-1 bg-green-100/30 flex flex-col justify-center items-center p-8 space-y-6 relative z-10">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <Image src={logo} alt="Farmer" width={300} height={300} className="mx-auto object-center object-cover h-[150px] w-[150px] rounded-full shadow-lg" />
          <h1 className="text-4xl font-bold text-green-900 animate-fade-in-down">CCSA Farmer's Assistant</h1>
          <p className="text-lg text-green-800 animate-fade-in-up">{welcomeText}</p>
        </div>
      </div>
      <div className="lg:col-span-1 md:col-span-1 px-20 sm:col-span-1 flex justify-center items-center bg-white bg-opacity-90 p-8 relative z-10">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center text-green-800">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Log in
            </Button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-green-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}




// import Image from 'next/image'


// const welcomeText = `
// Welcome to Farmer's Assistant AI! With expertise spanning over 20 PhDs in various agricultural fields and an IQ of 1000, 
// I'm here to provide you with top-notch assistance for all your farming needs. 
// Let's cultivate success together!
// `

// export default function Home() {
//   return (
//     <div className=" h-screen grid grid-cols-4 justify-center items-center">
//      <div className="col-span-3 flex flex-col space-y-3"> {/* This is the gradient section */}
//       <Image src="/farmer.png" alt="Farmer" width={500} height={500} />
//       <div className="text-2xl font-bold">CCSA Farmer's Assiatant</div>
//       <div className="text-lg">{welcomeText}</div>
//      </div>
//      <div className="col-span-1">
//       {/* The form goes here */}
//      </div>
//     </div>
//   );
// }




