"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, MessageSquareText, LayoutGrid, Tag, MapPin, Bookmark, Bell, FileText, Command } from "lucide-react"

interface CommandAction {
  label: string
  icon: React.ElementType
  action: string
  shortcut?: string
}

const commandActions: CommandAction[] = [
  { label: "Ask Nazar", icon: MessageSquareText, action: "/ask" },
  { label: "Search Opportunities", icon: LayoutGrid, action: "/opportunities" },
  { label: "Explore Categories", icon: Tag, action: "/categories" },
  { label: "Explore Cities", icon: MapPin, action: "/cities" },
  { label: "Open Saved Insights", icon: Bookmark, action: "/saved" },
  { label: "View Notifications", icon: Bell, action: "__notifications" },
  { label: "Create Research Brief", icon: FileText, action: "__brief" },
]

export function CommandPalette({ onNotifications, onResearchBrief }: { onNotifications?: () => void; onResearchBrief?: () => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = commandActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  const executeAction = useCallback((action: string) => {
    setOpen(false)
    setQuery("")
    if (action === "__notifications") {
      onNotifications?.()
    } else if (action === "__brief") {
      onResearchBrief?.()
    } else {
      router.push(action)
    }
  }, [router, onNotifications, onResearchBrief])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      executeAction(filtered[selectedIndex].action)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] command-backdrop animate-fade-in" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-[20vh] w-full max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-xl border border-border bg-card shadow-xl animate-slide-up overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
              ESC
            </kbd>
          </div>

          <div className="max-h-[320px] overflow-y-auto p-2">
            <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Quick Actions</p>
            {filtered.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No matching actions found.
              </div>
            ) : (
              filtered.map((action, i) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition-colors ${
                      i === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => executeAction(action.action)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 font-medium">{action.label}</span>
                  </button>
                )
              })
            )}
          </div>

          <div className="border-t border-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">↵</kbd> Open</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>+ K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
