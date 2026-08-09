"use client"

import type * as React from "react"
import { useState, useMemo, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, Search, SlidersHorizontal, Command } from "lucide-react"
import { SidebarNav } from "@/components/app-sidebar"
import { NotificationBell } from "@/components/notification-panel"
import { CommandPalette } from "@/components/command-palette"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { opportunities, categories, cities } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface SearchResult {
  type: "Opportunity" | "Category" | "City"
  label: string
  sublabel: string
  href: string
}

interface AppShellProps {
  title: string
  subtitle: string
  children: React.ReactNode
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onFilterClick?: () => void
  headerAction?: React.ReactNode
  hideSearch?: boolean
}

// Global state to prevent flashing on client-side navigations while avoiding SSR hydration errors
let globalSidebarState = false
let hasLoadedGlobalState = false

export function AppShell({
  title,
  subtitle,
  children,
  searchPlaceholder = "Search opportunities, categories, cities…",
  onSearch,
  onFilterClick,
  headerAction,
  hideSearch,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // During client-side navigation, use the cached state synchronously to prevent flashing
    if (hasLoadedGlobalState) {
      return globalSidebarState
    }
    // During initial SSR and hydration, return false to match the server HTML
    return false
  })

  useEffect(() => {
    // After initial hydration, read from localStorage and cache it
    if (!hasLoadedGlobalState && typeof window !== "undefined") {
      const stored = localStorage.getItem("nazar-sidebar-collapsed") === "true"
      if (stored !== isSidebarCollapsed) {
        setIsSidebarCollapsed(stored)
      }
      globalSidebarState = stored
      hasLoadedGlobalState = true
    }
  }, [isSidebarCollapsed])

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed
    setIsSidebarCollapsed(newState)
    globalSidebarState = newState
    localStorage.setItem("nazar-sidebar-collapsed", String(newState))
  }
  const [globalSearchQuery, setGlobalSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isAskRoute = pathname === "/ask"

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!globalSearchQuery || globalSearchQuery.length < 2) return []
    const q = globalSearchQuery.toLowerCase()
    const results: SearchResult[] = []

    opportunities.forEach((o) => {
      if (o.title.toLowerCase().includes(q) || o.category.toLowerCase().includes(q)) {
        results.push({ type: "Opportunity", label: o.title, sublabel: o.category, href: `/opportunities/${o.id}` })
      }
    })

    categories.forEach((c) => {
      if (c.name.toLowerCase().includes(q)) {
        results.push({ type: "Category", label: c.name, sublabel: `${c.activeOpportunities} opportunities`, href: `/categories/${c.id}` })
      }
    })

    cities.forEach((c) => {
      if (c.name.toLowerCase().includes(q)) {
        results.push({ type: "City", label: c.name, sublabel: c.tier, href: `/cities/${c.id}` })
      }
    })

    return results.slice(0, 8)
  }, [globalSearchQuery])

  function handleSearchChange(value: string) {
    setGlobalSearchQuery(value)
    onSearch?.(value)
  }

  function navigateToResult(href: string) {
    setGlobalSearchQuery("")
    setSearchFocused(false)
    router.push(href)
  }

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    searchResults.forEach((r) => {
      if (!groups[r.type]) groups[r.type] = []
      groups[r.type].push(r)
    })
    return groups
  }, [searchResults])

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={cn("hidden shrink-0 border-r border-sidebar-border md:block transition-all duration-300 relative z-[60]", isSidebarCollapsed ? "w-16" : "w-64")}>
        <div className={cn("fixed inset-y-0 left-0 transition-all duration-300 z-[60]", isSidebarCollapsed ? "w-16" : "w-64")}>
          <SidebarNav 
            isCollapsed={isSidebarCollapsed} 
            onToggleCollapse={toggleSidebar} 
          />
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <CommandPalette />

      <div className="flex min-w-0 flex-1 flex-col h-screen overflow-hidden">
        {/* Minimal header for /ask, standard header for others */}
        <header className={cn(
          "sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3.5 backdrop-blur-sm md:px-8 shrink-0",
          isAskRoute ? "border-transparent" : "gap-3"
        )}>
          <div className="flex items-center gap-3 w-full">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="md:hidden flex h-8 w-8 shrink-0 items-center justify-center">
              <img src="/icon.svg" alt="Nazar Logo" className="h-5 w-5 text-foreground" />
            </div>

            {!isAskRoute && (
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</h1>
                <p className="hidden truncate text-sm text-muted-foreground sm:block">{subtitle}</p>
              </div>
            )}

            {!hideSearch && !isAskRoute && (
              <div className="relative hidden w-full max-w-sm md:block ml-auto mr-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  className="h-9 pl-9 pr-16"
                  value={globalSearchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                />
                <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>

                {searchFocused && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-border bg-card shadow-lg animate-slide-up overflow-hidden">
                    {Object.entries(groupedResults).map(([type, results]) => (
                      <div key={type}>
                        <p className="px-3 pt-2 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{type === "Opportunity" ? "Opportunities" : type === "Category" ? "Categories" : "Cities"}</p>
                        {results.map((result) => (
                          <button
                            key={result.href}
                            className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
                            onMouseDown={() => navigateToResult(result.href)}
                          >
                            <span className="font-medium text-foreground">{result.label}</span>
                            <span className="text-xs text-muted-foreground">{result.sublabel}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {isAskRoute && <div className="flex-1" />}

            {onFilterClick && !isAskRoute && (
              <Button variant="outline" size="sm" className="hidden shrink-0 gap-1.5 sm:flex" onClick={onFilterClick}>
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </Button>
            )}

            {!isAskRoute && headerAction}

            <div className="flex items-center gap-4 shrink-0">
              <NotificationBell />
              {/* Keeping avatar in header for consistency, even on /ask, but user profile functionality remains in sidebar bottom */}
              <Avatar className="h-8 w-8 shrink-0 border border-border/50 shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">KT</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {isAskRoute ? (
          <main className="flex-1 overflow-hidden relative page-enter">{children}</main>
        ) : (
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 page-enter">{children}</main>
        )}
      </div>
    </div>
  )
}
