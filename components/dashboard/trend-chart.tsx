"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { signalChartData } from "@/lib/mock-data"

const timePeriods = ["This Week", "Last Week", "4 Weeks", "12 Weeks"] as const

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; payload: { topCategory: string; topCity: string } }[]; label?: string }) {
  if (!active || !payload?.[0]) return null
  const data = payload[0]
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-lg text-xs">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-foreground">{data.value.toLocaleString()} signals</p>
      <div className="mt-2 border-t border-border pt-2 space-y-1">
        <p className="text-muted-foreground">Top category: <span className="text-foreground font-medium">{data.payload.topCategory}</span></p>
        <p className="text-muted-foreground">Top city: <span className="text-foreground font-medium">{data.payload.topCity}</span></p>
      </div>
    </div>
  )
}

export function TrendChart() {
  const [period, setPeriod] = useState<typeof timePeriods[number]>("This Week")
  const chartData = signalChartData[period]

  return (
    <div>
      <div className="mb-4 flex items-center gap-1">
        {timePeriods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
              period === p
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="signalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              width={40}
              tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--color-border)" }}
            />
            <Area
              type="monotone"
              dataKey="signals"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#signalFill)"
              animationDuration={600}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
