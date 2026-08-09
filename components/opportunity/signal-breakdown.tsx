import type { SignalBreakdownItem } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"

export function SignalBreakdown({ items }: { items: SignalBreakdownItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-foreground">{item.label}</span>
            <span className="font-medium text-muted-foreground">{item.value}</span>
          </div>
          <Progress value={item.value} className="h-1.5" />
        </div>
      ))}
    </div>
  )
}
