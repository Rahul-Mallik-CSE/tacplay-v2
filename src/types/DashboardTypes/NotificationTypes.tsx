export type NotificationType = "info" | "warning" | "success" | "error" | "booking" | "session" | "payment" | "system"

export type NotificationCategory = "all" | "bookings" | "sessions" | "payments" | "system"

export interface NotificationItem {
  notification_id: number
  title: string
  message: string
  type: NotificationType
  category: NotificationCategory
  timestamp: string
  is_read: boolean
  avatar?: string
  sender?: string
}

export interface NotificationFilterTab {
  label: string
  value: NotificationCategory
  count: number
}

export interface NotificationListProps {
  notifications: NotificationItem[]
  onMarkAsRead?: (id: number) => void
  onMarkAllAsRead?: () => void
  onDelete?: (id: number) => void
}

export interface NotificationItemProps {
  notification: NotificationItem
  onMarkAsRead?: (id: number) => void
  onDelete?: (id: number) => void
}
