"use client"

import React, { useState } from "react"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import type { BillingHistoryItem } from "@/types/DashboardTypes/SubscriptionTypes"
import CustomTable from "@/components/SharedComponents/CustomTable"
import BillingInvoicePdf from "./BillingInvoicePdf"
import { cn } from "@/lib/utils"

interface BillingHistoryTableProps {
  data: BillingHistoryItem[]
  isLoading?: boolean
}

export default function BillingHistoryTable({ data, isLoading = false }: BillingHistoryTableProps) {
  const { t } = useTranslation("dashboard")
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const handleDownloadInvoice = async (item: BillingHistoryItem) => {
    if (downloadingId) return
    setDownloadingId(item.invoice_id)

    try {
      const { pdf } = await import("@react-pdf/renderer")
      const blob = await pdf(<BillingInvoicePdf item={item} />).toBlob()
      const objectUrl = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = objectUrl
      anchor.download = `Invoice-${item.invoice_id}.pdf`
      anchor.click()
      URL.revokeObjectURL(objectUrl)
      toast.success(
        t("subscription.billingHistory.downloadSuccess", "Invoice downloaded successfully")
      )
    } catch (err) {
      console.error("Failed to generate invoice PDF:", err)
      toast.error(
        t("subscription.billingHistory.downloadError", "Failed to download invoice")
      )
    } finally {
      setDownloadingId(null)
    }
  }

  const columns = [
    {
      header: t("subscription.billingHistory.columns.date", "Date"),
      accessor: "date" as keyof BillingHistoryItem,
    },
    {
      header: t("subscription.billingHistory.columns.description", "Description"),
      accessor: "plan" as keyof BillingHistoryItem,
    },
    {
      header: t("subscription.billingHistory.columns.amount", "Amount"),
      accessor: (row: Record<string, unknown>) => {
        const currency =
          row.currency === "EUR" ? "€" :
          row.currency === "USD" ? "$" :
          row.currency === "GBP" ? "£" :
          (row.currency as string) || "€"
        return `${currency}${row.price}`
      },
    },
    {
      header: t("subscription.billingHistory.columns.status", "Status"),
      accessor: (row: Record<string, unknown>) => {
        const rawStatus = (row.payment_status || row.status || "") as string
        const status = rawStatus.toLowerCase()
        const isPaid = status === "paid"
        const isPending = status === "pending"

        return (
          <div
            className={cn(
              "w-20 px-2 py-1 flex justify-center items-center rounded-md text-xs font-medium capitalize",
              isPaid
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : isPending
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            )}
          >
            {rawStatus || "Paid"}
          </div>
        )
      },
    },
    {
      header: t("subscription.billingHistory.columns.invoice", "Invoice"),
      accessor: "invoice_id" as keyof BillingHistoryItem,
    },
  ]

  const actionRenderer = (row: Record<string, unknown>) => {
    const item = row as unknown as BillingHistoryItem
    const isDownloading = downloadingId === item.invoice_id

    return (
      <button
        onClick={() => handleDownloadInvoice(item)}
        disabled={isDownloading}
        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center disabled:opacity-50"
        title={t("subscription.billingHistory.download", "Download Invoice")}
      >
        {isDownloading ? (
          <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-secondary hover:text-primary" />
        )}
      </button>
    )
  }

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
