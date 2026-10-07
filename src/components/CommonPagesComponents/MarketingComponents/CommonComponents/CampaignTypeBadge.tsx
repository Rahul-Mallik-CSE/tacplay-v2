"use client"

import { cn } from "@/lib/utils"
import type { CampaignTypeBadgeProps } from "@/types/CommonPageTypes/MarketingTypes"

const typeStyles: Record<string, string> = {
  email: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  push: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  sms: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
}

export default function CampaignTypeBadge({ type }: CampaignTypeBadgeProps) {
  const normalizedKey = (type || "").toLowerCase().trim()
  const displayLabel =
    normalizedKey === "sms"
      ? "SMS"
      : normalizedKey === "push"
      ? "Push"
      : normalizedKey === "email"
      ? "Email"
      : type

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium",
        typeStyles[normalizedKey] || "bg-secondary/20 text-secondary border border-secondary/30"
      )}
    >
      {displayLabel}
    </span>
  )
}
