"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { mockCurrentSubscription } from "@/mock-data/DashboardMockData/subscription-mock-data"

export default function CancelSubscriptionInfo() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-4">
      {/* Primary Payment method */}
      <div className="bg-card border border-white/5 rounded-xl p-5">
        <h3 className="text-base font-semibold text-primary mb-4">
          {t("subscription.manageBilling.primaryPayment")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">{t("subscription.manageBilling.currentPlan")}</span>
            <span className="text-sm text-primary">{mockCurrentSubscription.plan_name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">{t("subscription.manageBilling.nextBillingDate")}</span>
            <span className="text-sm text-primary">{mockCurrentSubscription.next_billing_date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">{t("subscription.manageBilling.amount")}</span>
            <span className="text-sm text-primary">
              {mockCurrentSubscription.currency}{mockCurrentSubscription.price}
              <span className="text-secondary"> /month</span>
            </span>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-400">
            {t("subscription.manageBilling.warningTitle")}
          </p>
          <p className="text-sm text-secondary mt-0.5">
            {t("subscription.manageBilling.warningDesc")}
          </p>
        </div>
      </div>
    </div>
  )
}
