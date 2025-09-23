"use client"

import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"

export function ProtectedLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        {/* Mobile Navigation */}
        <MobileNavigation />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen w-full">
          <div className="w-full h-full md:overflow-y-auto">
            {/* Mobile spacer is handled in MobileNavigation component */}
            <div className="md:hidden h-4" /> {/* Small top spacing for mobile */}
            {children}
            <div className="md:hidden h-4" /> {/* Small bottom spacing for mobile */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
