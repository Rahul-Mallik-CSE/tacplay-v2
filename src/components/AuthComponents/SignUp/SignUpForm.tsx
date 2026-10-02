"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/AuthComponents/shared";

interface SignUpFormProps {
  onSubmit: (data: {
    ownerName: string;
    businessEmail: string;
    password: string;
    confirmPassword: string;
  }) => void;
  isLoading?: boolean;
}

export default function SignUpForm({ onSubmit, isLoading = false }: SignUpFormProps) {
  const { t } = useTranslation("dashboard");
  const [agreed, setAgreed] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const isPasswordTooShort = password.length > 0 && password.length < 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (password.length < 6) {
      setErrorMessage(t("auth.passwordMinLength"));
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(t("auth.passwordsDoNotMatch"));
      return;
    }

    setErrorMessage("");
    onSubmit({ ownerName, businessEmail, password, confirmPassword });
  };

  return (
    <AuthBanner>
      <div className="flex flex-col items-center">
        <div className="h-16 mb-4">
          <Image
            src="/Tacplay-logo-2.png"
            alt="TacPlay"
            width={400}
            height={400}
            className="object-contain h-16"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
          {t("auth.registerField")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          {t("auth.signUpDesc")}
        </p>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.ownerName")}
            </label>
            <input
              type="text"
              placeholder={t("auth.placeholders.enterOwnerName")}
              value={ownerName}
              onChange={(event) => setOwnerName(event.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.businessEmail")}
            </label>
            <input
              type="email"
              placeholder={t("auth.placeholders.enterSignUpEmail")}
              value={businessEmail}
              onChange={(event) => setBusinessEmail(event.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">{t("auth.password")}</label>
            <PasswordInput
              value={password}
              onChange={(val) => {
                setPassword(val);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder={t("auth.placeholders.createPassword")}
            />
            <p
              className={`text-xs mt-1 transition-colors ${
                (touched && password.length < 6) || isPasswordTooShort
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

          <div className="flex items-center gap-2">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-custom-yellow data-[state=checked]:border-custom-yellow"
            />
            <Link href="https://tacplay.eu/owner" target="_blank">
              <label className="text-sm text-muted-foreground hover:underline cursor-pointer select-none">
                {t("auth.agreeToTerms")}
              </label>
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border"
          >
            {isLoading ? t("auth.signingUp") : t("auth.signUp")}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">{t("auth.or")}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-sm text-center text-muted-foreground">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link
              href="/sign-in"
              className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
            >
              {t("auth.signIn")}
            </Link>
          </p>
        </form>
      </div>
    </AuthBanner>
  );
}
