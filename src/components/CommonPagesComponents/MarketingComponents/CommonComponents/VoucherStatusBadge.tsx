"use client"

import { cn } from "@/lib/utils"
import type { VoucherStatusBadgeProps } from "@/types/CommonPageTypes/MarketingTypes"

const statusStyles: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border border-green-500/30",
  scheduled: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  schedule: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  schedule_days: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  expired: "bg-red-500/20 text-red-400 border border-red-500/30",
}

export default function VoucherStatusBadge({ status }: VoucherStatusBadgeProps) {
  const normalized = (status || "").toLowerCase().trim()
  const displayLabel = status
    ? status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")
    : "Unknown"

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium capitalize",
        statusStyles[normalized] || "bg-secondary/20 text-secondary border border-secondary/30"
      )}
    >
      {displayLabel}
    </span>
  )
}
