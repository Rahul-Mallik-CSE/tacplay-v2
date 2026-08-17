"use client"

/**
 * StatCards.tsx
 * Row of 5 stat cards showing key analytics metrics.
 */

import { useTranslation } from "react-i18next"
import type { AnalyticsStatCard } from "@/types/DashboardTypes/ArenaManagementTypes"

interface StatCardsProps {
  stats: AnalyticsStatCard[]
}

export default function StatCards({ stats }: StatCardsProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="rounded-xl border border-white/5 bg-card p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">
                {stat.title}
              </span>
              <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              {stat.value}
            </div>
            <div className="mt-1">
              {stat.change ? (
                <span className="text-xs text-emerald-400 font-medium">
                  {stat.change}
                </span>
              ) : null}
              <span className="text-xs text-muted-foreground ml-1">
                {stat.subtitle}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
