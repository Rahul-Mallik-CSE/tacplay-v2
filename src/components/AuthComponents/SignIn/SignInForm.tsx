"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import { PasswordInput } from "@/components/AuthComponents/shared";

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string; role: "user" | "admin" }) => void;
  isLoading?: boolean;
  defaultEmail?: string;
  defaultPassword?: string;
  defaultRole?: "user" | "admin";
}

export default function SignInForm({
  onSubmit,
  isLoading = false,
  defaultEmail = "",
  defaultPassword = "",
  defaultRole = "user",
}: SignInFormProps) {
  const { t } = useTranslation("dashboard");
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [role, setRole] = useState<"user" | "admin">(defaultRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email: email.trim(), password, role });
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
          {t("auth.welcomeBack")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          {t("auth.signInDesc")}
        </p>

        <form className="w-full space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.businessEmail")}
            </label>
            <input
              type="email"
              name="business_email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.placeholders.enterEmail")}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-primary">
                {t("auth.password")}
              </label>
              <Link
                href="/forgot-pass"
                className="text-xs text-primary hover:text-custom-yellow transition-colors font-medium"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder={t("auth.placeholders.enterPassword")}
              name="password"
              autoComplete="current-password"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.loginAs")}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors cursor-pointer ${
                  role === "user"
                    ? "bg-custom-red text-white border-border"
                    : "bg-transparent text-primary border-white/10 hover:border-white/20"
                }`}
              >
                {t("auth.user")}
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors cursor-pointer ${
                  role === "admin"
                    ? "bg-custom-red text-white border-border"
                    : "bg-transparent text-primary border-white/10 hover:border-white/20"
                }`}
              >
                {t("auth.admin")}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border disabled:opacity-60 disabled:pointer-events-none"
          >
            {isLoading ? t("auth.signingIn") : t("auth.signIn")}
          </button>

          <p className="text-sm text-center text-muted-foreground">
            {t("auth.dontHaveAccount")}{" "}
            <Link
              href="/sign-up"
              className="text-primary cursor-pointer font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
            >
              {t("auth.signUp")}
            </Link>
          </p>
        </form>
      </div>
    </AuthBanner>
  );
}
