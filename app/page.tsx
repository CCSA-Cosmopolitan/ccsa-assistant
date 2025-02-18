"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FloatingElements from "@/components/FloatingElements"
import homePattern from '@/public/home-pattern.jpg'
import logo from '@/public/logo.jpeg'
import { Metadata } from "next"
import { ModeToggle } from "@/components/dark-button"
import { SignIn } from "@clerk/nextjs"

import Link from "next/link"





const welcomeText = `
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
     
    className="min-h-screen w-full bg-gradient-to-br h-screen animate-gradient-x relative">
      <FloatingElements />
      <div
      className=" h-full dark:bg-green-950/30 bg-green-100/30 flex flex-col justify-center items-center p-8 space-y-6 relative z-10">
       
       <div className=" absolute top-0 right-0 p-4">
          <ModeToggle />
        </div>

        <div className="w-full max-w-2xl space-y-3 text-center">
          <Image src={logo} alt="Farmer" width={300} height={300} className="mx-auto  object-center object-cover h-[150px] w-[150px] rounded-full shadow-lg" />
          <h1 className=" text-2xl md:text-4xl font-bold text-green-900 font-main dark:text-green-50 animate-fade-in-down">CCSA CUA Farmer's AI</h1>
          <p className="text-md md:text-lg font-semibold dark:text-white text-green-900  animate-fade-in-up">{'( Fine-Tuned Agriculral AI Assistant )'}</p>
          <p className="text-md md:text-lg text-black dark:text-white animate-fade-in-up">{welcomeText}</p>
        </div>
      <div className=" flex w-full justify-center items-center mx-auto space-x-3 max-w-md">
      <Link href="/sign-up" className="text-green-900 font-semibold py-2 bg-green-500 px-10 rounded-lg dark:text-green-50">
        <p>Sign Up</p>
      </Link>
      <Link href="/sign-in" className="text-green-900 font-semibold py-2 bg-green-500 bg-transparent border-2 border-green-500 px-10 rounded-lg dark:text-green-50">
        <p>Sign In</p>
      </Link>
      </div>
      </div>
    
    </div>
  )
}


