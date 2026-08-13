"use client";

import React from "react";
import ProfileSetupWizard from "@/components/AuthComponents/ProfileSetup";

export default function ProfileSetupPage() {
  const handleStepSubmit = async (step: number, data: unknown) => {
    console.log(`Step ${step} submitted:`, data);
  };

  return <ProfileSetupWizard onStepSubmit={handleStepSubmit} />;
}
