"use client";

import React from "react";
import ForgotPasswordForm from "@/components/AuthComponents/ForgotPassword";

export default function ForgotPasswordPage() {
  const handleSubmit = (data: { emailAddress: string }) => {
    console.log("Forgot password:", data);
  };

  return <ForgotPasswordForm onSubmit={handleSubmit} />;
}
