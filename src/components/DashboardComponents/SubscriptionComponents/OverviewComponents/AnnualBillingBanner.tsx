"use client"

import React from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import type { AnnualBillingBannerProps } from "@/types/DashboardTypes/SubscriptionTypes"

export default function AnnualBillingBanner({
  onSwitchToAnnual,
}: AnnualBillingBannerProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-16 h-16 shrink-0">
          <Image
            src="/heading-up.png"
            alt="Annual billing"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-primary">
            {t("subscription.overview.annualBannerTitle")}
          </h3>
          <p className="text-secondary text-sm mt-1">
            {t("subscription.overview.annualBannerSubtitle")}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSwitchToAnnual}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#980009] via-[#C00069] to-[#980009] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t("subscription.overview.switchToAnnual")}
          </button>
          <span className="px-4 py-2.5 rounded-xl border border-custom-yellow text-custom-yellow text-sm font-semibold">
            {t("subscription.overview.save20")}
          </span>
        </div>
      </div>
    </div>
  )
}
