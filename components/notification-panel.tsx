"use client"

import { useState } from "react"
import { Bell, Check, TrendingUp, Lightbulb, Mail, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockNotifications, type AppNotification } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const typeIcons = {
  signal: TrendingUp,
  opportunity: Lightbulb,
  digest: Mail,
  alert: AlertCircle,
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function clearAll() {
    setNotifications([])
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 shrink-0"
        onClick={() => setOpen(!open)}
        aria-label="View notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-[360px] rounded-xl border border-border bg-card shadow-lg animate-slide-up">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={markAllRead}>
                  <Check className="mr-1 h-3 w-3" />
                  Mark all read
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => setOpen(false)} aria-label="Close notifications">
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const Icon = typeIcons[notif.type]
                  return (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex items-start gap-3 border-b border-border px-4 py-3 transition-colors last:border-0",
                        !notif.read && "bg-accent/30"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        !notif.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm leading-relaxed text-pretty", !notif.read ? "text-foreground font-medium" : "text-muted-foreground")}>
                          {notif.message}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="border-t border-border px-4 py-2">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground" onClick={clearAll}>
                  Clear all notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
