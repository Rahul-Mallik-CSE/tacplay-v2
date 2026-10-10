"use client"

import React, { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Filter, RotateCcw, ArrowUpDown } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  setSearchQuery,
  setSelectedType,
  setSelectedPlan,
  setSelectedCountry,
  setSelectedBillingCycle,
  setSelectedStatus,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  resetSubscriptionFilters,
} from "@/redux/features/admin/subscriptionManagement/subscriptionManagementSlice"
import { useGetAdminSubscriptionsQuery } from "@/redux/features/admin/subscriptionManagement/subscriptionManagementAPI"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet from "@/components/SharedComponents/FilterSheet"
import SubscriptionSearchBar from "./SubscriptionSearchBar"
import SubscriptionStatusBadge from "./SubscriptionStatusBadge"
import SubscriptionTypeBadge from "./SubscriptionTypeBadge"
import SubscriptionPlanBadge from "./SubscriptionPlanBadge"
import SubscriptionCountryFlag from "./SubscriptionCountryFlag"
import SubscriptionActionDropdown from "./SubscriptionActionDropdown"
import SubscriptionDetailsSheet from "./SubscriptionDetailsSheet"
import AdminSubscriptionLoading from "./AdminSubscriptionLoading"
import type {
  AdminSubscriptionItem,
  FilterOption,
  SortOption,
} from "@/types/AdminTypes/SubscriptionManagementTypes"

