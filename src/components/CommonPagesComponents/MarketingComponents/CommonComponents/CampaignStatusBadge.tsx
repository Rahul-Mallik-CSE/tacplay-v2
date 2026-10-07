"use client"

import { cn } from "@/lib/utils"
import type { CampaignStatusBadgeProps } from "@/types/CommonPageTypes/MarketingTypes"

const statusStyles: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border border-green-500/30",
  complete: "bg-green-500/20 text-green-400 border border-green-500/30",
  sent: "bg-green-500/20 text-green-400 border border-green-500/30",
  schedule: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  scheduled: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  draft: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  failed: "bg-red-500/20 text-red-400 border border-red-500/30",
  expired: "bg-red-500/20 text-red-400 border border-red-500/30",
}

export default function CampaignStatusBadge({ status, size = "sm" }: CampaignStatusBadgeProps) {
  const normalizedKey = (status || "").toLowerCase().trim()
  const displayLabel =
    status && status.length > 0
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : status

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md text-xs font-medium capitalize",
        size === "sm" ? "px-2 py-0.5" : "px-3 py-1",
        statusStyles[normalizedKey] || "bg-secondary/20 text-secondary border border-secondary/30"
      )}
    >
      {displayLabel}
    </span>
  )
}
