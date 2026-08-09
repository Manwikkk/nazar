"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Compass, Gauge, MapPinned, Tags, TrendingUp, Zap, Eye } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { KpiCard } from "@/components/kpi-card"
import { OpportunityCard } from "@/components/opportunity-card"
import { TrendChart } from "@/components/dashboard/trend-chart"
import { SignalDrawer } from "@/components/dashboard/signal-drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { opportunities, weeklySignals, savedInsights, getOpportunityById } from "@/lib/mock-data"

export default function DashboardPage() {
  const featured = opportunities.slice(0, 6)
  const watchlist = savedInsights.slice(0, 3)
  const [selectedSignal, setSelectedSignal] = useState<typeof weeklySignals[number] | null>(null)

  return (
    <AppShell title="Dashboard" subtitle="Your overview of emerging consumer opportunities across India">
      {/* Hero Section */}
      <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <img src="/icon.svg" alt="Nazar" className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-foreground">Nazar</span>
            </div>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-3xl">
              India&apos;s Consumer Opportunity Radar
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty md:text-[15px]">
              See what Indian consumers are starting to want — before it becomes obvious.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="sm" render={<Link href="/opportunities" />} nativeButton={false}>
                Explore Opportunities
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" render={<Link href="/ask" />} nativeButton={false}>
                Ask Nazar
              </Button>
            </div>
          </div>
          <div className="w-full max-w-sm shrink-0 rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-xs font-medium text-muted-foreground">Signal activity over time</p>
            <TrendChart />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Opportunities Detected" value="1,284" delta="+18.4% this month" icon={Compass} href="/opportunities" />
        <KpiCard label="Emerging Signals" value="8,642" delta="+12.7% this week" icon={Zap} href="/evidence" />
        <KpiCard label="Rising Categories" value="24" delta="+5 this month" icon={Tags} href="/categories" />
        <KpiCard label="Average Confidence" value="78%" delta="+4.2% this month" icon={Gauge} />
      </section>

      {/* Top Signals This Week */}
      <section className="mt-8">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Top Signals This Week</h2>
          </div>
          <p className="text-sm text-muted-foreground">Consumer conversations showing unusual momentum across India.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {weeklySignals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm card-hover cursor-pointer"
              onClick={() => setSelectedSignal(signal)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground text-balance">{signal.label}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground text-pretty">{signal.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  ↑ {signal.change}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {signal.sources.split(" · ").map((source) => (
                    <Badge key={source} variant="outline" className="rounded-full font-normal text-[10px] px-1.5 py-0.5">
                      {source}
                    </Badge>
                  ))}
                </div>
                <Badge variant="secondary" className="rounded-full font-normal text-muted-foreground text-[10px]">
                  {signal.category}
                </Badge>
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-primary hover:text-primary">
                  View Signal
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emerging Opportunities */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Emerging Opportunities</h2>
            <p className="text-sm text-muted-foreground">Fresh signal-backed opportunity areas this week</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-primary hover:text-primary"
            render={<Link href="/opportunities" />}
            nativeButton={false}
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      {/* Watchlist */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Watchlist</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-primary hover:text-primary"
            render={<Link href="/saved" />}
            nativeButton={false}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {watchlist.map((item) => {
            const opp = getOpportunityById(item.opportunityId)
            if (!opp) return null
            return (
              <div key={item.id} className="rounded-xl border border-border bg-card p-4 shadow-sm card-hover">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground text-pretty">{opp.title}</p>
                  <Badge variant="secondary" className="shrink-0 rounded-full font-normal text-muted-foreground text-xs">
                    {item.status}
                  </Badge>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground text-pretty">{item.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Research Context */}
      <section className="mt-8 rounded-xl border border-border bg-secondary/30 p-5">
        <p className="text-xs font-medium text-muted-foreground mb-1">Research context</p>
        <p className="text-sm leading-relaxed text-foreground text-pretty">
          BCG 2026 research highlights the increasing importance of connected online/offline commerce and growing participation from smaller cities in India&apos;s consumer landscape.
        </p>
        <p className="mt-2 text-xs text-muted-foreground italic">All signal data shown is prototype/illustrative. Opportunity scores are based on a sample scoring model.</p>
      </section>

      {/* Signal Drawer */}
      <SignalDrawer signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
    </AppShell>
  )
}
