"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SignUpForm from "@/components/AuthComponents/SignUp";
import { useSignUpFieldOwnerMutation } from "@/redux/features/auth/authAPI";
import { setPendingVerification } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getErrorMessage } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignUpFieldOwnerMutation();

  const handleSubmit = async (data: {
    ownerName: string;
    businessEmail: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await signup({
        owner_name: data.ownerName,
        business_email: data.businessEmail.trim(),
        password: data.password,
        confirm_password: data.confirmPassword,
      }).unwrap();

      toast.success(res.message || "OTP sent to email");

      // Save the email for the OTP verification page
      dispatch(
        setPendingVerification({
          email: data.businessEmail.trim(),
          purpose: "signup",
        }),
      );

      router.push("/verify-otp");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
