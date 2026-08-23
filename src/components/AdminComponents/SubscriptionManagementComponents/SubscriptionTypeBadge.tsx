"use client"

import React from "react"
import type { SubscriptionTypeBadgeProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

const TYPE_COLORS: Record<string, string> = {
  "Field Owner": "bg-secondary/20 text-secondary border-secondary/30",
  Player: "bg-secondary/20 text-secondary border-secondary/30",
}

function SubscriptionTypeBadge({ type, size = "md" }: SubscriptionTypeBadgeProps) {
  const colors = TYPE_COLORS[type] || "bg-secondary/20 text-secondary border-secondary/30"
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"

  return (
    <span
      className={`${sizeClasses} font-medium rounded-md border ${colors}`}
    >
      {type}
    </span>
  )
}

export default SubscriptionTypeBadge
