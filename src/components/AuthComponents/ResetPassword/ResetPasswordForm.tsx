"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthCard, AuthLogo, AuthFormHeader, PasswordInput, AuthFooter } from "@/components/AuthComponents/shared";

interface ResetPasswordFormProps {
  onSubmit: (data: { newPassword: string; confirmPassword: string }) => void;
  isLoading?: boolean;
}

export default function ResetPasswordForm({
  onSubmit,
  isLoading = false,
}: ResetPasswordFormProps) {
  const { t } = useTranslation("dashboard");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ newPassword, confirmPassword });
  };

  return (
    <AuthCard>
      <AuthLogo />

      <AuthFormHeader
        title={t("auth.setNewPassword")}
        description={t("auth.resetPasswordDesc")}
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">{t("auth.password")}</label>
          <PasswordInput
            value={newPassword}
            onChange={setNewPassword}
            placeholder={t("auth.placeholders.enterNewPassword")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("auth.confirmPassword")}
          </label>
          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder={t("auth.placeholders.reenterPassword")}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full cursor-pointer py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
        >
          {isLoading ? t("auth.changing") : t("auth.changePassword")}
        </button>
      </div>

      <AuthFooter
        message={t("auth.confirmedPassGoTo")}
        link={{ label: "signIn", href: "/sign-in", linkText: t("auth.signInPageQuestion") }}
      />
    </AuthCard>
  );
}
