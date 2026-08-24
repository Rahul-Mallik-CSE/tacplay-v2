"use client"

import { useTranslation } from "react-i18next"
import type { PlayerStatusBadgeProps } from "@/types/AdminTypes/PlayerManagementTypes"

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Block: "bg-red-500/20 text-red-400 border border-red-500/30",
}

export default function PlayerStatusBadge({
  status,
  size = "sm",
}: PlayerStatusBadgeProps) {
  const { t } = useTranslation("dashboard")

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses} ${
        STATUS_COLORS[status] || STATUS_COLORS.Active
      }`}
    >
      {t(`playerManagement.status.${status.toLowerCase()}`)}
    </span>
  )
}
