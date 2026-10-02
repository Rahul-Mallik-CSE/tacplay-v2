/** @format */

import baseAPI from "@/redux/api/baseAPI";

export interface FieldOwnerProfile {
  id: number;
  full_name: string;
  email_address: string;
  contact_number: string;
  password?: string;
  profile_image?: string | null;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: FieldOwnerProfile;
  requestId?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  requestId?: string;
}

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
