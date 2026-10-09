/** @format */

import baseAPI from "@/redux/api/baseAPI"
import type {
  FieldOwnerListResponse,
  FieldOwnerQueryParams,
  FieldOwnerDetailResponse,
  UpdateFieldOwnerStatusPayload,
  UpdateFieldOwnerStatusResponse,
  AdminSessionListResponse,
  AdminSessionQueryParams,
  AdminSessionDetailResponse,
  AdminSessionSubmitScorePayload,
  AdminSessionSubmitScoreResponse,
} from "@/types/AdminTypes/FieldManagementTypes"

export const fieldManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminFieldOwners: builder.query<
      FieldOwnerListResponse,
      FieldOwnerQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams()

        if (params?.search) queryParams.append("search", params.search)
        if (params?.status) queryParams.append("status", params.status)
        if (params?.subscription) queryParams.append("subscription", params.subscription)
        if (params?.country) queryParams.append("country", params.country)
        if (params?.sort) queryParams.append("sort", params.sort)
        if (params?.page) queryParams.append("page", String(params.page))
        if (params?.limit) queryParams.append("limit", String(params.limit))

        const queryString = queryParams.toString()
        return {
          url: `/api/admin/field-owners/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        }
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ user_id }) => ({
                type: "AdminFieldOwners" as const,
                id: user_id,
              })),
              { type: "AdminFieldOwners", id: "LIST" },
            ]
          : [{ type: "AdminFieldOwners", id: "LIST" }],
    }),

    getAdminFieldOwnerDetail: builder.query<
      FieldOwnerDetailResponse,
      number | string
    >({
      query: (id) => ({
        url: `/api/admin/field-owners/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "AdminFieldOwners", id },
      ],
    }),

    updateFieldOwnerStatus: builder.mutation<
      UpdateFieldOwnerStatusResponse,
      { id: number | string; data: UpdateFieldOwnerStatusPayload }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/field-owners/${id}/status/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminFieldOwners", id: "LIST" },
        { type: "AdminFieldOwners", id },
      ],
    }),

    getAdminSessions: builder.query<
      AdminSessionListResponse,
      AdminSessionQueryParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams()

        if (params?.search) queryParams.append("search", params.search)
        if (params?.status) queryParams.append("status", params.status)
        if (params?.match_type) queryParams.append("match_type", params.match_type)
        if (params?.date) queryParams.append("date", params.date)
        if (params?.page) queryParams.append("page", String(params.page))
        if (params?.limit) queryParams.append("limit", String(params.limit))

        const queryString = queryParams.toString()
        return {
          url: `/api/admin/session-management/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        }
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((item) => ({
                type: "AdminSessions" as const,
                id: item.id || item.session_id,
              })),
              { type: "AdminSessions", id: "LIST" },
            ]
          : [{ type: "AdminSessions", id: "LIST" }],
    }),

    getAdminSessionDetail: builder.query<
      AdminSessionDetailResponse,
      number | string
    >({
      query: (id) => ({
        url: `/api/admin/session-management/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "AdminSessions", id },
      ],
    }),

    submitAdminSessionScore: builder.mutation<
      AdminSessionSubmitScoreResponse,
      {
        sessionId: number | string
        payload: AdminSessionSubmitScorePayload
      }
    >({
      query: ({ sessionId, payload }) => ({
        url: `/api/admin/session-management/${sessionId}/score/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { sessionId }) => [
        { type: "AdminSessions", id: sessionId },
        { type: "AdminSessions", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetAdminFieldOwnersQuery,
  useGetAdminFieldOwnerDetailQuery,
  useLazyGetAdminFieldOwnerDetailQuery,
  useUpdateFieldOwnerStatusMutation,
  useGetAdminSessionsQuery,
  useGetAdminSessionDetailQuery,
  useLazyGetAdminSessionDetailQuery,
  useSubmitAdminSessionScoreMutation,
} = fieldManagementAPI
