"use client"

/**
 * SelectSessionModal.tsx
 * Modal for selecting a session from a table with checkboxes.
 * Single selection only.
 */

import { useState } from "react"
import { X, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

interface SessionItem {
  id: number
  sessionName: string
  dateTime: string
  timeRange: string
  assignStaff: string
  matchType: string
  price: string
}

interface SelectSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (session: SessionItem) => void
}

const MOCK_SESSIONS: SessionItem[] = [
  { id: 1, sessionName: "Beginner Walk-On", dateTime: "26 Jan 2026", timeRange: "10:00AM - 12:00AM", assignStaff: "James Robin", matchType: "Social", price: "$40" },
  { id: 2, sessionName: "Beginner Walk-On", dateTime: "26 Jan 2026", timeRange: "10:00AM - 12:00AM", assignStaff: "James Robin", matchType: "Social", price: "$40" },
  { id: 3, sessionName: "Beginner Walk-On", dateTime: "26 Jan 2026", timeRange: "10:00AM - 12:00AM", assignStaff: "James Robin", matchType: "Social", price: "$40" },
  { id: 4, sessionName: "Beginner Walk-On", dateTime: "26 Jan 2026", timeRange: "10:00AM - 12:00AM", assignStaff: "James Robin", matchType: "Social", price: "$40" },
  { id: 5, sessionName: "Beginner Walk-On", dateTime: "26 Jan 2026", timeRange: "10:00AM - 12:00AM", assignStaff: "James Robin", matchType: "Social", price: "$40" },
]

export default function SelectSessionModal({ isOpen, onClose, onSelect }: SelectSessionModalProps) {
  const { t } = useTranslation("dashboard")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (!isOpen) return null

  const handleSelect = () => {
    const session = MOCK_SESSIONS.find((s) => s.id === selectedId)
    if (session) {
      onSelect(session)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-card rounded-xl border border-white/10 w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-primary">
            {t("arena.aiPricingTab.selectSessions")}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-white/10">
                <th className="p-3 text-left w-10"></th>
                <th className="p-3 text-left font-medium text-secondary">
                  {t("arena.aiPricingTab.sessionName")}
                </th>
                <th className="p-3 text-left font-medium text-secondary">
                  {t("arena.aiPricingTab.dateTimeLabel")}
                </th>
                <th className="p-3 text-left font-medium text-secondary">
                  {t("arena.aiPricingTab.assignStaff")}
                </th>
                <th className="p-3 text-left font-medium text-secondary">
                  {t("arena.aiPricingTab.matchTypeLabel")}
                </th>
                <th className="p-3 text-left font-medium text-secondary">
                  {t("arena.aiPricingTab.priceLabel")}
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SESSIONS.map((session) => (
                <tr
                  key={session.id}
                  className={`border-b border-white/5 hover:bg-muted/20 transition-colors cursor-pointer ${
                    selectedId === session.id ? "bg-muted/30" : ""
                  }`}
                  onClick={() => setSelectedId(session.id)}
                >
                  <td className="p-3">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        selectedId === session.id
                          ? "bg-custom-red border-custom-red"
                          : "border-white/20"
                      }`}
                    >
                      {selectedId === session.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </td>
                  <td className="p-3 text-primary font-medium">{session.sessionName}</td>
                  <td className="p-3">
                    <div>
                      <p className="text-primary">{session.dateTime}</p>
                      <p className="text-xs text-muted-foreground">{session.timeRange}</p>
                    </div>
                  </td>
                  <td className="p-3 text-primary">{session.assignStaff}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-custom-yellow" />
                      <span className="text-primary">{session.matchType}</span>
                    </div>
                  </td>
                  <td className="p-3 text-primary font-medium">{session.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end p-6 border-t border-white/10">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleSelect}
            disabled={selectedId === null}
          >
            {t("arena.aiPricingTab.selectButton")}
          </Button>
        </div>
      </div>
    </div>
  )
}
