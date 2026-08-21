"use client"

import React, { useState } from "react"
import { mockSubscriptionPlans, mockCurrentSubscription } from "@/mock-data/DashboardMockData/subscription-mock-data"
import CurrentPlanCard from "./CurrentPlanCard"
import PlanCardsSection from "./PlanCardsSection"
import AnnualBillingBanner from "./AnnualBillingBanner"

export default function OverviewContainer() {
  const [selectedPlanCode, setSelectedPlanCode] = useState<string>(
    mockCurrentSubscription.plan_code
  )
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const handleManageBilling = () => {
    window.location.href = "/dashboard/subscription/overview/manage-billing"
  }

  const handleUpgradePlan = () => {
    document.getElementById("plan-cards")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSelectPlan = (planCode: string) => {
    setSelectedPlanCode(planCode)
  }

  const handleSwitchToAnnual = () => {
    setBillingCycle("annual")
  }

  return (
    <div className="space-y-6">
      <CurrentPlanCard
        subscription={mockCurrentSubscription}
        onManageBilling={handleManageBilling}
        onUpgradePlan={handleUpgradePlan}
      />

      <div id="plan-cards">
        <PlanCardsSection
          plans={mockSubscriptionPlans}
          currentPlanCode={mockCurrentSubscription.plan_code}
          selectedPlanCode={selectedPlanCode}
          billingCycle={billingCycle}
          onSelectPlan={handleSelectPlan}
          onBillingCycleChange={setBillingCycle}
        />
      </div>

      <AnnualBillingBanner onSwitchToAnnual={handleSwitchToAnnual} />
    </div>
  )
}
