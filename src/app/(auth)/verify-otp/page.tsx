"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import VerifyOtpForm from "@/components/AuthComponents/VerifyOtp";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  useVerifySignupOtpMutation,
  useResendSignupOtpMutation,
  useVerifyForgotPasswordOtpMutation,
  useResendForgotPasswordOtpMutation,
} from "@/redux/features/auth/authAPI";
import {
  clearPendingVerification,
  setPendingVerification,
} from "@/redux/features/auth/authSlice";
import {
  getErrorMessage,
  saveAuthTokens,
} from "@/lib/auth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pendingEmail, verificationPurpose } = useAppSelector((s) => s.auth);

  // Signup OTP mutations
  const [verifySignup, { isLoading: isVerifyingSignup }] =
    useVerifySignupOtpMutation();
  const [resendSignup, { isLoading: isResendingSignup }] =
    useResendSignupOtpMutation();

  // Forgot-password OTP mutations
  const [verifyForgot, { isLoading: isVerifyingForgot }] =
    useVerifyForgotPasswordOtpMutation();
  const [resendForgot, { isLoading: isResendingForgot }] =
    useResendForgotPasswordOtpMutation();

  // If there's no pending email, redirect back
  useEffect(() => {
    if (!pendingEmail || !verificationPurpose) {
      router.replace("/sign-in");
    }
  }, [pendingEmail, verificationPurpose, router]);

  const handleVerify = async (otpCode: string) => {
    if (!pendingEmail) return;

    try {
      if (verificationPurpose === "signup") {
        const res = await verifySignup({
          email_address: pendingEmail,
          otp_code: otpCode,
        }).unwrap();

        toast.success(res.message || "Email verified successfully");
        dispatch(clearPendingVerification());
        router.push("/sign-in");
      } else if (verificationPurpose === "forgot-password") {
        const res = await verifyForgot({
          email_address: pendingEmail,
          otp_code: otpCode,
        }).unwrap();

        toast.success(res.message || "OTP verified");

        // Save the temporary tokens from the response for the reset-password call
        if (res.accessToken && res.refreshToken) {
          saveAuthTokens(res.accessToken, res.refreshToken);
        }

        // Keep pendingEmail for reset-pass page, update purpose
        dispatch(
          setPendingVerification({
            email: pendingEmail,
            purpose: "forgot-password",
          }),
        );
        router.push("/reset-pass");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) return;

    try {
      if (verificationPurpose === "signup") {
        const res = await resendSignup({
          email_address: pendingEmail,
        }).unwrap();
        toast.success(res.message || "OTP resent");
      } else if (verificationPurpose === "forgot-password") {
        const res = await resendForgot({
          email_address: pendingEmail,
        }).unwrap();
        toast.success(res.message || "OTP resent");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!pendingEmail || !verificationPurpose) {
    return null;
  }

  return (
    <VerifyOtpForm
      emailAddress={pendingEmail}
      onVerify={handleVerify}
      onResend={handleResend}
      isVerifying={isVerifyingSignup || isVerifyingForgot}
      isResending={isResendingSignup || isResendingForgot}
    />
  );
}
