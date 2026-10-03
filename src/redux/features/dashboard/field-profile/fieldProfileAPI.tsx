/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  GetArenaInfoResponse,
  UpdateArenaInfoResponse,
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
  }),
});

export const {
  useGetArenaInfoQuery,
  useUpdateArenaInfoMutation,
} = fieldProfileAPI;

export default fieldProfileAPI;
