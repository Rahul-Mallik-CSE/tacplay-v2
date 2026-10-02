"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SignInForm from "@/components/AuthComponents/SignIn";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import { useLoginFieldOwnerMutation } from "@/redux/features/auth/authAPI";
import { setAuthSession } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { saveAuthTokens, saveAuthUser, getErrorMessage } from "@/lib/auth";

function SignInPageInner() {
  const { t } = useTranslation("dashboard");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginFieldOwnerMutation();

  const handleSubmit = async (data: {
    email: string;
    password: string;
    role: "user" | "admin";
  }) => {
    try {
      const res = await login({
        business_email: data.email.trim(),
        password: data.password,
      }).unwrap();

      const { user, tokens } = res.data;

      // Persist tokens in cookies
      saveAuthTokens(tokens.access, tokens.refresh);

      // Persist user data in cookie
      saveAuthUser({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        profile_image: user.profile_image,
        account_type: user.account_type,
        role: user.role,
        arena_info_saved: user.arena_info_saved,
      });

      // Update Redux state
      dispatch(setAuthSession(user));

      toast.success(res.message || t("auth.loginSuccess"));

      // Route based on account_type from backend (not the role toggle)
      const accountType = user.account_type || user.role;
      if (accountType === "admin") {
        router.replace("/admin");
      } else {
        // For field_owner: if arena_info_saved is false, go to profile setup
        if (user.arena_info_saved === false) {
          router.replace("/profile-setup");
        } else {
          router.replace("/dashboard");
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <SignInForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      defaultEmail=""
      defaultPassword=""
      defaultRole="user"
    />
  );
}

export default function SignInPage() {
  const { t } = useTranslation("dashboard");
  return (
    <Suspense
      fallback={
        <AuthBanner>
          <div className="flex min-h-60 items-center justify-center text-sm text-muted-foreground">
            {t("auth.loading")}
          </div>
        </AuthBanner>
      }
    >
      <SignInPageInner />
    </Suspense>
  );
}
