"use client"

import { useTranslation } from "react-i18next"
import { WorldMap, CountryList } from "@/components/AdminComponents/SharedComponents"
import type {
  CountryRevenueData,
  RevenueByCountryApiItem,
  PeriodOption,
} from "@/types/AdminTypes/OverviewTypes"

interface RevenueByCountryOverviewProps {
  data?: CountryRevenueData[]
  items?: RevenueByCountryApiItem[]
  selectedPeriod?: string
  periodOptions?: PeriodOption[]
  onPeriodChange?: (period: string) => void
}

export default function RevenueByCountryOverview({
  data,
  items,
  selectedPeriod = "month",
  periodOptions,
  onPeriodChange,
}: RevenueByCountryOverviewProps) {
  const { t } = useTranslation("dashboard")

  const defaultOptions: PeriodOption[] = [
    { label: t("adminAnalytics.month"), value: "month" },
    { label: t("adminAnalytics.week"), value: "week" },
    { label: t("adminAnalytics.day"), value: "day" },
  ]

  const options = periodOptions && periodOptions.length > 0 ? periodOptions : defaultOptions

  // Map API items if provided, otherwise fallback to data
  const formattedData: CountryRevenueData[] = items
    ? items.map((item) => ({
        country: item.country,
        countryCode: item.country_code || "",
        amount: item.currency === "EUR" ? `€${item.revenue}` : `${item.currency} ${item.revenue}`,
        percentage: item.percentage_display,
      }))
    : data || []

  const highlightedCountries = formattedData
    .map((item) => item.countryCode)
    .filter(Boolean)

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {t("adminAnalytics.revenueByCountry")}
        </h3>
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange?.(e.target.value)}
          className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex-1 min-w-0 w-full">
          <CountryList data={formattedData} />
        </div>
        <div className="flex-1 min-w-0 w-full">
          <WorldMap highlightedCountries={highlightedCountries} />
        </div>
      </div>
    </div>
  )
}
