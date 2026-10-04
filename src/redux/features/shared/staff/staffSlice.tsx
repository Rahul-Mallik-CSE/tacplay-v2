/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StaffState {
  selectedStaffId: number | null;
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
}

const initialState: StaffState = {
  selectedStaffId: null,
  searchQuery: "",
  roleFilter: "",
  statusFilter: "",
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setSelectedStaffId: (state, action: PayloadAction<number | null>) => {
      state.selectedStaffId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.roleFilter = "";
      state.statusFilter = "";
    },
  },
});

export const {
  setSelectedStaffId,
  setSearchQuery,
  setRoleFilter,
  setStatusFilter,
  resetFilters,
} = staffSlice.actions;

export default staffSlice.reducer;
