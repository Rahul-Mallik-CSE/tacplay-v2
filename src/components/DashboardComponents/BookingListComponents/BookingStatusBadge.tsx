"use client"

/**
 * BookingStatusBadge.tsx
 * Color-coded badge component for displaying booking/payment statuses.
 * Supports different sizes and maps status values to appropriate colors.
 */

import React from "react"
import type { BookingStatusBadgeProps } from "@/types/DashboardTypes/BookingListTypes"

/** Color mapping for different status values */
const STATUS_COLORS: Record<string, string> = {
  paid: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  pending: "bg-custom-yellow/20 text-yellow-400 border-custom-yellow/30",
  open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-custom-red/20 text-red-400 border-custom-red/30",
}

/** Default fallback color for unknown statuses */
const DEFAULT_COLOR = "bg-secondary/20 text-secondary border-secondary/30"

function BookingStatusBadge({ status, size = "md" }: BookingStatusBadgeProps) {
  const colors = STATUS_COLORS[status.toLowerCase()] || DEFAULT_COLOR
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"

  return (
    <span
      className={`${sizeClasses} font-medium rounded-md border ${colors}`}
    >
      {status}
    </span>
  )
}

export default BookingStatusBadge
