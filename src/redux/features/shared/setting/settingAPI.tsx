/** @format */

import baseAPI from "@/redux/api/baseAPI";
import { ChangePasswordRequest, ChangePasswordResponse, GetProfileResponse } from "@/types/CommonPageTypes/SettingsTypes";
import { updateAuthUser } from "@/redux/features/auth/authSlice";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: "/api/auth/field-owner/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(
              updateAuthUser({
                full_name: data.data.full_name,
                email: data.data.email_address,
                profile_image: data.data.profile_image,
              }),
            );
          }
        } catch {
          // ignore error
        }
      },
    }),

    updateProfile: builder.mutation<GetProfileResponse, FormData>({
      query: (body) => ({
        url: "/api/auth/field-owner/profile/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(
              updateAuthUser({
                full_name: data.data.full_name,
                email: data.data.email_address,
                profile_image: data.data.profile_image,
              }),
            );
          }
        } catch {
          // ignore error
        }
      },
    }),

    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/api/auth/field-owner-change-password/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = settingAPI;

export default settingAPI;
