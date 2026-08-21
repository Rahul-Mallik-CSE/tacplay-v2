"use client"

import { cn } from "@/lib/utils"
import type { CampaignTypeBadgeProps } from "@/types/DashboardTypes/MarketingTypes"

const typeStyles: Record<string, string> = {
  Email: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Push: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  SMS: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
}

export default function CampaignTypeBadge({ type }: CampaignTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium",
        typeStyles[type] || "bg-secondary/20 text-secondary border border-secondary/30"
      )}
    >
      {type}
    </span>
  )
}
