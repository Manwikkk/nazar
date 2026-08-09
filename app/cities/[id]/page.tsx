"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, TrendingUp, MapPin } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCityById, cities } from "@/lib/mock-data"
import { Area, AreaChart, ResponsiveContainer, XAxis, CartesianGrid, Tooltip } from "recharts"

export default function CityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const city = getCityById(id)
  const [compareCity, setCompareCity] = useState<string | null>(null)
  const comparedCity = compareCity ? getCityById(compareCity) : null

  if (!city) {
    return (
      <AppShell title="City Not Found" subtitle="" hideSearch>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-foreground">This city could not be found.</p>
          <Button variant="outline" size="sm" className="mt-4" render={<Link href="/cities" />} nativeButton={false}>
            Back to Cities
          </Button>
        </div>
      </AppShell>
    )
  }

  const chartData = [
    { week: "W1", signals: Math.round(city.signalVolume * 0.6) },
    { week: "W2", signals: Math.round(city.signalVolume * 0.65) },
    { week: "W3", signals: Math.round(city.signalVolume * 0.72) },
    { week: "W4", signals: Math.round(city.signalVolume * 0.78) },
    { week: "W5", signals: Math.round(city.signalVolume * 0.84) },
    { week: "W6", signals: Math.round(city.signalVolume * 0.9) },
    { week: "W7", signals: Math.round(city.signalVolume * 0.95) },
    { week: "W8", signals: city.signalVolume },
  ]

  const otherCities = cities.filter((c) => c.id !== city.id)

  return (
    <AppShell title={`${city.name} Consumer Pulse`} subtitle={`${city.tier} city analysis`} hideSearch>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 gap-1.5 px-2 text-muted-foreground"
        render={<Link href="/cities" />}
        nativeButton={false}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Cities
      </Button>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{city.name}</h1>
          <Badge variant="outline" className="rounded-full font-normal">{city.tier}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{city.consumerBehavior}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Signals</p>
            <p className="mt-0.5 text-lg font-semibold text-foreground">{city.signalVolume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Momentum</p>
            <p className="mt-0.5 text-lg font-semibold text-primary">{city.momentum}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Opportunities</p>
            <p className="mt-0.5 text-lg font-semibold text-foreground">{city.opportunityCount}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Top Category</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{city.topCategory}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Signal Momentum Chart */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Signal Momentum
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Prototype signal — illustrative data</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cityFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="signals" stroke="var(--color-primary)" strokeWidth={2} fill="url(#cityFill)" animationDuration={600} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Compare City */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-3">Compare City</h2>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {otherCities.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCompareCity(compareCity === c.id ? null : c.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    compareCity === c.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {comparedCity && (
              <div className="rounded-lg border border-border p-4 animate-slide-up">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="font-medium text-muted-foreground" />
                  <div className="text-center font-semibold text-foreground">{city.name}</div>
                  <div className="text-center font-semibold text-foreground">{comparedCity.name}</div>

                  <div className="text-muted-foreground">Signals</div>
                  <div className="text-center font-medium text-foreground">{city.signalVolume.toLocaleString()}</div>
                  <div className="text-center font-medium text-foreground">{comparedCity.signalVolume.toLocaleString()}</div>

                  <div className="text-muted-foreground">Momentum</div>
                  <div className="text-center font-medium text-primary">{city.momentum}</div>
                  <div className="text-center font-medium text-primary">{comparedCity.momentum}</div>

                  <div className="text-muted-foreground">Opportunities</div>
                  <div className="text-center font-medium text-foreground">{city.opportunityCount}</div>
                  <div className="text-center font-medium text-foreground">{comparedCity.opportunityCount}</div>

                  <div className="text-muted-foreground">Top Category</div>
                  <div className="text-center font-medium text-foreground">{city.topCategory}</div>
                  <div className="text-center font-medium text-foreground">{comparedCity.topCategory}</div>

                  <div className="text-muted-foreground">Tier</div>
                  <div className="text-center font-medium text-foreground">{city.tier}</div>
                  <div className="text-center font-medium text-foreground">{comparedCity.tier}</div>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          {/* Emerging Needs */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Emerging Needs</h2>
            <ul className="mt-3 space-y-2">
              {city.emergingNeeds.map((need) => (
                <li key={need} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {need}
                </li>
              ))}
            </ul>
          </section>

          {/* Top Opportunity Areas */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Top Opportunity Areas</h2>
            <div className="mt-3 space-y-2">
              {city.topOpportunities.map((opp) => (
                <div key={opp} className="rounded-lg bg-secondary/40 px-3 py-2 text-sm text-foreground">
                  {opp}
                </div>
              ))}
            </div>
          </section>

          {/* Consumer Behavior */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Consumer Behavior</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{city.consumerBehavior}</p>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
