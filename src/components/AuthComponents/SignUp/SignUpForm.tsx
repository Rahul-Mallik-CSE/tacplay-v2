"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ ownerName, businessEmail, password, confirmPassword });
  };

  return (
    <AuthBanner>
      <div className="flex flex-col items-center">
        <div className="h-12 mb-4">
          <Image
            src="/Tacplay-logo-2.png"
            alt="TacPlay"
            width={200}
            height={200}
            className="object-contain h-12"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
          {t("auth.registerField")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          {t("auth.signUpDesc")}
        </p>

        <div className="w-full space-y-5">
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
              onChange={setPassword}
              placeholder={t("auth.placeholders.createPassword")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.confirmPassword")}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("auth.placeholders.reenterPassword")}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full px-4 py-2.5 pr-11 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
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
            onClick={handleSubmit}
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
        </div>
      </div>
    </AuthBanner>
  );
}
