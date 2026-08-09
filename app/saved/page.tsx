"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { ScoreBadge } from "@/components/score-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getOpportunityById, savedInsights, type SavedInsight } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  Watchlist: "bg-accent text-accent-foreground border-accent",
  Researching: "bg-primary/10 text-primary border-primary/20",
  Validated: "bg-green-50 text-green-700 border-green-200",
  Rejected: "bg-muted text-muted-foreground border-border",
}

const statusOptions: SavedInsight["status"][] = ["Watchlist", "Researching", "Validated", "Rejected"]

const tabs = [
  { id: "all", label: "All" },
  { id: "opportunity", label: "Saved Opportunities" },
  { id: "signal", label: "Saved Signals" },
  { id: "brief", label: "Research Briefs" },
]

export default function SavedInsightsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [insights, setInsights] = useState(savedInsights)

  const filtered = activeTab === "all" ? insights : insights.filter((i) => i.type === activeTab)

  function changeStatus(id: string, newStatus: SavedInsight["status"]) {
    setInsights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
  }

  return (
    <AppShell title="Saved Insights" subtitle="Bookmarked opportunities, signals, and briefs your team is tracking" hideSearch>
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => {
          const count = tab.id === "all" ? insights.length : insights.filter((i) => i.type === tab.id).length
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-muted-foreground">({count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">No saved insights in this category yet.</p>
          <div className="mt-3 flex justify-center gap-2">
            <Button size="sm" variant="outline" render={<Link href="/opportunities" />} nativeButton={false}>
              Explore Opportunities
            </Button>
            <Button size="sm" render={<Link href="/ask" />} nativeButton={false}>
              Ask Nazar
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const opportunity = getOpportunityById(item.opportunityId)
            if (!opportunity) return null

            return (
              <div key={item.id} className="rounded-xl border border-border bg-card p-5 shadow-sm card-hover">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <ScoreBadge score={opportunity.score} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="rounded-full font-normal text-muted-foreground">
                          {opportunity.category}
                        </Badge>
                        <Badge variant="outline" className="rounded-full font-normal text-[10px]">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Saved {item.savedAt}</span>
                      </div>
                      <h3 className="mt-1.5 text-base font-semibold text-foreground text-pretty">
                        {opportunity.title}
                      </h3>
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
                        {item.note}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="rounded-full font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    {/* Status dropdown */}
                    <div className="relative group">
                      <Badge className={cn("rounded-full border font-normal cursor-pointer", statusStyles[item.status])}>
                        {item.status}
                      </Badge>
                      <div className="absolute right-0 top-full z-10 mt-1 hidden group-hover:block">
                        <div className="rounded-lg border border-border bg-card shadow-lg p-1 min-w-[140px] animate-slide-up">
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => changeStatus(item.id, status)}
                              className={cn(
                                "w-full rounded-md px-3 py-1.5 text-left text-xs transition-colors",
                                item.status === status ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              )}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 px-2 text-primary hover:text-primary"
                      render={<Link href={`/opportunities/${opportunity.id}`} />}
                      nativeButton={false}
                    >
                      Open analysis
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AppShell>
  )
}
