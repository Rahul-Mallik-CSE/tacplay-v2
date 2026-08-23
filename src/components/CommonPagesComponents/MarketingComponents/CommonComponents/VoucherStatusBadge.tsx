"use client"

import { cn } from "@/lib/utils"
import type { VoucherStatusBadgeProps } from "@/types/DashboardTypes/MarketingTypes"

const statusStyles: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border border-green-500/30",
  Schedule: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Expired: "bg-red-500/20 text-red-400 border border-red-500/30",
}

export default function VoucherStatusBadge({ status }: VoucherStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium",
        statusStyles[status] || "bg-secondary/20 text-secondary border border-secondary/30"
      )}
    >
      {status}
    </span>
  )
}
