'use client'
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Leaf, Zap, BarChart3, MessageSquare } from "lucide-react"
import Image from "next/image"
import logoGreen from '@/public/green-cosmo.png'
import MobileMenu from './mobile-menu'
import { useSession } from 'next-auth/react'




const PublicNavigation = () => {

    const session = useSession()

    console.log(session)
  return (
    <header className="sticky top-0 z-40 border-b mx-auto w-full bg-background">
    <div className="container flex h-16 items-center w-full mx-auto justify-between py-4">

      <div className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-green-600" />
        <span className="text-xl font-bold">CCSA FarmAI</span>
      </div>

      <nav className="hidden md:flex items-center gap-6">
      <div className="container flex h-16 items-center justify-between py-4">
      {/* <div className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">CCSA FarmAI</span>
      </div> */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
        >
          Contact
        </Link>
        <Link
          href="/partnerships"
          className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
        >
          Partnerships
        </Link>
      </nav>
      {/* <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="outline">Log In</Button>
        </Link>
        <Link href="/register">
          <Button>Sign Up</Button>
        </Link>
      </div> */}
    </div>
        {/* <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
          Features
        </Link>
        <Link href="#benefits" className="text-sm font-medium hover:underline underline-offset-4">
          Benefits
        </Link>
        <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
          Testimonials
        </Link>
        <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
          Contact
        </Link> */}
      </nav>

      <div className="flex items-center gap-4">
       { session.data ? (
        <Link href={'/dashboard'}>
        <Button className="bg-green-600 hover:bg-green-700 hidden md:flex">
            Dashboard
        </Button>
        </Link>
       ) : (
        <>
        <Link href={'/login'} className="text-lg w-full flex font-medium hover:text-green-600 transition-colors">
          <Button variant="outline" className=" border-primary w-full">
            Log in
          </Button>
          </Link>
            <Button className="bg-green-600 w-full hover:bg-green-700" onClick={() => {}}>
                <Link href={'/register'} className="text-lg w-full flex font-medium hover:text-green-600 transition-colors">
                Get Started
                </Link>
            </Button>
       
        </>
       )

       }
        
        <MobileMenu session={session} />
      </div>

    </div>
  </header>
//     <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
//     <div className="container flex h-16 items-center justify-between py-4">
//       <div className="flex items-center gap-2">
//         <Leaf className="h-6 w-6 text-primary" />
//         <span className="text-xl font-bold">CCSA FarmAI</span>
//       </div>
//       <nav className="hidden md:flex items-center gap-6">
//         <Link
//           href="/"
//           className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
//         >
//           Home
//         </Link>
//         <Link
//           href="/about"
//           className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
//         >
//           About Us
//         </Link>
//         <Link
//           href="/contact"
//           className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
//         >
//           Contact
//         </Link>
//         <Link
//           href="/partnerships"
//           className="text-sm font-medium text-foreground/80 hover:text-foreground hover:underline underline-offset-4"
//         >
//           Partnerships
//         </Link>
//       </nav>
//       <div className="flex items-center gap-4">
//         <Link href="/login">
//           <Button variant="outline">Log In</Button>
//         </Link>
//         <Link href="/register">
//           <Button>Sign Up</Button>
//         </Link>
//       </div>
//     </div>
//   </header>
  )
}

export default PublicNavigation