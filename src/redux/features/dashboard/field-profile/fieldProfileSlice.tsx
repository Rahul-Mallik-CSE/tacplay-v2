/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ArenaInfo } from "@/types/DashboardTypes/ArenaManagementTypes";

interface FieldProfileState {
  currentArena: ArenaInfo | null;
}

const initialState: FieldProfileState = {
  currentArena: null,
};

const fieldProfileSlice = createSlice({
  name: "fieldProfile",
  initialState,
  reducers: {
    setCurrentArena: (state, action: PayloadAction<ArenaInfo | null>) => {
      state.currentArena = action.payload;
    },
  },
});

export const { setCurrentArena } = fieldProfileSlice.actions;
export default fieldProfileSlice.reducer;
