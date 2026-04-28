"use client"

import React, { useRef, useEffect, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Send,
  Sparkles,
  Calendar,
  Users,
  Wallet,
  MapPin,
  Compass,
  TreePine,
  Camera,
  Heart,
  Loader2,
  Bot,
  User,
} from "lucide-react"
import { MTPALogo } from "@/components/mtpa-logo"

// Helper to extract text from UIMessage parts
function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

const quickPrompts = [
  {
    icon: TreePine,
    label: "Wildlife Safari",
    prompt: "I want to plan a 3-day Big Five safari experience in Mpumalanga. I'm interested in seeing lions, elephants, and leopards. Budget is around R15,000 per person.",
  },
  {
    icon: Compass,
    label: "Panorama Route",
    prompt: "Plan a scenic 2-day road trip along the Panorama Route. I want to see God's Window, Blyde River Canyon, and waterfalls. Traveling as a couple.",
  },
  {
    icon: Users,
    label: "Family Adventure",
    prompt: "We're a family of 4 with kids aged 8 and 12. Looking for a 4-day trip that combines wildlife, adventure activities, and is kid-friendly. Budget around R40,000 total.",
  },
  {
    icon: Heart,
    label: "Romantic Getaway",
    prompt: "Planning a romantic 3-day escape for our anniversary. Looking for luxury lodges, private game drives, and special dining experiences. Budget is flexible.",
  },
  {
    icon: Camera,
    label: "Photography Trip",
    prompt: "I'm a wildlife photographer looking for the best locations and times for photography in Mpumalanga. 5 days available, intermediate budget.",
  },
  {
    icon: Wallet,
    label: "Budget Explorer",
    prompt: "I want to experience Mpumalanga on a budget of R5,000 for 3 days. What's the best way to see the highlights without breaking the bank?",
  },
]

export default function ItineraryPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/itinerary",
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <Link href="/" className="flex items-center gap-2">
                <MTPALogo className="h-8 w-8" />
                <span className="font-serif font-bold text-lg hidden md:inline">MTPA</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="font-serif text-lg font-bold">AI Trip Planner</h1>
            </div>

            <Link href="/discover">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">View Map</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Plan Your Perfect Mpumalanga Adventure
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Tell me about your dream trip and I'll create a personalized itinerary featuring the best parks, wildlife experiences, and scenic attractions.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="w-full max-w-3xl">
              <p className="text-sm text-muted-foreground mb-3 text-center">Quick start with a suggestion:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickPrompts.map((item) => (
                  <Card
                    key={item.label}
                    className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                    onClick={() => handleQuickPrompt(item.prompt)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <item.icon className="h-6 w-6 text-primary mb-2" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Day-by-day planning</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>Budget estimates</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Local expertise</span>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const messageText = getMessageText(message)
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {messageText.split("\n").map((line, lineIndex) => {
                        // Format headers
                        if (line.startsWith("## ")) {
                          return (
                            <h3 key={lineIndex} className="font-serif font-bold text-lg mt-4 mb-2 first:mt-0">
                              {line.replace("## ", "")}
                            </h3>
                          )
                        }
                        if (line.startsWith("### ")) {
                          return (
                            <h4 key={lineIndex} className="font-semibold mt-3 mb-1">
                              {line.replace("### ", "")}
                            </h4>
                          )
                        }
                        // Format day headers
                        if (line.match(/^Day \d+/i) || line.match(/^\*\*Day \d+/i)) {
                          return (
                            <div key={lineIndex} className="flex items-center gap-2 mt-4 mb-2">
                              <Badge variant="secondary" className="font-semibold">
                                {line.replace(/\*\*/g, "")}
                              </Badge>
                            </div>
                          )
                        }
                        // Format bullet points
                        if (line.startsWith("- ") || line.startsWith("* ")) {
                          return (
                            <div key={lineIndex} className="flex gap-2 ml-2">
                              <span className="text-primary">•</span>
                              <span>{line.substring(2)}</span>
                            </div>
                          )
                        }
                        // Format bold text
                        if (line.includes("**")) {
                          const parts = line.split(/\*\*(.*?)\*\*/g)
                          return (
                            <p key={lineIndex} className="my-1">
                              {parts.map((part, i) =>
                                i % 2 === 1 ? (
                                  <strong key={i}>{part}</strong>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </p>
                          )
                        }
                        // Regular text
                        return line ? <p key={lineIndex} className="my-1">{line}</p> : <br key={lineIndex} />
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
            {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Planning your adventure...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="border-t bg-card p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your ideal Mpumalanga trip... (e.g., '4-day family safari with kids, budget R30,000')"
                className="min-h-[60px] max-h-[200px] resize-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-[60px] w-[60px] flex-shrink-0"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI-powered itineraries based on MTPA's parks, accommodations, and experiences
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
