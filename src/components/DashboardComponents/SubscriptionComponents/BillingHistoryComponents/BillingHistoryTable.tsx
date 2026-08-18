"use client"

import React from "react"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { BillingHistoryRecord } from "@/types/DashboardTypes/SubscriptionTypes"
import CustomTable from "@/components/SharedComponents/CustomTable"

interface BillingHistoryTableProps {
  data: BillingHistoryRecord[]
}

export default function BillingHistoryTable({ data }: BillingHistoryTableProps) {
  const { t } = useTranslation("dashboard")

  const columns = [
    {
      header: t("subscription.billingHistory.columns.date"),
      accessor: "date" as keyof BillingHistoryRecord,
    },
    {
      header: t("subscription.billingHistory.columns.description"),
      accessor: "description" as keyof BillingHistoryRecord,
    },
    {
      header: t("subscription.billingHistory.columns.amount"),
      accessor: "amount" as keyof BillingHistoryRecord,
    },
    {
      header: t("subscription.billingHistory.columns.status"),
      accessor: (row: Record<string, unknown>) => (
        <div className="w-20 px-2 py-1 flex justify-center items-center rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          {row.status as string}
        </div>
      ),
    },
    {
      header: t("subscription.billingHistory.columns.invoice"),
      accessor: "invoice_id" as keyof BillingHistoryRecord,
    },
  ]

  const actionRenderer = (row: Record<string, unknown>) => (
    <button
      className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
      title={t("subscription.billingHistory.download")}
    >
      <Download className="w-4 h-4 sm:w-5 sm:h-5 text-secondary hover:text-primary" />
    </button>
  )

  return (
    <CustomTable
      data={data as unknown as Record<string, unknown>[]}
      columns={columns}
      actionRenderer={actionRenderer}
      itemsPerPage={10}
      minTableWidth="min-w-[800px]"
    />
  )
}
