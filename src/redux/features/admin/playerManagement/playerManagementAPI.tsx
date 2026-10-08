/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  AdminPlayerListResponse,
  AdminPlayerQueryParams,
  AdminPlayerDetailResponse,
  UpdatePlayerStatusPayload,
  UpdatePlayerStatusResponse,
} from "@/types/AdminTypes/PlayerManagementTypes";

export const playerManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPlayers: builder.query<AdminPlayerListResponse, AdminPlayerQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.search) queryParams.append("search", params.search);
        if (params?.status) queryParams.append("status", params.status);
        if (params?.membership) queryParams.append("membership", params.membership);
        if (params?.country) queryParams.append("country", params.country);
        if (params?.sort_by) queryParams.append("sort_by", params.sort_by);
        if (params?.order) queryParams.append("order", params.order);
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.limit) queryParams.append("limit", String(params.limit));

        const queryString = queryParams.toString();
        return {
          url: `/api/admin/players/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ user_id }) => ({ type: "AdminPlayers" as const, id: user_id })),
              { type: "AdminPlayers", id: "LIST" },
            ]
          : [{ type: "AdminPlayers", id: "LIST" }],
    }),

    getAdminPlayerDetail: builder.query<AdminPlayerDetailResponse, number | string>({
      query: (id) => ({
        url: `/api/admin/players/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "AdminPlayers", id }],
    }),

    updatePlayerStatus: builder.mutation<
      UpdatePlayerStatusResponse,
      { id: number | string; data: UpdatePlayerStatusPayload }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/players/${id}/status/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminPlayers", id: "LIST" },
        { type: "AdminPlayers", id },
      ],
    }),
  }),
});

export const {
  useGetAdminPlayersQuery,
  useGetAdminPlayerDetailQuery,
  useLazyGetAdminPlayerDetailQuery,
  useUpdatePlayerStatusMutation,
} = playerManagementAPI;
