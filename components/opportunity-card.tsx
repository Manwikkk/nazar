"use client"

import Link from "next/link"
import { ArrowUpRight, Bookmark, TrendingUp, MapPin, Users } from "lucide-react"
import type { Opportunity } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScoreBadge } from "@/components/score-badge"
import { useState } from "react"

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="rounded-full font-normal text-muted-foreground">
              {opportunity.category}
            </Badge>
            <Badge variant="outline" className="rounded-full font-normal text-xs">
              {opportunity.growthStage}
            </Badge>
          </div>
          <h3 className="text-base font-semibold leading-snug text-foreground text-balance">{opportunity.title}</h3>
        </div>
        <ScoreBadge score={opportunity.score} />
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground text-pretty line-clamp-2">{opportunity.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Momentum
          </p>
          <p className="mt-0.5 font-semibold text-primary">{opportunity.momentum}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Evidence</p>
          <p className="mt-0.5 font-medium text-foreground">{opportunity.evidenceCount} signals</p>
        </div>
        <div>
          <p className="text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" /> Consumer
          </p>
          <p className="mt-0.5 font-medium text-foreground">{opportunity.consumerSegment}</p>
        </div>
        <div>
          <p className="text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Regions
          </p>
          <p className="mt-0.5 font-medium text-foreground">{opportunity.regions}</p>
        </div>
      </div>

      {opportunity.potentialGap && (
        <div className="mt-3 rounded-lg bg-secondary/60 px-3 py-2">
          <p className="text-xs text-muted-foreground italic text-pretty">&ldquo;{opportunity.potentialGap}&rdquo;</p>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-primary hover:text-primary"
          render={<Link href={`/opportunities/${opportunity.id}`} />}
          nativeButton={false}
        >
          View Analysis
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${saved ? "text-primary" : "text-muted-foreground"}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? "Unsave opportunity" : "Save opportunity"}
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
