"use client"

/**
 * EarningPaymentBadge.tsx
 * Color-coded badge component for displaying payment methods.
 * Stripe payments show purple, cash payments show blue.
 */

import React from "react"
import type { EarningPaymentBadgeProps } from "@/types/DashboardTypes/EarningsTypes"

function EarningPaymentBadge({ method }: EarningPaymentBadgeProps) {
  const isStripe = method.toLowerCase().includes("stripe")

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${
        isStripe
          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
      }`}
    >
      {method}
    </span>
  )
}

export default EarningPaymentBadge
