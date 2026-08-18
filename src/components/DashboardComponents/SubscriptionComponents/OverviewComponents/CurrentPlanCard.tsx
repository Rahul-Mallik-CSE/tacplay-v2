"use client"

import React from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { CurrentSubscription } from "@/types/DashboardTypes/SubscriptionTypes"

interface CurrentPlanCardProps {
  subscription: CurrentSubscription
  onManageBilling: () => void
  onUpgradePlan: () => void
}

export default function CurrentPlanCard({
  subscription,
  onManageBilling,
  onUpgradePlan,
}: CurrentPlanCardProps) {
  const { t } = useTranslation("dashboard")

  const getPlanLogo = (planCode: string) => {
    if (planCode.includes("bronze")) return "/bronze.png"
    if (planCode.includes("silver")) return "/silver.png"
    return "/gold.png"
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1a24] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
          <Image
            src={getPlanLogo(subscription.plan_code)}
            alt={subscription.plan_name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {t("subscription.overview.currentPlanTitle", {
                plan: subscription.plan_name,
              })}
            </h2>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                subscription.status === "active"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-secondary/20 text-secondary border border-secondary/30"
              )}
            >
              {t("subscription.overview.active")}
            </span>
          </div>

          <p className="text-secondary text-sm mt-1">
            {t("subscription.overview.nextBilling", {
              date: subscription.next_billing_date,
            })}
          </p>

          <p className="text-secondary text-sm mt-0.5">
            {t("subscription.overview.planDescription")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="text-left sm:text-right">
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              {subscription.currency}{subscription.price}
            </span>
            <span className="text-secondary text-sm"> / month</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onManageBilling}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-custom-yellow text-custom-yellow text-sm font-medium hover:bg-custom-yellow/10 transition-colors cursor-pointer"
            >
              {t("subscription.overview.manageBilling")}
            </button>
            <button
              onClick={onUpgradePlan}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#980009] via-[#C00069] to-[#980009] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              {t("subscription.overview.upgradePlan")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
