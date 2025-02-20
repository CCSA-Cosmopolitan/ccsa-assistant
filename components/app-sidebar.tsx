"use client"

import * as react from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ArrowUpZA,
} from "lucide-react"
import logo from "./logo"



import { NavMain } from "@/components/nav-main"
import cosmoLogo from '@/public/cosmo-logo.png'
import cosmoSvg from '@/public/cosmo-svg.svg'
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"





const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CCSA CUA (AI)",
      logo: logo,
      plan: "Smart Agriculture AI Assiatant",
    },
  ],
  navMain: [
    {
      title: "AI Assistants",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Yield Calculator",
          url: "#",
        },
        {
          title: "Soil Analyzer",
          url: "#",
        },
        {
          title: "Farm Manager",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Livestock Manager",
          url: "#",
        },
        {
          title: "Farm Assistant",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Chats",
      url: "/chats",
      icon: Bot,
      items: [
        {
          title: "Yield Calculator",
          url: "/chats/yield-calculator",
        },
        {
          title: "Soil Analyzer",
          url: "/chats/soil-analyzer",
        },
        {
          title: "Farm Manager",
          url: "/chats/farm-manager",
        },
        {
          title: "Livestock Manager",
          url: "/chats/livestock-manager",
        },
        {
          title: "Farm Assistant",
          url: "/chats/farm-assistant",
        },
      
      ],
    },

  ],

}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar> ) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
        teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
