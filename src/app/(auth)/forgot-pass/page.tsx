"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ForgotPasswordForm from "@/components/AuthComponents/ForgotPassword";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";
import { setPendingVerification } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getErrorMessage } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (data: { emailAddress: string }) => {
    try {
      const res = await forgotPassword({
        email_address: data.emailAddress.trim(),
      }).unwrap();

      toast.success(res.message || "OTP sent to email");

      // Store the email so the OTP page knows which flow this is
      dispatch(
        setPendingVerification({
          email: data.emailAddress.trim(),
          purpose: "forgot-password",
        }),
      );

      router.push("/verify-otp");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
