/** @format */

import { createSlice } from "@reduxjs/toolkit";

/**
 * homeSlice.tsx
 * Local UI state for the dashboard home page.
 * Server data lives in the RTK Query cache (homeAPI).
 */

interface HomeState {
  /** Currently selected chart range — kept here so both charts stay in sync */
  selectedRange: "day" | "week" | "month" | "year";
  isUpgradeModalOpen: boolean;
}

const initialState: HomeState = {
  selectedRange: "week",
  isUpgradeModalOpen: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedRange(state, action) {
      state.selectedRange = action.payload;
    },
    openUpgradeModal(state) {
      state.isUpgradeModalOpen = true;
    },
    closeUpgradeModal(state) {
      state.isUpgradeModalOpen = false;
    },
  },
});

export const { setSelectedRange, openUpgradeModal, closeUpgradeModal } =
  homeSlice.actions;
export default homeSlice.reducer;
