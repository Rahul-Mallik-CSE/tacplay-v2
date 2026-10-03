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
} from "@/types/DashboardTypes/ArenaManagementTypes";
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
} = fieldProfileAPI;

export default fieldProfileAPI;

