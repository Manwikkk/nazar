"use client"

import Link from "next/link"
import { Minus, TrendingDown, TrendingUp, ArrowUpRight } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const trendConfig = {
  up: { icon: TrendingUp, label: "Trending up", className: "text-primary" },
  flat: { icon: Minus, label: "Stable", className: "text-muted-foreground" },
  down: { icon: TrendingDown, label: "Cooling", className: "text-muted-foreground" },
}

export default function CategoriesPage() {
  return (
    <AppShell title="Categories" subtitle="Explore opportunity activity across consumer categories" hideSearch>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const trend = trendConfig[category.trend]
          return (
            <div key={category.id} className="rounded-xl border border-border bg-card p-5 shadow-sm card-hover">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-snug text-foreground text-pretty">{category.name}</h3>
                <trend.icon className={cn("h-4 w-4 shrink-0", trend.className)} />
              </div>
              <div className="mt-1 flex items-center gap-2">
                <p className={cn("text-xs font-medium", trend.className)}>{trend.label}</p>
                <Badge variant="secondary" className="rounded-full text-[10px] font-medium px-1.5 py-0.5">
                  {category.signalMomentum}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-2xl font-semibold tracking-tight text-foreground">
                    {category.activeOpportunities}
                  </span>
                  <p className="text-[10px] text-muted-foreground">opportunities</p>
                </div>
                <div>
                  <span className="text-2xl font-semibold tracking-tight text-foreground">
                    {category.avgScore}
                  </span>
                  <p className="text-[10px] text-muted-foreground">avg score</p>
                </div>
              </div>

              <div className="mt-3 space-y-2 border-t border-border pt-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Fastest-growing</p>
                  <p className="mt-0.5 font-medium text-foreground">{category.fastestSubcategory}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Top city</p>
                  <p className="mt-0.5 font-medium text-foreground">{category.topCity}</p>
                </div>
              </div>

              <div className="mt-3 border-t border-border pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs text-primary hover:text-primary"
                  render={<Link href={`/categories/${category.id}`} />}
                  nativeButton={false}
                >
                  View Category
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
