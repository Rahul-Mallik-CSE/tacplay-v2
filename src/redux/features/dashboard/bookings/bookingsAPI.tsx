/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  BookingListQuery,
  BookingListResponse,
  BookingDetailsResponse,
  CancelBookingResponse,
  CheckInBookingResponse,
} from "@/types/DashboardTypes/BookingsTypes";

const bookingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<BookingListResponse, BookingListQuery | void>({
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
        if (params?.team) {
          searchParams.set("team", params.team);
        }
        if (params?.session_id !== undefined && params.session_id !== "") {
          searchParams.set("session_id", String(params.session_id));
        }
        if (params?.date_from) {
          searchParams.set("date_from", params.date_from);
        }
        if (params?.date_to) {
          searchParams.set("date_to", params.date_to);
        }
        if (params?.package_id !== undefined && params.package_id !== "") {
          searchParams.set("package_id", String(params.package_id));
        }
        if (params?.sort_by) {
          searchParams.set("sort_by", params.sort_by);
        }
        if (params?.sort_order) {
          searchParams.set("sort_order", params.sort_order);
        }

        if (params?.check_in_status) {
          if (Array.isArray(params.check_in_status)) {
            params.check_in_status.forEach((status) => {
              if (status) {
                searchParams.append("check_in_status", status);
              }
            });
          } else if (typeof params.check_in_status === "string" && params.check_in_status) {
            searchParams.set("check_in_status", params.check_in_status);
          }
        }

        const queryString = searchParams.toString();
        return {
          url: queryString ? `/api/arena/bookings/?${queryString}` : "/api/arena/bookings/",
          method: "GET",
        };
      },
      providesTags: ["Bookings"],
    }),

    getBookingDetails: builder.query<BookingDetailsResponse, number | string>({
      query: (bookingId) => ({
        url: `/api/arena/bookings/${bookingId}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Bookings", id }],
    }),

    cancelBooking: builder.mutation<
      CancelBookingResponse,
      { bookingId: number; reason: string }
    >({
      query: ({ bookingId, reason }) => ({
        url: `/api/arena/bookings/${bookingId}/cancel/`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        "Bookings",
        { type: "Bookings", id: bookingId },
      ],
    }),

    checkInBooking: builder.mutation<CheckInBookingResponse, number>({
      query: (bookingId) => ({
        url: `/api/arena/bookings/${bookingId}/check-in/`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, bookingId) => [
        "Bookings",
        { type: "Bookings", id: bookingId },
      ],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingDetailsQuery,
  useCancelBookingMutation,
  useCheckInBookingMutation,
} = bookingsAPI;

export default bookingsAPI;
