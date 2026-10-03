/** @format */

import baseAPI from "@/redux/api/baseAPI";
import { ChangePasswordRequest, ChangePasswordResponse, GetProfileResponse } from "@/types/CommonPageTypes/SettingsTypes";



const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: "/api/auth/field-owner/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<GetProfileResponse, FormData>({
      query: (body) => ({
        url: "/api/auth/field-owner/profile/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
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
