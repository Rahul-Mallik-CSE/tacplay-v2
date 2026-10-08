"use client"

import { useTranslation } from "react-i18next"
import type { PlayerStatusBadgeProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerStatusBadge({
  status,
  size = "sm",
}: PlayerStatusBadgeProps) {
  const { t } = useTranslation("dashboard")

  const normalized = (status || "active").toLowerCase()
  const isActive = normalized === "active"

  const colorClass = isActive
    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
    : "bg-red-500/20 text-red-400 border border-red-500/30"

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"

  const displayLabel =
    t(`playerManagement.status.${normalized}`, {
      defaultValue: isActive ? "Active" : "Blocked",
    })

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium capitalize ${sizeClasses} ${colorClass}`}
    >
      {displayLabel}
    </span>
  )
}
