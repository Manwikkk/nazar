"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  value: string
  delta?: string
  deltaDirection?: "up" | "down"
  icon: LucideIcon
  href?: string
}

export function KpiCard({ label, value, delta, deltaDirection = "up", icon: Icon, href }: KpiCardProps) {
  const content = (
    <div className={cn(
      "rounded-xl border border-border bg-card p-5 shadow-sm card-hover",
      href && "cursor-pointer"
    )}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-4 w-4 text-accent-foreground" strokeWidth={2} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      {delta && (
        <p
          className={cn(
            "mt-1.5 text-xs font-medium",
            deltaDirection === "up" ? "text-primary" : "text-muted-foreground",
          )}
        >
          {delta}
        </p>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
