"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import {
  useGetSubscriptionStatusQuery,
  useGetSubscriptionPlansQuery,
  useUpgradeSubscriptionMutation,
} from "@/redux/features/dashboard/subscription/subscriptionAPI"
import type {
  CurrentSubscription,
  SubscriptionPlan,
} from "@/types/DashboardTypes/SubscriptionTypes"
import {
  mockSubscriptionPlans,
  mockCurrentSubscription,
} from "@/mock-data/DashboardMockData/subscription-mock-data"
import CurrentPlanCard from "./CurrentPlanCard"
import PlanCardsSection from "./PlanCardsSection"
import AnnualBillingBanner from "./AnnualBillingBanner"

const PLAN_FEATURES: Record<string, string[]> = {
  bronze: [
    "Create and manage a field profile.",
    "Add opening hours.",
    "Add game sessions.",
    "Add basic prices and packages",
    "View Bookings.",
    "Scan player QR codes.",
  ],
  silver: [
    "Advanced field profile visibility.",
    "Enhanced analytics.",
    "AI marketing suggestions.",
    "Discount code creation.",
    "Voucher creation.",
    "Staff scanner access.",
    "Bulk session creation using a calendar.",
  ],
  gold: [
    "Everything in Silver",
    "Unlimited session creation",
    "Full earnings tracking",
    "Detailed performance insights",
    "Custom field branding",
    "Coming Soon & blend Out",
  ],
}

const getFeatures = (code: string) => {
  const c = code.toLowerCase()
  if (c.includes("bronze")) return PLAN_FEATURES.bronze
  if (c.includes("silver")) return PLAN_FEATURES.silver
  if (c.includes("gold")) return PLAN_FEATURES.gold
  return PLAN_FEATURES.bronze
}

const getLogo = (code: string) => {
  const c = code.toLowerCase()
  if (c.includes("bronze")) return "/bronze.png"
  if (c.includes("silver")) return "/silver.png"
  return "/gold.png"
}

export default function OverviewContainer() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedPlanCode, setSelectedPlanCode] = useState<string>("")
  const [upgradingPlanCode, setUpgradingPlanCode] = useState<string | null>(null)

  const apiCycle = billingCycle === "annual" ? "yearly" : "monthly"

  const {
    data: statusData,
    isLoading: isStatusLoading,
  } = useGetSubscriptionStatusQuery()

  const {
    data: plansData,
    isLoading: isPlansLoading,
  } = useGetSubscriptionPlansQuery({ billing_cycle: apiCycle })

  const [upgradeSubscription] = useUpgradeSubscriptionMutation()

  const currentPlanCode =
    statusData?.data?.plan_code || mockCurrentSubscription.plan_code

  const activeSelectedPlan = selectedPlanCode || currentPlanCode

  const currentSubscription: CurrentSubscription = statusData?.data
    ? {
        has_active_subscription: statusData.data.has_active_subscription,
        plan_code: statusData.data.plan_code,
        plan_name: statusData.data.plan_name,
        price: statusData.data.price,
        currency: statusData.data.currency,
        billing_cycle: statusData.data.billing_cycle,
        started_at: statusData.data.started_at,
        expires_at: statusData.data.expires_at,
        days_left: statusData.data.days_left,
        status: statusData.data.status,
        show_upgrade_popup: statusData.data.show_upgrade_popup,
      }
    : mockCurrentSubscription

  const plans: SubscriptionPlan[] =
    plansData?.data && plansData.data.length > 0
      ? plansData.data.map((item) => ({
          id: item.id,
          name: item.name,
          code: item.code,
          price: item.price,
          annualPrice:
            billingCycle === "annual" ? Number(item.price) : Number(item.price) * 12,
          currency: item.currency,
          billing_cycle: item.billing_cycle,
          duration_days: item.duration_days,
          description: item.description,
          logo: getLogo(item.code),
          features: getFeatures(item.code),
          is_popular: item.code.toLowerCase().includes("silver"),
          is_active: item.is_active,
          is_current: item.is_current,
          button_text: item.button_text,
        }))
      : mockSubscriptionPlans

  const handleManageBilling = () => {
    window.location.href = "/dashboard/subscription/overview/manage-billing"
  }

  const handleUpgradePlan = () => {
    document.getElementById("plan-cards")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSelectPlan = async (planCode: string) => {
    setSelectedPlanCode(planCode)

    if (currentPlanCode === planCode) {
      return
    }

    // Pre-open new tab synchronously on click to avoid popup blocker
    const newTab = typeof window !== "undefined" ? window.open("about:blank", "_blank") : null

    try {
      setUpgradingPlanCode(planCode)
      const res = await upgradeSubscription({ plan_code: planCode }).unwrap()

      if (res?.data?.payment_url) {
        toast.success(res.message || "Opening checkout in a new tab...")
        if (newTab && !newTab.closed) {
          newTab.location.href = res.data.payment_url
        } else {
          window.open(res.data.payment_url, "_blank", "noopener,noreferrer")
        }
      } else {
        if (newTab && !newTab.closed) {
          newTab.close()
        }
        if (res?.message) {
          toast.success(res.message)
        }
      }
    } catch (err: any) {
      if (newTab && !newTab.closed) {
        newTab.close()
      }
      const errMsg =
        err?.data?.message || err?.message || "Failed to process plan upgrade"
      toast.error(errMsg)
    } finally {
      setUpgradingPlanCode(null)
    }
  }

  const handleSwitchToAnnual = () => {
    setBillingCycle("annual")
  }

  return (
    <div className="space-y-6">
      <CurrentPlanCard
        subscription={currentSubscription}
        onManageBilling={handleManageBilling}
        onUpgradePlan={handleUpgradePlan}
      />

      <div id="plan-cards">
        <PlanCardsSection
          plans={plans}
          currentPlanCode={currentPlanCode}
          selectedPlanCode={activeSelectedPlan}
          billingCycle={billingCycle}
          onSelectPlan={handleSelectPlan}
          onBillingCycleChange={setBillingCycle}
          upgradingPlanCode={upgradingPlanCode}
        />
      </div>

      {/* <AnnualBillingBanner onSwitchToAnnual={handleSwitchToAnnual} /> */}
    </div>
  )
}
