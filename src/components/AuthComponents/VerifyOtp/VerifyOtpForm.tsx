"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { AuthCard } from "@/components/AuthComponents/shared";
import OtpInput from "./OtpInput";

interface VerifyOtpFormProps {
  emailAddress: string;
  onVerify: (otpCode: string) => void;
  onResend: () => void;
  isVerifying?: boolean;
  isResending?: boolean;
}

export default function VerifyOtpForm({
  emailAddress,
  onVerify,
  onResend,
  isVerifying = false,
  isResending = false,
}: VerifyOtpFormProps) {
  const { t } = useTranslation("dashboard");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const otpCode = otp.join("");

  const handleVerify = () => {
    onVerify(otpCode);
  };

  return (
    <AuthCard>
      <div className="flex justify-center">
        <Image
          src="/Tacplay-logo-2.png"
          alt="TacPlay"
          width={80}
          height={50}
          className="object-contain"
        />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          {t("auth.verifyCode")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("auth.verificationSent")}{" "}
          <span className="text-custom-yellow font-medium">
            {emailAddress || "example@email.com"}
          </span>
        </p>
      </div>

      <OtpInput value={otp} onChange={setOtp} />

      <button
        onClick={handleVerify}
        disabled={isVerifying}
        className="w-full py-3 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border mt-2"
      >
        {isVerifying ? t("auth.verifying") : t("auth.sendCode")}
      </button>

      <p className="text-sm text-center text-muted-foreground">
        {t("auth.didNotReceiveCode")}{" "}
        <button
          onClick={onResend}
          disabled={isResending}
          className="text-custom-yellow font-semibold hover:underline transition-colors cursor-pointer"
        >
          {t("auth.resend")}
        </button>
      </p>
    </AuthCard>
  );
}
