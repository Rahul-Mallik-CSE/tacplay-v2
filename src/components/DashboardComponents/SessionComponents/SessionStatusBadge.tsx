"use client"

/**
 * SessionStatusBadge.tsx
 * Color-coded badge component for displaying session statuses.
 * Maps status values to appropriate colors (open=green, ongoing=cyan,
 * completed=blue, cancelled=red).
 */

import React from "react"
import type { SessionStatusBadgeProps } from "@/types/DashboardTypes/SessionTypes"

/** Color mapping for different status values */
const STATUS_COLORS: Record<string, string> = {
  open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  ongoing: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  cancelled: "bg-custom-red/20 text-red-400 border-custom-red/30",
}

/** Default fallback color for unknown statuses */
const DEFAULT_COLOR = "bg-secondary/20 text-secondary border-secondary/30"

function SessionStatusBadge({ status }: SessionStatusBadgeProps) {
  const colors = STATUS_COLORS[status.toLowerCase()] || DEFAULT_COLOR

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${colors}`}
    >
      {status}
    </span>
  )
}

export default SessionStatusBadge
