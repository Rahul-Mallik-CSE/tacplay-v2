"use client"

import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Bell, CheckCheck, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import NotificationFilterTabs from "./NotificationFilterTabs"
import NotificationItemRow from "./NotificationItemRow"
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "@/redux/features/shared/notification/notificationAPI"
import type {
  NotificationItem,
  NotificationCategory,
  NotificationType,
} from "@/types/CommonPageTypes/NotificationTypes"

const formatTimestamp = (dateStr?: string) => {
  if (!dateStr) return ""
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

const mapNotificationType = (typeStr?: string): NotificationType => {
  const t = (typeStr || "").toLowerCase()
  if (t.includes("book")) return "booking"
  if (t.includes("sess")) return "session"
  if (t.includes("pay") || t.includes("bill") || t.includes("sub")) return "payment"
  if (t.includes("warn")) return "warning"
  if (t.includes("err")) return "error"
  if (t.includes("succ")) return "success"
  return "info"
}

export default function NotificationContainer() {
  const { t } = useTranslation("dashboard")
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all")
  const [dismissedIds, setDismissedIds] = useState<number[]>([])

  const queryParams = useMemo(() => {
    if (activeTab === "unread") return { is_read: false }
    if (activeTab === "read") return { is_read: true }
    return undefined
  }, [activeTab])

  const {
    data: listResponse,
    isLoading: isListLoading,
    isFetching: isListFetching,
  } = useGetNotificationsQuery(queryParams)

  const { data: unreadResponse } = useGetUnreadCountQuery()

  const [markNotificationRead] = useMarkNotificationReadMutation()
  const [markAllNotificationsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsReadMutation()

  const rawResults = listResponse?.data?.results || []
  const totalUnread =
    unreadResponse?.data?.unread_count ??
    listResponse?.data?.unread_count ??
    0

  const notifications: NotificationItem[] = useMemo(() => {
    return rawResults
      .filter((item) => !dismissedIds.includes(item.id))
      .map((item) => ({
        id: item.id,
        notification_id: item.id,
        title: item.title,
        message: item.message,
        type: mapNotificationType(item.notification_type),
        category: item.is_read ? "read" : "unread",
        timestamp: formatTimestamp(item.created_at),
        is_read: item.is_read,
        read_at: item.read_at,
        created_at: item.created_at,
        payload: item.payload,
      }))
  }, [rawResults, dismissedIds])

  const totalCount = listResponse?.meta?.total ?? rawResults.length

  const counts: Partial<Record<NotificationCategory, number>> = useMemo(() => {
    return {
      all: totalCount,
      unread: totalUnread,
      read: Math.max(0, totalCount - totalUnread),
    }
  }, [totalCount, totalUnread])

  const handleMarkAsRead = async (id: number) => {
    try {
      const res = await markNotificationRead(id).unwrap()
      toast.success(res.message || "Notification marked as read")
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to mark notification as read")
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const res = await markAllNotificationsRead().unwrap()
      toast.success(res.message || "All notifications marked as read")
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to mark all notifications as read")
    }
  }

  const handleDelete = (id: number) => {
    setDismissedIds((prev) => [...prev, id])
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
                {totalUnread} {t("notifications.unread", "unread")}
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
              disabled={isMarkingAll}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-secondary hover:text-primary hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isMarkingAll ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCheck className="w-4 h-4" />
              )}
              {t("notifications.markAllRead", "Mark all read")}
            </button>
          )}
        </div>
      </div>

      <NotificationFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      <div className="space-y-3">
        {isListLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-secondary">
              {t("notifications.loading", "Loading notifications...")}
            </p>
          </div>
        ) : notifications.length === 0 ? (
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
          notifications.map((notification) => (
            <NotificationItemRow
              key={notification.id}
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
