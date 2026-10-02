"use client"

import {
  Bell,
  Calendar,
  CreditCard,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  MailOpen,
} from "lucide-react"
import type { NotificationItem, NotificationType } from "@/types/DashboardTypes/NotificationTypes"

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string; bg: string }> = {
  booking: { icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/15" },
  session: { icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/15" },
  payment: { icon: CreditCard, color: "text-green-400", bg: "bg-green-500/15" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/15" },
  warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/15" },
  success: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/15" },
  error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/15" },
  system: { icon: Info, color: "text-gray-400", bg: "bg-gray-500/15" },
}

interface NotificationItemRowProps {
  notification: NotificationItem
  onMarkAsRead?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function NotificationItemRow({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemRowProps) {
  const config = typeConfig[notification.type]
  const Icon = config.icon

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
        notification.is_read
          ? "border-white/5 bg-card/50"
          : "border-white/10 bg-card"
      }`}
    >
      <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={`text-sm font-semibold ${notification.is_read ? "text-secondary" : "text-primary"}`}>
            {notification.title}
          </h4>
          {!notification.is_read && (
            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-sm text-secondary mt-1 line-clamp-2">
          {notification.message}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-secondary">{notification.timestamp}</span>
          <div className="flex items-center gap-1">
            {!notification.is_read && (
              <button
                onClick={() => onMarkAsRead?.(notification.notification_id)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-secondary hover:text-primary cursor-pointer"
                title="Mark as read"
              >
                <MailOpen className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onDelete?.(notification.notification_id)}
              className="p-1.5 rounded-lg hover:bg-red-500/15 transition-colors text-secondary hover:text-red-400 cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
