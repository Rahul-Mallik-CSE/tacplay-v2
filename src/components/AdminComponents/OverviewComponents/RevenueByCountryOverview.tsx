"use client"

import { useTranslation } from "react-i18next"
import { WorldMap, CountryList } from "@/components/AdminComponents/SharedComponents"
import type { CountryRevenueData } from "@/types/AdminTypes/OverviewTypes"

interface RevenueByCountryOverviewProps {
  data: CountryRevenueData[]
}

export default function RevenueByCountryOverview({
  data,
}: RevenueByCountryOverviewProps) {
  const { t } = useTranslation("dashboard")

  const highlightedCountries = data.map((item) => item.countryCode)

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {t("adminAnalytics.revenueByCountry")}
        </h3>
        <select className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer">
          <option value="Month">{t("adminAnalytics.month")}</option>
          <option value="Week">{t("adminAnalytics.week")}</option>
          <option value="Day">{t("adminAnalytics.day")}</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <CountryList data={data} />
        </div>
        <div className="flex-1">
          <WorldMap highlightedCountries={highlightedCountries} />
        </div>
      </div>
    </div>
  )
}
