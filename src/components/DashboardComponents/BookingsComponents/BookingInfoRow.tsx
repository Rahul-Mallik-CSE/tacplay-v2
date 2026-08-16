"use client"

/**
 * BookingInfoRow.tsx
 * Reusable row component for displaying label-value pairs in detail views.
 * Used in BookingDetailsSheet for player, session, and payment info sections.
 */

import React from "react"
import type { BookingInfoRowProps } from "@/types/DashboardTypes/BookingsTypes"

function BookingInfoRow({ label, value }: BookingInfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-secondary whitespace-nowrap">{label}</span>
      <span className="text-sm text-primary text-right">{value}</span>
    </div>
  )
}

export default BookingInfoRow
