"use client"

import React from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { PlanCardProps } from "@/types/DashboardTypes/SubscriptionTypes"

export default function PlanCard({
  plan,
  isSelected,
  isCurrentPlan,
  onSelect,
  billingCycle,
}: PlanCardProps) {
  const { t } = useTranslation("dashboard")

  const price = billingCycle === "annual" ? plan.annualPrice : plan.price
  const displayPrice = billingCycle === "annual"
    ? (plan.annualPrice / 12).toFixed(2)
    : plan.price.toFixed(2)

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 transition-all duration-200 flex flex-col bg-[#1a1a24]",
        isSelected && !isCurrentPlan
          ? "border-2 border-transparent bg-[linear-gradient(#1a1a24,#1a1a24)_padding-box,linear-gradient(135deg,#C00069,#ff4d6d)_border-box] shadow-[0_0_24px_rgba(192,0,105,0.3)]"
          : "border border-white/10",
        isCurrentPlan && "border border-white/10"
      )}
    >
      {plan.is_popular && (
        <div className="absolute top-4 right-4">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 border border-emerald-500/30 rounded-md">
            {t("subscription.overview.popular")}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-8 h-8">
          <Image
            src={plan.logo}
            alt={plan.name}
            fill
            className="object-contain"
          />
        </div>
        <span className="text-white font-semibold text-base">
          {plan.name}
        </span>
      </div>

      <div className="mb-2">
        <span className="text-white text-3xl sm:text-4xl font-bold">
          {plan.currency}{displayPrice}
        </span>
        <span className="text-secondary text-sm ml-1">
          {t("subscription.overview.perMonth")}
        </span>
      </div>

      <p className="text-secondary text-sm mb-4 leading-relaxed">
        {plan.description}
      </p>

      {isCurrentPlan ? (
        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold border border-emerald-500/30 text-emerald-400 cursor-default mb-5"
          disabled
        >
          {t("subscription.overview.activeBronze")}
        </button>
      ) : plan.code.includes("silver") ? (
        <button
          onClick={() => onSelect(plan.code)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#980009] via-[#C00069] to-[#980009] text-white shadow-[0_0_12px_rgba(192,0,105,0.4)] hover:opacity-90 transition-opacity cursor-pointer mb-5"
        >
          {t("subscription.overview.upgradeToSilver")}
        </button>
      ) : (
        <button
          onClick={() => onSelect(plan.code)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold border border-white/20 text-white hover:border-white transition-colors cursor-pointer mb-5"
        >
          {t("subscription.overview.goGold")}
        </button>
      )}

      <div className="mt-auto">
        <p className="text-white font-semibold text-sm mb-3">
          {t("subscription.overview.includedFeatures")}
        </p>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs text-secondary"
            >
              <Check
                size={14}
                className="text-[#980009] shrink-0 mt-0.5"
                strokeWidth={3}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button className="text-custom-yellow text-xs font-medium mt-3 hover:underline cursor-pointer">
          {t("subscription.overview.seeAll")}
        </button>
      </div>
    </div>
  )
}
