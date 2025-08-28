"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface AiPageHeaderProps {
  title: string
  description: string
  language?: string
  onLanguageChange?: (language: string) => void
  showLanguageSelector?: boolean
}

export function AiPageHeader({ 
  title, 
  description, 
  language = "english", 
  onLanguageChange,
  showLanguageSelector = true 
}: AiPageHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          
          {showLanguageSelector && onLanguageChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Language:</span>
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-40 bg-background/50 border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hausa">Hausa</SelectItem>
                  <SelectItem value="yoruba">Yoruba</SelectItem>
                  <SelectItem value="igbo">Igbo</SelectItem>
                  <SelectItem value="pidgin">Nigerian Pidgin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
