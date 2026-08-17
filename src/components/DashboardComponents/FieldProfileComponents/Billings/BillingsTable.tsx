"use client"

/**
 * BillingsTable.tsx
 * Billing history table using CustomTable component.
 * Displays invoice ID, date, plan, price, and status badge.
 */

import { useTranslation } from "react-i18next"
import { getPlanDisplayName } from "@/lib/utils"
import type { BillingHistoryItem, BillingsTableProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import StatusBadge from "../StatusBadge"
import CustomTable from "@/components/SharedComponents/CustomTable"

type BillingRow = BillingHistoryItem & Record<string, unknown>

export default function BillingsTable({ data }: BillingsTableProps) {
  const { t } = useTranslation("dashboard")

  const columns = [
    {
      header: t("arena.billingsTab.invoiceId"),
      accessor: "invoice_id" as const,
    },
    {
      header: t("arena.billingsTab.date"),
      accessor: "date" as const,
    },
    {
      header: t("arena.billingsTab.plan"),
      accessor: (row: BillingRow) => getPlanDisplayName(row.plan as string, t),
    },
    {
      header: t("arena.billingsTab.price"),
      accessor: (row: BillingRow) => `${row.currency} ${row.price}`,
    },
    {
      header: t("arena.billingsTab.status"),
      accessor: (row: BillingRow) => <StatusBadge status={row.payment_status as string} />,
    },
  ]

  return (
    <CustomTable<BillingRow>
      data={data as BillingRow[]}
      columns={columns}
      itemsPerPage={10}
    />
  )
}
