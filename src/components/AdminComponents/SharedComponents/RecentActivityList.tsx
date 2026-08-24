"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { RecentActivityItem } from "@/types/AdminTypes/OverviewTypes"

interface RecentActivityListProps {
  activities: RecentActivityItem[]
  viewAllLabel?: string
  onViewAll?: () => void
}

export default function RecentActivityList({
  activities,
  viewAllLabel,
  onViewAll,
}: RecentActivityListProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          {viewAllLabel ? t("adminOverview.recentActivity") : t("adminOverview.recentActivity")}
        </h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-custom-red hover:underline font-medium cursor-pointer"
          >
            {viewAllLabel || t("adminOverview.viewAll")}
          </button>
        )}
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg}`}
              >
                <Icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary">
                  {t(activity.title)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {t(activity.description)}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
