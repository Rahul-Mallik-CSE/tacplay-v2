/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  AdminEarningResponse,
  AdminEarningQueryParams,
} from "@/types/AdminTypes/EarningTypes";

export const earningAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminEarnings: builder.query<AdminEarningResponse, AdminEarningQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search.trim());
        if (params?.type) queryParams.append("type", params.type.trim());
        if (params?.plan) queryParams.append("plan", params.plan.trim());
        if (params?.country) queryParams.append("country", params.country.trim());
        if (params?.sort_by) queryParams.append("sort_by", params.sort_by.trim());
        if (params?.order) queryParams.append("order", params.order.trim());
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.limit) queryParams.append("limit", String(params.limit));
        if (params?.payment_method) queryParams.append("payment_method", params.payment_method.trim());
        if (params?.currency) queryParams.append("currency", params.currency.trim());
        if (params?.date_from) queryParams.append("date_from", params.date_from.trim());
        if (params?.date_to) queryParams.append("date_to", params.date_to.trim());
        if (params?.amount_min) queryParams.append("amount_min", String(params.amount_min).trim());
        if (params?.amount_max) queryParams.append("amount_max", String(params.amount_max).trim());

        const queryString = queryParams.toString();
        return {
          url: `/api/admin/earnings/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["AdminEarnings"],
    }),
  }),
});

export const { useGetAdminEarningsQuery } = earningAPI;
