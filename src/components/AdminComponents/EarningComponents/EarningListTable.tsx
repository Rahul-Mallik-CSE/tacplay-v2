"use client"

import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import {
  setSearchQuery,
  setSelectedType,
  setSelectedPlan,
  setSelectedCountry,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  resetEarningFilters,
} from "@/redux/features/admin/earning/earningSlice"
import { useGetAdminEarningsQuery } from "@/redux/features/admin/earning/earningAPI"
import CustomTable from "@/components/SharedComponents/CustomTable"
import EarningSearchBar from "./EarningSearchBar"
import EarningTypeBadge from "./EarningTypeBadge"
import EarningPlanBadge from "./EarningPlanBadge"
import EarningCountryFlag from "./EarningCountryFlag"
import AdminEarningLoading from "./AdminEarningLoading"
import { RotateCcw, DollarSign, CreditCard, ArrowUpDown } from "lucide-react"
import type { EarningTransactionItem } from "@/types/AdminTypes/EarningTypes"

function EarningListTable() {
  const { t } = useTranslation("dashboard")
  const dispatch = useDispatch()

  const {
    searchQuery,
    selectedType,
    selectedPlan,
    selectedCountry,
    sortBy,
    order,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.adminEarning)

  const {
    data: earningRes,
    isLoading,
    isError,
    refetch,
  } = useGetAdminEarningsQuery({
    search: searchQuery,
    type: selectedType,
    plan: selectedPlan,
    country: selectedCountry,
    sort_by: sortBy,
    order: order,
    page: currentPage,
    limit: itemsPerPage,
  })

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value))
    },
    [dispatch]
  )

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) return
    const [field, sortOrder] = value.split(":")
    dispatch(
      setSorting({
        sortBy: field,
        order: (sortOrder as "asc" | "desc") || "desc",
      })
    )
  }

  if (isLoading) {
    return <AdminEarningLoading />
  }

  const meta = earningRes?.meta
  const summary = meta?.summary
  const filterOptions = meta?.filter_options
  const sortOptions = meta?.sort_options
  const transactions = earningRes?.data || []

  const hasActiveFilters = Boolean(
    searchQuery || selectedType || selectedPlan || selectedCountry || sortBy !== "date" || order !== "desc"
  )

  type TableRow = EarningTransactionItem & Record<string, unknown>

  const columns: {
    header: string
    accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("earningPage.columns.transactionId"),
      accessor: (row: TableRow) => (
        <span className="text-sm font-semibold text-primary">
          {row.display_transaction_id || `#CH ${row.transaction_id}`}
        </span>
      ),
    },
    {
      header: t("earningPage.columns.user"),
      accessor: (row: TableRow) => (
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary truncate max-w-[150px]">
            {row.user_name || row.user?.name || "N/A"}
          </p>
          <p className="text-xs text-secondary truncate max-w-[150px]">
            {row.user?.email || ""}
          </p>
        </div>
      ),
    },
    {
      header: t("earningPage.columns.userId"),
      accessor: (row: TableRow) => (
        <span className="text-sm text-secondary">
          {row.display_user_id || `#CN ${row.user_id}`}
        </span>
      ),
    },
    {
      header: t("earningPage.columns.type"),
      accessor: (row: TableRow) => (
        <EarningTypeBadge type={row.type_display || row.type} size="sm" />
      ),
    },
    {
      header: t("earningPage.columns.country"),
      accessor: (row: TableRow) => (
        <EarningCountryFlag
          countryCode={row.country?.code}
          countryName={row.country?.name}
        />
      ),
    },
    {
      header: t("earningPage.columns.plan"),
      accessor: (row: TableRow) => (
        <EarningPlanBadge
          plan={row.plan || row.plan_info?.name || null}
          size="sm"
        />
      ),
    },
    {
      header: t("earningPage.columns.amount"),
      accessor: (row: TableRow) => (
        <span className="text-sm font-semibold text-primary">
          {row.amount_display || `€${row.amount}`}
        </span>
      ),
    },
    {
      header: t("earningPage.columns.date"),
      accessor: (row: TableRow) => (
        <span className="text-sm text-primary">
          {row.date_display || row.date}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {meta?.table?.title || t("earningPage.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage platform earnings, user subscriptions, and payouts.
          </p>
        </div>
        <EarningSearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-center justify-between">
          <span>Failed to load earning transactions.</span>
          <button
            onClick={() => refetch()}
            className="underline hover:text-white font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary Stat Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                Total Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {summary.total_revenue_display || `€${summary.total_revenue}`}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-custom-yellow/10 flex items-center justify-center text-custom-yellow">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                Paid Transactions
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {summary.paid_transactions}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-card p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                Total Records
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {meta?.total ?? 0}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <ArrowUpDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sorting Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => dispatch(setSelectedType(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Types</option>
          {(filterOptions?.type || [
            { label: "Player", value: "player" },
            { label: "Field Owner", value: "field_owner" },
          ]).map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Plan Filter */}
        <select
          value={selectedPlan}
          onChange={(e) => dispatch(setSelectedPlan(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Plans</option>
          {(filterOptions?.plan || [
            { label: "Premium", value: "premium" },
            { label: "Gold", value: "gold" },
            { label: "Silver", value: "silver" },
            { label: "Bronze", value: "bronze" },
            { label: "Free", value: "free" },
          ]).map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Country Filter */}
        <select
          value={selectedCountry}
          onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Countries</option>
          {(filterOptions?.country || [
            { label: "Bangladesh", value: "BA" },
            { label: "Africa", value: "Africa" },
          ]).map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Sort Options */}
        <select
          value={`${sortBy}:${order}`}
          onChange={handleSortChange}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          {(sortOptions || [
            { label: "Newest", sort_by: "date", order: "desc" },
            { label: "Oldest", sort_by: "date", order: "asc" },
            { label: "Highest Amount", sort_by: "amount", order: "desc" },
            { label: "Lowest Amount", sort_by: "amount", order: "asc" },
            { label: "User A-Z", sort_by: "user", order: "asc" },
            { label: "Type", sort_by: "type", order: "asc" },
            { label: "Plan", sort_by: "plan", order: "asc" },
            { label: "Country", sort_by: "country", order: "asc" },
          ]).map((opt) => (
            <option
              key={`${opt.sort_by}:${opt.order}`}
              value={`${opt.sort_by}:${opt.order}`}
              className="bg-card"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetEarningFilters())}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-xs text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Main Transactions Table */}
      <CustomTable
        data={transactions as unknown as TableRow[]}
        columns={columns}
        serverPagination={true}
        currentPage={currentPage}
        totalPages={meta?.totalPage || 1}
        additionalCount={meta?.total || transactions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        onItemsPerPageChange={(size) => {
          dispatch(setItemsPerPage(size))
        }}
        minTableWidth="min-w-[850px]"
      />
    </div>
  )
}

export default EarningListTable
