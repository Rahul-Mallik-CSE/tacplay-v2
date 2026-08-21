"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronDown } from "lucide-react"

const reasons = [
  "Too Expensive",
  "Not Using Enough",
  "Found a Better Alternative",
  "Missing Features I Need",
  "Customer Service Issues",
  "Other",
]

export default function CancellationForm() {
  const { t } = useTranslation("dashboard")
  const [reason, setReason] = useState("Too Expensive")
  const [feedback, setFeedback] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 space-y-5">
      {/* Cancellation Reason */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-primary">
          {t("subscription.manageBilling.cancelReason")}
        </h3>
        <p className="text-sm text-secondary">
          {t("subscription.manageBilling.cancelReasonDesc")}
        </p>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary focus:outline-none focus:border-white/20 cursor-pointer"
          >
            <span>{reason}</span>
            <ChevronDown className={`w-4 h-4 text-secondary transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 top-full mt-1 w-full bg-card border border-white/10 rounded-lg shadow-lg py-1">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setReason(r)
                    setDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors cursor-pointer ${
                    reason === r ? "text-primary bg-white/5" : "text-secondary"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Feedback */}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-primary">
          {t("subscription.manageBilling.additionalFeedback")}
        </h3>
        <div className="relative">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
            placeholder={t("subscription.manageBilling.feedbackPlaceholder")}
            rows={4}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-white/20 resize-none"
          />
          <span className="absolute bottom-3 right-3 text-xs text-secondary">
            {feedback.length}/500
          </span>
        </div>
      </div>
    </div>
  )
}
