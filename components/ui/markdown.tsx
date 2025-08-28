"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"
import type { Components } from "react-markdown"
import { Button } from "./button"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Copy to clipboard function
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [id]: true }))
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      })
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }))
      }, 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard",
        variant: "destructive",
      })
    }
  }

  // Custom components for enhanced styling
  const customComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4 mt-6 border-b border-border pb-2 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mb-3 mt-6 text-foreground flex items-center">
        <span className="w-1 h-6 bg-primary rounded-full mr-3"></span>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mb-2 mt-5 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold mb-2 mt-3 text-foreground">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-foreground leading-relaxed mb-4 text-sm">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 space-y-1 pl-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 space-y-1 pl-6 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground leading-relaxed relative">
        <span className="relative z-10">{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">
        {children}
      </em>
    ),
    code: ({ children, className }) => {
      const isInline = !className?.includes('language-')
      return isInline ? (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
          {children}
        </code>
      ) : (
        <code className={className}>
          {children}
        </code>
      )
    },
    pre: ({ children }) => {
      const codeId = Math.random().toString(36).substring(7)
      
      // Simple text extraction - we'll just use the full content for now
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node
        if (Array.isArray(node)) return node.map(extractText).join('')
        if (node?.props?.children) return extractText(node.props.children)
        return ''
      }
      
      const codeContent = extractText(children)
      
      return (
        <div className="relative group">
          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto my-4 pr-12">
            {children}
          </pre>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
            onClick={() => copyToClipboard(codeContent, codeId)}
          >
            {copiedStates[codeId] ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic bg-muted/50 py-3 my-6 rounded-r-lg relative">
        <div className="absolute top-2 left-2 text-primary opacity-50">
          <span className="text-2xl">"</span>
        </div>
        <div className="pl-4">
          {children}
        </div>
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-primary underline decoration-primary/30 hover:decoration-primary transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="border-collapse border border-border rounded-lg overflow-hidden w-full">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-muted border border-border px-3 py-2 font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-3 py-2">
        {children}
      </td>
    ),
  }

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
      <div 
        className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          "text-foreground", // Ensure text is visible in both themes
          className
        )} 
        onClick={handleSkipAnimation}
      >
        <ReactMarkdown components={customComponents}>
          {displayedContent}
        </ReactMarkdown>
      </div>
      
      {/* Copy full content button */}
      {isComplete && displayedContent && (
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 hover:opacity-100 transition-opacity h-8 w-8 p-0"
            onClick={() => copyToClipboard(displayedContent, 'full-content')}
            title="Copy full content"
          >
            {copiedStates['full-content'] ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      
      {/* Skip animation button */}
      {/* {shouldAnimate && !isComplete && (
        <div className="absolute bottom-0 right-0 p-2">
          <button 
            onClick={handleSkipAnimation} 
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded bg-background/80 backdrop-blur-sm border border-border/50"
          >
            Skip animation
          </button>
        </div>
      )} */}
    </div>
  )
}
