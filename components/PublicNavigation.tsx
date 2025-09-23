'use client'
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Menu } from "lucide-react"
import { useSession } from 'next-auth/react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"

const PublicNavigation = () => {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0A0E13]/80 bg-[#0A0E13]/90 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md ring-1 ring-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
              <Leaf className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] uppercase tracking-[0.18em] text-slate-400">Center for</span>
              <span className="text-[15px] tracking-tight font-semibold text-white">Climate‑Smart Agriculture</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/docs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Documentation
            </Link>
            {/* <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link> */}
            <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <Link href="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/5 hover:text-white">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100">
                    Request Access
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2 hover:bg-white/5">
                <Menu className="h-5 w-5 text-slate-300" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetContent side="right" className="w-[300px] bg-[#0A0E13] border-l border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="grid h-8 w-8 place-items-center rounded-md ring-1 ring-white/10 bg-white/5">
                    <Leaf className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">CCSA</span>
                    <span className="text-[13px] tracking-tight font-semibold text-white">FarmAI</span>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/features"
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/docs"
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                  {/* <Link
                    href="/pricing"
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link> */}
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
                  {session ? (
                    <Link href="/dashboard">
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button 
                          variant="outline" 
                          className="w-full border-white/20 text-slate-200 hover:bg-white/5 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button 
                          className="w-full bg-white text-slate-900 hover:bg-slate-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Request Access
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default PublicNavigation