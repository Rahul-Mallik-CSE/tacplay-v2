"use client";

import React from "react";
import VerifyOtpForm from "@/components/AuthComponents/VerifyOtp";

export default function VerifyOtpPage() {
  const handleVerify = (otpCode: string) => {
    console.log("Verify OTP:", otpCode);
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  return (
    <VerifyOtpForm
      emailAddress="example@email.com"
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
}
