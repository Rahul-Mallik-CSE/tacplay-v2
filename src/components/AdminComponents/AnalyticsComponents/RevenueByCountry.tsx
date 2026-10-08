"use client"

import { useTranslation } from "react-i18next"
import { WorldMap, CountryList } from "@/components/AdminComponents/SharedComponents"
import type { CountryRevenueData } from "@/types/AdminTypes/AnalyticsTypes"

interface RevenueByCountryProps {
  data: CountryRevenueData[]
  title?: string
  selectedPeriod?: string
  periodOptions?: Array<{ label: string; value: string }>
  onPeriodChange?: (period: string) => void
}

export default function RevenueByCountry({
  data,
  title,
  selectedPeriod = "month",
  periodOptions,
  onPeriodChange,
}: RevenueByCountryProps) {
  const { t } = useTranslation("dashboard")

  const defaultOptions = [
    { label: t("adminAnalytics.month", "Month"), value: "month" },
    { label: t("adminAnalytics.week", "Week"), value: "week" },
    { label: t("adminAnalytics.day", "Day"), value: "day" },
  ]
  const options = periodOptions && periodOptions.length > 0 ? periodOptions : defaultOptions

  const highlightedCountries = data
    .map((item) => item.countryCode)
    .filter(Boolean)

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {title || t("adminAnalytics.revenueByCountry", "Revenue By Country")}
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

        {data.length === 0 ? (
          <div className="py-12 text-center text-sm text-secondary">
            {t("adminAnalytics.noCountryData", "No country revenue data found for this period.")}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:flex-1">
              <CountryList data={data} />
            </div>
            <div className="w-full lg:flex-1 flex justify-center">
              <WorldMap highlightedCountries={highlightedCountries} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
