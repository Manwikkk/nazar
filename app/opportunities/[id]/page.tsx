"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft, Bookmark, FlaskConical, ShieldAlert, Target, Users, MapPin,
  TrendingUp, MessageSquare, ChevronDown, ChevronUp, Quote, AlertTriangle,
  BarChart3, Info
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { ScoreBadge } from "@/components/score-badge"
import { SignalBreakdown } from "@/components/opportunity/signal-breakdown"
import { ResearchBriefModal } from "@/components/research-brief-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getOpportunityById, opportunities } from "@/lib/mock-data"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, CartesianGrid } from "recharts"

export default function OpportunityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const opportunity = getOpportunityById(id)
  const [saved, setSaved] = useState(false)
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false)
  const [briefOpen, setBriefOpen] = useState(false)

  if (!opportunity) {
    return (
      <AppShell title="Opportunity Not Found" subtitle="" hideSearch>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-foreground">This opportunity could not be found.</p>
          <p className="mt-2 text-sm text-muted-foreground">It may have been removed or the link is incorrect.</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" render={<Link href="/opportunities" />} nativeButton={false}>
              Back to Opportunities
            </Button>
            <Button size="sm" render={<Link href="/ask" />} nativeButton={false}>
              Ask Nazar Instead
            </Button>
          </div>
        </div>
      </AppShell>
    )
  }

  const trendData = opportunity.trend.map((v, i) => ({ week: `W${i + 1}`, value: v }))

  return (
    <AppShell title="Opportunity Analysis" subtitle={opportunity.category} hideSearch>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 gap-1.5 px-2 text-muted-foreground"
        render={<Link href="/opportunities" />}
        nativeButton={false}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Opportunities
      </Button>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full font-normal text-muted-foreground">
                {opportunity.category}
              </Badge>
              <Badge variant="outline" className="rounded-full font-normal">
                {opportunity.growthStage}
              </Badge>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground text-balance md:text-3xl">
              {opportunity.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
              {opportunity.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <ScoreBadge score={opportunity.score} className="h-14 w-14 text-lg mx-auto" />
              <p className="mt-1 text-[10px] text-muted-foreground">/ 100</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`gap-1.5 ${saved ? "text-primary border-primary/30" : ""}`}
                onClick={() => setSaved(!saved)}
              >
                <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
                {saved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" render={<Link href="/ask" />} nativeButton={false}>
                <MessageSquare className="h-3.5 w-3.5" />
                Ask Nazar
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Momentum</p>
            <p className="mt-0.5 text-sm font-semibold text-primary">{opportunity.momentum}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Evidence</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{opportunity.evidenceCount} signals</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Consumer</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{opportunity.consumerSegment}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price range</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{opportunity.priceRange}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Executive Summary */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Target className="h-4 w-4 text-primary" />
              Executive Summary
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground text-pretty">{opportunity.whyItMatters}</p>
          </section>

          {/* Consumer Tension */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Consumer Tension</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground text-pretty italic">&ldquo;{opportunity.consumerTension}&rdquo;</p>
          </section>

          {/* What Consumers Are Saying */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Quote className="h-4 w-4 text-primary" />
              What Consumers Are Saying
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Representative consumer sentiments — prototype data</p>
            <div className="mt-3 space-y-2">
              {opportunity.consumerQuotes.map((quote) => (
                <div key={quote} className="rounded-lg bg-secondary/40 px-4 py-3 border-l-2 border-primary/30">
                  <p className="text-sm leading-relaxed text-foreground text-pretty italic">&ldquo;{quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>

          {/* Signal Momentum Chart */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BarChart3 className="h-4 w-4 text-primary" />
              Signal Momentum
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Prototype signal — illustrative trend</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`fill-${opportunity.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill={`url(#fill-${opportunity.id})`} animationDuration={600} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Evidence */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Evidence Summary</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {opportunity.evidenceSummary}
            </p>
            <div className="mt-4 space-y-2.5">
              {opportunity.evidence.map((item) => (
                <div key={item.source} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <Badge variant="secondary" className="rounded-full font-normal text-muted-foreground">
                      {item.source}
                    </Badge>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground text-pretty">{item.note}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 rounded-full font-normal">
                    {item.volume} volume
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          {/* Geography */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Geography
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {opportunity.cities.map((city) => (
                <Link key={city} href={`/cities/${city.toLowerCase()}`}>
                  <Badge variant="outline" className="rounded-full font-normal cursor-pointer hover:bg-secondary transition-colors">
                    {city}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>

          {/* Competitive Landscape */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Competitive Landscape</h2>
            <p className="mt-1 text-xs text-muted-foreground">Sample competitor information — prototype data</p>
            <div className="mt-4 space-y-3">
              {opportunity.competitors.map((comp) => (
                <div key={comp.name} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{comp.name}</p>
                      <p className="text-xs text-muted-foreground">{comp.position}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full font-normal text-xs">{comp.priceRange}</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Strength</p>
                      <p className="mt-0.5 text-foreground">{comp.strength}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Common complaint</p>
                      <p className="mt-0.5 text-foreground">{comp.complaint}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Unmet Needs */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Unmet Needs</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {opportunity.unmetNeeds.map((need) => (
                <div key={need} className="rounded-lg bg-secondary/40 px-3 py-2.5 text-sm text-foreground">
                  {need}
                </div>
              ))}
            </div>
          </section>

          {/* Potential Opportunity */}
          <section className="rounded-xl border border-primary/20 bg-accent/20 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Potential Opportunity</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground text-pretty">{opportunity.potentialOpportunity}</p>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Opportunity Score Breakdown */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Opportunity Score</h2>
              <button
                onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Info className="h-3 w-3" />
                {showScoreBreakdown ? "Hide" : "How is this calculated?"}
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-4xl font-bold text-foreground">{opportunity.score}</span>
              <span className="text-lg text-muted-foreground"> / 100</span>
            </div>

            <div className="mt-4 space-y-3">
              {opportunity.scoreBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {showScoreBreakdown && (
              <div className="mt-4 rounded-lg bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground animate-slide-up">
                <p className="font-medium text-foreground mb-1">Opportunity Score combines:</p>
                <ul className="space-y-0.5 list-disc pl-4">
                  <li>Signal growth velocity</li>
                  <li>Repeated consumer pain intensity</li>
                  <li>Source diversity (multiple independent signals)</li>
                  <li>Market gap indicators</li>
                  <li>Geographic spread</li>
                  <li>Competitive intensity</li>
                </ul>
                <p className="mt-2 italic">This is a prototype scoring model for demonstration purposes.</p>
              </div>
            )}
          </section>

          {/* Signal Breakdown */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Signal Breakdown</h2>
            <div className="mt-4">
              <SignalBreakdown items={opportunity.signalBreakdown} />
            </div>
          </section>

          {/* Consumer Segment */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-primary" />
              Consumer Segment
            </h2>
            <div className="mt-3 space-y-2 text-xs">
              <div>
                <p className="text-muted-foreground">Target</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{opportunity.consumerSegment}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Age</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{opportunity.audience.split(",")[0]}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground text-pretty">{opportunity.targetConsumer}</p>
          </section>

          {/* Risks */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldAlert className="h-4 w-4 text-primary" />
              Risks &amp; Assumptions
            </h2>
            <ul className="mt-3 space-y-2">
              {opportunity.risks.map((risk) => (
                <li key={risk} className="flex gap-2 text-sm leading-relaxed text-foreground text-pretty">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  {risk}
                </li>
              ))}
            </ul>
          </section>

          {/* Recommended Next Step */}
          <section className="rounded-xl border border-primary/20 bg-accent/40 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FlaskConical className="h-4 w-4 text-primary" />
              Recommended Next Step
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground text-pretty">{opportunity.nextExperiment}</p>
          </section>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full gap-1.5" onClick={() => setBriefOpen(true)}>
              Create Research Brief
            </Button>
            <Button variant="outline" className="w-full gap-1.5" render={<Link href="/ask" />} nativeButton={false}>
              <MessageSquare className="h-3.5 w-3.5" />
              Ask Nazar
            </Button>
          </div>
        </div>
      </div>

      <ResearchBriefModal
        open={briefOpen}
        onClose={() => setBriefOpen(false)}
        opportunity={{
          title: opportunity.title,
          category: opportunity.category,
          consumerSegment: opportunity.consumerSegment,
          regions: opportunity.regions,
          evidenceCount: opportunity.evidenceCount,
        }}
      />
    </AppShell>
  )
}
