"use client"

import { useTranslation } from "react-i18next"

interface StatCardItem {
  title: string
  value: string | number
  subtitle: string
  change?: string
  icon: React.ElementType
}

interface StatCardsProps {
  stats: StatCardItem[]
}

export default function AdminStatCards({ stats }: StatCardsProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="rounded-xl border border-white/5 bg-card p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                {t(stat.title)}
              </span>
              <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
              {stat.value}
            </div>
            <div className="mt-1">
              {stat.change ? (
                <span className="text-xs text-emerald-400 font-medium">
                  {stat.change}
                </span>
              ) : null}
              <span className="text-xs text-muted-foreground ml-1">
                {t(stat.subtitle)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
