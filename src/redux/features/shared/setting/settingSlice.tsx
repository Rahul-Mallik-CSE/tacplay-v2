/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FieldOwnerProfile } from "@/types/CommonPageTypes/SettingsTypes";

interface SettingState {
  profile: FieldOwnerProfile | null;
}

const initialState: SettingState = {
  profile: null,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<FieldOwnerProfile>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, clearProfile } = settingSlice.actions;
export default settingSlice.reducer;
