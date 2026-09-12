"use client"

/**
 * BillingsTab.tsx
 * Displays billing history with search filtering functionality.
 * Composes BillingsHeader for search input and BillingsTable for data display.
 */

import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import type { BillingHistoryItem, BillingsTabProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import { mockBillingHistory } from "../../../../mock-data/DashboardMockData/arena-management-mock-data"
import BillingsHeader from "./BillingsHeader"
import BillingsTable from "./BillingsTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"

const BillingsTab = ({
  billingHistory = mockBillingHistory,
}: BillingsTabProps) => {
  const { t } = useTranslation("dashboard")
  const [search, setSearch] = useState("")
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [billingFilters, setBillingFilters] = useState<Record<string, string[]>>({})

  const billings = useMemo(() => billingHistory ?? [], [billingHistory])

  const filteredData = useMemo(() => {
    let result = billings
    const normalizedSearch = search.trim().toLowerCase()
    if (normalizedSearch) {
      result = result.filter((billing) =>
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
    }
    const statusFilters = billingFilters[t("filterSheet.status", "Status")] || []
    const planFilters = billingFilters[t("filterSheet.plan", "Plan")] || []
    if (statusFilters.length > 0) {
      result = result.filter((billing) => statusFilters.includes(billing.payment_status))
    }
    if (planFilters.length > 0) {
      result = result.filter((billing) => planFilters.includes(billing.plan))
    }
    return result
  }, [billings, search, billingFilters, t])

  return (
    <div className="space-y-6">
      <BillingsHeader
        search={search}
        onSearchChange={setSearch}
        onFilterClick={() => setFilterSheetOpen(true)}
      />

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

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter")}
        filterGroups={[
          {
            title: t("filterSheet.status", "Status"),
            options: [
              { label: t("arena.billingsTab.statusPaid"), value: "Paid" },
              { label: t("arena.billingsTab.statusPending"), value: "Pending" },
              { label: t("arena.billingsTab.statusFailed"), value: "Failed" },
              { label: t("arena.billingsTab.statusRefunded"), value: "Refunded" },
            ],
          },
          {
            title: t("filterSheet.plan", "Plan"),
            options: [
              { label: "Bronze", value: "bronze" },
              { label: "Silver", value: "silver" },
              { label: "Gold", value: "gold" },
            ],
          },
        ]}
        selectedFilters={billingFilters}
        onFilterChange={setBillingFilters}
      />
    </div>
  )
}

export default BillingsTab
