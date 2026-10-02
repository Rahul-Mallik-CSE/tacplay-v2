/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUser, hasAccessToken } from "@/lib/auth";
import type {
  AuthUser,
  AuthState,
  VerificationPurpose,
} from "@/types/AuthTypes";

/**
 * Resolve the user's effective account type.
 * Some endpoints return `role` instead of `account_type` — normalise it.
 */
export function resolveAccountType(
  user: AuthUser | null | undefined,
): string | undefined {
  if (!user) return undefined;
  return user.account_type || user.role || undefined;
}

// Hydrate initial state from persisted cookie so page-refreshes don't lose
// the authenticated flag or the user object.
const persistedUser = getAuthUser();

const initialState: AuthState = {
  isAuthenticated: Boolean(hasAccessToken() && persistedUser),
  user: persistedUser
    ? {
        id: persistedUser.id,
        email: persistedUser.email ?? "",
        full_name: persistedUser.full_name ?? "",
        profile_image: persistedUser.profile_image,
        account_type: (persistedUser.account_type ?? persistedUser.role) as
          | AuthUser["account_type"]
          | undefined,
        role: persistedUser.role,
        arena_info_saved: persistedUser.arena_info_saved,
      }
    : null,
  pendingEmail: "",
  verificationPurpose: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthSession: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.pendingEmail = "";
      state.verificationPurpose = null;
    },
    setPendingVerification: (
      state,
      action: PayloadAction<{
        email: string;
        purpose: Exclude<VerificationPurpose, null>;
      }>,
    ) => {
      state.pendingEmail = action.payload.email;
      state.verificationPurpose = action.payload.purpose;
    },
    clearPendingVerification: (state) => {
      state.pendingEmail = "";
      state.verificationPurpose = null;
    },
  },
});

export const {
  setAuthSession,
  clearAuthSession,
  setPendingVerification,
  clearPendingVerification,
} = authSlice.actions;

export default authSlice.reducer;
