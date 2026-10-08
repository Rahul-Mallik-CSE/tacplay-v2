/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerManagementState {
  searchQuery: string;
  selectedStatus: string;
  selectedMembership: string;
  selectedCountry: string;
  sortBy: string;
  order: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PlayerManagementState = {
  searchQuery: "",
  selectedStatus: "",
  selectedMembership: "",
  selectedCountry: "",
  sortBy: "joined",
  order: "desc",
  currentPage: 1,
  itemsPerPage: 10,
};

const playerManagementSlice = createSlice({
  name: "playerManagement",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSelectedStatus: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload;
      state.currentPage = 1;
    },
    setSelectedMembership: (state, action: PayloadAction<string>) => {
      state.selectedMembership = action.payload;
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
    resetPlayerFilters: (state) => {
      state.searchQuery = "";
      state.selectedStatus = "";
      state.selectedMembership = "";
      state.selectedCountry = "";
      state.sortBy = "joined";
      state.order = "desc";
      state.currentPage = 1;
      state.itemsPerPage = 10;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedStatus,
  setSelectedMembership,
  setSelectedCountry,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  resetPlayerFilters,
} = playerManagementSlice.actions;

export default playerManagementSlice.reducer;
