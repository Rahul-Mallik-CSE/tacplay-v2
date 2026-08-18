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
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
            billingCycle === "monthly"
              ? "bg-transparent text-primary"
              : "text-secondary hover:text-primary"
          )}
        >
          {t("subscription.overview.monthly")}
        </button>
        <button
          onClick={() => onToggle("annual")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
            billingCycle === "annual"
              ? "bg-gradient-to-r from-[#980009] via-[#C00069] to-[#980009] text-white"
              : "text-secondary hover:text-primary"
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
