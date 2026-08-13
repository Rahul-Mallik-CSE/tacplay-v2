"use client"

/**
 * SessionMatchTypeDot.tsx
 * Displays match type with a colored dot indicator.
 * Ranked matches show red, social matches show yellow.
 */

import React from "react"
import type { SessionMatchTypeDotProps } from "@/types/DashboardTypes/SessionTypes"

function SessionMatchTypeDot({ type }: SessionMatchTypeDotProps) {
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

export default SessionMatchTypeDot
