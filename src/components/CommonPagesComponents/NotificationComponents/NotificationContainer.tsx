"use client"

import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Bell, CheckCheck, Trash2 } from "lucide-react"
import NotificationFilterTabs from "./NotificationFilterTabs"
import NotificationItemRow from "./NotificationItemRow"
import { mockNotifications } from "@/mock-data/DashboardMockData/notification-mock-data"
import type {
  NotificationItem,
  NotificationCategory,
} from "@/types/DashboardTypes/NotificationTypes"

export default function NotificationContainer() {
  const { t } = useTranslation("dashboard")
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all")

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications
    return notifications.filter((n) => n.category === activeTab)
  }, [notifications, activeTab])

  const counts = useMemo(() => {
    const map: Record<NotificationCategory, number> = {
      all: notifications.filter((n) => !n.is_read).length,
      bookings: notifications.filter((n) => n.category === "bookings" && !n.is_read).length,
      sessions: notifications.filter((n) => n.category === "sessions" && !n.is_read).length,
      payments: notifications.filter((n) => n.category === "payments" && !n.is_read).length,
      system: notifications.filter((n) => n.category === "system" && !n.is_read).length,
    }
    return map
  }, [notifications])

  const totalUnread = notifications.filter((n) => !n.is_read).length

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notification_id === id ? { ...n, is_read: true } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
  }

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.notification_id !== id))
  }

  const handleClearAll = () => {
    setNotifications((prev) => prev.filter((n) => !n.is_read))
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              {t("notifications.title", "Notifications")}
            </h1>
            {totalUnread > 0 && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium px-2.5 py-1 rounded-full">
                {totalUnread} unread
              </span>
            )}
          </div>
          <p className="text-sm text-secondary mt-1">
            {t("notifications.subtitle", "Stay updated with your latest activity and alerts.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalUnread > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-secondary hover:text-primary hover:bg-white/10 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              {t("notifications.markAllRead", "Mark all read")}
            </button>
          )}
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            {t("notifications.clearAll", "Clear all")}
          </button>
        </div>
      </div>

      <NotificationFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-primary">
              {t("notifications.emptyTitle", "No notifications")}
            </h3>
            <p className="text-sm text-secondary mt-1">
              {t("notifications.emptyMessage", "You're all caught up! Check back later for updates.")}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItemRow
              key={notification.notification_id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
