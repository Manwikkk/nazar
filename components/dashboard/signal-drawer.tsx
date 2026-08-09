"use client"

import { X, TrendingUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SignalDrawerProps {
  signal: {
    label: string
    change: string
    category: string
    sources: string
    description: string
  } | null
  onClose: () => void
}

export function SignalDrawer({ signal, onClose }: SignalDrawerProps) {
  if (!signal) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 animate-fade-in" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md border-l border-border bg-card shadow-xl animate-slide-in-right overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="text-base font-semibold text-foreground">Signal Detail</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8" aria-label="Close signal detail">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Badge variant="secondary" className="rounded-full font-normal text-muted-foreground mb-3">
              {signal.category}
            </Badge>
            <h3 className="text-xl font-semibold text-foreground text-balance">{signal.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{signal.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Signal Momentum</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-semibold text-primary">
                <TrendingUp className="h-4 w-4" />
                {signal.change}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Confidence</p>
              <p className="mt-1 text-lg font-semibold text-foreground">High</p>
              <p className="text-xs text-muted-foreground">Multiple sources</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Sources</h4>
            <div className="flex flex-wrap gap-1.5">
              {signal.sources.split(" · ").map((source) => (
                <Badge key={source} variant="outline" className="rounded-full font-normal">
                  {source}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Signal Timeline</h4>
            <p className="text-xs text-muted-foreground mb-3">Prototype signal — illustrative data</p>
            <div className="space-y-2">
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => {
                const widths = [45, 58, 72, 88]
                return (
                  <div key={week} className="flex items-center gap-3">
                    <span className="w-14 text-xs text-muted-foreground">{week}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${widths[i]}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Related Opportunities</h4>
            <div className="space-y-2">
              <div className="rounded-lg border border-border p-3 card-hover cursor-pointer">
                <p className="text-sm font-medium text-foreground">{signal.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">Directly related opportunity area</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1 gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              Explore Opportunity
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Save Signal
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
