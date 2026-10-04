"use client"

import React from "react"
import type { StaffStatusBadgeProps } from "@/types/CommonPageTypes/StaffTypes"

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  inactive: "bg-custom-red/20 text-red-400 border-custom-red/30",
}

function StaffStatusBadge({ status, size = "md" }: StaffStatusBadgeProps) {
  const normalized = (status || "").toLowerCase()
  const colors = STATUS_COLORS[normalized] || "bg-secondary/20 text-secondary border-secondary/30"
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-0.5 text-xs"
  const label = normalized === "active" ? "Active" : normalized === "inactive" ? "Inactive" : status

  return (
    <span
      className={`${sizeClasses} inline-flex items-center font-medium rounded-md border ${colors}`}
    >
      {label}
    </span>
  )
}

export default StaffStatusBadge
