"use client"

import { cn } from "@/lib/utils"
import type { CampaignStatusBadgeProps } from "@/types/DashboardTypes/MarketingTypes"

const statusStyles: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border border-green-500/30",
  Complete: "bg-green-500/20 text-green-400 border border-green-500/30",
  Schedule: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Draft: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Expired: "bg-red-500/20 text-red-400 border border-red-500/30",
}

export default function CampaignStatusBadge({ status, size = "sm" }: CampaignStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md text-xs font-medium",
        size === "sm" ? "px-2 py-0.5" : "px-3 py-1",
        statusStyles[status] || "bg-secondary/20 text-secondary border border-secondary/30"
      )}
    >
      {status}
    </span>
  )
}
