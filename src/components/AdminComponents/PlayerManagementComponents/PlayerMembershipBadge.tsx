"use client"

import { useTranslation } from "react-i18next"
import type { PlayerMembershipBadgeProps } from "@/types/AdminTypes/PlayerManagementTypes"

const MEMBERSHIP_COLORS: Record<string, string> = {
  Premium: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Free: "bg-secondary/20 text-secondary border border-secondary/30",
}

export default function PlayerMembershipBadge({
  membership,
  size = "sm",
}: PlayerMembershipBadgeProps) {
  const { t } = useTranslation("dashboard")

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses} ${
        MEMBERSHIP_COLORS[membership] || MEMBERSHIP_COLORS.Free
      }`}
    >
      {t(`playerManagement.membership.${membership.toLowerCase()}`)}
    </span>
  )
}
