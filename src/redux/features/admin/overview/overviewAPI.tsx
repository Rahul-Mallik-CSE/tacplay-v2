/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  AdminOverviewResponse,
  AdminOverviewQueryParams,
} from "@/types/AdminTypes/OverviewTypes";

export const overviewAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query<AdminOverviewResponse, AdminOverviewQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.year) queryParams.append("year", String(params.year));
        if (params?.revenue_period) queryParams.append("revenue_period", params.revenue_period);
        if (params?.subscription_period) queryParams.append("subscription_period", params.subscription_period);
        if (params?.country_period) queryParams.append("country_period", params.country_period);

        const queryString = queryParams.toString();
        return {
          url: `/api/admin/overview/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["AdminOverview"],
    }),
  }),
});

export const { useGetAdminOverviewQuery } = overviewAPI;
