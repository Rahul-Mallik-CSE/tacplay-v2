"use client"

/**
 * EarningMatchTypeDot.tsx
 * Displays match type with a colored dot indicator.
 * Ranked matches show red, social matches show yellow.
 */

import React from "react"
import type { EarningMatchTypeDotProps } from "@/types/DashboardTypes/EarningsTypes"

function EarningMatchTypeDot({ type }: EarningMatchTypeDotProps) {
  const isRanked = type.toLowerCase() === "ranked"

  return (
    <span className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${isRanked ? "bg-custom-red" : "bg-custom-yellow"}`}
      />
      {type}
    </span>
  )
}

export default EarningMatchTypeDot
