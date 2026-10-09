"use client"

import React, { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Filter, Loader2 } from "lucide-react"
import CustomTable from "@/components/SharedComponents/CustomTable"
import FilterSheet, { FilterGroup } from "@/components/SharedComponents/FilterSheet"
import SessionSearchBar from "./SessionSearchBar"
import SessionStatusBadge from "./SessionStatusBadge"
import SessionActionDropdown from "./SessionActionDropdown"
import SessionDetailsSheet from "./SessionDetailsSheet"
import SessionTableSkeleton from "./SessionTableSkeleton"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  setSessionSearchQuery,
  setSessionStatus,
  setSessionMatchType,
  setSessionDate,
  setSessionCurrentPage,
  setSessionItemsPerPage,
  resetSessionFilters,
} from "@/redux/features/admin/fieldManagement/fieldManagementSlice"
import { useGetAdminSessionsQuery } from "@/redux/features/admin/fieldManagement/fieldManagementAPI"
import { toAbsoluteMediaUrl } from "@/lib/utils"
import type { AdminSessionListItem } from "@/types/AdminTypes/FieldManagementTypes"

function SessionListTable() {
  const { t } = useTranslation("dashboard")
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    sessionSearchQuery,
    sessionStatus,
    sessionMatchType,
    sessionDate,
    sessionCurrentPage,
    sessionItemsPerPage,
  } = useAppSelector((state) => state.fieldManagement)

  const [selectedSessionId, setSelectedSessionId] = useState<number | string | null>(null)
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  // Local state for filter sheet chips
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    Status: sessionStatus ? [sessionStatus] : [],
    "Match Type": sessionMatchType ? [sessionMatchType] : [],
  })

  // Query admin sessions from backend
  const {
    data: sessionsResponse,
    isLoading,
    isFetching,
    error,
  } = useGetAdminSessionsQuery({
    search: sessionSearchQuery,
    status: sessionStatus || undefined,
    match_type: sessionMatchType || undefined,
    date: sessionDate || undefined,
    page: sessionCurrentPage,
    limit: sessionItemsPerPage,
  })

  const meta = sessionsResponse?.meta
  const sessionList = sessionsResponse?.data || []

  const handleSearchChange = (value: string) => {
    dispatch(setSessionSearchQuery(value))
  }

  const handleViewDetails = (session: AdminSessionListItem) => {
    setSelectedSessionId(session.id || session.session_id || "")
    setIsDetailsSheetOpen(true)
  }

  const filterGroups: FilterGroup[] = useMemo(() => {
    const statusOpts = meta?.filters?.options?.status || [
      { label: "Open", value: "open" },
      { label: "Booking", value: "booking" },
      { label: "Full", value: "full" },
      { label: "Ongoing", value: "ongoing" },
      { label: "Complete", value: "completed" },
      { label: "Cancelled", value: "cancelled" },
    ]

    const matchTypeOpts = meta?.filters?.options?.match_type || [
      { label: "Social", value: "social" },
      { label: "Ranked", value: "ranked" },
    ]

    return [
      {
        title: "Status",
        type: "single" as const,
        options: statusOpts,
      },
      {
        title: "Match Type",
        type: "single" as const,
        options: matchTypeOpts,
      },
    ]
  }, [meta])

  const handleApplyFilters = () => {
    dispatch(setSessionStatus(activeFilters.Status?.[0] || ""))
    dispatch(setSessionMatchType(activeFilters["Match Type"]?.[0] || ""))
    dispatch(setSessionCurrentPage(1))
    setFilterSheetOpen(false)
  }

  const handleResetFilters = () => {
    setActiveFilters({
      Status: [],
      "Match Type": [],
    })
    dispatch(resetSessionFilters())
    setFilterSheetOpen(false)
  }

  const hasActiveFilters = Boolean(sessionStatus) || Boolean(sessionMatchType) || Boolean(sessionDate)

  const columns = [
    {
      header: t("fieldManagement.sessionColumns.sessionName", "Session Name"),
      accessor: (row: AdminSessionListItem) => (
        <div>
          <p className="text-sm font-medium text-primary">{row.session_name}</p>
          <p className="text-xs text-muted-foreground">
            {row.session_id || row.display_session_id || (row.id ? `#CH ${row.id}` : "")}
          </p>
        </div>
      ),
    },
    {
      header: t("fieldManagement.sessionColumns.dateTime", "Date & Time"),
      accessor: (row: AdminSessionListItem) => {
        const dt = row.date_time
        const dateStr =
          dt?.date_display ||
          dt?.date ||
          row.match_date ||
          row.date ||
          ""

        const timeStr =
          dt?.start_time_display && dt?.end_time_display
            ? `${dt.start_time_display} - ${dt.end_time_display}`
            : dt?.display
            ? dt.display.includes("|")
              ? dt.display.split("|")[1]?.trim()
              : dt.display
            : row.start_time && row.end_time
            ? `${row.start_time} - ${row.end_time}`
            : row.time || ""

        return (
          <div>
            <p className="text-sm text-primary font-medium">{dateStr || "N/A"}</p>
            {timeStr && <p className="text-xs text-muted-foreground">{timeStr}</p>}
          </div>
        )
      },
    },
    {
      header: t("fieldManagement.sessionColumns.fieldOrStaff", "Field / Staff"),
      accessor: (row: AdminSessionListItem) => {
        const fieldTitle =
          row.field?.field_name ||
          row.field_name ||
          (row.field_id ? `Field: ${row.field_id}` : "Tacplay Arena")

        const staff = row.assigned_staff
        const staffAvatar = staff?.profile_image ? toAbsoluteMediaUrl(staff.profile_image) : null

        return (
          <div className="flex items-center gap-2.5">
            {staff ? (
              staffAvatar ? (
                <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-white/10">
                  <Image
                    src={staffAvatar}
                    alt={staff.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary shrink-0 border border-white/10">
                  {staff.name.slice(0, 2).toUpperCase()}
                </div>
              )
            ) : null}
            <div>
              <p className="text-sm font-medium text-primary">
                {staff ? staff.name : fieldTitle}
              </p>
              <p className="text-xs text-muted-foreground">
                {staff
                  ? `${staff.role || "Staff"} • ${fieldTitle}`
                  : row.field_id || "Unassigned"}
              </p>
            </div>
          </div>
        )
      },
    },
    {
      header: t("fieldManagement.sessionColumns.matchType", "Match Type"),
      accessor: (row: AdminSessionListItem) => {
        const rawMatchType =
          typeof row.match_type === "object" && row.match_type !== null
            ? row.match_type.display || row.match_type.value || ""
            : typeof row.match_type === "string"
            ? row.match_type
            : typeof row.matchType === "string"
            ? row.matchType
            : ""

        const matchTypeStr = String(rawMatchType || "Social")
        const isRanked = matchTypeStr.toLowerCase().includes("ranked")

        return (
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isRanked ? "bg-red-400" : "bg-emerald-400"
              }`}
            />
            <span className="text-sm text-primary capitalize">
              {matchTypeStr}
            </span>
          </div>
        )
      },
    },
    {
      header: t("fieldManagement.sessionColumns.player", "Player"),
      accessor: (row: AdminSessionListItem) => {
        const playerStr =
          row.player_capacity?.display ||
          row.player ||
          "0 / 10"
        return (
          <span className="text-sm text-primary font-mono">{playerStr}</span>
        )
      },
    },
    {
      header: t("fieldManagement.sessionColumns.booked", "Booked"),
      accessor: (row: AdminSessionListItem) => {
        const bookedStr =
          typeof row.booked === "object" && row.booked !== null
            ? row.booked.display
            : typeof row.booked === "string"
            ? row.booked
            : row.player_capacity?.display || "0 / 10"
        return (
          <span className="text-sm text-primary font-mono">{bookedStr}</span>
        )
      },
    },
    {
      header: t("fieldManagement.sessionColumns.price", "Price"),
      accessor: (row: AdminSessionListItem) => {
        const priceStr =
          typeof row.price === "object" && row.price !== null
            ? row.price.display || `€${row.price.value}`
            : row.amount !== undefined
            ? String(row.amount)
            : typeof row.price === "string" || typeof row.price === "number"
            ? String(row.price).startsWith("€") || String(row.price).startsWith("$")
              ? String(row.price)
              : `€${row.price}`
            : "€0.00"

        return <span className="text-sm text-primary font-medium">{priceStr}</span>
      },
    },
    {
      header: t("fieldManagement.sessionColumns.status", "Status"),
      accessor: (row: AdminSessionListItem) => (
        <SessionStatusBadge status={row.status_display || row.status} size="sm" />
      ),
    },
  ]

  type TableRow = AdminSessionListItem & Record<string, unknown>

  const actionRenderer = (row: AdminSessionListItem) => (
    <SessionActionDropdown
      session={row}
      onViewDetails={handleViewDetails}
    />
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/field-management")}
            className="cursor-pointer p-2 rounded-lg border border-white/10 bg-muted hover:bg-muted/80 text-primary transition-colors flex items-center justify-center shrink-0"
            aria-label="Back to Field Management"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t("fieldManagement.sessionTitle", "Session List")}
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SessionSearchBar
            value={sessionSearchQuery}
            onChange={handleSearchChange}
            placeholder={t("fieldManagement.sessionSearchPlaceholder", "Search sessions...")}
          />
          <button
            onClick={() => {
              setActiveFilters({
                Status: sessionStatus ? [sessionStatus] : [],
                "Match Type": sessionMatchType ? [sessionMatchType] : [],
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
        <SessionTableSkeleton showControls={false} rowCount={sessionItemsPerPage || 8} />
      ) : error ? (
        <div className="w-full py-16 flex flex-col items-center justify-center gap-2 text-center border border-white/5 rounded-xl bg-card">
          <p className="text-red-400 font-medium">Failed to load sessions</p>
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
            data={sessionList as unknown as TableRow[]}
            columns={
              columns as {
                header: string
                accessor: keyof TableRow | ((row: TableRow) => React.ReactNode)
                className?: string
              }[]
            }
            actionRenderer={(row) => actionRenderer(row as AdminSessionListItem)}
            serverPagination={true}
            currentPage={meta?.page ?? sessionCurrentPage}
            totalPages={meta?.totalPage ?? 1}
            additionalCount={meta?.total ?? sessionList.length}
            itemsPerPage={sessionItemsPerPage}
            onPageChange={(page) => dispatch(setSessionCurrentPage(page))}
            onItemsPerPageChange={(size) => {
              dispatch(setSessionItemsPerPage(size))
              dispatch(setSessionCurrentPage(1))
            }}
            minTableWidth="min-w-[950px]"
          />
        </div>
      )}

      {/* Session Details Sheet */}
      <SessionDetailsSheet
        sessionId={selectedSessionId}
        open={isDetailsSheetOpen}
        onOpenChange={setIsDetailsSheetOpen}
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

export default SessionListTable
