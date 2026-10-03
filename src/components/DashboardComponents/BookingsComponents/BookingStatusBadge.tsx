"use client"

/**
 * BookingStatusBadge.tsx
 * Color-coded badge component for displaying booking/payment statuses.
 * Supports different sizes and maps status values to appropriate colors.
 */

import React from "react"
import type { BookingStatusBadgeProps } from "@/types/DashboardTypes/BookingsTypes"

/** Color mapping for different status values */
const STATUS_COLORS: Record<string, string> = {
  paid: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  pending: "bg-amber-700/30 text-amber-400 border-amber-600/30",
  unpaid: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-custom-red/20 text-red-400 border-custom-red/30",
  failed: "bg-custom-red/20 text-red-400 border-custom-red/30",
  checked_in: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  check_in: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  no_show: "bg-rose-500/20 text-rose-400 border-rose-500/30",
}

const STATUS_TEXT: Record<string, string> = {
  paid: "Paid",
  pending: "Pending",
  unpaid: "Unpaid",
  failed: "Failed",
  cancelled: "Cancelled",
  confirmed: "Confirmed",
  checked_in: "Checked In",
  check_in: "Check In",
  no_show: "No Show",
  open: "Open",
}

/** Default fallback color for unknown statuses */
const DEFAULT_COLOR = "bg-secondary/20 text-secondary border-secondary/30"

function BookingStatusBadge({ status, size = "md" }: BookingStatusBadgeProps) {
  if (!status) return null

  const normalized = status.toLowerCase().trim()
  const colors = STATUS_COLORS[normalized] || DEFAULT_COLOR
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"

  const displayText =
    STATUS_TEXT[normalized] ||
    normalized.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <span
      className={`${sizeClasses} font-medium rounded-md border inline-flex items-center justify-center ${colors}`}
    >
      {displayText}
    </span>
  )
}

export default BookingStatusBadge
