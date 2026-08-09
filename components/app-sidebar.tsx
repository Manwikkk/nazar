"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight, MoreVertical, LogOut, Settings, Bell, Keyboard, HelpCircle, User } from "lucide-react"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function SidebarNav({ onNavigate, isCollapsed, onToggleCollapse }: { onNavigate?: () => void, isCollapsed?: boolean, onToggleCollapse?: () => void }) {
  const pathname = usePathname()
  const [showLogout, setShowLogout] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="flex h-full flex-col bg-sidebar relative transition-all duration-300">
      <div className={cn("px-4 py-5 flex items-center transition-all", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2.5 group" onClick={onNavigate}>
            <div className="flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <img src="/icon.svg" alt="Nazar Logo" className="h-8 w-8" />
            </div>
            <div className="flex flex-col leading-tight animate-fade-in">
              <span className="text-[15px] font-bold tracking-tight text-sidebar-foreground">Nazar</span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">Consumer Radar</span>
            </div>
          </Link>
        )}
        {onToggleCollapse && (
          <button 
            onClick={onToggleCollapse}
            className={cn("text-muted-foreground hover:text-foreground hidden md:flex items-center justify-center transition-colors", isCollapsed ? "h-8 w-8 rounded-md bg-secondary text-foreground hover:bg-secondary/80 mx-auto" : "h-6 w-6 rounded-md hover:bg-sidebar-accent/50")}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center rounded-md py-2 text-sm font-medium transition-all duration-180",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                isCollapsed ? "justify-center px-0 w-10 mx-auto" : "gap-3 px-3"
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 hidden rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-medium text-background group-hover:block whitespace-nowrap z-50 animate-fade-in shadow-md">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Profile Area */}
      <div className="border-t border-sidebar-border p-3">
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={cn("group relative flex w-full items-center rounded-lg hover:bg-sidebar-accent/50 p-2 transition-colors", isCollapsed ? "justify-center" : "justify-between gap-2")}
          >
            <div className="flex items-center gap-2">
               <div className="h-8 w-8 rounded-full bg-primary/10 text-xs font-semibold text-primary flex items-center justify-center shrink-0 border border-primary/20">
                 KT
               </div>
               {!isCollapsed && (
                 <div className="text-left animate-fade-in">
                   <p className="text-xs font-medium text-sidebar-foreground leading-tight">Keya Trivedi</p>
                   <p className="text-[10px] text-muted-foreground leading-tight">Think9 Workspace</p>
                 </div>
               )}
            </div>
            {!isCollapsed && <MoreVertical className="h-4 w-4 text-muted-foreground" />}
            {isCollapsed && (
              <div className="absolute left-full ml-2 hidden rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-medium text-background group-hover:block whitespace-nowrap z-50 animate-fade-in shadow-md">
                Profile & Settings
              </div>
            )}
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
              <div className={cn("absolute bottom-full mb-1 z-50 rounded-xl border border-border bg-card shadow-xl p-1.5 animate-slide-up", isCollapsed ? "left-full ml-2 w-48" : "left-0 right-0")}>
                <Link href="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors">
                  <User className="h-3.5 w-3.5" /> Profile
                </Link>
                <Link href="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors">
                  <Settings className="h-3.5 w-3.5" /> Settings
                </Link>
                <Link href="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors">
                  <Bell className="h-3.5 w-3.5" /> Notifications
                </Link>
                <button onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full text-left transition-colors">
                  <Keyboard className="h-3.5 w-3.5" /> Keyboard Shortcuts
                </button>
                <button onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground w-full text-left border-b border-border/50 mb-1 pb-2 transition-colors">
                  <HelpCircle className="h-3.5 w-3.5" /> Help & Feedback
                </button>
                <button onClick={() => { setShowProfileMenu(false); setShowLogout(true); }} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full text-left transition-colors">
                  <LogOut className="h-3.5 w-3.5" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showLogout && (
        <>
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowLogout(false)} />
          <div className="fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl animate-slide-up w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Log out of Nazar?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">You will need to sign in again to access the Think9 Workspace.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => setShowLogout(false)} className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors w-full">Cancel</button>
              <button onClick={() => setShowLogout(false)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full">Log out</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
