"use client"

import React from "react"
import type { EarningTypeBadgeProps } from "@/types/AdminTypes/EarningTypes"

function EarningTypeBadge({ type, size = "md" }: EarningTypeBadgeProps) {
  const normalized = (type || "").toLowerCase().replace(/_/g, " ")

  let colors = "bg-secondary/20 text-secondary border-secondary/30"
  let displayText = type || ""

  if (normalized.includes("field owner")) {
    colors = "bg-custom-yellow/20 text-yellow-400 border-custom-yellow/30"
    displayText = "Field Owner"
  } else if (normalized.includes("player")) {
    colors = "bg-blue-500/20 text-blue-400 border-blue-500/30"
    displayText = "Player"
  } else if (normalized.includes("marketplace")) {
    colors = "bg-purple-500/20 text-purple-400 border-purple-500/30"
    displayText = "Marketplace"
  }

  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"

  return (
    <span
      className={`${sizeClasses} font-medium rounded-md border ${colors} inline-block`}
    >
      {displayText}
    </span>
  )
}

export default EarningTypeBadge
