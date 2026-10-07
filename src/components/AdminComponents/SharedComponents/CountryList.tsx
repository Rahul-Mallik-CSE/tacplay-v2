"use client"

import ReactCountryFlag from "react-country-flag"
import type { CountryRevenueData } from "@/types/AdminTypes/OverviewTypes"

interface CountryListProps {
  data: CountryRevenueData[]
}

export default function CountryList({ data }: CountryListProps) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        // Prefer country name returned directly from backend API
        const countryDisplayName = item.country || item.countryCode || "Unknown"

        return (
          <div
            key={index}
            className="flex items-center justify-between gap-4 py-1"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {item.countryCode ? (
                <ReactCountryFlag
                  countryCode={item.countryCode}
                  svg
                  style={{
                    width: "1.4em",
                    height: "1.4em",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div className="w-5 h-4 bg-muted/50 rounded shrink-0" />
              )}
              <span className="text-sm text-primary font-medium truncate" title={countryDisplayName}>
                {countryDisplayName}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-right">
              <span className="text-sm text-primary font-medium whitespace-nowrap">
                {item.amount}
              </span>
              <span className="text-sm text-muted-foreground w-16 text-right whitespace-nowrap">
                {item.percentage}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
