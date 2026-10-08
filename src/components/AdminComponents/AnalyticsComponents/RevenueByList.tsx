"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { Megaphone, Mail, MessageSquare, Info } from "lucide-react"
import { CountryList } from "@/components/AdminComponents/SharedComponents"
import type {
  CountryRevenueData,
  RevenueByCampaignItem,
} from "@/types/AdminTypes/AnalyticsTypes"

interface RevenueByListProps {
  data?: CountryRevenueData[]
  campaignItems?: RevenueByCampaignItem[]
  type?: "country" | "campaign"
  title: string
  attributionNote?: string
  currency?: string
  selectedPeriod?: string
  periodOptions?: Array<{ label: string; value: string }>
  onPeriodChange?: (period: string) => void
}

export default function RevenueByList({
  data = [],
  campaignItems = [],
  type = "country",
  title,
  attributionNote,
  currency = "EUR",
  selectedPeriod = "month",
  periodOptions,
  onPeriodChange,
}: RevenueByListProps) {
  const { t } = useTranslation("dashboard")

  const defaultOptions = [
    { label: t("adminAnalytics.month", "Month"), value: "month" },
    { label: t("adminAnalytics.week", "Week"), value: "week" },
    { label: t("adminAnalytics.day", "Day"), value: "day" },
  ]
  const options = periodOptions && periodOptions.length > 0 ? periodOptions : defaultOptions

  const getCampaignIcon = (campaignType: string) => {
    switch (campaignType?.toLowerCase()) {
      case "sms":
        return <MessageSquare className="w-4 h-4 text-custom-yellow" />
      case "email":
        return <Mail className="w-4 h-4 text-indigo-400" />
      default:
        return <Megaphone className="w-4 h-4 text-custom-red" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "sent":
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Sent
          </span>
        )
      case "failed":
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Failed
          </span>
        )
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {title}
          </h3>
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange?.(e.target.value)}
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer hover:border-white/20 transition-colors"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {attributionNote && (
          <div className="mb-4 flex items-start gap-2 p-2.5 rounded-lg bg-muted/40 border border-white/5 text-[11px] sm:text-xs text-secondary">
            <Info className="w-4 h-4 text-custom-yellow shrink-0 mt-0.5" />
            <span>{attributionNote}</span>
          </div>
        )}

        {type === "campaign" ? (
          campaignItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-secondary">
              {t("adminAnalytics.noCampaigns", "No campaigns found for this period.")}
            </div>
          ) : (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {campaignItems.map((item) => {
                const currencySymbol =
                  item.currency === "EUR" ? "€" : item.currency || currency || "€"
                return (
                  <div
                    key={item.campaign_id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-muted/20 border border-white/5 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center shrink-0 border border-white/10">
                        {getCampaignIcon(item.campaign_type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm text-primary font-medium truncate"
                            title={item.campaign_name}
                          >
                            {item.campaign_name}
                          </span>
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                          {item.field?.field_name && (
                            <span className="truncate">{item.field.field_name}</span>
                          )}
                          <span>•</span>
                          <span>
                            {item.sent_count} / {item.audience_count} sent
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-sm font-semibold text-primary">
                        {currencySymbol}
                        {item.revenue}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        ) : (
          data.length === 0 ? (
            <div className="py-12 text-center text-sm text-secondary">
              {t("adminAnalytics.noData", "No data found for this period.")}
            </div>
          ) : (
            <CountryList data={data} />
          )
        )}
      </div>
    </div>
  )
}
