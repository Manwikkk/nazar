"use client"

import { useState } from "react"
import { CheckCircle2, Compass, Lightbulb, BookOpen, Copy, Bookmark, RefreshCw, MoreHorizontal, FileText, BarChart2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ChatMessage } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ChatMessageBubble({ message, onSendFollowUp }: { message: ChatMessage; onSendFollowUp?: (msg: string) => void }) {
  const [showConfidence, setShowConfidence] = useState(false)
  const [showMoreActions, setShowMoreActions] = useState(false)

  if (message.role === "user") {
    return (
      <div className="flex justify-end animate-chat-response mb-6">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-secondary px-4 py-3 text-[15px] leading-relaxed text-foreground text-pretty">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 animate-chat-response mb-8 max-w-[850px] mx-auto w-full">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
        <img src="/icon.svg" alt="Nazar" className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 space-y-4">
        {message.summary && (
          <p className="text-[15px] leading-relaxed text-foreground text-pretty font-medium">{message.summary}</p>
        )}

        {/* Structured opportunity responses */}
        {message.opportunities && message.opportunities.length > 0 && (
          <div className="space-y-4 mt-2">
            {message.opportunities.map((opp, i) => (
              <div key={opp.title} className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-sm card-hover">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground flex items-center gap-2">
                      <span className="text-primary">{String(i + 1).padStart(2, "0")} &mdash;</span> 
                      {opp.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-foreground leading-none">{opp.score}<span className="text-[10px] text-muted-foreground font-normal ml-0.5">/100</span></p>
                  </div>
                </div>
                
                <p className="text-[13px] leading-relaxed text-foreground text-pretty">
                  <span className="font-medium">Consumer signal:</span> {opp.whyInteresting}
                </p>
                
                <div className="flex flex-col gap-1 text-[13px]">
                  <p><span className="font-medium text-foreground">Momentum:</span> <span className="text-primary">{opp.momentum}</span></p>
                  <p><span className="font-medium text-foreground">Potential gap:</span> <span className="text-muted-foreground italic">&ldquo;{opp.gap}&rdquo;</span></p>
                </div>
                
                <div className="pt-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Strongest Signals</p>
                  <div className="flex flex-wrap gap-2">
                    {opp.signals.map((sig) => (
                      <div key={sig} className="rounded-md bg-secondary/50 px-2.5 py-1.5 text-[12px] font-medium text-foreground border border-border/50">
                        {sig}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {message.insights && message.insights.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Lightbulb className="h-3.5 w-3.5" />
              Key insights
            </p>
            <ul className="space-y-2">
              {message.insights.map((insight) => (
                <li key={insight} className="flex gap-2.5 text-[14px] leading-relaxed text-foreground text-pretty">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {message.nextSteps && message.nextSteps.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
              <Compass className="h-4 w-4 text-primary" />
              Recommended next step
            </p>
            <div className="space-y-2">
              {message.nextSteps.map((step) => (
                <p key={step} className="text-[14px] leading-relaxed text-foreground text-pretty">
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Evidence</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {message.sources.map((source) => (
                <div key={source} className="rounded-lg border border-border bg-card p-2.5 text-xs">
                  <p className="font-medium text-foreground">{source}</p>
                  <p className="text-muted-foreground mt-0.5">30-day signal</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {message.confidence && (
          <div className="mt-4 border-t border-border pt-3">
            <button 
              onClick={() => setShowConfidence(!showConfidence)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-primary transition-colors"
            >
              Confidence: {message.confidence}
              {showConfidence ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
            </button>
            
            {showConfidence && (
              <div className="mt-2 rounded-lg bg-secondary/40 p-3 text-[13px] leading-relaxed text-muted-foreground animate-slide-up border border-border/50">
                <p className="font-medium text-foreground mb-1.5">Why this confidence?</p>
                <p className="mb-2">Confidence increases when multiple independent sources support the same pattern.</p>
                <p className="font-medium text-foreground mb-1">Signals considered:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Source diversity</li>
                  <li>Signal volume</li>
                  <li>Growth rate</li>
                  <li>Geographic consistency</li>
                  <li>Repetition of consumer pain</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Follow-up chips */}
        {onSendFollowUp && (
          <div className="flex flex-wrap gap-2 pt-4">
            <button onClick={() => onSendFollowUp("What about Tier-2 cities?")} className="prompt-chip rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-secondary">
              What about Tier-2 cities?
            </button>
            <button onClick={() => onSendFollowUp("Who is the target consumer?")} className="prompt-chip rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-secondary">
              Who is the target consumer?
            </button>
            <button onClick={() => onSendFollowUp("How competitive is this market?")} className="prompt-chip rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-secondary">
              How competitive is this market?
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-1 pt-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Bookmark className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => setShowMoreActions(!showMoreActions)}
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
            {showMoreActions && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMoreActions(false)} />
                <div className="absolute left-0 top-full mt-1 z-50 rounded-lg border border-border bg-card shadow-lg p-1 min-w-[180px] animate-slide-up">
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                    <Bookmark className="h-3 w-3" /> Save to insights
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                    <FileText className="h-3 w-3" /> Create research brief
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                    <BarChart2 className="h-3 w-3" /> Compare opportunity
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary">
                    <MessageSquare className="h-3 w-3" /> Ask follow-up
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
