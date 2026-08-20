"use client"

import React from "react"
import type { StaffInfoRowProps } from "@/types/DashboardTypes/StaffTypes"

function StaffInfoRow({ label, value }: StaffInfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-secondary whitespace-nowrap">{label}</span>
      <span className="text-sm text-primary text-right">{value}</span>
    </div>
  )
}

export default StaffInfoRow
