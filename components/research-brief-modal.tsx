"use client"

import { useState } from "react"
import { X, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResearchBriefModalProps {
  open: boolean
  onClose: () => void
  opportunity?: {
    title: string
    category: string
    consumerSegment: string
    regions: string
    evidenceCount: number
  }
}

const researchTypes = [
  { id: "consumer", label: "Consumer research", checked: true },
  { id: "competitor", label: "Competitor analysis", checked: true },
  { id: "pricing", label: "Pricing study", checked: false },
  { id: "concept", label: "Product concept testing", checked: false },
  { id: "channel", label: "Channel analysis", checked: false },
]

export function ResearchBriefModal({ open, onClose, opportunity }: ResearchBriefModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>(
    Object.fromEntries(researchTypes.map((t) => [t.id, t.checked]))
  )
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)

  function toggleType(id: string) {
    setSelectedTypes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function generateBrief() {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 1500)
  }

  function handleClose() {
    setGenerated(false)
    setGenerating(false)
    onClose()
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 command-backdrop animate-fade-in" onClick={handleClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
        <div
          className="w-full max-w-lg rounded-xl border border-border bg-card shadow-xl animate-slide-up max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Create Research Brief</h2>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClose} aria-label="Close modal">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {!generated ? (
            <div className="p-6 space-y-5">
              {opportunity && (
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Opportunity</p>
                      <p className="mt-0.5 font-medium text-foreground">{opportunity.title}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="mt-0.5 font-medium text-foreground">{opportunity.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Consumer</p>
                      <p className="mt-0.5 font-medium text-foreground">{opportunity.consumerSegment}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Geography</p>
                      <p className="mt-0.5 font-medium text-foreground">{opportunity.regions}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Evidence</p>
                      <p className="mt-0.5 font-medium text-foreground">{opportunity.evidenceCount} signals</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Research scope</p>
                <div className="space-y-2">
                  {researchTypes.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-secondary/40"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                          selectedTypes[type.id]
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-border"
                        }`}
                        onClick={(e) => { e.preventDefault(); toggleType(type.id) }}
                      >
                        {selectedTypes[type.id] && <Check className="h-3 w-3" />}
                      </div>
                      <span className="text-sm text-foreground">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={generateBrief} disabled={generating}>
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Generating brief…
                  </span>
                ) : (
                  "Generate Brief"
                )}
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-primary">
                <Check className="h-5 w-5" />
                <p className="text-sm font-semibold">Research brief generated</p>
              </div>

              <div className="rounded-lg border border-border p-4 space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-foreground">Research Brief: {opportunity?.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Generated • Prototype output</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-1">Objective</h4>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    Validate the {opportunity?.title?.toLowerCase()} opportunity by understanding consumer behavior, willingness to pay, competitive landscape, and optimal entry strategy.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-1">Target Consumer</h4>
                  <p className="text-muted-foreground">{opportunity?.consumerSegment} in {opportunity?.regions}</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-1">Key Questions</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">1.</span> What drives current purchase decisions in this category?</li>
                    <li className="flex gap-2"><span className="text-primary">2.</span> What price points feel accessible for daily/regular use?</li>
                    <li className="flex gap-2"><span className="text-primary">3.</span> Which unmet needs create the strongest switching motivation?</li>
                    <li className="flex gap-2"><span className="text-primary">4.</span> What competitive alternatives are consumers currently using?</li>
                    <li className="flex gap-2"><span className="text-primary">5.</span> What distribution channels would maximize trial?</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-1">Recommended Methodology</h4>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    100-person online survey + 12 in-depth interviews across 3 cities. Include category users and non-users for comparison.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-1">Timeline</h4>
                  <p className="text-muted-foreground">Estimated 4-6 weeks for complete research cycle.</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">This is a prototype-generated brief. A production version would include detailed methodology, screening criteria, and discussion guides.</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={handleClose}>
                  Close
                </Button>
                <Button size="sm" className="flex-1">
                  Save Brief
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
