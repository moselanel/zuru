"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, MapPin, Calendar, Users, Loader2 } from "lucide-react"
import { useTenant } from "@/lib/tenant/context"
import Link from "next/link"

const suggestedPrompts = [
  "Plan a 7-day family safari adventure",
  "Best romantic getaway for couples",
  "Adventure trip for solo travelers",
  "Cultural immersion experience",
]

export default function AIPlannerPage() {
  const tenant = useTenant()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/planner",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          tenantSlug: tenant?.slug,
          tenantName: tenant?.name,
        },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestedPrompt = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
  }

  // Extract text from message parts
  const getMessageText = (message: typeof messages[0]) => {
    if (!message.parts) return ""
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zuru-sand/30 to-white">
      {/* Header */}
      <header className="border-b border-zuru-sand-dark/20 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-zuru-plum">
              {tenant?.name || "Destination"}
            </span>
          </Link>
          <Badge className="border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Trip Planner
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Welcome Card */}
        {messages.length === 0 && (
          <Card className="mb-8 border-zuru-plum/20 bg-gradient-to-br from-zuru-plum to-zuru-plum-dark text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6" />
                Plan Your Perfect Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-zuru-sand/90">
                Tell me about your dream trip to {tenant?.name || "this destination"} and I&apos;ll create a personalized itinerary just for you.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-zuru-sand/80">
                  <Calendar className="h-4 w-4" />
                  <span>Any duration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zuru-sand/80">
                  <Users className="h-4 w-4" />
                  <span>Solo, couples, families, groups</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zuru-sand/80">
                  <MapPin className="h-4 w-4" />
                  <span>All destinations covered</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zuru-sand/80">
                  <Sparkles className="h-4 w-4" />
                  <span>Personalized recommendations</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Suggested Prompts */}
        {messages.length === 0 && (
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-zuru-ink/70">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="border-zuru-plum/30 text-zuru-plum hover:bg-zuru-plum/5"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-zuru-plum text-white"
                    : "bg-white border border-zuru-sand-dark/20 text-zuru-ink"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {getMessageText(message)}
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-zuru-sand-dark/20 bg-white px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-zuru-plum" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="sticky bottom-4">
          <div className="flex gap-2 rounded-2xl border border-zuru-sand-dark/30 bg-white p-2 shadow-lg">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your ideal trip..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-zuru-sunset text-white hover:bg-zuru-sunset-dark"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
