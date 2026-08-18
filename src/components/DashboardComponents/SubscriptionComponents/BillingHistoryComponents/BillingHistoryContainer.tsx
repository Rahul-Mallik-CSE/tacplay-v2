"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import type { BillingHistoryRecord } from "@/types/DashboardTypes/SubscriptionTypes"
import { mockBillingHistory } from "@/mock-data/DashboardMockData/subscription-mock-data"
import BillingHistoryTable from "./BillingHistoryTable"

export default function BillingHistoryContainer() {
  const { t } = useTranslation("dashboard")

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-primary">
        {t("subscription.billingHistory.title")}
      </h2>
      <BillingHistoryTable data={mockBillingHistory} />
    </div>
  )
}
