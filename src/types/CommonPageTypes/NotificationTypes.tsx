export type NotificationType =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "booking"
  | "session"
  | "payment"
  | "system"

export type NotificationCategory =
  | "all"
  | "unread"
  | "read"
  | "bookings"
  | "sessions"
  | "payments"
  | "system"

export interface ApiNotificationItem {
  id: number
  title: string
  message: string
  notification_type: string
  payload: Record<string, unknown>
  is_read: boolean
  read_at: string | null
  created_at: string
}

export interface NotificationItem {
  notification_id: number
  id?: number
  title: string
  message: string
  type: NotificationType
  category: NotificationCategory
  timestamp: string
  is_read: boolean
  read_at?: string | null
  created_at?: string
  notification_type?: string
  payload?: Record<string, unknown>
  avatar?: string
  sender?: string
}

export interface NotificationPaginationMeta {
  page: number
  limit: number
  total: number
  totalPage: number
}

export interface NotificationListResponse {
  success: boolean
  message: string
  meta: NotificationPaginationMeta
  data: {
    results: ApiNotificationItem[]
    unread_count: number
  }
  requestId?: string
}

export interface UnreadCountResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    unread_count: number
  }
  requestId?: string
}

export interface MarkReadResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    id: number
    is_read: boolean
    read_at: string
  }
  requestId?: string
}

export interface MarkAllReadResponse {
  success: boolean
  message: string
  meta: Record<string, unknown>
  data: {
    updated_count: number
  }
  requestId?: string
}

export interface NotificationQueryParams {
  is_read?: boolean
  page?: number
  limit?: number
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
