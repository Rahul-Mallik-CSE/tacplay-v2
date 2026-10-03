"use client"

/**
 * BookingMatchTypeDot.tsx
 * Displays match type with a colored dot indicator.
 * Ranked matches show red, social matches show yellow.
 */

import React from "react"
import type { BookingMatchTypeDotProps } from "@/types/DashboardTypes/BookingsTypes"

function BookingMatchTypeDot({ type }: BookingMatchTypeDotProps) {
  const normalized = (type || "").trim()
  const isRanked = normalized.toLowerCase() === "ranked"
  const formattedType = normalized
    ? normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
    : "-"

  return (
    <span className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${isRanked ? "bg-custom-red" : "bg-custom-yellow"}`}
      />
      <span>{formattedType}</span>
    </span>
  )
}

export default BookingMatchTypeDot
