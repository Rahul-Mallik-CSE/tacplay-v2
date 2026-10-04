/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalyticsState {
  year: number;
  month: number;
  revenuePeriod: string;
  bookingCheckinPeriod: string;
  revenueSourcePeriod: string;
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

const initialState: AnalyticsState = {
  year: currentYear,
  month: currentMonth,
  revenuePeriod: "month",
  bookingCheckinPeriod: "day",
  revenueSourcePeriod: "week",
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setDateFilter: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
    },
    setRevenuePeriod: (state, action: PayloadAction<string>) => {
      state.revenuePeriod = action.payload;
    },
    setBookingCheckinPeriod: (state, action: PayloadAction<string>) => {
      state.bookingCheckinPeriod = action.payload;
    },
    setRevenueSourcePeriod: (state, action: PayloadAction<string>) => {
      state.revenueSourcePeriod = action.payload;
    },
    resetAnalyticsFilters: (state) => {
      state.year = currentYear;
      state.month = currentMonth;
      state.revenuePeriod = "month";
      state.bookingCheckinPeriod = "day";
      state.revenueSourcePeriod = "week";
    },
  },
});

export const {
  setYear,
  setMonth,
  setDateFilter,
  setRevenuePeriod,
  setBookingCheckinPeriod,
  setRevenueSourcePeriod,
  resetAnalyticsFilters,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
