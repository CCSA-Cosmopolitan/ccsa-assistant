"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface MarkdownProps {
  content: string
  className?: string
  animationSpeed?: number
  revealImmediately?: boolean
}

export function Markdown({ content, className, animationSpeed = 10, revealImmediately = false }: MarkdownProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(!revealImmediately)

  useEffect(() => {
    if (revealImmediately) {
      setDisplayedContent(content)
      setIsComplete(true)
      return
    }

    setDisplayedContent("")
    setIsComplete(false)
    setShouldAnimate(true)

    if (!content || !shouldAnimate) return

    let index = 0
    const timer = setInterval(() => {
      setDisplayedContent(content.substring(0, index + 1))
      index++

      if (index >= content.length) {
        clearInterval(timer)
        setIsComplete(true)
      }
    }, animationSpeed)

    return () => clearInterval(timer)
  }, [content, animationSpeed, revealImmediately, shouldAnimate])

  const handleSkipAnimation = () => {
    if (!isComplete) {
      setDisplayedContent(content)
      setIsComplete(true)
      setShouldAnimate(false)
    }
  }

  return (
    <div className="relative">
      <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)} onClick={handleSkipAnimation}>
        <ReactMarkdown>{displayedContent}</ReactMarkdown>
      </div>
      {shouldAnimate && !isComplete && (
        <div className="absolute bottom-0 right-0 p-2">
          <button onClick={handleSkipAnimation} className="text-xs text-muted-foreground hover:text-foreground">
            Skip animation
          </button>
        </div>
      )}
    </div>
  )
}
