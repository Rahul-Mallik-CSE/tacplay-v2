/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EarningState {
  searchQuery: string;
  selectedType: string;
  selectedPlan: string;
  selectedCountry: string;
  sortBy: string;
  order: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
}

const initialState: EarningState = {
  searchQuery: "",
  selectedType: "",
  selectedPlan: "",
  selectedCountry: "",
  sortBy: "date",
  order: "desc",
  currentPage: 1,
  itemsPerPage: 10,
};

const earningSlice = createSlice({
  name: "adminEarning",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      state.currentPage = 1;
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
      state.currentPage = 1;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
      state.currentPage = 1;
    },
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: string; order: "asc" | "desc" }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    resetEarningFilters: (state) => {
      state.searchQuery = "";
      state.selectedType = "";
      state.selectedPlan = "";
      state.selectedCountry = "";
      state.sortBy = "date";
      state.order = "desc";
      state.currentPage = 1;
      state.itemsPerPage = 10;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedType,
  setSelectedPlan,
  setSelectedCountry,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  resetEarningFilters,
} = earningSlice.actions;

export default earningSlice.reducer;
