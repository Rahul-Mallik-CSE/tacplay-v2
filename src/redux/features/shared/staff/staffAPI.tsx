/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  StaffListResponse,
  StaffDetailResponse,
  RoleListResponse,
  PermissionsListResponse,
  StaffQueryParams,
  ApiResponse,
  StaffItem,
  RoleItem,
  CreateRolePayload,
  UpdateRolePayload,
} from "@/types/CommonPageTypes/StaffTypes";

export const staffAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaffList: builder.query<StaffListResponse, StaffQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search.trim());
        if (params?.role_name) queryParams.append("role_name", params.role_name.trim());
        if (params?.status) queryParams.append("status", params.status.toLowerCase().trim());
        if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params?.sort_order) queryParams.append("sort_order", params.sort_order);
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.page_size) queryParams.append("page_size", String(params.page_size));

        const queryString = queryParams.toString();
        return {
          url: `/api/field-owner/staff/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Staff" as const, id })),
              { type: "Staff", id: "LIST" },
            ]
          : [{ type: "Staff", id: "LIST" }],
    }),

    getStaffDetails: builder.query<StaffDetailResponse, number>({
      query: (id) => ({
        url: `/api/field-owner/staff/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Staff", id }],
    }),

    getRoles: builder.query<RoleListResponse, void>({
      query: () => ({
        url: "/api/field-owner/roles/",
        method: "GET",
      }),
      providesTags: ["Roles"],
    }),

    getRoleDetails: builder.query<ApiResponse<RoleItem>, number>({
      query: (id) => ({
        url: `/api/field-owner/roles/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Roles", id }],
    }),

    getPermissions: builder.query<PermissionsListResponse, void>({
      query: () => ({
        url: "/api/field-owner/permissions/",
        method: "GET",
      }),
      providesTags: ["Roles"],
    }),

    createRole: builder.mutation<ApiResponse<RoleItem>, CreateRolePayload>({
      query: (body) => ({
        url: "/api/field-owner/roles/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),

    updateRole: builder.mutation<ApiResponse<RoleItem>, UpdateRolePayload>({
      query: ({ id, ...body }) => ({
        url: `/api/field-owner/roles/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),

    deleteRole: builder.mutation<ApiResponse<Record<string, unknown>>, number>({
      query: (id) => ({
        url: `/api/field-owner/roles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),

    createStaff: builder.mutation<ApiResponse<StaffItem>, FormData>({
      query: (formData) => ({
        url: "/api/field-owner/staff/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Staff", id: "LIST" }],
    }),

    updateStaff: builder.mutation<
      ApiResponse<StaffItem>,
      { id: number; body: FormData | Record<string, unknown> }
    >({
      query: ({ id, body }) => ({
        url: `/api/field-owner/staff/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Staff", id },
        { type: "Staff", id: "LIST" },
      ],
    }),

    updateStaffStatus: builder.mutation<
      ApiResponse<StaffItem>,
      { id: number; is_active: boolean }
    >({
      query: ({ id, is_active }) => ({
        url: `/api/field-owner/staff/${id}/`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Staff", id },
        { type: "Staff", id: "LIST" },
      ],
    }),

    deleteStaff: builder.mutation<ApiResponse<Record<string, unknown>>, number>({
      query: (id) => ({
        url: `/api/field-owner/staff/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Staff", id },
        { type: "Staff", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetStaffListQuery,
  useGetStaffDetailsQuery,
  useGetRolesQuery,
  useGetRoleDetailsQuery,
  useGetPermissionsQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useUpdateStaffStatusMutation,
  useDeleteStaffMutation,
} = staffAPI;

export default staffAPI;
