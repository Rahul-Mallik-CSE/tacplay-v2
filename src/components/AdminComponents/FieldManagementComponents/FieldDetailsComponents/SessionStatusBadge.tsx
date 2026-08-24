"use client"

import { useTranslation } from "react-i18next"
import type { SessionStatusBadgeProps } from "@/types/AdminTypes/FieldManagementTypes"

const STATUS_COLORS: Record<string, string> = {
  Failed: "bg-red-500/20 text-red-400 border border-red-500/30",
  Booking: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Full: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Ongoing: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Open: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
}

export default function SessionStatusBadge({
  status,
  size = "sm",
}: SessionStatusBadgeProps) {
  const { t } = useTranslation("dashboard")

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses} ${
        STATUS_COLORS[status] || "bg-secondary/20 text-secondary border border-secondary/30"
      }`}
    >
      {t(`fieldManagement.sessionStatus.${status.toLowerCase()}`)}
    </span>
  )
}
