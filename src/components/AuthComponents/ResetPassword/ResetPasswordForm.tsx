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
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const isPasswordTooShort = newPassword.length > 0 && newPassword.length < 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (newPassword.length < 6) {
      setErrorMessage(t("auth.passwordMinLength"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage(t("auth.passwordsDoNotMatch"));
      return;
    }

    setErrorMessage("");
    onSubmit({ newPassword, confirmPassword });
  };

  return (
    <AuthCard>
      <AuthLogo />

      <AuthFormHeader
        title={t("auth.setNewPassword")}
        description={t("auth.resetPasswordDesc")}
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">{t("auth.password")}</label>
          <PasswordInput
            value={newPassword}
            onChange={(val) => {
              setNewPassword(val);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder={t("auth.placeholders.enterNewPassword")}
          />
          <p
            className={`text-xs mt-1 transition-colors ${
              (touched && newPassword.length < 6) || isPasswordTooShort
                ? "text-red-500 font-medium"
                : "text-muted-foreground"
            }`}
          >
            {t("auth.passwordMinLength")}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("auth.confirmPassword")}
          </label>
          <PasswordInput
            value={confirmPassword}
            onChange={(val) => {
              setConfirmPassword(val);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder={t("auth.placeholders.reenterPassword")}
          />
          {errorMessage && errorMessage !== t("auth.passwordMinLength") && (
            <p className="text-xs text-red-500 font-medium mt-1">{errorMessage}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
        >
          {isLoading ? t("auth.changing") : t("auth.changePassword")}
        </button>
      </form>

      <AuthFooter
        message={t("auth.confirmedPassGoTo")}
        link={{ label: "signIn", href: "/sign-in", linkText: t("auth.signInPageQuestion") }}
      />
    </AuthCard>
  );
}
