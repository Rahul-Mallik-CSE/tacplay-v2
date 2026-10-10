"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { useGetBillingHistoryQuery } from "@/redux/features/dashboard/subscription/subscriptionAPI"
import BillingHistoryTable from "./BillingHistoryTable"

export default function BillingHistoryContainer() {
  const { t } = useTranslation("dashboard")
  const { data: billingHistoryResponse, isLoading } = useGetBillingHistoryQuery()

  const records = billingHistoryResponse?.data || []

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-primary">
        {t("subscription.billingHistory.title")}
      </h2>
      <BillingHistoryTable data={records} isLoading={isLoading} />
    </div>
  )
}
