/** @format */

import baseAPI from "@/redux/api/baseAPI"
import type {
  PlayerScoreSettingResponse,
  CreatePlayerScoreSettingPayload,
  UpdatePlayerScoreSettingPayload,
} from "@/types/AdminTypes/ScoreManagementTypes"

export const scoreManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerScoreSetting: builder.query<PlayerScoreSettingResponse, void>({
      query: () => ({
        url: "/api/admin/player-score-setting/",
        method: "GET",
      }),
      providesTags: ["PlayerScoreSetting"],
    }),

    createPlayerScoreSetting: builder.mutation<
      PlayerScoreSettingResponse,
      CreatePlayerScoreSettingPayload
    >({
      query: (payload) => ({
        url: "/api/admin/player-score-setting/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PlayerScoreSetting"],
    }),

    updatePlayerScoreSetting: builder.mutation<
      PlayerScoreSettingResponse,
      UpdatePlayerScoreSettingPayload
    >({
      query: (payload) => ({
        url: "/api/admin/player-score-setting/",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["PlayerScoreSetting"],
    }),
  }),
})

export const {
  useGetPlayerScoreSettingQuery,
  useCreatePlayerScoreSettingMutation,
  useUpdatePlayerScoreSettingMutation,
} = scoreManagementAPI

export default scoreManagementAPI
