"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import SignInForm from "@/components/AuthComponents/SignIn";
import AuthBanner from "@/components/AuthComponents/AuthBanner";

function SignInPageInner() {
  const { t } = useTranslation("dashboard");
  const router = useRouter();

  const handleSubmit = (data: {
    email: string;
    password: string;
    role: "user" | "admin";
  }) => {
    console.log("Sign in:", data);
    if (data.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <SignInForm
      onSubmit={handleSubmit}
      defaultEmail="demo@tacplay.com"
      defaultPassword="demo123"
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
