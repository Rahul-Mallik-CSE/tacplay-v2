"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ResetPasswordForm from "@/components/AuthComponents/ResetPassword";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";
import {
  clearPendingVerification,
  setAuthSession,
} from "@/redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  getErrorMessage,
  saveAuthTokens,
  saveAuthUser,
} from "@/lib/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pendingEmail, verificationPurpose } = useAppSelector((s) => s.auth);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Guard: must come from the forgot-password flow
  useEffect(() => {
    if (!pendingEmail || verificationPurpose !== "forgot-password") {
      router.replace("/sign-in");
    }
  }, [pendingEmail, verificationPurpose, router]);

  const handleSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await resetPassword({
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      }).unwrap();

      toast.success(res.message || "Password reset successfully");

      // Normalise the two possible response shapes:
      // Shape 1 (field_owner): { accessToken, refreshToken, user }
      // Shape 2 (admin): { data: { user, tokens: { access, refresh } } }
      const accessToken =
        res.accessToken || res.data?.tokens?.access;
      const refreshToken =
        res.refreshToken || res.data?.tokens?.refresh;
      const user = res.user || res.data?.user;

      if (accessToken && refreshToken) {
        saveAuthTokens(accessToken, refreshToken);
      }

      if (user) {
        saveAuthUser({
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          profile_image: user.profile_image,
          account_type: user.account_type || user.role,
          role: user.role,
          arena_info_saved: user.arena_info_saved,
        });
        dispatch(setAuthSession(user));

        dispatch(clearPendingVerification());

        // Navigate based on role
        const accountType = user.account_type || user.role;
        if (accountType === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        // Fallback — just go to sign-in
        dispatch(clearPendingVerification());
        router.replace("/sign-in");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!pendingEmail || verificationPurpose !== "forgot-password") {
    return null;
  }

  return <ResetPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
