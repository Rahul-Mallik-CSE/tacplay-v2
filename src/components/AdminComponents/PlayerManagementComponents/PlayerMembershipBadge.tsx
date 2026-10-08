"use client"

import { useTranslation } from "react-i18next"
import type { PlayerMembershipBadgeProps } from "@/types/AdminTypes/PlayerManagementTypes"

export default function PlayerMembershipBadge({
  membership,
  size = "sm",
}: PlayerMembershipBadgeProps) {
  const { t } = useTranslation("dashboard")

  const normalized = (membership || "free").toLowerCase()
  const isPremium = normalized.includes("premium")

  const colorClass = isPremium
    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
    : "bg-secondary/20 text-secondary border border-secondary/30"

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"

  const displayLabel = membership || (isPremium ? "Premium" : "Free")

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses} ${colorClass}`}
    >
      {t(`playerManagement.membership.${normalized}`, {
        defaultValue: displayLabel,
      })}
    </span>
  )
}
