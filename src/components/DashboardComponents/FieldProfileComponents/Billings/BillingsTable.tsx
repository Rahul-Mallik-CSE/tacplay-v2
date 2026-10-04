"use client"

/**
 * BillingsTable.tsx
 * Billing & Earnings history table using CustomTable component.
 * Displays transaction ID, customer, session, match type, date, amount, payment method, status.
 */

import React from "react"
import { useTranslation } from "react-i18next"
import { Eye, Loader2 } from "lucide-react"
import type { BillingsTableProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import type { EarningsListItem } from "@/types/DashboardTypes/EarningsTypes"
import StatusBadge from "../StatusBadge"
import CustomTable from "@/components/SharedComponents/CustomTable"
import EarningPaymentBadge from "@/components/DashboardComponents/EarningsComponents/EarningPaymentBadge"
import EarningMatchTypeDot from "@/components/DashboardComponents/EarningsComponents/EarningMatchTypeDot"

type AnyBillingRow = Record<string, unknown>

export default function BillingsTable({
  data,
  isLoading = false,
  serverPagination = false,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  totalCount,
  onPageChange,
  onItemsPerPageChange,
  onRowClick,
}: BillingsTableProps) {
  const { t } = useTranslation("dashboard")

  const columns = [
    {
      header: t("earnings.columns.transactionId", "Transaction ID"),
      accessor: (row: AnyBillingRow) => (
        <span className="font-mono text-xs font-semibold text-primary">
          {(row.display_transaction_id as string) ||
            (row.invoice_id as string) ||
            (row.transaction_id ? `#CH ${row.transaction_id}` : "-")}
        </span>
      ),
    },
    {
      header: t("earnings.columns.user", "Customer"),
      accessor: (row: AnyBillingRow) => {
        const userName = (row.user_name as string) || (row.player_name as string)
        const userEmail = (row.user_email as string) || (row.display_user_id as string)
        if (!userName && !userEmail) return <span className="text-secondary">-</span>
        return (
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-primary">{userName || "-"}</p>
            {userEmail && <p className="text-xs text-muted-foreground">{userEmail}</p>}
          </div>
        )
      },
    },
    {
      header: t("earnings.columns.session", "Session / Plan"),
      accessor: (row: AnyBillingRow) => {
        const sessionName = (row.session_name as string) || (row.plan as string)
        const sessionId = (row.display_session_id as string)
        return (
          <div className="space-y-0.5">
            <p className="text-sm text-primary">{sessionName || "-"}</p>
            {sessionId && <p className="text-xs text-muted-foreground">{sessionId}</p>}
          </div>
        )
      },
    },
    {
      header: t("earnings.columns.matchType", "Match Type"),
      accessor: (row: AnyBillingRow) => {
        const type = (row.session_type_display as string) || (row.session_type as string)
        if (!type) return <span className="text-secondary">-</span>
        return <EarningMatchTypeDot type={type} />
      },
    },
    {
      header: t("earnings.columns.date", "Date"),
      accessor: (row: AnyBillingRow) => (
        <span className="text-xs sm:text-sm text-primary/80">
          {(row.date_display as string) || (row.date as string) || "-"}
        </span>
      ),
    },
    {
      header: t("earnings.columns.amount", "Amount"),
      accessor: (row: AnyBillingRow) => (
        <span className="text-sm font-semibold text-primary">
          {(row.amount_display as string) ||
            (row.price ? `${(row.currency as string) || "€"} ${row.price}` : "-")}
        </span>
      ),
    },
    {
      header: t("earnings.columns.paymentMethod", "Payment Method"),
      accessor: (row: AnyBillingRow) => {
        const method =
          (row.payment_method_display as string) || (row.payment_method as string)
        if (!method) return <span className="text-secondary">-</span>
        return <EarningPaymentBadge method={method} />
      },
    },
    {
      header: t("common.status", "Status"),
      accessor: (row: AnyBillingRow) => {
        const status = (row.payment_status as string) || (row.status as string) || "paid"
        return <StatusBadge status={status} />
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/5 p-12 flex flex-col items-center justify-center min-h-[320px]">
        <Loader2 className="w-8 h-8 text-custom-red animate-spin mb-3" />
        <p className="text-sm text-muted-foreground">
          {t("common.loading", "Loading earnings records...")}
        </p>
      </div>
    )
  }

  return (
    <CustomTable<AnyBillingRow>
      data={data as AnyBillingRow[]}
      columns={columns}
      itemsPerPage={itemsPerPage}
      serverPagination={serverPagination}
      currentPage={currentPage}
      totalPages={totalPages}
      additionalCount={totalCount}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      onRowClick={onRowClick ? (row) => onRowClick(row as unknown as EarningsListItem) : undefined}
      actionRenderer={(row) =>
        onRowClick ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRowClick(row as unknown as EarningsListItem)
            }}
            title={t("common.viewDetails", "View Details")}
            className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
          >
            <Eye className="w-4 h-4 text-custom-yellow" />
          </button>
        ) : null
      }
      minTableWidth="min-w-[850px]"
    />
  )
}
