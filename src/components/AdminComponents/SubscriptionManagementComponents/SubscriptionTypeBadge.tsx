"use client"

import React from "react"
import { Building2, User } from "lucide-react"
import type { SubscriptionTypeBadgeProps } from "@/types/AdminTypes/SubscriptionManagementTypes"

function SubscriptionTypeBadge({
  type,
  size = "md",
}: SubscriptionTypeBadgeProps) {
  const isFieldOwner =
    (type || "").toLowerCase().includes("field") ||
    (type || "").toLowerCase().includes("owner")

  const colors = isFieldOwner
    ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
    : "bg-purple-500/15 text-purple-400 border-purple-500/30"

  const icon = isFieldOwner ? (
    <Building2 className="w-3 h-3 text-blue-400 shrink-0" />
  ) : (
    <User className="w-3 h-3 text-purple-400 shrink-0" />
  )

  const sizeClasses =
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs"

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClasses} font-medium rounded-full border ${colors}`}
    >
      {icon}
      <span>{type}</span>
    </span>
  )
}

export default SubscriptionTypeBadge
