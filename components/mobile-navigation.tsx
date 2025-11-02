"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { BarChart3, Home, Leaf, MessageSquare, Settings, Wallet, Beaker, Menu, X, LogOut, Sun, Moon, User } from "lucide-react"
import { cn } from "@/lib/utils"
import logo from '@/public/logo-image.png'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const mobileNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Assistant",
    href: "/farmers-assistant",
    icon: MessageSquare,
  },
  {
    title: "Farm",
    href: "/farm-analyzer",
    icon: BarChart3,
  },
  {
    title: "Crop",
    href: "/crop-analyzer",
    icon: Leaf,
  },
  {
    title: "Soil",
    href: "/soil-analyzer",
    icon: Beaker,
  },
]

const mobileMenuItems = [
  {
    title: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MobileNavigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Bottom Navigation - AI Tools */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0E13] border-t border-white/10">
        <div className="grid grid-cols-5 gap-1 p-2">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg text-xs transition-colors",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-[10px] font-medium truncate">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Top Bar - Logo & Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A0E13]/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="rounded-full ">
              {/* <Leaf className="h-5 w-5 text-emerald-400" /> */}
              <Image src={logo} alt="CCSA Logo" className="h-10 w-10 object-contain" />
            </div>
            <span className=" text-2xl tracking-tight -ml-6 font-thin font-mono text-white">CCSA</span>
          </div>

          {/* Quick Actions & Menu */}
          <div className="flex items-center gap-2">
            {/* Quick Wallet Access */}
            <Link
              href="/wallet"
              className={cn(
                "flex items-center justify-center p-2 rounded-lg transition-colors",
                pathname === "/wallet"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/10"
              )}
            >
              <Wallet className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Sheet */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-200 hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#0A0E13] border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-left text-white">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col space-y-6 mt-6">
                  {/* User Profile */}
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-emerald-500/20 text-emerald-300">
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{session?.user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-300 px-2">Account</h3>
                    {mobileMenuItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            isActive
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "text-slate-200 hover:bg-white/10"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Theme Switcher */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-300 px-2">Preferences</h3>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10">
                      <div className="flex items-center gap-3">
                        {theme === "dark" ? <Moon className="h-5 w-5 text-slate-200" /> : <Sun className="h-5 w-5 text-slate-200" />}
                        <span className="font-medium text-white">Theme</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="border-white/20 text-slate-200 hover:bg-white/10"
                      >
                        {theme === "dark" ? "Light" : "Dark"}
                      </Button>
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full justify-start gap-3 text-red-400 border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Spacer for mobile top bar */}
      <div className="md:hidden h-[72px]" />
      
      {/* Spacer for mobile bottom navigation */}
      <div className="md:hidden h-[80px]" />
    </>
  )
}
