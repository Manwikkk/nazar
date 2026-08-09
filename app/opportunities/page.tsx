"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/app-shell"
import { OpportunityCard } from "@/components/opportunity-card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, cities, opportunities, type GrowthStage, type SignalType } from "@/lib/mock-data"

const signalTypes: SignalType[] = [
  "Search demand",
  "Social chatter",
  "Review complaints",
  "News coverage",
  "Community discussion",
]

const growthStages: GrowthStage[] = ["Nascent", "Emerging", "Accelerating", "Mainstreaming"]

const scoreLabels: Record<string, string> = {
  all: "Any confidence score",
  "85": "85+ — Very high",
  "70": "70+ — High",
  "50": "50+ — Moderate",
}

export default function OpportunityCardsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [city, setCity] = useState<string>("all")
  const [signal, setSignal] = useState<string>("all")
  const [stage, setStage] = useState<string>("all")
  const [minScore, setMinScore] = useState<string>("all")

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (search && !o.title.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== "all" && o.category !== category) return false
      if (city !== "all" && o.city !== city) return false
      if (signal !== "all" && o.signalType !== signal) return false
      if (stage !== "all" && o.growthStage !== stage) return false
      if (minScore !== "all" && o.score < Number(minScore)) return false
      return true
    })
  }, [search, category, city, signal, stage, minScore])

  return (
    <AppShell
      title="Opportunities"
      subtitle="Browse every detected opportunity, filtered by category, city, and signal strength"
      onSearch={setSearch}
      searchPlaceholder="Search opportunities…"
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Select value={category} onValueChange={(value) => setCategory(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Category">
              {(value: string | null) => (value === "all" || !value ? "All categories" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={city} onValueChange={(value) => setCity(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="City">
              {(value: string | null) => (value === "all" || !value ? "All cities" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={signal} onValueChange={(value) => setSignal(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Signal type">
              {(value: string | null) => (value === "all" || !value ? "All signal types" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All signal types</SelectItem>
            {signalTypes.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stage} onValueChange={(value) => setStage(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Growth stage">
              {(value: string | null) => (value === "all" || !value ? "All stages" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {growthStages.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={minScore} onValueChange={(value) => setMinScore(value ?? "all")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Confidence score">
              {(value: string | null) => scoreLabels[value ?? "all"]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any confidence score</SelectItem>
            <SelectItem value="85">85+ — Very high</SelectItem>
            <SelectItem value="70">70+ — High</SelectItem>
            <SelectItem value="50">50+ — Moderate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} matching your filters
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <p className="text-sm font-medium text-foreground">No strong opportunity signals found.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try expanding your timeframe or category.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button size="sm" variant="outline" onClick={() => { setCategory("all"); setCity("all"); setSignal("all"); setStage("all"); setMinScore("all"); setSearch("") }}>
              Expand Search
            </Button>
            <Button size="sm" render={<Link href="/categories" />} nativeButton={false}>
              Explore All Categories
            </Button>
          </div>
        </div>
      )}
    </AppShell>
  )
}
