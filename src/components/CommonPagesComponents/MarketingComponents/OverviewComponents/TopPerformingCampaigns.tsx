"use client"

import { useTranslation } from "react-i18next"
import { mockTopPerformingCampaigns } from "@/mock-data/DashboardMockData/marketing-mock-data"

export default function TopPerformingCampaigns() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-primary">
          {t("marketing.topPerformingCampaigns")}
        </h3>
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer">
          {t("marketing.viewAll")}
        </button>
      </div>
      <div className="space-y-4">
        {mockTopPerformingCampaigns.map((campaign) => (
          <div key={campaign.rank} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary">{campaign.rank}</span>
                <div>
                  <p className="text-sm font-medium text-primary">
                    {campaign.name} <span className="text-secondary">€{campaign.revenue}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs text-secondary">{campaign.bookings} bookings</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-custom-yellow h-2 rounded-full transition-all"
                style={{ width: `${Math.min((campaign.bookings / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
