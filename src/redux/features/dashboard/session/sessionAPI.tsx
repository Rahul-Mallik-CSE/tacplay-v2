/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  SessionsListQuery,
  SessionsListResponse,
  SessionDetailsResponse,
  SessionInfoResponse,
  SessionStaffListResponse,
  AssignStaffResponse,
  SessionStartMatchResponse,
  SessionCancelMatchResponse,
  SessionPlayerInfoResponse,
  SessionCheckInResponse,
  SessionSubmitResultPayload,
  SessionSubmitResultResponse,
  CreateSessionResponse,
  SessionResultSummaryResponse,
} from "@/types/DashboardTypes/SessionTypes";

const sessionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<SessionsListResponse, SessionsListQuery | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page !== undefined) {
          searchParams.set("page", String(params.page));
        }
        if (params?.limit !== undefined) {
          searchParams.set("limit", String(params.limit));
        }
        if (params?.search && params.search.trim()) {
          searchParams.set("search", params.search.trim());
        }
        if (params?.status) {
          searchParams.set("status", params.status);
        }
        if (params?.match_type) {
          searchParams.set("match_type", params.match_type);
        }
        if (params?.session_visibility) {
          searchParams.set("session_visibility", params.session_visibility);
        }
        if (params?.session_type) {
          searchParams.set("session_type", params.session_type);
        }
        if (params?.match_date) {
          searchParams.set("match_date", params.match_date);
        }
        if (params?.staff_id !== undefined && params.staff_id !== "") {
          searchParams.set("staff_id", String(params.staff_id));
        }
        if (params?.date_from) {
          searchParams.set("date_from", params.date_from);
        }
        if (params?.date_to) {
          searchParams.set("date_to", params.date_to);
        }
        if (params?.sort_by) {
          searchParams.set("sort_by", params.sort_by);
        }
        if (params?.sort_order) {
          searchParams.set("sort_order", params.sort_order);
        }

        const queryString = searchParams.toString();
        return {
          url: queryString
            ? `/api/session/owner/sessions/?${queryString}`
            : "/api/session/owner/sessions/",
          method: "GET",
        };
      },
      providesTags: ["Sessions"],
    }),

    getSessionDetails: builder.query<SessionDetailsResponse, number | string>({
      query: (id) => ({
        url: `/api/session/owner/sessions/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Sessions", id: `details-${id}` }],
    }),

    getSessionInfo: builder.query<SessionInfoResponse, number | string>({
      query: (id) => ({
        url: `/api/session/owner/sessions/${id}/info/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Sessions", id: `info-${id}` }],
    }),

    getSessionStaff: builder.query<SessionStaffListResponse, void>({
      query: () => ({
        url: "/api/session/owner/sessions/staff/",
        method: "GET",
      }),
      providesTags: ["Staff"],
    }),

    assignStaff: builder.mutation<
      AssignStaffResponse,
      { sessionId: number | string; staff_ids: number[] }
    >({
      query: ({ sessionId, staff_ids }) => ({
        url: `/api/session/owner/sessions/${sessionId}/assign-staff/`,
        method: "POST",
        body: { staff_ids },
      }),
      invalidatesTags: (_result, _error, { sessionId }) => [
        "Sessions",
        { type: "Sessions", id: `details-${sessionId}` },
      ],
    }),

    startMatch: builder.mutation<SessionStartMatchResponse, number | string>({
      query: (sessionId) => ({
        url: `/api/session/owner/sessions/${sessionId}/start/`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [
        "Sessions",
        { type: "Sessions", id: `details-${id}` },
        { type: "Sessions", id: `info-${id}` },
      ],
    }),

    cancelMatch: builder.mutation<SessionCancelMatchResponse, number | string>({
      query: (sessionId) => ({
        url: `/api/session/owner/sessions/${sessionId}/cancel/`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        "Sessions",
        { type: "Sessions", id: `details-${id}` },
        { type: "Sessions", id: `info-${id}` },
      ],
    }),

    getSessionPlayerInfo: builder.query<
      SessionPlayerInfoResponse,
      { sessionId: number | string; bookingId: number | string }
    >({
      query: ({ sessionId, bookingId }) => ({
        url: `/api/session/owner/sessions/${sessionId}/players/${bookingId}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, { sessionId, bookingId }) => [
        { type: "Sessions", id: `player-${sessionId}-${bookingId}` },
      ],
    }),

    checkInPlayer: builder.mutation<
      SessionCheckInResponse,
      { sessionId: number | string; booking_ids: number[] }
    >({
      query: ({ sessionId, booking_ids }) => ({
        url: `/api/session/owner/sessions/${sessionId}/check-in/`,
        method: "POST",
        body: { booking_ids },
      }),
      invalidatesTags: (_result, _error, { sessionId, booking_ids }) => [
        "Sessions",
        { type: "Sessions", id: `details-${sessionId}` },
        ...booking_ids.map((bId) => ({
          type: "Sessions" as const,
          id: `player-${sessionId}-${bId}`,
        })),
      ],
    }),

    submitResult: builder.mutation<
      SessionSubmitResultResponse,
      { sessionId: number | string; payload: SessionSubmitResultPayload }
    >({
      query: ({ sessionId, payload }) => ({
        url: `/api/session/owner/sessions/${sessionId}/submit-result/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { sessionId }) => [
        "Sessions",
        { type: "Sessions", id: `details-${sessionId}` },
        { type: "Sessions", id: `info-${sessionId}` },
        { type: "Sessions", id: `result-${sessionId}` },
      ],
    }),

    createSession: builder.mutation<CreateSessionResponse, FormData>({
      query: (formData) => ({
        url: "/api/session/owner/sessions/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Sessions"],
    }),

    getResultSummary: builder.query<SessionResultSummaryResponse, number | string>({
      query: (sessionId) => ({
        url: `/api/session/owner/sessions/${sessionId}/result-summary/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Sessions", id: `result-${id}` }],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useGetSessionDetailsQuery,
  useGetSessionInfoQuery,
  useGetSessionStaffQuery,
  useAssignStaffMutation,
  useStartMatchMutation,
  useCancelMatchMutation,
  useGetSessionPlayerInfoQuery,
  useCheckInPlayerMutation,
  useSubmitResultMutation,
  useCreateSessionMutation,
  useGetResultSummaryQuery,
} = sessionAPI;

export default sessionAPI;
