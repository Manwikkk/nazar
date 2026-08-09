"use client"

import Link from "next/link"
import { MapPin, ArrowUpRight, TrendingUp } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cities } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const interestStyles = {
  "Very high": "bg-primary/10 text-primary border-primary/20",
  High: "bg-accent text-accent-foreground border-accent",
  Moderate: "bg-muted text-muted-foreground border-border",
}

export default function CitiesPage() {
  const topCities = [...cities].sort((a, b) => b.risingSignals - a.risingSignals).slice(0, 5)
  const maxSignals = Math.max(...cities.map((c) => c.signalVolume))

  return (
    <AppShell title="Cities" subtitle="Regional consumer opportunity activity across India" hideSearch>
      {/* Hero map section */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">India&apos;s Opportunity Map</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Regional signal concentration across tracked cities.</p>

        {/* Region-based visualization */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {cities.map((city) => (
            <Link key={city.id} href={`/cities/${city.id}`}>
              <div className="rounded-lg border border-border bg-card p-3 text-center card-hover cursor-pointer">
                <p className="text-sm font-semibold text-foreground">{city.name}</p>
                <p className="text-[10px] text-muted-foreground">{city.tier}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min(100, (city.signalVolume / maxSignals) * 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs font-medium text-primary">{city.momentum}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Top cities ranking */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-foreground">Top cities by activity</h2>
          <p className="mt-1 text-xs text-muted-foreground">Ranked by rising signal count this month</p>
          <ol className="mt-4 space-y-3">
            {topCities.map((city, i) => (
              <li key={city.id}>
                <Link href={`/cities/${city.id}`} className="flex items-center gap-3 group">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">{city.name}</span>
                  <span className="text-xs font-medium text-muted-foreground">{city.risingSignals} signals</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Signal summary */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground">Signal Distribution</h2>
          <p className="mt-1 text-xs text-muted-foreground">Relative signal volume across all tracked cities</p>
          <div className="mt-4 space-y-2">
            {cities.sort((a, b) => b.signalVolume - a.signalVolume).map((city) => (
              <div key={city.id} className="flex items-center gap-3">
                <span className="w-24 text-xs font-medium text-foreground truncate">{city.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(city.signalVolume / maxSignals) * 100}%` }}
                  />
                </div>
                <span className="w-16 text-right text-xs text-muted-foreground">{city.signalVolume.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All cities grid */}
      <h2 className="mb-4 text-sm font-semibold text-foreground">All Tracked Cities</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((city) => (
          <div key={city.id} className="rounded-xl border border-border bg-card p-5 shadow-sm card-hover">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">{city.name}</h3>
              <Badge variant="outline" className="rounded-full font-normal text-[10px]">
                {city.tier}
              </Badge>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Badge className={cn("rounded-full border font-normal text-[10px]", interestStyles[city.interestLevel])}>
                {city.interestLevel}
              </Badge>
              <span className="text-xs font-medium text-primary flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> {city.momentum}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3 text-xs">
              <div>
                <p className="text-muted-foreground">Signals</p>
                <p className="mt-0.5 font-medium text-foreground">{city.signalVolume.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Opportunities</p>
                <p className="mt-0.5 font-medium text-foreground">{city.opportunityCount}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Top category</p>
                <p className="mt-0.5 font-medium text-foreground">{city.topCategory}</p>
              </div>
            </div>

            <div className="mt-3 border-t border-border pt-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-primary hover:text-primary"
                render={<Link href={`/cities/${city.id}`} />}
                nativeButton={false}
              >
                View Details
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
