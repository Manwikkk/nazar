import { cn } from "@/lib/utils"

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tier = score >= 85 ? "high" : score >= 70 ? "medium" : "low"

  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
        tier === "high" && "border-primary/20 bg-primary/10 text-primary",
        tier === "medium" && "border-accent-foreground/20 bg-accent text-accent-foreground",
        tier === "low" && "border-border bg-muted text-muted-foreground",
        className,
      )}
      title={`Opportunity score: ${score}`}
    >
      {score}
    </div>
  )
}
