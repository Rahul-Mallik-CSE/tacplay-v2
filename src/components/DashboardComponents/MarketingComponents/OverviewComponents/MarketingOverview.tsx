"use client"

import { useTranslation } from "react-i18next"
import StatsCards from "./StatsCards"
import TopPerformingCampaigns from "./TopPerformingCampaigns"
import ActiveVouchers from "./ActiveVouchers"
import QuickActions from "./QuickActions"
import RecentCampaigns from "./RecentCampaigns"

export default function MarketingOverview() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            {t("marketing.title")}
          </h1>
          <p className="text-sm text-secondary mt-1">{t("marketing.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
          <span className="text-xs text-secondary">2025 - 2026</span>
          <span className="text-secondary">▾</span>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <TopPerformingCampaigns />
        <ActiveVouchers />
        <QuickActions />
      </div>

      <RecentCampaigns />
    </div>
  )
}
