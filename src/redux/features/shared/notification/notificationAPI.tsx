/** @format */

import baseAPI from "@/redux/api/baseAPI"
import type {
  NotificationListResponse,
  UnreadCountResponse,
  MarkReadResponse,
  MarkAllReadResponse,
  NotificationQueryParams,
} from "@/types/CommonPageTypes/NotificationTypes"

export const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationListResponse,
      NotificationQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams()

        if (params?.is_read !== undefined) {
          queryParams.append("is_read", String(params.is_read))
        }
        if (params?.page) {
          queryParams.append("page", String(params.page))
        }
        if (params?.limit) {
          queryParams.append("limit", String(params.limit))
        }

        const queryString = queryParams.toString()
        return {
          url: `/api/auth/field-owner/notifications/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        }
      },
      providesTags: (result) =>
        result?.data?.results
          ? [
              ...result.data.results.map(({ id }) => ({
                type: "Notification" as const,
                id,
              })),
              { type: "Notification", id: "LIST" },
            ]
          : [{ type: "Notification", id: "LIST" }],
    }),

    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => ({
        url: "/api/auth/field-owner/notifications/unread-count/",
        method: "GET",
      }),
      providesTags: [{ type: "Notification", id: "UNREAD_COUNT" }],
    }),

    markNotificationRead: builder.mutation<MarkReadResponse, number>({
      query: (id) => ({
        url: `/api/auth/field-owner/notifications/${id}/read/`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Notification", id },
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD_COUNT" },
      ],
    }),

    markAllNotificationsRead: builder.mutation<MarkAllReadResponse, void>({
      query: () => ({
        url: "/api/auth/field-owner/notifications/read-all/",
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD_COUNT" },
      ],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useGetUnreadCountQuery,
  useLazyGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationAPI

export default notificationAPI
