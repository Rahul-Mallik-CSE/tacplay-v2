"use client"

import React from "react"
import type { EarningPlanBadgeProps } from "@/types/AdminTypes/EarningTypes"

const PLAN_COLORS: Record<string, string> = {
  Bronze: "bg-amber-700/20 text-amber-400 border-amber-700/30",
  Silver: "bg-slate-400/20 text-slate-300 border-slate-400/30",
  Gold: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Premium: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
}

function EarningPlanBadge({ plan, size = "md" }: EarningPlanBadgeProps) {
  if (!plan) {
    return (
      <span className={`${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"} font-medium text-secondary`}>
        {"\u2014"}
      </span>
    )
  }

  const colors = PLAN_COLORS[plan] || "bg-secondary/20 text-secondary border-secondary/30"
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"

  return (
    <span
      className={`${sizeClasses} font-medium rounded-md border ${colors}`}
    >
      {plan}
    </span>
  )
}

export default EarningPlanBadge
