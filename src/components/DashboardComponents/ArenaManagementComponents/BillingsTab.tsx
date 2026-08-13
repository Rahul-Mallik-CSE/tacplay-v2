"use client"

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import type { BillingHistoryItem } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockBillingHistory } from "./mock-data"
import BillingsHeader from "./BillingsHeader"
import BillingsTable from "./BillingsTable"

interface BillingsTabProps {
  billingHistory?: BillingHistoryItem[]
}

const BillingsTab = ({
  billingHistory = mockBillingHistory,
}: BillingsTabProps) => {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")

  const billings = useMemo(() => billingHistory ?? [], [billingHistory])

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return billings

    return billings.filter((billing) =>
      [
        billing.invoice_id,
        billing.date,
        billing.plan,
        billing.price,
        billing.currency,
        billing.payment_status,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch)),
    )
  }, [billings, search])

  return (
    <div className="space-y-6">
      <BillingsHeader search={search} onSearchChange={setSearch} />

      {billings.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-sm">
          {t("arena.billingsTab.noRecords")}
        </div>
      ) : (
        <>
          <BillingsTable data={filteredData} />
          {filteredData.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              {t("arena.billingsTab.noRecords")}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BillingsTab
