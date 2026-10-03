/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingsFilterState {
  status?: string;
  check_in_status?: string[];
  match_type?: string;
  team?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  session_id?: string;
  date_from?: string;
  date_to?: string;
  package_id?: string;
}

interface BookingsState {
  page: number;
  limit: number;
  search: string;
  filters: BookingsFilterState;
  selectedBookingId: number | null;
  isDetailsSheetOpen: boolean;
  isFilterSheetOpen: boolean;
}

const initialState: BookingsState = {
  page: 1,
  limit: 10,
  search: "",
  filters: {},
  selectedBookingId: null,
  isDetailsSheetOpen: false,
  isFilterSheetOpen: false,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setFilters(state, action: PayloadAction<BookingsFilterState>) {
      state.filters = action.payload;
      state.page = 1;
    },
    resetFilters(state) {
      state.filters = {};
      state.page = 1;
    },
    setSelectedBookingId(state, action: PayloadAction<number | null>) {
      state.selectedBookingId = action.payload;
    },
    setIsDetailsSheetOpen(state, action: PayloadAction<boolean>) {
      state.isDetailsSheetOpen = action.payload;
    },
    setIsFilterSheetOpen(state, action: PayloadAction<boolean>) {
      state.isFilterSheetOpen = action.payload;
    },
  },
});

export const {
  setPage,
  setLimit,
  setSearch,
  setFilters,
  resetFilters,
  setSelectedBookingId,
  setIsDetailsSheetOpen,
  setIsFilterSheetOpen,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
