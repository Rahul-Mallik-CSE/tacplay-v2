/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  MarketingOverviewResponse,
  MarketingOverviewParams,
  CampaignListResponse,
  CampaignQueryParams,
  CreateSmsPayload,
  CreateCampaignResponse,
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

    getCampaignsList: builder.query<CampaignListResponse, CampaignQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search.trim());
        if (params?.campaign_type) queryParams.append("campaign_type", params.campaign_type.toLowerCase().trim());
        if (params?.status) queryParams.append("status", params.status.toLowerCase().trim());
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.limit) queryParams.append("limit", String(params.limit));

        const queryString = queryParams.toString();
        return {
          url: `/api/field-owner/marketing/campaigns/${queryString ? `?${queryString}` : ""}`,
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

    createEmailCampaign: builder.mutation<CreateCampaignResponse, FormData>({
      query: (formData) => ({
        url: "/api/field-owner/marketing/email-campaigns/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Marketing"],
    }),

    createSmsCampaign: builder.mutation<CreateCampaignResponse, CreateSmsPayload>({
      query: (payload) => ({
        url: "/api/field-owner/marketing/sms-campaigns/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Marketing"],
    }),

    getVouchersList: builder.query<
      import("@/types/CommonPageTypes/MarketingTypes").VoucherListResponse,
      import("@/types/CommonPageTypes/MarketingTypes").VoucherQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search.trim());
        if (params?.status) queryParams.append("status", params.status.toLowerCase().trim());
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.limit) queryParams.append("limit", String(params.limit));

        const queryString = queryParams.toString();
        return {
          url: `/api/field-owner/marketing/vouchers/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Marketing"],
    }),

    updateVoucher: builder.mutation<
      import("@/types/CommonPageTypes/MarketingTypes").UpdateVoucherResponse,
      { id: number; body: import("@/types/CommonPageTypes/MarketingTypes").UpdateVoucherPayload }
    >({
      query: ({ id, body }) => ({
        url: `/api/field-owner/marketing/vouchers/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Marketing"],
    }),

    deleteVoucher: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/api/field-owner/marketing/vouchers/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Marketing"],
    }),

    createVoucher: builder.mutation<
      import("@/types/CommonPageTypes/MarketingTypes").CreateVoucherResponse,
      import("@/types/CommonPageTypes/MarketingTypes").CreateVoucherPayload
    >({
      query: (payload) => ({
        url: "/api/field-owner/marketing/vouchers/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Marketing"],
    }),
  }),
});

export const {
  useGetMarketingOverviewQuery,
  useGetCampaignsListQuery,
  useDeleteCampaignMutation,
  useDuplicateCampaignMutation,
  useCreateEmailCampaignMutation,
  useCreateSmsCampaignMutation,
  useGetVouchersListQuery,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
  useCreateVoucherMutation,
} = marketingAPI;

export default marketingAPI;
