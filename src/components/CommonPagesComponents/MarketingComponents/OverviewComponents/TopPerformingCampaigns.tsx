"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { TopPerformingCampaignsSection } from "@/types/CommonPageTypes/MarketingTypes"

interface TopPerformingCampaignsProps {
  data?: TopPerformingCampaignsSection
}

export default function TopPerformingCampaigns({ data }: TopPerformingCampaignsProps) {
  const { t } = useTranslation("dashboard")

  const title = data?.title || t("marketing.topPerformingCampaigns", "Top Performing Campaigns")
  const items = data?.items || []
  const hasItems = items.length > 0

  return (
    <div className="bg-card border border-white/5 rounded-xl p-4 md:p-5 flex flex-col h-[360px]">
      <div className="flex-shrink-0 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-primary">{title}</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {!hasItems ? (
          <div className="h-full flex items-center justify-center text-sm text-secondary py-8">
            {t("marketing.noCampaigns", "No performing campaigns found")}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((campaign) => {
              const currencySymbol = campaign.currency === "EUR" ? "€" : campaign.currency || "€"
              const percentage = campaign.performance_percentage ?? 0

              return (
                <div key={campaign.id || campaign.rank} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary w-5 text-center">
                        {campaign.rank}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {campaign.campaign_name}{" "}
                          <span className="text-secondary font-normal">
                            {currencySymbol}
                            {campaign.revenue}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-secondary">
                      {campaign.bookings} {t("marketing.bookings", "bookings")}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-custom-yellow h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
