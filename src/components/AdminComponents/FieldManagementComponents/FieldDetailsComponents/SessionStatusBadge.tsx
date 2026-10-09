"use client"

import { useTranslation } from "react-i18next"
import type { SessionStatusBadgeProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function SessionStatusBadge({
  status,
  size = "sm",
}: SessionStatusBadgeProps) {
  const { t } = useTranslation("dashboard")

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"

  const statusStr =
    typeof status === "string"
      ? status
      : typeof status === "object" && status !== null
      ? ((status as Record<string, unknown>).label as string) ||
        ((status as Record<string, unknown>).value as string) ||
        ((status as Record<string, unknown>).name as string) ||
        ""
      : String(status || "")

  const normalized = statusStr.toLowerCase()
  let colorClass = "bg-secondary/20 text-secondary border border-secondary/30"

  switch (normalized) {
    case "completed":
    case "complete":
      colorClass = "bg-green-500/20 text-green-400 border border-green-500/30"
      break
    case "ongoing":
      colorClass = "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
      break
    case "open":
      colorClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      break
    case "booking":
      colorClass = "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      break
    case "full":
      colorClass = "bg-purple-500/20 text-purple-400 border border-purple-500/30"
      break
    case "cancelled":
    case "failed":
      colorClass = "bg-red-500/20 text-red-400 border border-red-500/30"
      break
    default:
      colorClass = "bg-secondary/20 text-secondary border border-secondary/30"
      break
  }

  const translated = t(`fieldManagement.sessionStatus.${normalized}`, statusStr)

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium capitalize ${sizeClasses} ${colorClass}`}
    >
      {translated}
    </span>
  )
}
