"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import logo from '@/public/logo-image.png'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BarChart3, Home, Leaf, LogOut, MessageSquare, Settings, Users, Wallet, Sun, Moon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { expanded } = useSidebar()
  const isAdmin = session?.user?.role === "ADMIN"

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const userRoutes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Farmers Assistant",
      href: "/farmers-assistant",
      icon: MessageSquare,
    },
    {
      title: "Farm Analyzer",
      href: "/farm-analyzer",
      icon: BarChart3,
    },
    {
      title: "Crop Analyzer",
      href: "/crop-analyzer",
      icon: Leaf,
    },
    {
      title: "Soil Analyzer",
      href: "/soil-analyzer",
      icon: BarChart3,
    },
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

  const adminRoutes = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const routes = isAdmin ? adminRoutes : userRoutes

  return (
    <Sidebar className="hidden md:flex bg-white dark:bg-[#0A0E13] border-r border-white/10 h-full">
      <SidebarHeader className=" border-white/10">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="rounded-full flex items-center justify-center">
            {/* <Leaf className="h-5 w-5 text-emerald-400" /> */}
            <Image src={logo} alt="CCSA Logo" className="h-10 w-10 object-contain" />
          </div>
          {expanded && (
            <div className="flex flex-col leading-tight">
              <span className="text-[20px] uppercase tracking-[0.18em] text-slate-400">CCSA</span>
              {/* <span className="text-[px] tracking-tight font-semibold text-white">Climate‑Smart Agriculture</span> */}
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {expanded && <SidebarGroupLabel className="text-slate-300">{isAdmin ? "Admin" : "Dashboard"}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={pathname === route.href} className="text-slate-200 hover:bg-white/10 hover:text-white data-[active=true]:bg-emerald-500/20 data-[active=true]:text-emerald-300">
                    <Link href={route.href}>
                      <route.icon className="h-4 w-4" />
                      {expanded && <span>{route.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10">
        <div className="p-4 space-y-4">
          {/* Theme Switcher */}
          <div className="flex items-center justify-between">
            {expanded && <span className="text-sm text-slate-300">Theme</span>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 text-slate-200 hover:bg-white/10"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <div className="h-4 w-4" /> // Empty placeholder during hydration
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-300">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              {expanded && (
                <div>
                  <p className="text-sm font-medium line-clamp-1 text-white">{session?.user?.name}</p>
                  <p className="text-xs text-slate-400">{session?.user?.email}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-slate-400 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
