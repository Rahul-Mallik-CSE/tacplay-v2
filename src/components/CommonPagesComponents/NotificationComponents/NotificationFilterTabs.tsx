"use client"

import { useTranslation } from "react-i18next"
import type { NotificationCategory } from "@/types/DashboardTypes/NotificationTypes"

interface NotificationFilterTabsProps {
  activeTab: NotificationCategory
  onTabChange: (tab: NotificationCategory) => void
  counts: Record<NotificationCategory, number>
}

const tabs: { label: string; value: NotificationCategory }[] = [
  { label: "All", value: "all" },
  { label: "Bookings", value: "bookings" },
  { label: "Sessions", value: "sessions" },
  { label: "Payments", value: "payments" },
  { label: "System", value: "system" },
]

export default function NotificationFilterTabs({
  activeTab,
  onTabChange,
  counts,
}: NotificationFilterTabsProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === tab.value
              ? "bg-red-700 text-white"
              : "bg-white/5 text-secondary hover:bg-white/10 hover:text-primary"
          }`}
        >
          <span>{tab.label}</span>
          {counts[tab.value] > 0 && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.value
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-secondary"
              }`}
            >
              {counts[tab.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
