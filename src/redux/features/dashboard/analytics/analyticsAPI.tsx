/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  AnalyticsApiResponse,
  AnalyticsQueryParams,
} from "@/types/DashboardTypes/AnalyticsTypes";

export const analyticsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<AnalyticsApiResponse, AnalyticsQueryParams | void>({
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
        if (params?.booking_checkin_period) {
          queryParams.append("booking_checkin_period", params.booking_checkin_period);
        }
        if (params?.revenue_source_period) {
          queryParams.append("revenue_source_period", params.revenue_source_period);
        }
        if (params?.package_limit !== undefined && params.package_limit !== null) {
          queryParams.append("package_limit", String(params.package_limit));
        }

        const queryString = queryParams.toString();
        return {
          url: `/api/arena/analytics/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsAPI;

export default analyticsAPI;
