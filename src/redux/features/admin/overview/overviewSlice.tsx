/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverviewState {
  selectedYear: number | null;
  revenuePeriod: string;
  subscriptionPeriod: string;
  countryPeriod: string;
}

const initialState: OverviewState = {
  selectedYear: 2026,
  revenuePeriod: "month",
  subscriptionPeriod: "day",
  countryPeriod: "month",
};

const overviewSlice = createSlice({
  name: "adminOverview",
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number | null>) => {
      state.selectedYear = action.payload;
    },
    setRevenuePeriod: (state, action: PayloadAction<string>) => {
      state.revenuePeriod = action.payload;
    },
    setSubscriptionPeriod: (state, action: PayloadAction<string>) => {
      state.subscriptionPeriod = action.payload;
    },
    setCountryPeriod: (state, action: PayloadAction<string>) => {
      state.countryPeriod = action.payload;
    },
    resetOverviewFilters: (state) => {
      state.selectedYear = 2026;
      state.revenuePeriod = "month";
      state.subscriptionPeriod = "day";
      state.countryPeriod = "month";
    },
  },
});

export const {
  setSelectedYear,
  setRevenuePeriod,
  setSubscriptionPeriod,
  setCountryPeriod,
  resetOverviewFilters,
} = overviewSlice.actions;

export default overviewSlice.reducer;
