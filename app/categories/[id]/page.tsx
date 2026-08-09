"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, TrendingUp, MapPin } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCategoryById, opportunities } from "@/lib/mock-data"
import { Area, AreaChart, ResponsiveContainer, XAxis, CartesianGrid, Tooltip } from "recharts"

export default function CategoryDetailPage() {
  const params = useParams()
  const id = params.id as string
  const category = getCategoryById(id)

  if (!category) {
    return (
      <AppShell title="Category Not Found" subtitle="" hideSearch>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-foreground">This category could not be found.</p>
          <Button variant="outline" size="sm" className="mt-4" render={<Link href="/categories" />} nativeButton={false}>
            Back to Categories
          </Button>
        </div>
      </AppShell>
    )
  }

  const categoryOpportunities = opportunities.filter((o) => o.category === category.name)
  const chartData = [
    { week: "W1", signals: 320 },
    { week: "W2", signals: 380 },
    { week: "W3", signals: 420 },
    { week: "W4", signals: 480 },
    { week: "W5", signals: 540 },
    { week: "W6", signals: 610 },
    { week: "W7", signals: 680 },
    { week: "W8", signals: 760 },
  ]

  return (
    <AppShell title={category.name} subtitle="Category analysis" hideSearch>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 gap-1.5 px-2 text-muted-foreground"
        render={<Link href="/categories" />}
        nativeButton={false}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Categories
      </Button>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{category.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{category.painPoint}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Signal Momentum</p>
            <p className="mt-0.5 text-lg font-semibold text-primary">{category.signalMomentum}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Opportunities</p>
            <p className="mt-0.5 text-lg font-semibold text-foreground">{category.activeOpportunities}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Score</p>
            <p className="mt-0.5 text-lg font-semibold text-foreground">{category.avgScore}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Consumer Interest</p>
            <p className="mt-0.5 text-lg font-semibold text-foreground">High</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Signal Activity
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Prototype signal — illustrative data</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="catFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="signals" stroke="var(--color-primary)" strokeWidth={2} fill="url(#catFill)" animationDuration={600} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {categoryOpportunities.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground mb-4">Related Opportunities</h2>
              <div className="space-y-3">
                {categoryOpportunities.map((opp) => (
                  <Link key={opp.id} href={`/opportunities/${opp.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 card-hover">
                    <div>
                      <p className="text-sm font-medium text-foreground">{opp.title}</p>
                      <p className="text-xs text-muted-foreground">{opp.growthStage} · {opp.momentum}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full font-semibold">{opp.score}</Badge>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Top Emerging Themes</h2>
            <ul className="mt-3 space-y-2">
              {category.themes.map((theme) => (
                <li key={theme} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {theme}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Top Cities
            </h2>
            <div className="mt-3 space-y-2">
              {category.topCities.map((city, i) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{city}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
