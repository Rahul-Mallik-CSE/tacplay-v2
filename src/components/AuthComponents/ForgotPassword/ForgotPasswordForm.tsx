"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthCard, AuthLogo, AuthFormHeader, AuthFooter } from "@/components/AuthComponents/shared";

interface ForgotPasswordFormProps {
  onSubmit: (data: { emailAddress: string }) => void;
  isLoading?: boolean;
}

export default function ForgotPasswordForm({
  onSubmit,
  isLoading = false,
}: ForgotPasswordFormProps) {
  const { t } = useTranslation("dashboard");
  const [emailAddress, setEmailAddress] = useState("");

  const handleSubmit = () => {
    onSubmit({ emailAddress });
  };

  return (
    <AuthCard>
      <AuthLogo />

      <AuthFormHeader
        title={t("auth.forgotPasswordTitle")}
        description={t("auth.forgotPasswordDesc")}
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("auth.emailAddress")}
          </label>
          <input
            type="email"
            placeholder={t("auth.placeholders.enterEmail")}
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full cursor-pointer py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
        >
          {isLoading ? t("auth.sending") : t("auth.sendCode")}
        </button>
      </div>

      <AuthFooter
        message={t("auth.backTo")}
        link={{ label: "signIn", href: "/sign-in", linkText: t("auth.signIn") }}
      />
    </AuthCard>
  );
}
