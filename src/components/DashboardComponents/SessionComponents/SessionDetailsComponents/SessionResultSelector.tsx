"use client"

/**
 * SessionResultSelector.tsx
 * Team result selector component for choosing win/loss/draw.
 * Used in SessionInfoSheet for team-based result submission.
 * Highlights the selected option with yellow background.
 */

import React from "react"
import { useTranslation } from "react-i18next"

/** Result type */
type ResultType = "win" | "loss" | "draw"

/** Props for SessionResultSelector component */
interface SessionResultSelectorProps {
  title: string
  value: ResultType
  onChange: (value: ResultType) => void
}

function SessionResultSelector({ title, value, onChange }: SessionResultSelectorProps) {
  const { t } = useTranslation("dashboard")
  const options: ResultType[] = ["win", "loss", "draw"]

  return (
    <div className="bg-[#0c0a0c] border border-white/5 rounded-xl p-2 space-y-2">
      <p className="text-xs text-secondary">{title}</p>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={`${title}-${option}`}
            onClick={() => onChange(option)}
            className={`flex-1 py-1.5 cursor-pointer text-xs font-semibold rounded-md transition-all ${
              value === option
                ? "bg-[#e2b83b] text-black shadow-md"
                : "text-secondary hover:text-white"
            }`}
          >
            {option === "win"
              ? t("sessions.details.win")
              : option === "loss"
                ? t("sessions.details.loss")
                : t("sessions.details.draw")}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SessionResultSelector
