"use client"

import type { FieldPlanBadgeProps } from "@/types/AdminTypes/FieldManagementTypes"

const PLAN_COLORS: Record<string, string> = {
  Gold: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Sliver: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Bronze: "bg-amber-700/20 text-amber-400 border border-amber-700/30",
}

export default function FieldPlanBadge({
  plan,
  size = "sm",
}: FieldPlanBadgeProps) {
  const sizeClasses =
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${sizeClasses} ${
        PLAN_COLORS[plan] || "bg-secondary/20 text-secondary border border-secondary/30"
      }`}
    >
      {plan}
    </span>
  )
}
