"use client"

import type { FieldPlanBadgeProps } from "@/types/AdminTypes/FieldManagementTypes"

export default function FieldPlanBadge({
  plan,
  size = "sm",
}: FieldPlanBadgeProps) {
  const sizeClasses =
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"

  const planStr =
    typeof plan === "string"
      ? plan
      : typeof plan === "object" && plan !== null
      ? ((plan as Record<string, unknown>).name as string) ||
        ((plan as Record<string, unknown>).label as string) ||
        ((plan as Record<string, unknown>).value as string) ||
        ""
      : String(plan || "")

  const normalized = planStr.toLowerCase()
  let colorClass = "bg-secondary/20 text-secondary border border-secondary/30"

  if (normalized.includes("gold")) {
    colorClass = "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
  } else if (normalized.includes("silver") || normalized.includes("sliver")) {
    colorClass = "bg-blue-500/20 text-blue-400 border border-blue-500/30"
  } else if (normalized.includes("bronze")) {
    colorClass = "bg-amber-700/20 text-amber-400 border border-amber-700/30"
  }

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium capitalize ${sizeClasses} ${colorClass}`}
    >
      {planStr || "Plan"}
    </span>
  )
}
