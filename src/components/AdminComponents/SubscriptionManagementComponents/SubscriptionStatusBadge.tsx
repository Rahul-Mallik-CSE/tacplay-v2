"use client"

import React from "react"
import type { SubscriptionStatusBadgeProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; dotColor: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dotColor: "bg-emerald-400",
  },
  inactive: {
    label: "Inactive",
    className: "bg-white/5 text-muted-foreground border-white/10",
    dotColor: "bg-muted-foreground",
  },
  expired: {
    label: "Expired",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    dotColor: "bg-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
    dotColor: "bg-red-400",
  },
  trial: {
    label: "Trial",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dotColor: "bg-blue-400",
  },
  "past due": {
    label: "Past Due",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
    dotColor: "bg-red-400",
  },
}

function SubscriptionStatusBadge({
  status,
  size = "md",
}: SubscriptionStatusBadgeProps) {
  const normalizedKey = (status || "").toLowerCase().trim()
  const config = STATUS_CONFIG[normalizedKey] || {
    label: status || "Unknown",
    className: "bg-secondary/20 text-secondary border-secondary/30",
    dotColor: "bg-secondary",
  }

  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-0.5 text-xs"
      : "px-3 py-1 text-xs"

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClasses} font-medium rounded-full border ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <span>{status || config.label}</span>
    </span>
  )
}

export default SubscriptionStatusBadge
