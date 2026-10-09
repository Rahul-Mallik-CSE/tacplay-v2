"use client"

import React, { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Filter, Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet, { FilterGroup } from "@/components/SharedComponents/FilterSheet"
import FieldSearchBar from "./FieldSearchBar"
import FieldPlanBadge from "./FieldPlanBadge"
import FieldCountryFlag from "./FieldCountryFlag"
import FieldActionDropdown from "./FieldActionDropdown"
import FieldDetailsSheet from "./FieldDetailsSheet"
import UpgradeFieldPlanModal from "./UpgradeFieldPlanModal"
import FieldTableSkeleton from "./FieldTableSkeleton"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  setSearchQuery,
  setSelectedStatus,
  setSelectedSubscription,
  setSelectedCountry,
  setSortBy,
  setCurrentPage,
  setItemsPerPage,
  resetFieldFilters,
} from "@/redux/features/admin/fieldManagement/fieldManagementSlice"
import {
  useGetAdminFieldOwnersQuery,
  useUpdateFieldOwnerStatusMutation,
} from "@/redux/features/admin/fieldManagement/fieldManagementAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type {
  FieldOwnerItem,
  FieldOwnerStatusAction,
  FieldOwnerDetailData,
} from "@/types/AdminTypes/FieldManagementTypes"

function FieldListTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    searchQuery,
    selectedStatus,
    selectedSubscription,
    selectedCountry,
    sortBy,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.fieldManagement)

  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null)
  const [selectedFieldItem, setSelectedFieldItem] = useState<FieldOwnerItem | null>(null)
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [upgradeField, setUpgradeField] = useState<FieldOwnerDetailData | FieldOwnerItem | null>(null)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  // Local state for filter sheet chips
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    Status: selectedStatus ? [selectedStatus] : [],
    Subscription: selectedSubscription ? [selectedSubscription] : [],
    Country: selectedCountry ? [selectedCountry] : [],
    Sort: sortBy ? [sortBy] : ["newest"],
  })

  // Query field owners from backend
  const {
    data: fieldOwnersResponse,
    isLoading,
    isFetching,
    error,
  } = useGetAdminFieldOwnersQuery({
    search: searchQuery,
    status: selectedStatus || undefined,
    subscription: selectedSubscription || undefined,
    country: selectedCountry || undefined,
    sort: sortBy || undefined,
    page: currentPage,
    limit: itemsPerPage,
  })

  const [updateStatus] = useUpdateFieldOwnerStatusMutation()

  const meta = fieldOwnersResponse?.meta
  const fieldList = fieldOwnersResponse?.data || []

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value))
  }

  const handleViewDetails = (field: FieldOwnerItem) => {
    setSelectedFieldId(field.user_id)
    setSelectedFieldItem(field)
    setIsDetailsSheetOpen(true)
  }

  const handleStatusAction = async (
    fieldOrUserId: FieldOwnerItem | number,
    action: FieldOwnerStatusAction,
  ) => {
    const id = typeof fieldOrUserId === "number" ? fieldOrUserId : fieldOrUserId.user_id
    try {
      const res = await updateStatus({
        id,
        data: { action },
      }).unwrap()

      const successMsg =
        res?.message ||
        (action === "approve"
          ? t("fieldManagement.toast.approved", "Field approved successfully")
          : action === "activate"
          ? t("fieldManagement.toast.activated", "Field activated successfully")
          : t("fieldManagement.toast.suspended", "Field suspended successfully"))

      toast.success(successMsg)
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("fieldManagement.toast.failed", "Action failed. Please try again.")
      toast.error(errorMsg)
    }
  }

  const handleUpgradePlan = (field: FieldOwnerDetailData | FieldOwnerItem) => {
    setUpgradeField(field)
    setIsUpgradeModalOpen(true)
  }

  const handleUpgradeConfirm = (_plan: string) => {
    toast.success(t("fieldManagement.toast.upgradeSuccess", "Plan upgraded successfully"))
    setIsUpgradeModalOpen(false)
  }

  const handleViewAllSession = () => {
    setIsDetailsSheetOpen(false)
    router.push("/admin/field-management/sessions")
  }

  // Filter groups from API meta or fallback
  const filterGroups: FilterGroup[] = useMemo(() => {
    const statusOptions = meta?.filters?.options?.status || [
      { label: "Approved", value: "approved" },
      { label: "Pending", value: "pending" },
      { label: "Suspended", value: "suspended" },
      { label: "Flagged", value: "flagged" },
    ]

    const subscriptionOptions = meta?.filters?.options?.subscription || [
      { label: "Gold", value: "gold" },
      { label: "Silver", value: "silver" },
      { label: "Bronze", value: "bronze" },
    ]

    const countryOptions = meta?.filters?.options?.country || [
      { label: "Argentina", value: "AR" },
      { label: "Bangladesh", value: "BA" },
    ]

    const sortOptions = meta?.sort?.options || [
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
      { label: "Field Name A-Z", value: "name_asc" },
      { label: "Field Name Z-A", value: "name_desc" },
      { label: "Highest Booking", value: "booking_high" },
      { label: "Lowest Booking", value: "booking_low" },
      { label: "Highest Revenue", value: "revenue_high" },
      { label: "Lowest Revenue", value: "revenue_low" },
    ]

    return [
      {
        title: "Status",
        type: "single" as const,
        options: statusOptions,
      },
      {
        title: "Subscription",
        type: "single" as const,
        options: subscriptionOptions,
      },
      {
        title: "Country",
        type: "single" as const,
        options: countryOptions,
      },
      {
        title: "Sort",
        type: "single" as const,
        options: sortOptions,
      },
    ]
  }, [meta])

  const handleApplyFilters = () => {
    dispatch(setSelectedStatus(activeFilters.Status?.[0] || ""))
    dispatch(setSelectedSubscription(activeFilters.Subscription?.[0] || ""))
    dispatch(setSelectedCountry(activeFilters.Country?.[0] || ""))
    dispatch(setSortBy(activeFilters.Sort?.[0] || "newest"))
    dispatch(setCurrentPage(1))
    setFilterSheetOpen(false)
  }

  const handleResetFilters = () => {
    setActiveFilters({
      Status: [],
      Subscription: [],
      Country: [],
      Sort: ["newest"],
    })
    dispatch(resetFieldFilters())
    setFilterSheetOpen(false)
  }

  const getStatusBadge = (status: unknown) => {
    const statusStr =
      typeof status === "string"
        ? status
        : typeof status === "object" && status !== null
        ? ((status as Record<string, unknown>).value as string) ||
          ((status as Record<string, unknown>).label as string) ||
          ""
        : String(status || "")
    const s = statusStr.toLowerCase()
    switch (s) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      case "pending":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "flagged":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30"
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30"
    }
  }

  const columns = [
    {
      header: t("fieldManagement.columns.field", "Field"),
      accessor: (row: FieldOwnerItem) => {
        const imageUrl = toAbsoluteMediaUrl(row.field?.image)
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg shrink-0 overflow-hidden relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={row.field_name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/60 text-xs text-muted-foreground font-semibold">
                  FLD
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{row.field_name}</p>
              <p className="text-xs text-muted-foreground">
                {row.field?.display_id || row.display_id}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      header: t("fieldManagement.columns.owner", "Owner"),
      accessor: (row: FieldOwnerItem) => (
        <div>
          <p className="text-sm font-medium text-primary">{row.owner_name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.subscription", "Subscription"),
      accessor: (row: FieldOwnerItem) => (
        <FieldPlanBadge plan={row.subscription?.name || "Bronze"} size="sm" />
      ),
    },
    {
      header: t("fieldManagement.columns.country", "Country"),
      accessor: (row: FieldOwnerItem) => (
        <div className="flex items-center gap-2">
          <FieldCountryFlag countryCode={row.country_info?.code || "ES"} />
          <span className="text-sm text-primary">{row.country}</span>
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.created", "Apply Date"),
      accessor: (row: FieldOwnerItem) => {
        const dateStr = row.apply_date || row.created_at
        let datePart = dateStr
        let timePart = ""
        if (dateStr) {
          try {
            const d = new Date(dateStr)
            datePart = d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            timePart = d.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          } catch {
            datePart = dateStr
          }
        }
        return (
          <div>
            <p className="text-sm text-primary">{datePart}</p>
            {timePart && <p className="text-xs text-muted-foreground">{timePart}</p>}
          </div>
        )
      },
    },
    {
      header: t("fieldManagement.columns.booking", "Booking"),
      accessor: (row: FieldOwnerItem) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary font-medium">
            {row.booking?.count ?? 0}
          </span>
          {row.booking?.change && (
            <span
              className={`text-xs ${
                row.booking.change.is_positive
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {row.booking.change.display}
            </span>
          )}
        </div>
      ),
    },
    {
      header: t("fieldManagement.columns.revenue", "Revenue"),
      accessor: (row: FieldOwnerItem) => (
        <span className="text-sm text-primary font-medium">
          {row.revenue?.display ?? `€${row.revenue?.value ?? "0.00"}`}
        </span>
      ),
    },
    {
      header: t("fieldManagement.columns.status", "Status"),
      accessor: (row: FieldOwnerItem) => {
        const statusLabel =
          typeof row.status === "string"
            ? row.status
            : typeof row.status === "object" && row.status !== null
            ? ((row.status as Record<string, unknown>).label as string) ||
              ((row.status as Record<string, unknown>).value as string) ||
              ""
            : String(row.status || "")
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${getStatusBadge(
              row.status,
            )}`}
          >
            {statusLabel}
          </span>
        )
      },
    },
  ]

  type TableRow = FieldOwnerItem & Record<string, unknown>

  const actionRenderer = (row: FieldOwnerItem) => (
    <FieldActionDropdown
      field={row}
      onViewDetails={handleViewDetails}
      onStatusAction={handleStatusAction}
    />
  )

  const hasActiveFilters =
    Boolean(selectedStatus) ||
    Boolean(selectedSubscription) ||
    Boolean(selectedCountry) ||
    (Boolean(sortBy) && sortBy !== "newest")

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("fieldManagement.title", "Field Management")}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <FieldSearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("fieldManagement.searchPlaceholder", "Search field or owner...")}
          />
          <button
            onClick={() => {
              setActiveFilters({
                Status: selectedStatus ? [selectedStatus] : [],
                Subscription: selectedSubscription ? [selectedSubscription] : [],
                Country: selectedCountry ? [selectedCountry] : [],
                Sort: sortBy ? [sortBy] : ["newest"],
              })
              setFilterSheetOpen(true)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors cursor-pointer ${
              hasActiveFilters
                ? "border-custom-yellow bg-custom-yellow/10 text-custom-yellow"
                : "border-white/10 bg-muted text-primary hover:bg-muted/80"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>{t("common.filter", "Filter")}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-custom-yellow" />
            )}
          </button>
        </div>
      </div>

      {isLoading ? (
        <FieldTableSkeleton showControls={false} rowCount={itemsPerPage || 8} />
      ) : error ? (
        <div className="w-full py-16 flex flex-col items-center justify-center gap-2 text-center border border-white/5 rounded-xl bg-card">
          <p className="text-red-400 font-medium">Failed to load field owners</p>
          <p className="text-xs text-muted-foreground">Please check your network or try again.</p>
        </div>
      ) : (
        <div className="relative">
          {isFetching && (
            <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-black/60 rounded text-xs text-primary flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Updating...</span>
            </div>
          )}
          <CustomTable
            data={fieldList as unknown as TableRow[]}
            columns={
              columns as {
                header: string
                accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
                className?: string
              }[]
            }
            actionRenderer={(row) => actionRenderer(row as FieldOwnerItem)}
            serverPagination={true}
            currentPage={meta?.page ?? currentPage}
            totalPages={meta?.totalPage ?? 1}
            additionalCount={meta?.total ?? fieldList.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            onItemsPerPageChange={(size) => {
              dispatch(setItemsPerPage(size))
              dispatch(setCurrentPage(1))
            }}
            minTableWidth="min-w-[950px]"
          />
        </div>
      )}

      {/* Details Sheet */}
      <FieldDetailsSheet
        fieldId={selectedFieldId}
        initialField={selectedFieldItem}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
        onStatusAction={handleStatusAction}
        onUpgradePlan={handleUpgradePlan}
        onViewAllSession={handleViewAllSession}
      />

      {/* Upgrade Plan Modal */}
      <UpgradeFieldPlanModal
        field={upgradeField}
        open={isUpgradeModalOpen}
        onOpenChange={setIsUpgradeModalOpen}
        onConfirm={handleUpgradeConfirm}
      />

      {/* Filter Sheet */}
      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        title={t("common.filter", "Filter")}
        filterGroups={filterGroups}
        selectedFilters={activeFilters}
        onFilterChange={setActiveFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </div>
  )
}

export default FieldListTable
