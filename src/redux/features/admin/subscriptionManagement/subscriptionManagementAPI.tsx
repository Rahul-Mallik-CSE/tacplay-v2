/** @format */

import baseAPI from "@/redux/api/baseAPI"
import type {
  AdminSubscriptionListResponse,
  AdminSubscriptionQueryParams,
} from "@/types/AdminTypes/SubscriptionManagementTypes"

export const subscriptionManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSubscriptions: builder.query<
      AdminSubscriptionListResponse,
      AdminSubscriptionQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams()

        if (params?.search) queryParams.append("search", params.search)
        if (params?.type) queryParams.append("type", params.type)
        if (params?.plan) queryParams.append("plan", params.plan)
        if (params?.country) queryParams.append("country", params.country)
        if (params?.billing_cycle)
          queryParams.append("billing_cycle", params.billing_cycle)
        if (params?.status) queryParams.append("status", params.status)
        if (params?.sort_by) queryParams.append("sort_by", params.sort_by)
        if (params?.sort_order) queryParams.append("sort_order", params.sort_order)
        if (params?.page) queryParams.append("page", String(params.page))
        if (params?.limit) queryParams.append("limit", String(params.limit))

        const queryString = queryParams.toString()
        return {
          url: `/api/admin/subscriptions/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        }
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ subscription_id }) => ({
                type: "AdminSubscriptions" as const,
                id: subscription_id,
              })),
              { type: "AdminSubscriptions", id: "LIST" },
            ]
          : [{ type: "AdminSubscriptions", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAdminSubscriptionsQuery,
  useLazyGetAdminSubscriptionsQuery,
} = subscriptionManagementAPI
