/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  GetArenaInfoResponse,
  UpdateArenaInfoResponse,
  GetFieldSetupResponse,
  UpdateFieldSetupPayload,
  UpdateFieldSetupResponse,
  GetOpeningHoursResponse,
  UpdateOpeningHoursPayload,
  UpdateOpeningHoursResponse,
  GetPackageManagementResponse,
  CreatePackagesPayload,
  CreatePackagesResponse,
  UpdatePackagesPayload,
  UpdatePackagesResponse,
} from "@/types/DashboardTypes/ArenaManagementTypes";
import type {
  EarningsListQuery,
  EarningsListResponse,
} from "@/types/DashboardTypes/EarningsTypes";
import { updateAuthUser } from "@/redux/features/auth/authSlice";
import { setCurrentArena } from "./fieldProfileSlice";

const fieldProfileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getArenaInfo: builder.query<GetArenaInfoResponse, void>({
      query: () => ({
        url: "/api/arena/arena-info/",
        method: "GET",
      }),
      providesTags: ["ArenaInfo"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setCurrentArena(data.data));

            if (data.data.user_info) {
              dispatch(
                updateAuthUser({
                  full_name: data.data.user_info.full_name,
                  email: data.data.user_info.email,
                  profile_image: data.data.user_info.profile_image,
                }),
              );
            }
          }
        } catch {
          // ignore error
        }
      },
    }),

    createArenaInfo: builder.mutation<UpdateArenaInfoResponse, FormData>({
      query: (body) => ({
        url: "/api/arena/completion-flow/step-1-arena-info/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ArenaInfo"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setCurrentArena(data.data));
          }
        } catch {
          // ignore error
        }
      },
    }),

    updateArenaInfo: builder.mutation<UpdateArenaInfoResponse, FormData>({
      query: (body) => ({
        url: "/api/arena/arena-info/edit/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ArenaInfo"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setCurrentArena(data.data));
          }
        } catch {
          // ignore error
        }
      },
    }),

    getFieldSetup: builder.query<GetFieldSetupResponse, void>({
      query: () => ({
        url: "/api/arena/field-setup/",
        method: "GET",
      }),
      providesTags: ["FieldSetup"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.user_info) {
            dispatch(
              updateAuthUser({
                full_name: data.data.user_info.full_name,
                email: data.data.user_info.email,
                profile_image: data.data.user_info.profile_image,
              }),
            );
          }
        } catch {
          // ignore error
        }
      },
    }),

    createFieldSetup: builder.mutation<
      UpdateFieldSetupResponse,
      UpdateFieldSetupPayload
    >({
      query: (body) => ({
        url: "/api/arena/completion-flow/step-2-match-requirements/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FieldSetup"],
    }),

    updateFieldSetup: builder.mutation<
      UpdateFieldSetupResponse,
      UpdateFieldSetupPayload
    >({
      query: (body) => ({
        url: "/api/arena/field-setup/edit/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["FieldSetup"],
    }),

    getOpeningHours: builder.query<GetOpeningHoursResponse, void>({
      query: () => ({
        url: "/api/arena/opening-hours/",
        method: "GET",
      }),
      providesTags: ["OpeningHours"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.user_info) {
            dispatch(
              updateAuthUser({
                full_name: data.data.user_info.full_name,
                email: data.data.user_info.email,
                profile_image: data.data.user_info.profile_image,
              }),
            );
          }
        } catch {
          // ignore error
        }
      },
    }),

    createOpeningHours: builder.mutation<
      UpdateOpeningHoursResponse,
      UpdateOpeningHoursPayload
    >({
      query: (body) => ({
        url: "/api/arena/opening-hours/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["OpeningHours"],
    }),

    updateOpeningHours: builder.mutation<
      UpdateOpeningHoursResponse,
      UpdateOpeningHoursPayload
    >({
      query: (body) => ({
        url: "/api/arena/opening-hours/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["OpeningHours"],
    }),

    getPackages: builder.query<GetPackageManagementResponse, void>({
      query: () => ({
        url: "/api/arena/package-management/",
        method: "GET",
      }),
      providesTags: ["Packages"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.user_info) {
            dispatch(
              updateAuthUser({
                full_name: data.data.user_info.full_name,
                email: data.data.user_info.email,
                profile_image: data.data.user_info.profile_image,
              }),
            );
          }
        } catch {
          // ignore error
        }
      },
    }),

    createPackages: builder.mutation<
      CreatePackagesResponse,
      CreatePackagesPayload
    >({
      query: (body) => ({
        url: "/api/arena/completion-flow/step-3-package-management/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Packages"],
    }),

    updatePackages: builder.mutation<
      UpdatePackagesResponse,
      UpdatePackagesPayload
    >({
      query: (body) => ({
        url: "/api/arena/package-management/edit/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Packages"],
    }),

    getEarnings: builder.query<EarningsListResponse, EarningsListQuery | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.set("page", String(params.page));
        if (params?.limit) queryParams.set("limit", String(params.limit));
        if (params?.search) queryParams.set("search", params.search);
        if (params?.plan) queryParams.set("plan", params.plan);
        if (params?.payment_method) queryParams.set("payment_method", params.payment_method);
        if (params?.currency) queryParams.set("currency", params.currency);
        if (params?.session_id) queryParams.set("session_id", String(params.session_id));
        if (params?.session_type) queryParams.set("session_type", params.session_type);
        if (params?.date_from) queryParams.set("date_from", params.date_from);
        if (params?.date_to) queryParams.set("date_to", params.date_to);
        if (params?.amount_min !== undefined && params?.amount_min !== "") queryParams.set("amount_min", String(params.amount_min));
        if (params?.amount_max !== undefined && params?.amount_max !== "") queryParams.set("amount_max", String(params.amount_max));
        if (params?.sort_by) queryParams.set("sort_by", params.sort_by);
        if (params?.order) queryParams.set("order", params.order);

        const qs = queryParams.toString();
        return {
          url: `/api/arena/earnings/${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Earnings"],
    }),
  }),
});

export const {
  useGetArenaInfoQuery,
  useCreateArenaInfoMutation,
  useUpdateArenaInfoMutation,
  useGetFieldSetupQuery,
  useCreateFieldSetupMutation,
  useUpdateFieldSetupMutation,
  useGetOpeningHoursQuery,
  useCreateOpeningHoursMutation,
  useUpdateOpeningHoursMutation,
  useGetPackagesQuery,
  useCreatePackagesMutation,
  useUpdatePackagesMutation,
  useGetEarningsQuery,
} = fieldProfileAPI;

export default fieldProfileAPI;

