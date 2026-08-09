"use client"

import { MessageSquare, Newspaper, PlayCircle, Search, Star, Users, FileText, type LucideIcon, Info } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { evidenceSources } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

const sourceIcons: Record<string, LucideIcon> = {
  "google-trends": Search,
  reddit: MessageSquare,
  youtube: PlayCircle,
  reviews: Star,
  news: Newspaper,
  "social-chatter": Users,
  "research-reports": FileText,
}

const volumeStyles = {
  High: "bg-primary/10 text-primary border-primary/20",
  Medium: "bg-accent text-accent-foreground border-accent",
  Low: "bg-muted text-muted-foreground border-border",
}

export default function EvidenceSourcesPage() {
  const [showConfidenceInfo, setShowConfidenceInfo] = useState(false)

  return (
    <AppShell
      title="Evidence"
      subtitle="Every opportunity is grounded in real, traceable public signal data"
      hideSearch
    >
      <div className="mb-6 rounded-xl border border-border bg-secondary/40 p-5">
        <p className="text-sm leading-relaxed text-foreground text-pretty">
          Different sources capture different parts of the consumer journey. Nazar combines them rather than relying on a single signal.
          Every score and insight is built from a blend of search demand, community discussion, review sentiment, and news coverage — each with clear volume and freshness indicators.
        </p>
      </div>

      {/* Source Confidence */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Source Confidence</h2>
          <button
            className="flex items-center gap-1 text-xs text-primary hover:underline"
            onClick={() => setShowConfidenceInfo(!showConfidenceInfo)}
          >
            <Info className="h-3 w-3" />
            How it works
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-xs text-foreground font-medium">High Confidence</span>
            <span className="text-xs text-muted-foreground">— multiple independent sources agree</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-foreground/50" />
            <span className="text-xs text-foreground font-medium">Medium Confidence</span>
            <span className="text-xs text-muted-foreground">— some supporting evidence</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="text-xs text-foreground font-medium">Low Confidence</span>
            <span className="text-xs text-muted-foreground">— limited or single-source signals</span>
          </div>
        </div>

        {showConfidenceInfo && (
          <div className="mt-3 rounded-lg bg-secondary/40 p-3 text-xs text-muted-foreground leading-relaxed animate-slide-up">
            Confidence increases when multiple independent sources support the same pattern. Consumer chatter alone should never be treated as guaranteed market demand. Nazar combines multiple signal types to build a more reliable picture.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {evidenceSources.map((source) => {
          const Icon = sourceIcons[source.id] || Search
          return (
            <div key={source.id} className="rounded-xl border border-border bg-card p-5 shadow-sm card-hover">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{source.name}</h3>
                </div>
                <Badge className={cn("rounded-full border font-normal", volumeStyles[source.volume])}>
                  {source.volume} volume
                </Badge>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{source.contributes}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Signal Contribution</p>
                  <p className="mt-0.5 font-medium text-foreground">{source.signalContribution}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Freshness</p>
                  <p className="mt-0.5 font-medium text-foreground">{source.freshness}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Coverage</p>
                  <p className="mt-0.5 font-medium text-foreground">{source.coverage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reliability</p>
                  <p className="mt-0.5 font-medium text-foreground">{source.reliability}</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-3">
                <p className="text-xs font-medium text-muted-foreground">Example signal</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground text-pretty">{source.example}</p>
              </div>
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
