"use client"

import { useTranslation } from "react-i18next"
import { CountryList } from "@/components/AdminComponents/SharedComponents"
import type { CountryRevenueData } from "@/types/AdminTypes/AnalyticsTypes"

interface RevenueByListProps {
  data: CountryRevenueData[]
  title: string
}

export default function RevenueByList({ data, title }: RevenueByListProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {title}
        </h3>
        <select className="bg-muted border border-white/10 text-primary text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer">
          <option value="Month">{t("adminAnalytics.month")}</option>
          <option value="Week">{t("adminAnalytics.week")}</option>
          <option value="Day">{t("adminAnalytics.day")}</option>
        </select>
      </div>
      <CountryList data={data} />
    </div>
  )
}
