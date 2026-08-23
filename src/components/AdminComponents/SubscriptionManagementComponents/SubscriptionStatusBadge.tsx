"use client"

import React from "react"
import type { SubscriptionStatusBadgeProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Trial: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Past Due": "bg-custom-red/20 text-red-400 border-custom-red/30",
}

function SubscriptionStatusBadge({ status, size = "md" }: SubscriptionStatusBadgeProps) {
  const colors = STATUS_COLORS[status] || "bg-secondary/20 text-secondary border-secondary/30"
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"

  return (
    <span
      className={`${sizeClasses} font-medium rounded-md border ${colors}`}
    >
      {status}
    </span>
  )
}

export default SubscriptionStatusBadge
