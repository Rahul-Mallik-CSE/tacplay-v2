/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionFilterState {
  status?: string;
  match_type?: string;
  session_visibility?: string;
  session_type?: string;
  match_date?: string;
  staff_id?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

interface SessionState {
  page: number;
  limit: number;
  search: string;
  filters: SessionFilterState;
  selectedSessionId: number | null;
  isInfoSheetOpen: boolean;
  isFilterSheetOpen: boolean;
  isAssignStaffSheetOpen: boolean;
  isResultSummaryOpen: boolean;
}

const initialState: SessionState = {
  page: 1,
  limit: 10,
  search: "",
  filters: {},
  selectedSessionId: null,
  isInfoSheetOpen: false,
  isFilterSheetOpen: false,
  isAssignStaffSheetOpen: false,
  isResultSummaryOpen: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSessionLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    setSessionSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setSessionFilters(state, action: PayloadAction<SessionFilterState>) {
      state.filters = action.payload;
      state.page = 1;
    },
    resetSessionFilters(state) {
      state.filters = {};
      state.page = 1;
    },
    setSelectedSessionId(state, action: PayloadAction<number | null>) {
      state.selectedSessionId = action.payload;
    },
    setIsInfoSheetOpen(state, action: PayloadAction<boolean>) {
      state.isInfoSheetOpen = action.payload;
    },
    setIsFilterSheetOpen(state, action: PayloadAction<boolean>) {
      state.isFilterSheetOpen = action.payload;
    },
    setIsAssignStaffSheetOpen(state, action: PayloadAction<boolean>) {
      state.isAssignStaffSheetOpen = action.payload;
    },
    setIsResultSummaryOpen(state, action: PayloadAction<boolean>) {
      state.isResultSummaryOpen = action.payload;
    },
  },
});

export const {
  setSessionPage,
  setSessionLimit,
  setSessionSearch,
  setSessionFilters,
  resetSessionFilters,
  setSelectedSessionId,
  setIsInfoSheetOpen,
  setIsFilterSheetOpen,
  setIsAssignStaffSheetOpen,
  setIsResultSummaryOpen,
} = sessionSlice.actions;

export default sessionSlice.reducer;
