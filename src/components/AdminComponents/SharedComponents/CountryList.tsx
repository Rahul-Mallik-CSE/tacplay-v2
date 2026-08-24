"use client"

import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "react-i18next"
import type { CountryRevenueData } from "@/types/AdminTypes/AnalyticsTypes"

interface CountryListProps {
  data: CountryRevenueData[]
}

export default function CountryList({ data }: CountryListProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <ReactCountryFlag
              countryCode={item.countryCode}
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
              }}
            />
            <span className="text-sm text-primary">
              {t(`adminAnalytics.countries.${item.countryCode}`) || item.country}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-primary font-medium">
              {item.amount}
            </span>
            <span className="text-sm text-muted-foreground w-12 text-right">
              {item.percentage}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
