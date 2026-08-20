"use client"

import React from "react"
import type { StaffStatusBadgeProps } from "@/types/DashboardTypes/StaffTypes"

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Inactive: "bg-custom-red/20 text-red-400 border-custom-red/30",
}

function StaffStatusBadge({ status, size = "md" }: StaffStatusBadgeProps) {
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

export default StaffStatusBadge
