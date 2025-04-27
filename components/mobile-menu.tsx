"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export default function MobileMenu(session: any) {
  const [open, setOpen] = useState(false)


  const {data} = session

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden px-4 w-10 h-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetTitle className=" sr-only"></SheetTitle>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 px-2 mt-10">
          <Link
            href="/about"
            className="text-lg font-medium hover:text-green-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            About US
          </Link>
          <Link
            href="/pricing"
            className="text-lg font-medium hover:text-green-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/partnerships"
            className="text-lg font-medium hover:text-green-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Partnerships
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-green-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-2 mt-4">

            {
              data ? (
                <Link href={'/'} className="text-lg font-medium hover:text-green-600 transition-colors">
                  Dashboard
                </Link>
              ) : (
               <>

              <Link href={'/login'} className="text-lg w-full flex font-medium hover:text-green-600 transition-colors">
                <Button variant="outline" className=" border-primary w-full" onClick={() => setOpen(false)}>
                  Log in
                </Button>
                </Link>
                <Link href={'/register'} className="text-lg w-full flex font-medium hover:text-green-600 transition-colors">
                  <Button className="bg-green-600 w-full hover:bg-green-700" onClick={() => setOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              
               
               </>
              )
            }
            
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

