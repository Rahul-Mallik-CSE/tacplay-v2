/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  AdminAnalyticsApiResponse,
  AdminAnalyticsQueryParams,
} from "@/types/AdminTypes/AnalyticsTypes";

export const adminAnalyticsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPlatformAnalytics: builder.query<
      AdminAnalyticsApiResponse,
      AdminAnalyticsQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.year !== undefined && params.year !== null) {
          queryParams.append("year", String(params.year));
        }
        if (params?.month !== undefined && params.month !== null) {
          queryParams.append("month", String(params.month));
        }
        if (params?.revenue_period) {
          queryParams.append("revenue_period", params.revenue_period);
        }
        if (params?.subscription_period) {
          queryParams.append("subscription_period", params.subscription_period);
        }
        if (params?.country_period) {
          queryParams.append("country_period", params.country_period);
        }
        // Always pass campaign_period to prevent backend UnboundLocalError
        queryParams.append(
          "campaign_period",
          params?.campaign_period || "month"
        );

        const queryString = queryParams.toString();
        return {
          url: `/api/admin/analytics/platform/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["AdminAnalytics"],
    }),
  }),
});

export const { useGetAdminPlatformAnalyticsQuery } = adminAnalyticsAPI;

export default adminAnalyticsAPI;
