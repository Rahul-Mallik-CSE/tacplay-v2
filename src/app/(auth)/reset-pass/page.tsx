"use client";

import React from "react";
import ResetPasswordForm from "@/components/AuthComponents/ResetPassword";

export default function ResetPasswordPage() {
  const handleSubmit = (data: { newPassword: string; confirmPassword: string }) => {
    console.log("Reset password:", data);
  };

  return <ResetPasswordForm onSubmit={handleSubmit} />;
}
