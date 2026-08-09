"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Plus, MessageSquare, Search as SearchIcon, Globe, FileText, Send, Mic } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { ChatMessageBubble } from "@/components/ask/chat-message"
import { suggestedPrompts, generateMockResponse, conversationHistories, type ChatMessage } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const placeholders = [
  "Ask about emerging beauty opportunities...",
  "Which Indian cities are showing rising demand?",
  "What consumer problems are becoming more common?",
  "Find underserved opportunities in food...",
]

const expandedPrompts = [
  "Find emerging opportunities in health & wellness",
  "What consumer behaviors changed this month?",
  "Which categories are accelerating?",
  "Find premiumization opportunities",
  "Compare beauty vs food opportunities",
  "Find opportunities under ₹1,000",
  "Which cities are showing unusual momentum?",
  "What product gaps are consumers repeatedly mentioning?",
  "Find opportunities for working professionals",
  "Find emerging Gen Z needs",
  "Find overlooked consumer segments",
  "What are competitors failing to solve?",
  "Find fast-growing consumer problems",
  "Which categories have high demand but weak supply?",
  "What opportunities are emerging outside metro cities?",
]

export default function AskNazarPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingStep, setThinkingStep] = useState(0)
  
  const [webSearchEnabled, setWebSearchEnabled] = useState(false)
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false)
  const [showMorePrompts, setShowMorePrompts] = useState(false)
  const [activeConversation, setActiveConversation] = useState("new")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isSimulatingMic, setIsSimulatingMic] = useState(false)
  const [showContextDropdown, setShowContextDropdown] = useState(false)
  
  const scrollRef = useRef<HTMLDivElement>(null)

  const thinkingSteps = [
    "Reading consumer signals...",
    "Comparing patterns...",
    "Checking evidence...",
    "Identifying opportunity areas...",
  ]

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isThinking])

  useEffect(() => {
    if (!isThinking) return
    const interval = setInterval(() => {
      setThinkingStep((prev) => (prev + 1) % thinkingSteps.length)
    }, 800)
    return () => clearInterval(interval)
  }, [isThinking, thinkingSteps.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isThinking) return

    setMessages((prev) => [...prev, { role: "user", content: trimmed }])
    setInput("")
    setIsThinking(true)
    setThinkingStep(0)

    const delay = deepResearchEnabled ? 2800 : 1200
    setTimeout(() => {
      const response = generateMockResponse(trimmed)
      if (webSearchEnabled) {
        response.sources = ["Web Search", ...(response.sources || [])]
      }
      setMessages((prev) => [...prev, response])
      setIsThinking(false)
      
      // If it's a new conversation, update history list
      if (activeConversation === "new") {
        const newId = `c_new_${Date.now()}`
        setActiveConversation(newId)
        conversationHistories.unshift({
          id: newId,
          title: trimmed.slice(0, 30) + (trimmed.length > 30 ? "..." : ""),
          time: "Just now",
          preview: response.summary?.slice(0, 40) + "..." || "New analysis...",
        })
      }
    }, delay)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.nativeEvent.isComposing || (e as unknown as { keyCode: number }).keyCode === 229) return
      e.preventDefault()
      sendMessage(input)
    }
  }

  function startNewConversation() {
    setMessages([])
    setActiveConversation("new")
    setInput("")
  }

  function loadConversation(id: string) {
    setActiveConversation(id)
    setIsThinking(false)
    if (id === "c1") {
      setMessages([
        { role: "user", content: "What consumer needs are emerging in Indian beauty?" },
        generateMockResponse("What consumer needs are emerging in Indian beauty?"),
        { role: "user", content: "What about Tier-2 cities?" },
        generateMockResponse("What about Tier-2 cities?"),
      ])
    } else if (id === "c2") {
      setMessages([
        { role: "user", content: "Find food opportunities with rising demand." },
        generateMockResponse("Find food opportunities with rising demand."),
      ])
    } else if (id === "c3") {
      setMessages([
        { role: "user", content: "Which Tier-2 cities show strong consumer momentum?" },
        generateMockResponse("Which Tier-2 cities show strong consumer momentum?"),
      ])
    } else if (id === "c4") {
      setMessages([
        { role: "user", content: "Find underserved Gen Z consumer segments." },
        generateMockResponse("Find underserved Gen Z consumer segments."),
      ])
    } else {
      setMessages([])
    }
  }

  function simulateMic() {
    setIsSimulatingMic(true)
    setTimeout(() => {
      setInput("What consumer opportunities are emerging in Indian beauty?")
      setIsSimulatingMic(false)
    }, 2500)
  }

  const isEmpty = messages.length === 0

  return (
    <AppShell title="" subtitle="" hideSearch>
      <div className="flex h-full w-full overflow-hidden bg-background">
        
        {/* Chat History Sidebar */}
        <div className="hidden w-[260px] shrink-0 flex-col border-r border-border bg-secondary/10 p-4 lg:flex overflow-y-auto">
          <div className="mb-6 flex items-center gap-2">
            <img src="/icon.svg" alt="Nazar" className="h-5 w-5 text-foreground" />
            <span className="font-semibold text-foreground tracking-tight">Nazar History</span>
          </div>
          
          <button 
            onClick={startNewConversation}
            className="mb-6 flex w-full items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-transform active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New analysis
          </button>

          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full rounded-md border border-border bg-background px-9 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Recent</p>
              <div className="space-y-1">
                {conversationHistories.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => loadConversation(conv.id)}
                    className={cn(
                      "flex w-full flex-col items-start gap-1 rounded-md px-3 py-2 text-left transition-colors",
                      activeConversation === conv.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <span className="text-[13px] font-medium truncate w-full">{conv.title}</span>
                    <span className="text-[10px] opacity-70">{conv.time}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex flex-1 flex-col relative h-full max-w-[1200px] mx-auto">
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 pb-36 pt-8 md:px-8"
          >
            {isEmpty ? (
              <div className="flex h-full flex-col items-center justify-center text-center animate-fade-in -mt-4">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <img src="/icon.svg" alt="Nazar" className="h-14 w-14" />
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-[42px]">Nazar</h1>
                </div>
                <h2 className="text-sm font-semibold text-muted-foreground tracking-wide uppercase mb-6">India's Consumer Opportunity Radar</h2>
                <p className="text-[15px] text-muted-foreground max-w-[600px] mb-12">
                  See what Indian consumers are starting to want &mdash; before it becomes obvious.
                </p>

                <div className="w-full max-w-[800px] text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4 pl-1">
                    Explore India's consumer signals
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {suggestedPrompts.slice(0, 6).map((prompt, idx) => (
                      <button
                        key={`prompt-${idx}`}
                        onClick={() => sendMessage(prompt)}
                        className="prompt-chip rounded-full border border-border/50 bg-secondary/30 px-4 py-2.5 text-[14px] text-foreground hover:bg-secondary hover:border-border shadow-sm backdrop-blur-sm transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  

                </div>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-[850px] space-y-6">
                {messages.map((message, i) => (
                  <ChatMessageBubble 
                    key={i} 
                    message={message} 
                    onSendFollowUp={sendMessage} 
                  />
                ))}
                
                {isThinking && (
                  <div className="flex gap-4 animate-fade-in">
                    <div className="mt-1 flex shrink-0 items-center justify-center">
                      <img src="/icon.svg" alt="Nazar" className="h-8 w-8" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[14px] font-medium text-muted-foreground animate-typing-text">
                        {thinkingSteps[thinkingStep]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Composer */}
          <div className="absolute bottom-6 left-1/2 w-full max-w-[820px] -translate-x-1/2 px-4 md:px-0">
            <div className="relative rounded-2xl border border-border bg-card shadow-[0_4px_24px_rgba(0,0,0,0.04)] focus-within:shadow-[0_4px_32px_rgba(0,0,0,0.08)] focus-within:border-primary/30 transition-all duration-200">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholders[placeholderIndex]}
                className="w-full resize-none rounded-t-2xl bg-transparent px-5 py-4 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[60px] max-h-[200px]"
                rows={1}
                disabled={isThinking || isSimulatingMic}
              />
              
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <button 
                      onClick={() => setShowContextDropdown(!showContextDropdown)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    {showContextDropdown && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowContextDropdown(false)} />
                        <div className="absolute bottom-full left-0 mb-2 z-50 w-56 rounded-xl border border-border bg-card p-1.5 shadow-lg animate-slide-up">
                          <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Add context</p>
                          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors" onClick={() => setShowContextDropdown(false)}>
                            <FileText className="h-3.5 w-3.5" /> Upload research document
                          </button>
                          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors" onClick={() => setShowContextDropdown(false)}>
                            <FileText className="h-3.5 w-3.5" /> Add market report
                          </button>
                          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors" onClick={() => setShowContextDropdown(false)}>
                            <FileText className="h-3.5 w-3.5" /> Add competitor info
                          </button>
                          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors" onClick={() => setShowContextDropdown(false)}>
                            <Plus className="h-3.5 w-3.5" /> Add notes
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                    className={cn(
                      "group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all active:scale-[0.98]",
                      webSearchEnabled 
                        ? "bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm" 
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
                    )}
                  >
                    <Globe className={cn("h-4 w-4 transition-colors", webSearchEnabled ? "text-blue-500" : "text-muted-foreground group-hover:text-foreground")} />
                    {webSearchEnabled ? "Web Search" : "Web"}
                  </button>
                  
                  <button 
                    onClick={() => setDeepResearchEnabled(!deepResearchEnabled)}
                    className={cn(
                      "group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all active:scale-[0.98]",
                      deepResearchEnabled 
                        ? "bg-purple-500/10 text-purple-500 border border-purple-500/20 shadow-sm" 
                        : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
                    )}
                  >
                    <FileText className={cn("h-4 w-4 transition-colors", deepResearchEnabled ? "text-purple-500" : "text-muted-foreground group-hover:text-foreground")} />
                    {deepResearchEnabled ? "Deep Research" : "Deep Research"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={simulateMic}
                    disabled={isSimulatingMic}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors active:scale-95"
                  >
                    {isSimulatingMic ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </button>
                  
                  <button 
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isThinking || isSimulatingMic}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 active:scale-95",
                      input.trim() 
                        ? "bg-foreground text-background shadow-sm hover:opacity-90" 
                        : "bg-secondary text-muted-foreground opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] text-muted-foreground">
                Prototype behavior — Nazar can make mistakes. Check important signals.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </AppShell>
  )
}
