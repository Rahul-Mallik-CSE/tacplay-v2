"use client"

import { useTranslation } from "react-i18next"
import type { NotificationCategory } from "@/types/CommonPageTypes/NotificationTypes"

interface NotificationFilterTabsProps {
  activeTab: NotificationCategory
  onTabChange: (tab: NotificationCategory) => void
  counts: Partial<Record<NotificationCategory, number>>
}

const tabs: { label: string; value: NotificationCategory }[] = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
]

export default function NotificationFilterTabs({
  activeTab,
  onTabChange,
  counts,
}: NotificationFilterTabsProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const count = counts[tab.value] ?? 0
        const isActive = activeTab === tab.value

        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? "bg-red-700 text-white"
                : "bg-white/5 text-secondary hover:bg-white/10 hover:text-primary"
            }`}
          >
            <span>{t(`notifications.tabs.${tab.value}`, tab.label)}</span>
            {count > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-secondary"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
