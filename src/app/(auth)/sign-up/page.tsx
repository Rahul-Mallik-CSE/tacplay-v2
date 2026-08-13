"use client";

import React from "react";
import SignUpForm from "@/components/AuthComponents/SignUp";

export default function SignUpPage() {
  const handleSubmit = (data: {
    ownerName: string;
    businessEmail: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Sign up:", data);
  };

  return <SignUpForm onSubmit={handleSubmit} />;
}
