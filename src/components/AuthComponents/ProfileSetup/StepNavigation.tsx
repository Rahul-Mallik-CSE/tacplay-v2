"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Step {
  id: number;
  label: string;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
  stepTranslationKeys: string[];
}

export default function StepNavigation({
  steps,
  currentStep,
  onStepClick,
  stepTranslationKeys,
}: StepNavigationProps) {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <aside className="hidden md:flex w-72 lg:w-80 flex-col border-r border-white/5 bg-card/50 p-6">
        <div className="h-6 flex items-center justify-center">
          <Image
            src="/Tacplay-logo-2.png"
            alt="TacPlay"
            width={200}
            height={200}
            className="object-contain h-12"
            priority
          />
        </div>

        <nav className="flex-1 space-y-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepClick(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  isActive
                    ? "bg-white/5 text-primary"
                    : isCompleted
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                    isCompleted
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : isActive
                        ? "bg-custom-red/20 text-custom-red border border-custom-red/40"
                        : "bg-white/5 text-muted-foreground border border-white/10"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-sm font-medium">{t(stepTranslationKeys[index])}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5">
        <Image
          src="/Tacplay-logo.png"
          alt="TacPlay"
          width={100}
          height={35}
          className="object-contain"
        />
        <span className="text-sm text-muted-foreground">
          {t("onboarding.stepCount", { current: currentStep + 1, total: steps.length })}
        </span>
      </div>

      <div className="md:hidden flex items-center gap-2 px-4 pt-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div
              key={step.id}
              className="flex-1 flex flex-col items-center gap-1.5"
            >
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                      ? "bg-custom-red"
                      : "bg-white/10"
                }`}
              />
              <span className="text-[10px] text-muted-foreground truncate max-w-full">
                {t(stepTranslationKeys[index])}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
