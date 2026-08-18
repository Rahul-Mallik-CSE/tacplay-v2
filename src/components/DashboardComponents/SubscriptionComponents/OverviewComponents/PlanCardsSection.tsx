"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { PlanCardsSectionProps } from "@/types/DashboardTypes/SubscriptionTypes"
import PlanCard from "./PlanCard"
import BillingToggle from "./BillingToggle"

export default function PlanCardsSection({
  plans,
  currentPlanCode,
  selectedPlanCode,
  billingCycle,
  onSelectPlan,
  onBillingCycleChange,
}: PlanCardsSectionProps) {
  const { t } = useTranslation("dashboard")

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            {t("subscription.overview.choosePlanTitle")}
          </h2>
          <p className="text-secondary text-sm mt-1">
            {t("subscription.overview.choosePlanSubtitle")}
          </p>
        </div>
        <BillingToggle
          billingCycle={billingCycle}
          onToggle={onBillingCycleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlanCode === plan.code}
            isCurrentPlan={currentPlanCode === plan.code}
            onSelect={onSelectPlan}
            billingCycle={billingCycle}
          />
        ))}
      </div>
    </div>
  )
}
