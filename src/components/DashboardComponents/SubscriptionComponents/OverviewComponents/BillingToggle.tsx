"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { BillingToggleProps } from "@/types/DashboardTypes/SubscriptionTypes"

export default function BillingToggle({
  billingCycle,
  onToggle,
}: BillingToggleProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-full border border-white/10 bg-[#1a1a24] p-1">
        <button
          onClick={() => onToggle("monthly")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
            billingCycle === "monthly"
              ? "bg-[#980009] text-primary"
              : "text-[#FEDD00] hover:text-[#FEDD00]/80"
          )}
        >
          {t("subscription.overview.monthly")}
        </button>
        <button
          onClick={() => onToggle("annual")}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
            billingCycle === "annual"
              ? "bg-[#980009] text-primary"
              : "text-[#FEDD00] hover:text-[#FEDD00]/80"
          )}
        >
          {t("subscription.overview.annual")}
        </button>
      </div>
      <span className="text-custom-yellow text-sm font-medium">
        {t("subscription.overview.saveUpTo")}
      </span>
    </div>
  )
}
