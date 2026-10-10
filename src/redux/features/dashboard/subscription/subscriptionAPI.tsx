/** @format */

import baseAPI from "@/redux/api/baseAPI"
import type {
  SubscriptionStatusResponse,
  SubscriptionPlansResponse,
  UpgradeSubscriptionPayload,
  UpgradeSubscriptionResponse,
  BillingHistoryResponse,
} from "@/types/DashboardTypes/SubscriptionTypes"

export const subscriptionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionStatus: builder.query<SubscriptionStatusResponse, void>({
      query: () => ({
        url: "/api/auth/field-owner/subscription/status/",
        method: "GET",
      }),
      providesTags: [{ type: "FieldOwnerSubscription", id: "STATUS" }],
    }),

    getSubscriptionPlans: builder.query<
      SubscriptionPlansResponse,
      { billing_cycle?: "monthly" | "yearly" } | void
    >({
      query: (params) => {
        const cycle = params?.billing_cycle || "monthly"
        return {
          url: `/api/auth/field-owner/subscription/plans/?billing_cycle=${cycle}`,
          method: "GET",
        }
      },
      providesTags: (result, error, arg) => [
        {
          type: "FieldOwnerSubscription",
          id: `PLANS_${arg?.billing_cycle || "monthly"}`,
        },
        { type: "FieldOwnerSubscription", id: "PLANS" },
      ],
    }),

    upgradeSubscription: builder.mutation<
      UpgradeSubscriptionResponse,
      UpgradeSubscriptionPayload
    >({
      query: (body) => ({
        url: "/api/auth/field-owner/subscription/upgrade/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "FieldOwnerSubscription", id: "STATUS" },
        { type: "FieldOwnerSubscription", id: "PLANS" },
        { type: "FieldOwnerSubscription", id: "BILLING_HISTORY" },
        "Dashboard",
      ],
    }),

    getBillingHistory: builder.query<BillingHistoryResponse, void>({
      query: () => ({
        url: "/api/auth/field-owner/subscription/billing-history/",
        method: "GET",
      }),
      providesTags: [{ type: "FieldOwnerSubscription", id: "BILLING_HISTORY" }],
    }),
  }),
})

export const {
  useGetSubscriptionStatusQuery,
  useLazyGetSubscriptionStatusQuery,
  useGetSubscriptionPlansQuery,
  useLazyGetSubscriptionPlansQuery,
  useUpgradeSubscriptionMutation,
  useGetBillingHistoryQuery,
  useLazyGetBillingHistoryQuery,
} = subscriptionAPI

export default subscriptionAPI
