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
  isUpgrading = false,
}: PlanCardProps) {
  const { t } = useTranslation("dashboard")

  const getPlanLogo = (code?: string) => {
    const c = (code || "").toLowerCase()
    if (c.includes("bronze")) return "/bronze.png"
    if (c.includes("silver")) return "/silver.png"
    return "/gold.png"
  }

  const rawPrice = Number(plan.price) || 0
  const displayPrice = rawPrice.toFixed(2)

  const currencySymbol =
    plan.currency === "EUR" ? "€" :
    plan.currency === "USD" ? "$" :
    plan.currency === "GBP" ? "£" :
    plan.currency || "€"

  const planLogo = plan.logo || getPlanLogo(plan.code)
  const features = Array.isArray(plan.features) ? plan.features : []

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 transition-all duration-200 flex flex-col bg-[#0B0B0F]",
        plan.code.includes("silver")
          ? "border-4 border-[#F93825] "
          : isSelected && !isCurrentPlan
            ? "border-2 border-transparent bg-[linear-gradient(#0B0B0F,#0B0B0F)_padding-box,linear-gradient(135deg,#C00069,#ff4d6d)_border-box] shadow-[0_0_24px_rgba(192,0,105,0.3)]"
            : "border border-white/10",
        !plan.code.includes("silver") && isCurrentPlan && "border border-white/10"
      )}
    >
      {plan.is_popular && (
        <div className="absolute top-[-0.1px] right-0">
          <span
            className={cn(
              "text-xs font-semibold px-4 py-1.5 rounded-tr-xl rounded-bl-lg",
              plan.code.includes("silver")
                ? "bg-[#DDB215] text-primary"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            )}
          >
            {t("subscription.overview.popular")}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-12 h-12">
          <Image
            src={planLogo}
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
          {currencySymbol}{displayPrice}
        </span>
        <span className="text-secondary text-sm ml-1">
          {billingCycle === "annual" ? "/ annual" : t("subscription.overview.perMonth")}
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
          {plan.button_text || t("subscription.overview.activeBronze")}
        </button>
      ) : plan.code.includes("silver") ? (
        <button
          onClick={() => onSelect(plan.code)}
          disabled={isUpgrading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#980009] via-[#C00069] to-[#980009] text-white shadow-[0_0_12px_rgba(192,0,105,0.4)] hover:opacity-90 transition-opacity cursor-pointer mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpgrading
            ? "Processing..."
            : plan.button_text || t("subscription.overview.upgradeToSilver")}
        </button>
      ) : plan.code.includes("bronze") ? (
        <button
          onClick={() => onSelect(plan.code)}
          disabled={isUpgrading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold border border-white/20 text-white hover:border-white transition-colors cursor-pointer mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpgrading
            ? "Processing..."
            : plan.button_text || t("subscription.overview.activeBronze")}
        </button>
      ) : (
        <button
          onClick={() => onSelect(plan.code)}
          disabled={isUpgrading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold border border-white/20 text-white hover:border-white transition-colors cursor-pointer mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpgrading
            ? "Processing..."
            : plan.button_text || t("subscription.overview.goGold")}
        </button>
      )}

      <div className="mt-auto">
        <p className="text-white font-semibold text-sm mb-3">
          {t("subscription.overview.includedFeatures")}
        </p>
        <ul className="space-y-2">
          {features.map((feature) => (
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
      </div>
    </div>
  )
}
