"use client"

import { useTranslation } from "react-i18next"
import { Check } from "lucide-react"
import { mockCurrentSubscription } from "@/mock-data/DashboardMockData/subscription-mock-data"

export default function WhatHappensNext() {
  const { t } = useTranslation("dashboard")

  const items = [
    {
      text: t("subscription.manageBilling.nextStep1"),
      highlight: mockCurrentSubscription.next_billing_date,
    },
    { text: t("subscription.manageBilling.nextStep2") },
    { text: t("subscription.manageBilling.nextStep3") },
    { text: t("subscription.manageBilling.nextStep4") },
  ]

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5">
      <h3 className="text-base font-semibold text-primary mb-4">
        {t("subscription.manageBilling.whatHappensNext")}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <Check className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-secondary">
              {item.highlight ? (
                <>
                  {item.text.split(item.highlight)[0]}
                  <span className="text-primary font-semibold">{item.highlight}</span>
                  {item.text.split(item.highlight)[1]}
                </>
              ) : (
                item.text
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
