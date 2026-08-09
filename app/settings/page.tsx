"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Info } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    risingSignals: true,
    newCategory: true,
    cityMomentum: false,
    savedUpdates: true,
    lowConfidence: false,
  })
  const [notifFreq, setNotifFreq] = useState("Weekly")
  const [signalThreshold, setSignalThreshold] = useState("10%")
  const [testSent, setTestSent] = useState(false)
  const [analysisDepth, setAnalysisDepth] = useState("Balanced")
  const [responseStyle, setResponseStyle] = useState("Analytical")
  const [evidenceReq, setEvidenceReq] = useState("High")
  const [categories, setCategories] = useState({
    Food: true, Beauty: true, Health: true, Fashion: false, "Pet Care": false, Home: false,
  })
  const [regions, setRegions] = useState({
    India: true, "West India": true, "North India": false, "South India": false, "East India": false,
  })
  const [reduceMotion, setReduceMotion] = useState(false)

  function handleReduceMotion(checked: boolean) {
    setReduceMotion(checked)
    if (checked) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  function sendTestNotification() {
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  return (
    <AppShell title="Settings" subtitle="Manage your workspace, data sources, and preferences" hideSearch>
      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Profile</h2>
          <p className="mt-1 text-xs text-muted-foreground">Basic details for your Nazar workspace account</p>
          <div className="mt-5 flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-accent text-sm font-medium text-accent-foreground">RK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">Riya Kapoor</p>
              <p className="text-xs text-muted-foreground">riya@think9.co</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="workspace-name">Workspace name</Label>
              <Input id="workspace-name" defaultValue="Think9 Venture Studio" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="workspace-role">Role</Label>
              <Input id="workspace-role" defaultValue="Opportunity Strategist" />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
          <p className="mt-1 text-xs text-muted-foreground">Choose when Nazar should alert you</p>
          <div className="mt-4 space-y-4">
            {[
              { key: "weeklyDigest", label: "Weekly opportunity digest", checked: notifications.weeklyDigest },
              { key: "risingSignals", label: "Rising signal alerts", checked: notifications.risingSignals },
              { key: "newCategory", label: "New category alerts", checked: notifications.newCategory },
              { key: "cityMomentum", label: "City momentum alerts", checked: notifications.cityMomentum },
              { key: "savedUpdates", label: "Saved opportunity updates", checked: notifications.savedUpdates },
              { key: "lowConfidence", label: "Low-confidence signal alerts", checked: notifications.lowConfidence },
            ].map((notif, i) => (
              <div key={notif.key}>
                {i > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{notif.label}</p>
                  <Switch
                    checked={notif.checked}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [notif.key]: checked }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Notification frequency</p>
              <div className="flex gap-1">
                {["Daily", "Weekly", "Monthly"].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setNotifFreq(freq)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      notifFreq === freq ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Notify when signal increases by</p>
              <div className="flex gap-1">
                {["5%", "10%", "20%", "50%"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSignalThreshold(t)}
                    className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                      signalThreshold === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={sendTestNotification}>
              <Bell className="h-3.5 w-3.5" />
              {testSent ? (
                <span className="flex items-center gap-1 text-primary">
                  <Check className="h-3 w-3" /> Notification sent!
                </span>
              ) : (
                "Test Notification"
              )}
            </Button>
          </div>
        </section>

        {/* Data Sources */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Data Sources</h2>
          <p className="mt-1 text-xs text-muted-foreground">Connected signal sources (prototype states)</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Google Trends", connected: true },
              { label: "Reddit", connected: true },
              { label: "YouTube", connected: true },
              { label: "News", connected: true },
              { label: "Consumer Reviews", connected: true },
            ].map((source) => (
              <div key={source.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-sm font-medium text-foreground">{source.label}</p>
                </div>
                <Badge variant="secondary" className="rounded-full font-normal text-xs">Connected</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4">Manage Sources</Button>
        </section>

        {/* AI Settings */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">AI Settings</h2>
          <p className="mt-1 text-xs text-muted-foreground">Configure how Nazar analyzes and responds</p>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <p className="text-sm font-medium text-foreground">Analysis Depth</p>
                <div className="group relative">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block w-48 rounded-lg bg-foreground text-background text-[10px] p-2 shadow-lg">
                    Deeper analysis takes longer but provides more evidence and competing hypotheses.
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {["Fast", "Balanced", "Deep"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnalysisDepth(opt)}
                    className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      analysisDepth === opt ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-2">
                <p className="text-sm font-medium text-foreground">Response Style</p>
                <div className="group relative">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block w-48 rounded-lg bg-foreground text-background text-[10px] p-2 shadow-lg">
                    Controls how detailed and structured Nazar&apos;s responses are.
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {["Concise", "Analytical", "Detailed"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setResponseStyle(opt)}
                    className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      responseStyle === opt ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-2">
                <p className="text-sm font-medium text-foreground">Evidence Requirement</p>
                <div className="group relative">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block w-48 rounded-lg bg-foreground text-background text-[10px] p-2 shadow-lg">
                    Higher requirement means only showing insights with stronger multi-source backing.
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {["Standard", "High"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setEvidenceReq(opt)}
                    className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      evidenceReq === opt ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personalization */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Personalization</h2>
          <p className="mt-1 text-xs text-muted-foreground">Configure your preferred focus areas</p>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Preferred categories</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categories).map(([cat, checked]) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                        checked ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      }`}
                      onClick={(e) => { e.preventDefault(); setCategories((prev) => ({ ...prev, [cat]: !prev[cat as keyof typeof prev] })) }}
                    >
                      {checked && <Check className="h-2.5 w-2.5" />}
                    </div>
                    <span className="text-sm text-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Preferred regions</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(regions).map(([region, checked]) => (
                  <label key={region} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                        checked ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      }`}
                      onClick={(e) => { e.preventDefault(); setRegions((prev) => ({ ...prev, [region]: !prev[region as keyof typeof prev] })) }}
                    >
                      {checked && <Check className="h-2.5 w-2.5" />}
                    </div>
                    <span className="text-sm text-foreground">{region}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
          <p className="mt-1 text-xs text-muted-foreground">Nazar is optimized for a light, analytical interface</p>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Theme</p>
                <p className="text-xs text-muted-foreground">Light — recommended for extended sessions</p>
              </div>
              <Badge variant="secondary" className="rounded-full font-normal">Light</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Density</p>
                <p className="text-xs text-muted-foreground">Comfortable spacing</p>
              </div>
              <Badge variant="secondary" className="rounded-full font-normal">Comfortable</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Animations</p>
                <p className="text-xs text-muted-foreground">Smooth transitions throughout</p>
              </div>
              <Badge variant="secondary" className="rounded-full font-normal">Smooth</Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Reduced Motion</p>
                <p className="text-xs text-muted-foreground">Minimize animations for accessibility</p>
              </div>
              <Switch
                checked={reduceMotion}
                onCheckedChange={handleReduceMotion}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button size="sm">Save changes</Button>
        </div>
      </div>
    </AppShell>
  )
}
