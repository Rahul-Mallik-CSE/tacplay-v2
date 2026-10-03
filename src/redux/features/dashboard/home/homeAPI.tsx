/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  DashboardOverviewResponse,
} from "@/types/DashboardTypes/HomeTypes";

const homeAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getArenaOverview: builder.query<DashboardOverviewResponse, void>({
      query: () => ({
        url: "/api/arena/overview/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetArenaOverviewQuery } = homeAPI;

export default homeAPI;
