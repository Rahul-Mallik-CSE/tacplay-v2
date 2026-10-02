/** @format */

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/auth/authAPI";
import { clearAuthSession } from "@/redux/features/auth/authSlice";
import { clearAuthTokens } from "@/lib/auth";
import { resolveAccountType } from "@/redux/features/auth/authSlice";
import type { AuthUser } from "@/types/AuthTypes";

/**
 * Central auth hook — exposes user, account type, and a `logout` function
 * that calls the API, clears cookies + Redux, and navigates to /sign-in.
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const [logoutMutation] = useLogoutMutation();

  const accountType = resolveAccountType(user);

  const isAdmin = accountType === "admin";
  const isFieldOwner = accountType === "field_owner";

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Even if the API call fails (e.g. token already expired), we still
      // want to clear the local session so the user is redirected.
    } finally {
      clearAuthTokens();
      dispatch(clearAuthSession());
      router.replace("/sign-in");
    }
  }, [logoutMutation, dispatch, router]);

  return {
    isAuthenticated,
    user,
    accountType,
    isAdmin,
    isFieldOwner,
    logout,
  } as const;
}
