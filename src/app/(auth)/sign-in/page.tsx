"use client";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import SignInForm from "@/components/AuthComponents/SignIn";
import AuthBanner from "@/components/AuthComponents/AuthBanner";

function SignInPageInner() {
  const handleSubmit = (data: { email: string; password: string }) => {
    console.log("Sign in:", data);
  };

  return <SignInForm onSubmit={handleSubmit} />;
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
