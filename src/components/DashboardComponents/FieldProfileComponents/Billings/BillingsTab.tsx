"use client"

/**
 * BillingsTab.tsx
 * Displays billing & earnings history with backend pagination, live filters,
 * debounced search, and slide-out transaction details sheet.
 * Connected to GET /api/arena/earnings/
 */

import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { X, Calendar, DollarSign, Hash } from "lucide-react"
import type { BillingsTabProps } from "@/types/DashboardTypes/ArenaManagementTypes"
import type { EarningsListItem, EarningsListQuery } from "@/types/DashboardTypes/EarningsTypes"
import { useGetEarningsQuery } from "@/redux/features/dashboard/field-profile/fieldProfileAPI"
import BillingsHeader from "./BillingsHeader"
import BillingsTable from "./BillingsTable"
import FilterSheet, { type FilterGroup } from "@/components/SharedComponents/FilterSheet"
import TransactionDetailsSheet from "@/components/DashboardComponents/EarningsComponents/TransactionDetailsSheet"

const BillingsTab = ({}: BillingsTabProps) => {
  const { t } = useTranslation("dashboard")

  // Search & Pagination state
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter Sheet state
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [billingFilters, setBillingFilters] = useState<Record<string, string[]>>({
    "Sort Order": ["desc"],
  })

  // Date and numeric filters
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [amountMin, setAmountMin] = useState("")
  const [amountMax, setAmountMax] = useState("")
  const [sessionId, setSessionId] = useState("")

  // Transaction details sheet
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null)
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false)

  // Debounce search by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  // Build query parameters for GET /api/arena/earnings/
  const queryParams: EarningsListQuery = useMemo(() => {
    const params: EarningsListQuery = {
      page: currentPage,
      limit: itemsPerPage,
    }

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim()
    }

    if (billingFilters["Session Type"]?.length) {
      params.session_type = billingFilters["Session Type"][0]
    }

    if (billingFilters["Payment Method"]?.length) {
      params.payment_method = billingFilters["Payment Method"][0]
    }

    if (billingFilters["Plan"]?.length) {
      params.plan = billingFilters["Plan"][0]
    }

    if (billingFilters["Currency"]?.length) {
      params.currency = billingFilters["Currency"][0]
    }

    if (billingFilters["Sort By"]?.length) {
      params.sort_by = billingFilters["Sort By"][0]
    }

    if (billingFilters["Sort Order"]?.length) {
      params.order = billingFilters["Sort Order"][0]
    }

    if (dateFrom) {
      params.date_from = dateFrom
    }

    if (dateTo) {
      params.date_to = dateTo
    }

    if (amountMin) {
      params.amount_min = amountMin
    }

    if (amountMax) {
      params.amount_max = amountMax
    }

    if (sessionId) {
      params.session_id = sessionId
    }

    return params
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearch,
    billingFilters,
    dateFrom,
    dateTo,
    amountMin,
    amountMax,
    sessionId,
  ])

  // Fetch earnings from API
  const { data: apiResponse, isLoading } = useGetEarningsQuery(queryParams)

  const earningsList: EarningsListItem[] = apiResponse?.data || []
  const meta = apiResponse?.meta
  const totalPages = meta?.totalPage || 1
  const totalCount = meta?.total || 0
  const totalRevenue =
    meta?.summary?.total_revenue_display ||
    (meta?.summary?.total_revenue ? `€${meta.summary.total_revenue}` : undefined)

  // Filter groups for FilterSheet
  const filterGroups: FilterGroup[] = useMemo(
    () => [
      {
        title: "Session Type",
        type: "single",
        options: [
          { label: "Ranked", value: "ranked" },
          { label: "Social", value: "social" },
        ],
      },
      {
        title: "Payment Method",
        type: "single",
        options: [
          { label: "Stripe", value: "stripe" },
          { label: "Card", value: "card" },
          { label: "Cash", value: "cash" },
        ],
      },
      {
        title: "Plan",
        type: "single",
        options: [
          { label: "Premium Monthly", value: "Premium Monthly" },
          { label: "Basic", value: "Basic" },
          { label: "Pro", value: "Pro" },
        ],
      },
      {
        title: "Currency",
        type: "single",
        options: [
          { label: "EUR (€)", value: "EUR" },
          { label: "USD ($)", value: "USD" },
          { label: "GBP (£)", value: "GBP" },
        ],
      },
      {
        title: "Sort By",
        type: "single",
        options: [
          { label: "Date", value: "date" },
          { label: "Amount", value: "amount" },
        ],
      },
      {
        title: "Sort Order",
        type: "single",
        options: [
          { label: "Descending", value: "desc" },
          { label: "Ascending", value: "asc" },
        ],
      },
    ],
    []
  )

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = Object.entries(billingFilters).reduce((sum, [key, arr]) => {
      if (key === "Sort Order" && arr.length === 1 && arr[0] === "desc") return sum
      return sum + (arr?.length || 0)
    }, 0)
    if (dateFrom) count += 1
    if (dateTo) count += 1
    if (amountMin) count += 1
    if (amountMax) count += 1
    if (sessionId) count += 1
    return count
  }, [billingFilters, dateFrom, dateTo, amountMin, amountMax, sessionId])

  const clearAllFilters = () => {
    setBillingFilters({
      "Sort Order": ["desc"],
    })
    setDateFrom("")
    setDateTo("")
    setAmountMin("")
    setAmountMax("")
    setSessionId("")
    setCurrentPage(1)
  }

  const handleRowClick = (item: EarningsListItem) => {
    setSelectedTransactionId(item.transaction_id)
    setDetailsSheetOpen(true)
  }

  return (
    <div className="space-y-6">
      <BillingsHeader
        search={search}
        onSearchChange={setSearch}
        onFilterClick={() => setFilterSheetOpen(true)}
        activeFilterCount={activeFilterCount}
        totalRevenueDisplay={totalRevenue}
      />

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-secondary">{t("filterSheet.activeFilters", "Active:")}</span>
          {dateFrom && (
            <span className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="text-secondary">From:</span> {dateFrom}
              <button onClick={() => setDateFrom("")} className="cursor-pointer hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {dateTo && (
            <span className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="text-secondary">To:</span> {dateTo}
              <button onClick={() => setDateTo("")} className="cursor-pointer hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {amountMin && (
            <span className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="text-secondary">Min:</span> €{amountMin}
              <button onClick={() => setAmountMin("")} className="cursor-pointer hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {amountMax && (
            <span className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="text-secondary">Max:</span> €{amountMax}
              <button onClick={() => setAmountMax("")} className="cursor-pointer hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {sessionId && (
            <span className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="text-secondary">Session ID:</span> {sessionId}
              <button onClick={() => setSessionId("")} className="cursor-pointer hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {Object.entries(billingFilters).map(([group, values]) => {
            if (group === "Sort Order" && values[0] === "desc") return null
            return values.map((val) => (
              <span
                key={`${group}-${val}`}
                className="bg-white/10 text-primary border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5"
              >
                <span className="text-secondary">{group}:</span>
                <span className="capitalize">{val}</span>
                <button
                  onClick={() => {
                    const current = billingFilters[group] || []
                    setBillingFilters({
                      ...billingFilters,
                      [group]: current.filter((v) => v !== val),
                    })
                    setCurrentPage(1)
                  }}
                  className="cursor-pointer hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          })}
          <button
            onClick={clearAllFilters}
            className="text-xs text-custom-red hover:underline ml-2 cursor-pointer"
          >
            {t("filterSheet.clearAll", "Clear all")}
          </button>
        </div>
      )}

      {/* Billings Table */}
      <BillingsTable
        data={earningsList}
        isLoading={isLoading}
        serverPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalCount={totalCount}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit)
          setCurrentPage(1)
        }}
        onRowClick={handleRowClick}
      />

      {/* Slide-out Transaction Details Sheet */}
      <TransactionDetailsSheet
        open={detailsSheetOpen}
        onOpenChange={setDetailsSheetOpen}
        transactionId={selectedTransactionId}
      />

      {/* Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filters")}
        filterGroups={filterGroups}
        selectedFilters={billingFilters}
        onFilterChange={(newFilters) => {
          setBillingFilters(newFilters)
          setCurrentPage(1)
        }}
        onReset={clearAllFilters}
      >
        <div className="space-y-4 pt-2 border-t border-white/10">
          <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>{t("earnings.filters.dateRange", "Date Range")}</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">
                {t("earnings.filters.from", "From")}
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-input/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-primary outline-none focus:border-custom-yellow/50"
              />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">
                {t("earnings.filters.to", "To")}
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-input/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-primary outline-none focus:border-custom-yellow/50"
              />
            </div>
          </div>

          <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5 pt-2">
            <DollarSign className="w-4 h-4 text-secondary" />
            <span>{t("earnings.filters.amountRange", "Amount Range (€)")}</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">
                {t("earnings.filters.min", "Min")}
              </label>
              <input
                type="number"
                placeholder="0"
                value={amountMin}
                onChange={(e) => {
                  setAmountMin(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-input/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-primary outline-none focus:border-custom-yellow/50"
              />
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">
                {t("earnings.filters.max", "Max")}
              </label>
              <input
                type="number"
                placeholder="1000"
                value={amountMax}
                onChange={(e) => {
                  setAmountMax(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-input/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-primary outline-none focus:border-custom-yellow/50"
              />
            </div>
          </div>

          <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5 pt-2">
            <Hash className="w-4 h-4 text-secondary" />
            <span>{t("earnings.filters.sessionId", "Session ID")}</span>
          </h4>
          <div>
            <input
              type="text"
              placeholder="e.g. 26"
              value={sessionId}
              onChange={(e) => {
                setSessionId(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-input/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-primary outline-none focus:border-custom-yellow/50"
            />
          </div>
        </div>
      </FilterSheet>
    </div>
  )
}

export default BillingsTab

