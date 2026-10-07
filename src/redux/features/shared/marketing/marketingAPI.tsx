/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  MarketingOverviewResponse,
  MarketingOverviewParams,
} from "@/types/CommonPageTypes/MarketingTypes";

export const marketingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMarketingOverview: builder.query<MarketingOverviewResponse, MarketingOverviewParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.year) {
          queryParams.append("year", String(params.year));
        }

        const queryString = queryParams.toString();
        return {
          url: `/api/field-owner/marketing/overview/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Marketing"],
    }),

    deleteCampaign: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/api/field-owner/marketing/campaigns/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Marketing"],
    }),

    duplicateCampaign: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/api/field-owner/marketing/campaigns/${id}/duplicate/`,
        method: "POST",
      }),
      invalidatesTags: ["Marketing"],
    }),
  }),
});

export const {
  useGetMarketingOverviewQuery,
  useDeleteCampaignMutation,
  useDuplicateCampaignMutation,
} = marketingAPI;

export default marketingAPI;
