/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminAnalyticsState {
  year: number;
  month: number;
  revenuePeriod: string;
  subscriptionPeriod: string;
  countryPeriod: string;
  campaignPeriod: string;
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

const initialState: AdminAnalyticsState = {
  year: currentYear,
  month: currentMonth,
  revenuePeriod: "month",
  subscriptionPeriod: "day",
  countryPeriod: "month",
  campaignPeriod: "month",
};

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {
    setAdminYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setAdminMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setAdminDateFilter: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
    },
    setAdminRevenuePeriod: (state, action: PayloadAction<string>) => {
      state.revenuePeriod = action.payload;
    },
    setAdminSubscriptionPeriod: (state, action: PayloadAction<string>) => {
      state.subscriptionPeriod = action.payload;
    },
    setAdminCountryPeriod: (state, action: PayloadAction<string>) => {
      state.countryPeriod = action.payload;
    },
    setAdminCampaignPeriod: (state, action: PayloadAction<string>) => {
      state.campaignPeriod = action.payload;
    },
    resetAdminAnalyticsFilters: (state) => {
      state.year = currentYear;
      state.month = currentMonth;
      state.revenuePeriod = "month";
      state.subscriptionPeriod = "day";
      state.countryPeriod = "month";
      state.campaignPeriod = "month";
    },
  },
});

export const {
  setAdminYear,
  setAdminMonth,
  setAdminDateFilter,
  setAdminRevenuePeriod,
  setAdminSubscriptionPeriod,
  setAdminCountryPeriod,
  setAdminCampaignPeriod,
  resetAdminAnalyticsFilters,
} = adminAnalyticsSlice.actions;

export default adminAnalyticsSlice.reducer;
