"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import StepNavigation from "./StepNavigation";
import StepArenaInfo, { type ArenaStepForm } from "@/components/AuthComponents/ProfileSetup/StepArenaInfo";
import StepBusinessSetup, { type MatchRulesStepForm } from "@/components/AuthComponents/ProfileSetup/StepBusinessSetup";
import StepPackageManagement, { type PackageEntryForm } from "@/components/AuthComponents/ProfileSetup/StepPackageManagement";
import StepPayoutSetup, { type PayoutStepForm } from "@/components/AuthComponents/ProfileSetup/StepPayoutSetup";

const steps = [
  { id: 1, label: "Arena Info" },
  { id: 2, label: "Business Setup" },
  { id: 3, label: "Package Management" },
  { id: 4, label: "Payout & Business Setup" },
];

const stepTranslationKeys = [
  "onboarding.steps.arenaInfo",
  "onboarding.steps.businessSetup",
  "onboarding.steps.packageManagement",
  "onboarding.steps.payoutSetup",
];

const defaultArena: ArenaStepForm = {
  field_name: "",
  description: "",
  country: "Bangladesh",
  state: "",
  city: "Dhaka",
  full_address: "",
  images: [],
};

const defaultMatchRules: MatchRulesStepForm = {
  minimum_players_per_team: "6",
  maximum_players_per_team: "8",
  minimum_players_per_session: "16",
  maximum_players_per_session: "16",
  default_session_duration: "50",
  duration_unit: "minute",
  base_price_per_player: "0",
  allow_social_matches: true,
  allow_ranked_matches: false,
};

const createEmptyPackage = (): PackageEntryForm => ({
  package_name: "",
  description: "",
  package_fee: "",
  include_items: "",
});

const defaultPackages: PackageEntryForm[] = [createEmptyPackage()];

const defaultPayout: PayoutStepForm = {
  business_name: "",
  business_type: "registered_company",
  contact_phone_number: "",
  bank_account_holder_name: "",
  bank_name: "",
  account_number: "",
  confirm_account_number: "",
  iban_routing_number: "",
  swift_bic_code: "",
};

interface ProfileSetupWizardProps {
  onStepSubmit?: (step: number, data: unknown) => Promise<void>;
  isSubmitting?: boolean;
}

export default function ProfileSetupWizard({
  onStepSubmit,
  isSubmitting = false,
}: ProfileSetupWizardProps) {
  const { t } = useTranslation("dashboard");
  const [currentStep, setCurrentStep] = useState(0);
  const [arena, setArena] = useState<ArenaStepForm>(defaultArena);
  const [matchRules, setMatchRules] = useState<MatchRulesStepForm>(defaultMatchRules);
  const [packages, setPackages] = useState<PackageEntryForm[]>(defaultPackages);
  const [payout, setPayout] = useState<PayoutStepForm>(defaultPayout);

  const isLastStep = currentStep === steps.length - 1;

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep) setCurrentStep(index);
  };

  const handleAddPackage = () => {
    setPackages((prev) => [...prev, createEmptyPackage()]);
  };

  const handleRemovePackage = (index: number) => {
    setPackages((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );
  };

  const handleNext = async () => {
    if (isSubmitting) return;

    if (onStepSubmit) {
      const stepData = [arena, matchRules, packages, payout][currentStep];
      await onStepSubmit(currentStep, stepData);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepArenaInfo
            value={arena}
            onChange={(patch) => setArena((prev) => ({ ...prev, ...patch }))}
          />
        );
      case 1:
        return (
          <StepBusinessSetup
            value={matchRules}
            onChange={(patch) =>
              setMatchRules((prev) => ({ ...prev, ...patch }))
            }
          />
        );
      case 2:
        return (
          <StepPackageManagement
            value={packages}
            onChange={(index, patch) =>
              setPackages((prev) =>
                prev.map((p, i) => (i === index ? { ...p, ...patch } : p)),
              )
            }
            onAddPackage={handleAddPackage}
            onRemovePackage={handleRemovePackage}
          />
        );
      case 3:
        return (
          <StepPayoutSetup
            value={payout}
            onChange={(patch) => setPayout((prev) => ({ ...prev, ...patch }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-root-bg">
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        stepTranslationKeys={stepTranslationKeys}
      />

      <main className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 max-w-3xl">
          {renderStepContent()}
        </div>

        <div className="border-t border-white/5 p-4 sm:p-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "border border-white/10 bg-input/30 text-primary hover:bg-input/50"
            }`}
          >
            {t("onboarding.previous")}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg bg-custom-red text-white text-sm font-semibold hover:bg-custom-red/90 transition-colors border-2 border-border disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting
              ? t("onboarding.pleaseWait")
              : isLastStep
                ? t("onboarding.submitApprove")
                : t("onboarding.continue")}
          </button>
        </div>
      </main>
    </div>
  );
}
