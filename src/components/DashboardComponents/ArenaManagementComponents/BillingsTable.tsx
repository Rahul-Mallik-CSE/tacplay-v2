"use client"

import { useTranslation } from "react-i18next"
import { getPlanDisplayName } from "@/lib/utils"
import type { BillingHistoryItem } from "@/types/DashboardTypes/ArenaManagementTypes"
import StatusBadge from "./StatusBadge"

interface BillingsTableProps {
  data: BillingHistoryItem[]
}

export default function BillingsTable({ data }: BillingsTableProps) {
  const { t } = useTranslation("dashboard")

  const formatPrice = (billing: BillingHistoryItem) =>
    `${billing.currency} ${billing.price}`

  return (
    <div className="overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-muted/30">
            <th className="p-3 text-left">
              <div className="flex items-center gap-1 text-muted-foreground font-medium">
                {t("arena.billingsTab.invoiceId")}
              </div>
            </th>
            <th className="p-3 text-left">
              <div className="flex items-center gap-1 text-muted-foreground font-medium">
                {t("arena.billingsTab.date")}
              </div>
            </th>
            <th className="p-3 text-left">
              <div className="flex items-center gap-1 text-muted-foreground font-medium">
                {t("arena.billingsTab.plan")}
              </div>
            </th>
            <th className="p-3 text-left">
              <div className="flex items-center gap-1 text-muted-foreground font-medium">
                {t("arena.billingsTab.price")}
              </div>
            </th>
            <th className="p-3 text-left">
              <div className="flex items-center gap-1 text-muted-foreground font-medium">
                {t("arena.billingsTab.status")}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-white/5 hover:bg-muted/20 transition-colors"
            >
              <td className="p-3 text-primary font-medium">{item.invoice_id}</td>
              <td className="p-3 text-muted-foreground">{item.date}</td>
              <td className="p-3 text-muted-foreground">
                {getPlanDisplayName(item.plan, t)}
              </td>
              <td className="p-3 text-primary font-medium">
                {formatPrice(item)}
              </td>
              <td className="p-3 text-primary font-medium">
                <StatusBadge status={item.payment_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