function SubscriptionListTable() {
  const { t } = useTranslation("dashboard")
  const dispatch = useAppDispatch()

  const {
    searchQuery,
    selectedType,
    selectedPlan,
    selectedCountry,
    selectedBillingCycle,
    selectedStatus,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.subscriptionManagement)

  // Fetch subscriptions from API
  const {
    data: responseData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAdminSubscriptionsQuery({
    search: searchQuery || undefined,
    type: selectedType || undefined,
    plan: selectedPlan || undefined,
    country: selectedCountry || undefined,
    billing_cycle: selectedBillingCycle || undefined,
    status: selectedStatus || undefined,
    sort_by: sortBy || undefined,
    sort_order: sortOrder || undefined,
    page: currentPage,
    limit: itemsPerPage,
  })

  // Sheet states
  const [selectedSubscription, setSelectedSubscription] =
    useState<AdminSubscriptionItem | null>(null)
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  const meta = responseData?.meta
  const subscriptions = responseData?.data || []
  const filterOptions = meta?.filter_options
  const sortOptions = meta?.sort_options

  const hasActiveFilters = Boolean(
    searchQuery ||
      selectedType ||
      selectedPlan ||
      selectedCountry ||
      selectedBillingCycle ||
      selectedStatus ||
      sortBy !== "created_at" ||
      sortOrder !== "desc"
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value))
    },
    [dispatch]
  )

  const handleViewDetails = (item: AdminSubscriptionItem) => {
    setSelectedSubscription(item)
    setIsDetailsSheetOpen(true)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) return
    const [field, order] = value.split(":")
    dispatch(
      setSorting({
        sortBy: field,
        sortOrder: (order as "asc" | "desc") || "desc",
      })
    )
  }

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/A"
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    } catch {
      return dateStr
    }
  }

  // FilterSheet integration
  const filterGroups = useMemo(() => {
    if (!filterOptions) return []
    return [
      {
        title: "Type",
        type: "single" as const,
        options: filterOptions.type || [],
      },
      {
        title: "Plan",
        type: "single" as const,
        options: filterOptions.plan || [],
      },
      {
        title: "Billing Cycle",
        type: "single" as const,
        options: filterOptions.billing_cycle || [],
      },
      {
        title: "Status",
        type: "single" as const,
        options: filterOptions.status || [],
      },
      {
        title: "Country",
        type: "single" as const,
        options: filterOptions.country || [],
      },
    ]
  }, [filterOptions])

  const selectedFiltersRecord: Record<string, string[]> = useMemo(() => ({
    Type: selectedType ? [selectedType] : [],
    Plan: selectedPlan ? [selectedPlan] : [],
    "Billing Cycle": selectedBillingCycle ? [selectedBillingCycle] : [],
    Status: selectedStatus ? [selectedStatus] : [],
    Country: selectedCountry ? [selectedCountry] : [],
  }), [
    selectedType,
    selectedPlan,
    selectedBillingCycle,
    selectedStatus,
    selectedCountry,
  ])

  const handleFilterSheetChange = (newFilters: Record<string, string[]>) => {
    dispatch(setSelectedType(newFilters.Type?.[0] || ""))
    dispatch(setSelectedPlan(newFilters.Plan?.[0] || ""))
    dispatch(setSelectedBillingCycle(newFilters["Billing Cycle"]?.[0] || ""))
    dispatch(setSelectedStatus(newFilters.Status?.[0] || ""))
    dispatch(setSelectedCountry(newFilters.Country?.[0] || ""))
  }

  type TableRow = AdminSubscriptionItem & Record<string, unknown>

  const columns: {
    header: string
    accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
    className?: string
  }[] = [
    {
      header: t("subscriptionManagement.columns.subscriber", "Subscriber"),
      accessor: (row: TableRow) => {
        const name = row.subscriber?.name || "Subscriber"
        const displayId = row.subscriber?.display_id || `#SUB-${row.subscription_id}`
        const email = row.subscriber?.email || ""
        const ownerName = row.subscriber?.owner_name

        return (
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-semibold shrink-0">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary truncate max-w-[180px]">
                {name}
              </p>
              {ownerName && (
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                  Owner: {ownerName}
                </p>
              )}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                <span className="font-mono text-emerald-400/90">{displayId}</span>
                {email && (
                  <>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{email}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      header: t("subscriptionManagement.columns.type", "Type"),
      accessor: (row: TableRow) => (
        <SubscriptionTypeBadge
          type={row.type?.display || row.type?.value || "N/A"}
          size="sm"
        />
      ),
    },
    {
      header: t("subscriptionManagement.columns.plan", "Plan"),
      accessor: (row: TableRow) => (
        <SubscriptionPlanBadge
          plan={row.plan?.display_name || row.plan?.name || "Standard"}
          size="sm"
        />
      ),
    },
    {
      header: t("subscriptionManagement.columns.country", "Country"),
      accessor: (row: TableRow) => (
        <SubscriptionCountryFlag
          countryCode={row.country?.code || ""}
          countryName={row.country?.name}
        />
      ),
    },
    {
      header: t("subscriptionManagement.columns.amount", "Amount"),
      accessor: (row: TableRow) => {
        const currencySymbol =
          row.amount?.currency === "EUR"
            ? "€"
            : row.amount?.currency
            ? `${row.amount.currency} `
            : "€"
        return (
          <span className="text-sm font-semibold text-primary">
            {currencySymbol}
            {row.amount?.value || "0.00"}
          </span>
        )
      },
    },
    {
      header: t("subscriptionManagement.columns.billingCycle", "Billing Cycle"),
      accessor: (row: TableRow) => (
        <span className="text-sm text-primary capitalize">
          {row.billing_cycle?.display || row.billing_cycle?.value || "Monthly"}
        </span>
      ),
    },
    {
      header: t("subscriptionManagement.columns.status", "Status"),
      accessor: (row: TableRow) => (
        <SubscriptionStatusBadge
          status={row.status?.display || row.status?.value || "active"}
          size="sm"
        />
      ),
    },
    {
      header: t("subscriptionManagement.columns.nextBillingDate", "Next Billing Date"),
      accessor: (row: TableRow) => (
        <span className="text-sm text-primary whitespace-nowrap">
          {formatDate(row.next_billing_date)}
        </span>
      ),
    },
  ]

  const actionRenderer = (row: TableRow) => (
    <SubscriptionActionDropdown
      subscription={row}
      onViewDetails={handleViewDetails}
    />
  )

  if (isLoading) {
    return <AdminSubscriptionLoading />
  }

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("subscriptionManagement.title", "Subscription Management")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Monitor and manage active, expired, and past due user subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SubscriptionSearchBar
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-white/10 bg-muted text-xs sm:text-sm text-primary hover:bg-muted/80 transition-colors cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">
              {t("common.filter", "Filters")}
            </span>
          </button>
        </div>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 flex items-center justify-between">
          <span>Failed to load subscription list. Please check your connection.</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="underline hover:text-white font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => dispatch(setSelectedType(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Types</option>
          {(
            filterOptions?.type || [
              { label: "Field Owner", value: "field_owner" },
              { label: "Player", value: "player" },
            ]
          ).map((opt: FilterOption) => (
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
          {(
            filterOptions?.plan || [
              { label: "Bronze Plan (Monthly)", value: "field_bronze_monthly" },
              { label: "Silver Plan (Monthly)", value: "field_silver_monthly" },
              { label: "Gold Elite Plan (Monthly)", value: "field_gold_monthly" },
              { label: "Premium Yearly (Yearly)", value: "premium_yearly" },
            ]
          ).map((opt: FilterOption) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Billing Cycle Filter */}
        <select
          value={selectedBillingCycle}
          onChange={(e) => dispatch(setSelectedBillingCycle(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Billing Cycles</option>
          {(
            filterOptions?.billing_cycle || [
              { label: "Monthly", value: "monthly" },
              { label: "Yearly", value: "yearly" },
            ]
          ).map((opt: FilterOption) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => dispatch(setSelectedStatus(e.target.value))}
          className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
        >
          <option value="" className="bg-card">All Statuses</option>
          {(
            filterOptions?.status || [
              { label: "Active", value: "active" },
              { label: "Expired", value: "expired" },
              { label: "Cancelled", value: "cancelled" },
              { label: "Inactive", value: "inactive" },
            ]
          ).map((opt: FilterOption) => (
            <option key={opt.value} value={opt.value} className="bg-card">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Country Filter */}
        {filterOptions?.country && filterOptions.country.length > 0 && (
          <select
            value={selectedCountry}
            onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
            className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
          >
            <option value="" className="bg-card">All Countries</option>
            {filterOptions.country.map((opt: FilterOption) => (
              <option key={opt.value} value={opt.value} className="bg-card">
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={handleSortChange}
            className="bg-card border border-white/10 text-primary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-white/5 transition-colors"
          >
            {(
              sortOptions || [
                { label: "Newest", sort_by: "created_at", sort_order: "desc" },
                { label: "Oldest", sort_by: "created_at", sort_order: "asc" },
                { label: "Subscriber A-Z", sort_by: "subscriber", sort_order: "asc" },
                { label: "Highest Amount", sort_by: "amount", sort_order: "desc" },
                { label: "Lowest Amount", sort_by: "amount", sort_order: "asc" },
                {
                  label: "Next Billing Date",
                  sort_by: "next_billing_date",
                  sort_order: "asc",
                },
              ]
            ).map((s: SortOption) => (
              <option
                key={`${s.sort_by}:${s.sort_order}`}
                value={`${s.sort_by}:${s.sort_order}`}
                className="bg-card"
              >
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => dispatch(resetSubscriptionFilters())}
            className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Main Table with Server-Side Pagination */}
      <div className="relative">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl pointer-events-none">
            <span className="px-3 py-1 bg-card border border-white/10 rounded-full text-xs text-primary shadow-lg animate-pulse">
              Updating list...
            </span>
          </div>
        )}

        <CustomTable
          data={subscriptions as unknown as TableRow[]}
          columns={columns}
          actionRenderer={(row) => actionRenderer(row as TableRow)}
          serverPagination={true}
          currentPage={meta?.page || currentPage}
          totalPages={meta?.totalPage || 1}
          additionalCount={meta?.total || 0}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
          onItemsPerPageChange={(size) => {
            dispatch(setItemsPerPage(size))
          }}
          minTableWidth="min-w-[1000px]"
        />
      </div>

      {/* Subscription Details Sheet */}
      <SubscriptionDetailsSheet
        subscription={selectedSubscription}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
      />

      {/* Slide-out Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filters")}
        filterGroups={filterGroups}
        selectedFilters={selectedFiltersRecord}
        onFilterChange={handleFilterSheetChange}
        onReset={() => dispatch(resetSubscriptionFilters())}
      />
    </div>
  )
}

export default SubscriptionListTable
