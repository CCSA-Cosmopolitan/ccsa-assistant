"use client"

import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

function SidebarToggle() {
  const { expanded, setExpanded } = useSidebar()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setExpanded(!expanded)}
      className="fixed top-4 left-4 z-50 h-8 w-8 bg-[#0A0E13] border border-white/10 text-slate-200 hover:bg-white/10 md:relative md:top-auto md:left-auto md:z-auto"
    >
      {expanded ? (
        <PanelLeftClose className="h-4 w-4" />
      ) : (
        <PanelLeftOpen className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

export function ProtectedLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#0A0E13]">
        {/* Desktop Sidebar */}
        <AppSidebar />
        
        {/* Mobile Navigation */}
        <MobileNavigation />
        
        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="w-full h-full md:overflow-y-auto">
            {/* Sidebar Toggle for Desktop */}
            <div className="hidden md:block p-4">
              <SidebarToggle />
            </div>
            
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
