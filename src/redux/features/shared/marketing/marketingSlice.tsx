/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MarketingState {
  selectedYear: number | null;
  selectedCampaignType: string;
  selectedStatus: string;
  searchQuery: string;
}

const initialState: MarketingState = {
  selectedYear: null,
  selectedCampaignType: "",
  selectedStatus: "",
  searchQuery: "",
};

const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number | null>) => {
      state.selectedYear = action.payload;
    },
    setSelectedCampaignType: (state, action: PayloadAction<string>) => {
      state.selectedCampaignType = action.payload;
    },
    setSelectedStatus: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetMarketingFilters: (state) => {
      state.selectedCampaignType = "";
      state.selectedStatus = "";
      state.searchQuery = "";
    },
  },
});

export const {
  setSelectedYear,
  setSelectedCampaignType,
  setSelectedStatus,
  setSearchQuery,
  resetMarketingFilters,
} = marketingSlice.actions;

export default marketingSlice.reducer;
